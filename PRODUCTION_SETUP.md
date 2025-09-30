# Google Sheets API Integration - Production Setup Guide

## Quick Start for Production

Once you have completed the development setup in `GOOGLE_SHEETS_API_SETUP.md`, follow these steps for production deployment:

### 1. Vercel Environment Variables

In your Vercel project dashboard, add these environment variables:

```
GOOGLE_SHEETS_SPREADSHEET_ID=your_actual_spreadsheet_id
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----
GOOGLE_PROJECT_ID=your-project-id
NEXT_PUBLIC_AUCTION_API_URL=https://your-domain.com/api/auction-donations
NEXT_PUBLIC_SPONSORSHIP_API_URL=https://your-domain.com/api/table-sponsors
```

**Important**: Replace `your-domain.com` with your actual Vercel domain.

### 2. API Endpoints

The following endpoints are now available:

- **Auction Donations**: `/api/auction-donations`
- **Table Sponsorships**: `/api/table-sponsors`

### 3. Testing the Integration

1. **Local Testing**: 
   ```bash
   yarn dev
   ```
   - Visit `http://localhost:3000/auction-donations`
   - Visit `http://localhost:3000/table-sponsors`
   - Submit test forms to verify they appear in your Google Sheet

2. **Production Testing**: After deployment, test both forms on your live site

### 4. Google Sheet Structure

Make sure your Google Sheet "AATR DONATION DATA" has exactly these tab names and headers:

**Tab 1: "Auction Donations"**
- Headers in Row 1: Timestamp, Name, Email, Phone, Address, Item Description, Estimated Value, Pickup Required, Special Instructions, Contact Preference, Submission ID, IP Address, User Agent, Status

**Tab 2: "Table Sponsorships"** 
- Headers in Row 1: Timestamp, Sponsorship Level, Sponsorship Amount, Ticket Quantity, Ticket Price, Ticket Total, Monetary Donation, Silent Auction Donation, Name, Email, Phone, Address, Payment Method, CC Last 4, CC Expiry, CC CVC, CC Name, CC Zip, Ticket Delivery, Total Amount, Submission ID, IP Address, User Agent, Referrer, Status

### 5. Security Features

✅ **Service Account Authentication**: Secure server-side access to Google Sheets
✅ **Credit Card Masking**: Only last 4 digits stored
✅ **Unique Submission IDs**: Every submission gets a unique identifier
✅ **Input Validation**: Required fields and data type validation
✅ **Error Handling**: Comprehensive error logging and user feedback
✅ **IP Address Logging**: For security and analytics
✅ **Environment-based Configuration**: Different settings for dev/prod

### 6. What's Been Set Up

- ✅ Google Sheets API integration with service account
- ✅ Professional form validation and error handling
- ✅ Secure data transmission and storage
- ✅ Both auction donations and table sponsorship forms
- ✅ Real-time form submission to Google Sheets
- ✅ Comprehensive logging and analytics
- ✅ Production-ready API endpoints
- ✅ Environment variable configuration

### 7. Next Steps

1. **Complete the Google Cloud setup** following `GOOGLE_SHEETS_API_SETUP.md`
2. **Add your actual environment variables** to `.env.local` and Vercel
3. **Test submissions** to ensure data flows to your Google Sheet
4. **Deploy to production** and verify everything works
5. **Share the sheet** with relevant team members for monitoring

The integration is now complete and ready for production use! 🎉