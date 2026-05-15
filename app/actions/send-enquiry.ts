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
      <div style="font-family: -apple-system, system-ui, sans-serif; color: #1a1816; max-width: 560px; line-height: 1.6;">
        <p style="font-size: 16px; margin: 0 0 16px 0;">Hi ${escapeHtml(firstName)},</p>
        <p style="font-size: 15px; margin: 0 0 16px 0;">
          Thanks for reaching out to Roztomily. We&rsquo;ve received your enquiry${
            services.length > 0 ? ` about <strong>${escapeHtml(servicesLine)}</strong>` : ""
          } and one of the team will get back to you within one business day.
        </p>
        <p style="font-size: 15px; margin: 0 0 16px 0;">
          For anything urgent in the meantime, reply directly to this email or write to
          <a href="mailto:${TO}" style="color: #dc2c25;">${TO}</a>.
        </p>
        <p style="font-size: 15px; margin: 24px 0 4px 0;">— The Roztomily team</p>
        <p style="font-size: 13px; color: #898683; margin: 0;">Lagos · Briefs welcome from anywhere</p>
        <hr style="border: 0; border-top: 1px solid #e0ddd6; margin: 28px 0 12px 0;" />
        <p style="font-size: 11px; color: #898683; margin: 0;">
          This is an automated acknowledgement. A real human will reply soon.
        </p>
      </div>
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
