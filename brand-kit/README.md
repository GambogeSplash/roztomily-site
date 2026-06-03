# Roztomily — Brand Kit

The identity kit for Roztomily Limited. Everything is plain HTML you open in a
browser. Print pieces export to PDF; email pieces are copy-and-paste blocks.

The logo loads live from `roztomilygroup.com`, so nothing needs attaching or
embedding. Body type is Arial / Helvetica everywhere, so the files render the
same on any machine. The wordmark is always the logo image, never live text.

---

## Print pieces

Open in a browser, then Print (Cmd/Ctrl + P) → **Save as PDF**, margins **None**.

- **letterhead.html** — A4 letterhead. Replace the sample body with your letter.
  Header, red rule, and footer repeat on every page.
- **press-release.html** — A4 press release. The main PR template. Fill
  `[HEADLINE]`, `[Subhead]`, the dateline date, the body paragraphs, and the
  media-contact name/title. The "About Roztomily" boilerplate and the real
  phone/email are already set.
- **invoice.html** — A4 invoice/quote. Fill `[Invoice #]`, `[Date]`, `[Due date]`,
  `[Client]`, the line items, totals, and the bank/account placeholders. For a
  quote, change the "INVOICE" label to "QUOTE".
- **business-card.html** — 85mm × 55mm, front and back on one sheet. Replace
  `[Full Name]` / `[Title]` on the front. For a print shop, add 3mm bleed and
  keep text inside the dotted safe area.
- **with-compliments.html** — DL slip, 210mm × 99mm landscape. Logo, the
  "With compliments" line, ruled space for a short note, and the contact footer.

## Email pieces

Open in a browser, select the block, copy, and paste into your mail client or
ESP (in Zoho/Outlook use the source / `< >` view).

- **email/signatures-ready.html** — ready signature blocks for `hello@`, `info@`,
  and a named person. Copy the one you need.
- **email/signature-template.html** — master signature with
  `{{NAME}}/{{TITLE}}/{{EMAIL}}/{{PHONE}}` placeholders for any new team member.
- **email/newsletter-header.html** — 600px red banner for the top of branded
  emails and newsletters. Table-based, renders in every client. Put your content
  underneath it.

## Reference

- **social-profiles.html** — on-screen specs for the social accounts (square
  avatar, LinkedIn banner 1584×396, X/Twitter header 1500×500). Recreate each at
  the noted pixel size and export PNG. Screen only; not for print.

## Email setup (operations)

- **email/SETUP-zoho-mail.md** — full guide to stand up real
  `@roztomilygroup.com` mailboxes on Zoho Mail, including the DNS steps and the
  rule never to touch the Resend (`send.*`) records.
- **email/roztomily-dns.sh** — optional script that does the Cloudflare DNS side
  via API. Dry-run by default, with guards around the Resend records.

---

## Contact facts (used across the kit)

- Roztomily Limited
- Public Relations & Integrated Marketing Communications · Lagos, Nigeria
- +234 913 918 4995 · hello@roztomilygroup.com · www.roztomilygroup.com
- 47 Hassan Balogun St, Isheri Olofin, Lagos

## Brand tokens

| Token | Value | Use |
|---|---|---|
| Brand red | `#dc2c25` | primary accent, spine, rules |
| Deep red | `#b41c16` | hover/pressed, second-rule |
| Ink | `#160f0c` | body text |
| Black | `#000000` | headings |
| Muted grey | `#898683` | meta, captions |
| Soft grey | `#4d4846` | secondary body |
| Cream | `#edece7` | surface |
| Warm | `#f7f7f5` | zebra rows, soft fill |
| Page white | `#ffffff` | sheet |
| Amber | `#f5b942` | secondary accent, sparingly |

Type: ROZTOMILY wordmark is "Big Shoulders" on the web; everywhere in this kit
the wordmark is the logo image and all other text is Arial / Helvetica.
