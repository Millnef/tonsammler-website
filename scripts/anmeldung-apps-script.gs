// Farbton – guest list for www.tonsammler.com/anmeldung (Raik Holetz × Tonsammler)
//
// Google Apps Script, bound to the Google Sheet "Farbton – Anmeldungen" in the
// tonsammlermusic@gmail.com account. Every registration from the website lands here as
// one row; the guest gets a confirmation email from that account.
//
// Setup (once): Extensions → Apps Script → paste this file → run "setup" → Deploy →
// New deployment → Web app, execute as "Me", access "Anyone" → copy the web app URL
// into ENDPOINT in src/lib/anmeldung-content.ts.

const CONFIG = {
  sheetName: "Anmeldungen",
  capacity: 80,
  // Registration closes at the end of this day (German time)
  deadline: new Date("2026-11-22T23:59:59+01:00"),
  senderName: "Farbton · Raik Holetz × Tonsammler",
  replyTo: "tonsammlermusic@gmail.com",
  page: "https://www.tonsammler.com/anmeldung",
  date: "Samstag, 28. November 2026, 16–20 Uhr",
  place: "Kunstraum Raik Holetz, Am Seelberg 55, 86899 Landsberg am Lech",
  route:
    "https://www.google.com/maps/search/?api=1&query=Kunstraum%20Raik%20Holetz%2C%20Am%20Seelberg%2055%2C%2086899%20Landsberg%20am%20Lech",
};

const HEADERS = [
  "Zeitpunkt",
  "Status",
  "Name",
  "E-Mail",
  "Instagram",
  "Wie erfahren",
  "Foto/Video OK",
  "Infos zu künftigen Events",
];

const CONFIRMED = "Bestätigt";
const WAITLIST = "Warteliste";

// Run once by hand: lays out the sheet and asks for the permissions
function setup() {
  getSheet_();
}

// Lets the deployment be checked in the browser without adding a row
function doGet() {
  return json_({ status: "ok", open: new Date() <= CONFIG.deadline });
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    const name = clean_(data.name, 120);
    const email = String(data.email || "").trim().toLowerCase().slice(0, 200);

    if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || data.consentMedia !== true) {
      return json_({ status: "error" });
    }
    if (new Date() > CONFIG.deadline) return json_({ status: "closed" });

    const sheet = getSheet_();
    const rows =
      sheet.getLastRow() > 1 ? sheet.getRange(2, 1, sheet.getLastRow() - 1, HEADERS.length).getValues() : [];
    if (rows.some((row) => String(row[3]).toLowerCase() === email)) return json_({ status: "duplicate" });

    // Places count by the "Bestätigt" rows, so moving someone up by hand works too
    const confirmed = rows.filter((row) => row[1] === CONFIRMED).length;
    const status = confirmed < CONFIG.capacity ? "confirmed" : "waitlist";

    sheet.appendRow([
      new Date(),
      status === "confirmed" ? CONFIRMED : WAITLIST,
      name,
      email,
      clean_(data.instagram, 80),
      clean_(data.heardFrom, 80),
      "Ja",
      data.consentNews === true ? "Ja" : "Nein",
    ]);
    sendMail_(name, email, status);
    return json_({ status: status });
  } catch (err) {
    console.error(err);
    return json_({ status: "error" });
  } finally {
    lock.releaseLock();
  }
}

function getSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(CONFIG.sheetName);
  if (!sheet) {
    sheet = spreadsheet.getSheets()[0];
    sheet.setName(CONFIG.sheetName);
  }
  if (sheet.getLastRow() === 0) {
    // Plain layout: bold header, frozen first row, readable widths
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
    sheet.getRange("A:A").setNumberFormat("dd.MM.yyyy HH:mm");
    [140, 110, 200, 240, 150, 170, 110, 190].forEach((width, i) => sheet.setColumnWidth(i + 1, width));
  }
  return sheet;
}

// Trims, limits the length and stops input from being read as a formula
function clean_(value, max) {
  const text = String(value || "").trim().slice(0, max);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function json_(object) {
  return ContentService.createTextOutput(JSON.stringify(object)).setMimeType(ContentService.MimeType.JSON);
}

function sendMail_(name, email, status) {
  const facts = [
    "Wann: " + CONFIG.date,
    "Wo: " + CONFIG.place,
    "Route: " + CONFIG.route,
  ].join("\n");

  const confirmed = status === "confirmed";
  const subject = confirmed ? "Du bist dabei: Farbton am 28.11." : "Warteliste: Farbton am 28.11.";
  const intro = confirmed
    ? "schön, dass du dabei bist! Deine Anmeldung für Farbton ist bestätigt."
    : "danke für deine Anmeldung! Gerade sind alle Plätze vergeben, du stehst auf der Warteliste. Wird ein Platz frei, melden wir uns per E-Mail bei dir.";
  const outro = confirmed
    ? "Falls du doch nicht kannst, antworte kurz auf diese Mail. Dann bekommt jemand von der Warteliste deinen Platz."
    : "Du musst nichts weiter tun.";

  const body = [
    "Hallo " + name.replace(/^'/, "") + ",",
    "",
    intro,
    "",
    "Farbton – Ausstellung · Live Painting · DJ Set",
    facts,
    "",
    "Raik Holetz zeigt seine Arbeiten und malt live ein neues Bild, Tonsammler legt vier Stunden auf. Getränke gibt es gegen Spende. Beim Event wird fotografiert und gefilmt.",
    "",
    outro,
    "",
    "Bis bald",
    "Raik & Milan",
    "",
    CONFIG.page,
  ].join("\n");

  MailApp.sendEmail({
    to: email,
    subject: subject,
    body: body,
    name: CONFIG.senderName,
    replyTo: CONFIG.replyTo,
  });
}
