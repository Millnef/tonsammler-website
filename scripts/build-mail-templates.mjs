// Builds the confirmation emails of the registration page in the page's look:
// public/anmeldung/mail/bestaetigt.html and warteliste.html.
//
// The Apps Script (scripts/anmeldung-apps-script.gs) fetches these files when it sends a
// mail, uses <title> as the subject and replaces {{NAME}}. So the mail can change here
// without touching Google. Run: node scripts/build-mail-templates.mjs
//
// Email HTML: tables and inline styles only, system fonts (mail apps ignore web fonts),
// 600 px wide, one hosted header image. Without images the text still reads on black.

import { mkdirSync, writeFileSync } from "node:fs";

const SITE = "https://www.tonsammler.com";
const PAGE = `${SITE}/anmeldung`;
const ROUTE =
  "https://www.google.com/maps/search/?api=1&query=Kunstraum%20Raik%20Holetz%2C%20Am%20Seelberg%2055%2C%2086899%20Landsberg%20am%20Lech";

const SANS = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const SERIF = "Georgia, 'Times New Roman', serif";
const ACCENT = "#ffebb5";

const MAILS = {
  bestaetigt: {
    subject: "Du bist dabei: Farbton am 28.11.",
    preheader: "Deine Anmeldung ist bestätigt – Sa 28.11., 16–20 Uhr, Kunstraum Raik Holetz.",
    badge: "Bestätigt",
    intro: "schön, dass du dabei bist! Deine Anmeldung für Farbton ist bestätigt.",
  },
  warteliste: {
    subject: "Warteliste: Farbton am 28.11.",
    preheader: "Du stehst auf der Warteliste – wird ein Platz frei, melden wir uns.",
    badge: "Warteliste",
    intro:
      "danke für deine Anmeldung! Gerade sind alle Plätze vergeben, du stehst auf der Warteliste. Wird ein Platz frei, melden wir uns per E-Mail bei dir.",
  },
};

const label = (text) =>
  `<div style="font-family:${SANS};font-size:11px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;color:#8c8c8c;">${text}</div>`;

const fact = (title, lines) => `
            <tr>
              <td style="border-top:1px solid #262626;padding:18px 0;">
                ${label(title)}
                <div style="font-family:${SERIF};font-size:20px;line-height:1.4;color:#ffffff;padding-top:6px;">${lines.join("<br>")}</div>
              </td>
            </tr>`;

function mail({ subject, preheader, badge, intro }) {
  return `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="dark">
<meta name="supported-color-schemes" content="dark">
<title>${subject}</title>
</head>
<body style="margin:0;padding:0;background-color:#000000;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${preheader}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#000000" style="background-color:#000000;">
  <tr>
    <td align="center" style="padding:0;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;">
        <tr>
          <td>
            <a href="${PAGE}"><img src="${SITE}/anmeldung/mail-header.jpg" width="600" alt="Farbton – Ausstellung · Live Painting · DJ Set" style="display:block;width:100%;max-width:600px;height:auto;border:0;color:#ffffff;font-family:${SERIF};font-size:32px;"></a>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 32px 0;font-family:${SANS};color:#ffffff;">
            <span style="display:inline-block;border:1px solid ${ACCENT};border-radius:999px;padding:6px 14px;font-size:11px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;color:${ACCENT};">${badge}</span>
            <p style="margin:24px 0 0;font-size:17px;line-height:1.6;">Hallo {{NAME}},</p>
            <p style="margin:8px 0 0;font-size:17px;line-height:1.6;">${intro}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 32px 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${fact("Wann", ["Samstag, 28. November 2026", "16–20 Uhr"])}${fact("Wo", ["Kunstraum Raik Holetz", "Am Seelberg 55", "86899 Landsberg am Lech"])}
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 32px 0;">
            <a href="${ROUTE}" style="display:inline-block;background-color:${ACCENT};border-radius:999px;padding:13px 26px;font-family:${SANS};font-size:12px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;color:#000000;text-decoration:none;">Route planen ↗</a>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 32px 0;font-family:${SERIF};font-size:20px;line-height:1.4;font-style:italic;color:#ffffff;">
            Bis bald<br>Raik &amp; Milan
          </td>
        </tr>
        <tr>
          <td style="padding:36px 32px 40px;">
            <div style="border-top:1px solid #262626;padding-top:18px;font-family:${SANS};font-size:12px;line-height:1.7;color:#737373;">
              Farbton · Raik Holetz × Tonsammler<br>
              <a href="${PAGE}" style="color:#a6a6a6;text-decoration:underline;">tonsammler.com/anmeldung</a>
              &nbsp;·&nbsp;
              <a href="${PAGE}/rechtliches" style="color:#a6a6a6;text-decoration:underline;">Impressum &amp; Datenschutz</a>
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>
`;
}

const dir = new URL("../public/anmeldung/mail/", import.meta.url);
mkdirSync(dir, { recursive: true });
for (const [name, content] of Object.entries(MAILS)) {
  writeFileSync(new URL(`${name}.html`, dir), mail(content));
  console.log(`public/anmeldung/mail/${name}.html`);
}
