import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'

// Google Sheets auth via service account
function getSheetsClient() {
  const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON || '{}')
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
  return google.sheets({ version: 'v4', auth })
}

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const { name, email } = await req.json()

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email required' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const timestamp = new Date().toLocaleString('da-DK', { timeZone: 'Europe/Copenhagen' })

    // Check for duplicate email
    const sheets = getSheetsClient()
    const spreadsheetId = process.env.GOOGLE_SHEET_ID

    const existing = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!C:C',
    })
    const existingEmails = (existing.data.values || []).flat().map((e: string) => e.toLowerCase())
    if (existingEmails.includes(email.toLowerCase())) {
      return NextResponse.json({ error: 'already_registered' }, { status: 409 })
    }

    // Append to Google Sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:C',
      valueInputOption: 'RAW',
      requestBody: {
        values: [[timestamp, name, email]],
      },
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[waitlist] error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
