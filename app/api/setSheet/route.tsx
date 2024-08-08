import { GoogleSpreadsheet } from 'google-spreadsheet';
import { NextRequest, NextResponse } from 'next/server';
import { JWT } from 'google-auth-library';

const spreadsheetId = process.env.SHEET_ID as string;
const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL as string;
const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n') as string;

const auth = new JWT({
  email: clientEmail,
  key: privateKey,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const doc = new GoogleSpreadsheet(spreadsheetId, auth);

export async function POST(req: NextRequest) {
  try {
    await auth.authorize();

    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    if (!sheet) {
      return NextResponse.json({ error: 'Sheet not found' }, { status: 404 });
    }

    const body = await req.json();
    const { Humidity, Temperature, TimeString } = body;

    await sheet.addRow({
      Humidity: String(Humidity),
      Temperature: String(Temperature),
      TimeString: TimeString
    });

    return NextResponse.json({ message: 'Data added to Google Sheet' });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
