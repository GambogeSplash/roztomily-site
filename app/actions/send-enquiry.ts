"use server";

import { Resend } from "resend";

/**
 * Contact form server action.
 *
 * Sends an email to hello@roztomilygroup.com with the form contents.
 * The Reply-To header is set to the client's email so hitting "Reply" in
 * your inbox sends a response directly to them.
 *
 * Requires environment variables:
 *   RESEND_API_KEY        — secret key from https://resend.com/api-keys
 *   CONTACT_TO_EMAIL      — destination inbox (defaults to hello@roztomilygroup.com)
 *   CONTACT_FROM_EMAIL    — sender (must be a Resend-verified domain;
 *                           defaults to hello@roztomilygroup.com once DNS is configured)
 */

const TO   = process.env.CONTACT_TO_EMAIL   ?? "hello@roztomilygroup.com";
const FROM = process.env.CONTACT_FROM_EMAIL ?? "Roztomily <hello@roztomilygroup.com>";

export type EnquiryResult = { ok: true } | { ok: false; error: string };

export async function sendEnquiry(formData: FormData): Promise<EnquiryResult> {
  // Honeypot — bots fill every field they can find. Humans never see this one.
  // If filled, silently "succeed" so the bot moves on without learning anything.
  const honeypot = String(formData.get("website_url") ?? "").trim();
  if (honeypot.length > 0) {
    return { ok: true };
  }

  const firstName = String(formData.get("firstName") ?? "").trim();
  const lastName  = String(formData.get("lastName")  ?? "").trim();
  const email     = String(formData.get("email")     ?? "").trim();
  const company   = String(formData.get("company")   ?? "").trim();
  const services  = formData.getAll("services").map(String);
  const message   = String(formData.get("message")   ?? "").trim();

  // Basic validation — required fields.
  if (!firstName || !lastName) {
    return { ok: false, error: "Please enter your first and last name." };
  }
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  if (!process.env.RESEND_API_KEY) {
    return {
      ok: false,
      error: "Email service is not configured yet. Please email us directly at hello@roztomilygroup.com.",
    };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const name = `${firstName} ${lastName}`;
  const servicesLine = services.length > 0 ? services.join(", ") : "(not specified)";

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    company ? `Company: ${company}` : null,
    `Services of interest: ${servicesLine}`,
    "",
    "Message:",
    message || "(no message)",
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
    <div style="font-family: -apple-system, system-ui, sans-serif; color: #1a1816; max-width: 560px; line-height: 1.55;">
      <h2 style="color: #dc2c25; font-size: 18px; margin: 0 0 16px 0;">New enquiry from ${escapeHtml(name)}</h2>
      <table style="border-collapse: collapse; font-size: 14px;">
        <tr><td style="padding: 4px 12px 4px 0; color: #898683;">Email</td><td><a href="mailto:${encodeURI(email)}" style="color: #1a1816;">${escapeHtml(email)}</a></td></tr>
        ${company ? `<tr><td style="padding: 4px 12px 4px 0; color: #898683;">Company</td><td>${escapeHtml(company)}</td></tr>` : ""}
        <tr><td style="padding: 4px 12px 4px 0; color: #898683;">Services</td><td>${escapeHtml(servicesLine)}</td></tr>
      </table>
      ${message ? `<div style="margin-top: 20px; padding: 16px; background: #f7f7f5; border-radius: 8px; white-space: pre-wrap;">${escapeHtml(message)}</div>` : ""}
      <p style="margin-top: 24px; font-size: 12px; color: #898683;">Submitted via roztomilygroup.com</p>
    </div>
  `.trim();

  // 1) Notification email to the Roztomily team
  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `New enquiry from ${name}`,
      html,
      text,
    });
    if (error) {
      console.error("Resend error (team):", error);
      return { ok: false, error: "Couldn't send right now. Please try again or email us directly." };
    }
  } catch (e) {
    console.error("Send enquiry threw (team):", e);
    return { ok: false, error: "Couldn't send right now. Please try again or email us directly." };
  }

  // 2) Autoresponder to the client — never blocks success.
  // If this fails, we still consider the submission successful since the team got it.
  try {
    const autoHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>We got your enquiry</title>
</head>
<body style="margin: 0; padding: 0; background: #f5f3ee; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #f5f3ee;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="560" style="background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 16px rgba(0,0,0,0.06); max-width: 560px;">

          <!-- Brand-red header bar -->
          <tr>
            <td style="background: #dc2c25; padding: 32px 40px; color: #ffffff;">
              <div style="font-family: 'Big Shoulders', 'Big Shoulders Display', Impact, sans-serif; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; font-size: 24px; line-height: 1;">
                ROZTOMILY
              </div>
              <div style="font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(255,255,255,0.78); margin-top: 8px;">
                Integrated Marketing Communications · Lagos
              </div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 36px 40px 8px 40px; color: #1a1816;">
              <h1 style="font-size: 26px; line-height: 1.15; letter-spacing: -0.02em; font-weight: 500; margin: 0 0 20px 0; color: #0d0a08;">
                Thanks, ${escapeHtml(firstName)} — we&rsquo;ve got your enquiry.
              </h1>
              <p style="font-size: 15px; line-height: 1.6; margin: 0 0 16px 0; color: #292421;">
                Someone from the team will reply within <strong>one business day</strong>${
                  services.length > 0 ? ` about <strong>${escapeHtml(servicesLine)}</strong>` : ""
                }.
              </p>
              <p style="font-size: 15px; line-height: 1.6; margin: 0 0 8px 0; color: #292421;">
                If anything is urgent in the meantime, reply directly to this email or write to
                <a href="mailto:${TO}" style="color: #dc2c25; text-decoration: none; border-bottom: 1px solid #dc2c25;">${TO}</a>.
              </p>
            </td>
          </tr>

          <!-- Quote summary card -->
          ${message ? `<tr>
            <td style="padding: 16px 40px 8px 40px;">
              <div style="background: #f7f6f2; border-left: 3px solid #dc2c25; padding: 16px 18px; border-radius: 0 8px 8px 0; font-size: 14px; line-height: 1.55; color: #4d4846; font-style: italic;">
                &ldquo;${escapeHtml(message).replace(/\n/g, "<br>")}&rdquo;
              </div>
              <div style="font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #898683; margin-top: 10px;">
                What you sent us
              </div>
            </td>
          </tr>` : ""}

          <!-- Sign-off -->
          <tr>
            <td style="padding: 28px 40px 36px 40px;">
              <p style="font-size: 15px; line-height: 1.6; margin: 0; color: #1a1816;">— The Roztomily team</p>
              <p style="font-size: 13px; color: #898683; margin: 4px 0 0 0;">Lagos · Briefs welcome from anywhere</p>
            </td>
          </tr>

          <!-- Footer disclaimer -->
          <tr>
            <td style="background: #f7f6f2; padding: 18px 40px; border-top: 1px solid #ecebe5;">
              <p style="font-size: 11px; color: #898683; margin: 0; line-height: 1.5;">
                This is an automated acknowledgement &mdash; a real human will reply soon.
                You received this because you submitted an enquiry at
                <a href="https://www.roztomilygroup.com" style="color: #898683;">roztomilygroup.com</a>.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim();

    const autoText = [
      `Hi ${firstName},`,
      "",
      `Thanks for reaching out to Roztomily. We've received your enquiry${
        services.length > 0 ? ` about ${servicesLine}` : ""
      } and one of the team will get back to you within one business day.`,
      "",
      `For anything urgent in the meantime, reply directly to this email or write to ${TO}.`,
      "",
      "— The Roztomily team",
      "Lagos · Briefs welcome from anywhere",
      "",
      "(This is an automated acknowledgement. A real human will reply soon.)",
    ].join("\n");

    await resend.emails.send({
      from: FROM,
      to: email,
      replyTo: TO,
      subject: `Thanks ${firstName} — we got your enquiry`,
      html: autoHtml,
      text: autoText,
    });
  } catch (e) {
    // Autoresponder failure shouldn't surface to the user.
    console.error("Autoresponder threw:", e);
  }

  return { ok: true };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
