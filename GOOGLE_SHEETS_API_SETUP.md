# Google Sheets API with Service Account Setup

This guide will help you set up the Google Sheets API using a service account for secure, server-side access to your Google Sheets.

## Step 1: Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Name it something like "AATR Donation Forms"

## Step 2: Enable the Google Sheets API

1. In the Google Cloud Console, go to **APIs & Services > Library**
2. Search for "Google Sheets API"
3. Click on it and press **Enable**

## Step 3: Create a Service Account

1. Go to **APIs & Services > Credentials**
2. Click **Create Credentials > Service account**
3. Fill in the details:
   - **Service account name**: `aatr-sheets-service`
   - **Service account ID**: `aatr-sheets-service` (auto-filled)
   - **Description**: "Service account for AATR donation form submissions"
4. Click **Create and Continue**
5. Skip the optional roles section (click **Continue**)
6. Skip the user access section (click **Done**)

## Step 4: Generate and Download the Service Account Key

1. In the **Credentials** page, find your new service account
2. Click on the service account email to open its details
3. Go to the **Keys** tab
4. Click **Add Key > Create new key**
5. Choose **JSON** format
6. Click **Create**
7. **Save the downloaded JSON file securely** - you'll need it for the environment variables

## Step 5: Create and Setup Your Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it: **"AATR DONATION DATA"**
4. Create two tabs:
   - **Tab 1**: Rename to "Auction Donations"
   - **Tab 2**: Rename to "Table Sponsorships"

### Tab 1: "Auction Donations" Headers (Row 1)
```
A: Timestamp
B: Name  
C: Email
D: Phone
E: Address
F: Item Description
G: Estimated Value
H: Pickup Required
I: Special Instructions
J: Contact Preference
K: Submission ID
L: IP Address
M: User Agent
N: Status
```

### Tab 2: "Table Sponsorships" Headers (Row 1)
```
A: Timestamp
B: Sponsorship Level
C: Sponsorship Amount
D: Ticket Quantity
E: Ticket Price
F: Ticket Total
G: Monetary Donation
H: Silent Auction Donation
I: Name
J: Email
K: Phone
L: Address
M: Payment Method
N: CC Last 4
O: CC Expiry
P: CC CVC
Q: CC Name
R: CC Zip
S: Ticket Delivery
T: Total Amount
U: Submission ID
V: IP Address
W: User Agent
X: Referrer
Y: Status
```

## Step 6: Share the Sheet with the Service Account

1. In your Google Sheet, click the **Share** button
2. Add the service account email (from the JSON file, looks like: `aatr-sheets-service@your-project.iam.gserviceaccount.com`)
3. Give it **Editor** permissions
4. Uncheck "Notify people" since it's a service account
5. Click **Share**

## Step 7: Get Your Sheet ID

The Sheet ID is in the URL of your Google Sheet:
```
https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit
```
Copy the `SHEET_ID` part - you'll need it for the environment variables.

## Step 8: Environment Variables Setup

After completing the above steps, you'll need to add these to your `.env.local` file:

```env
# Google Sheets API Configuration
GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id_here
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----"
GOOGLE_PROJECT_ID=your-project-id
```

## Security Notes

- **Never commit the service account JSON file to version control**
- The private key in `.env.local` should include the `\n` characters for line breaks
- Make sure `.env.local` is in your `.gitignore` file
- For production, use your hosting platform's environment variable system (Vercel, Netlify, etc.)

## Testing

Once set up, you can test the integration by submitting forms on your local development server. Check the Google Sheet to see if data appears correctly.

## Troubleshooting

### Common Issues:

1. **"The caller does not have permission"**
   - Make sure you shared the sheet with the service account email
   - Verify the service account has Editor permissions

2. **"Invalid private key"**
   - Check that the private key in `.env.local` includes proper `\n` line breaks
   - Make sure the private key is wrapped in quotes

3. **"Spreadsheet not found"**
   - Verify the `GOOGLE_SHEETS_SPREADSHEET_ID` is correct
   - Make sure the sheet is shared with the service account

4. **"Sheet tab not found"**
   - Verify the sheet tab names are exactly "Auction Donations" and "Table Sponsorships"
   - Check for extra spaces in tab names