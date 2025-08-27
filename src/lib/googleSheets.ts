import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

function buildAuth() {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKeyRaw = process.env.GOOGLE_PRIVATE_KEY;
  const keyFilePath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (clientEmail && privateKeyRaw) {
    const private_key = privateKeyRaw.replace(/\\n/g, "\n");
    return new google.auth.GoogleAuth({
      credentials: { client_email: clientEmail, private_key },
      scopes: SCOPES,
    });
  }
  if (keyFilePath) {
    return new google.auth.GoogleAuth({ keyFile: keyFilePath, scopes: SCOPES });
  }
  if (process.env.GOOGLE_CREDENTIALS_JSON) {
    const parsed = JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON);
    return new google.auth.GoogleAuth({ credentials: parsed, scopes: SCOPES });
  }
  throw new Error(
    "Google auth not configured. Set either GOOGLE_CLIENT_EMAIL+GOOGLE_PRIVATE_KEY, " +
      "or GOOGLE_APPLICATION_CREDENTIALS, or GOOGLE_CREDENTIALS_JSON."
  );
}

export async function appendSubscriberToSheet(input: { name: string; email: string }) {
  // Quick visibility to confirm envs are loading
  console.log("GS envs:", {
    hasKeyFile: !!process.env.GOOGLE_APPLICATION_CREDENTIALS,
    hasEmail: !!process.env.GOOGLE_CLIENT_EMAIL,
    hasPrivKey: !!process.env.GOOGLE_PRIVATE_KEY,
    sheet: !!process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
  });

  const auth = buildAuth();
  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID!;
  const range = process.env.GOOGLE_SHEETS_RANGE || "Sheet1!A:D";

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[new Date().toISOString(), input.name, input.email, "newsletter"]],
    },
  });
}
