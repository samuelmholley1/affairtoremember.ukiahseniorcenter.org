# Google Sheets Integration Setup

## Step 1: Create the Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it **"AATR Donation Data"**
4. Create two tabs:
   - **Tab 1: "Auction Donations"**
   - **Tab 2: "Table Sponsorships"**

### Tab 1: "Auction Donations" Headers (Row 1)
```
Timestamp	Name	Email	Phone	Address	Item Description	Estimated Value	Pickup Required	Special Instructions	Contact Preference	Submission ID	IP Address	User Agent	Status
```

### Tab 2: "Table Sponsorships" Headers (Row 1)
```
Timestamp	Sponsorship Level	Sponsorship Amount	Ticket Quantity	Ticket Price	Ticket Total	Monetary Donation	Silent Auction Donation	Name	Email	Phone	Address	Payment Method	CC Last 4	CC Expiry	CC CVC	CC Name	CC Zip	Ticket Delivery	Total Amount	Submission ID	IP Address	User Agent	Referrer	Status
```

## Step 2: Create Google Apps Script

1. In your Google Sheet, go to **Extensions > Apps Script**
2. Delete the default `myFunction()` and replace with the code below:

```javascript
function doPost(e) {
  try {
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Generate timestamp and unique ID
    const timestamp = new Date();
    const submissionId = Utilities.getUuid();
    
    // Calculate totals
    const sponsorshipAmount = data.sponsorshipLevel ? getSponsorshipAmount(data.sponsorshipLevel) : 0;
    const ticketTotal = data.ticketQuantity * data.ticketPrice;
    const monetaryDonation = parseFloat(data.monetaryDonation) || 0;
    const totalAmount = sponsorshipAmount + ticketTotal + monetaryDonation;
    
    // Mask credit card number for security (only show last 4 digits)
    const maskedCC = data.paymentMethod === 'credit' && data.creditCard.number ? 
      '**** **** **** ' + data.creditCard.number.slice(-4) : '';
    
    // Prepare row data
    const rowData = [
      timestamp,
      data.sponsorshipLevel || '',
      sponsorshipAmount,
      data.ticketQuantity || 0,
      data.ticketPrice || 0,
      ticketTotal,
      monetaryDonation,
      data.silentAuctionDonation || '',
      data.name || '',
      data.email || '',
      data.phone || '',
      data.address || '',
      data.paymentMethod || '',
      maskedCC,
      data.paymentMethod === 'credit' ? data.creditCard.expiry : '',
      data.paymentMethod === 'credit' ? data.creditCard.cvc : '',
      data.paymentMethod === 'credit' ? data.creditCard.nameOnCard : '',
      data.paymentMethod === 'credit' ? data.creditCard.zip : '',
      data.ticketDelivery || '',
      totalAmount,
      submissionId,
      data.ipAddress || '',
      data.userAgent || '',
      data.referrer || '',
      'Submitted'
    ];
    
    // Add the data to the sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Form submitted successfully',
        submissionId: submissionId,
        timestamp: timestamp
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log error for debugging
    console.error('Error processing form submission:', error);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Error processing form submission',
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getSponsorshipAmount(level) {
  const amounts = {
    'diamond': 2500,
    'platinum': 1500,
    'gold': 750,
    'ruby': 400
  };
  return amounts[level] || 0;
}

// Test function for development
function testDoPost() {
  const testData = {
    sponsorshipLevel: 'gold',
    ticketQuantity: 2,
    ticketPrice: 100,
    monetaryDonation: '50',
    silentAuctionDonation: 'Wine basket - $100 value',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '707-555-0123',
    address: '123 Main St, Ukiah, CA 95482',
    paymentMethod: 'credit',
    creditCard: {
      number: '4111111111111111',
      expiry: '12/26',
      cvc: '123',
      nameOnCard: 'John Doe',
      zip: '95482'
    },
    ticketDelivery: 'pickup'
  };
  
  const e = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(e);
  console.log(result.getContent());
}
```

## Step 3: Deploy the Apps Script

1. Click **Deploy > New deployment**
2. Click the gear icon next to "Type" and select **Web app**
3. Set the following:
   - Description: "AATR Sponsorship Form Handler"
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy**
5. **Copy the Web app URL** - you'll need this for the next step
6. Click **Done**

## Step 4: Test the Setup

1. Run the `testDoPost()` function in the Apps Script editor to verify it works
2. Check that a test row appears in your Google Sheet

## Step 5: Update the Web App URL

After deployment, you'll get a URL that looks like:
`https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec`

Copy this URL - you'll need to add it to the form code in the next step.

## Security Notes

- Credit card numbers are masked (only last 4 digits shown)
- The script logs all submissions with timestamps
- Consider adding additional validation if needed
- For production, you may want to add CORS headers and additional security measures

## Troubleshooting

- If you get permission errors, make sure the script can access your Google Sheet
- If submissions aren't appearing, check the Apps Script execution logs
- Test the `testDoPost()` function first to verify the script works