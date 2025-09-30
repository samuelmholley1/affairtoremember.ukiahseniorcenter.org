/**
 * Google Apps Script for AATR Donation Data Collection
 * This script receives form submissions and writes them to the appropriate sheet tabs
 */

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Get the spreadsheet
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    
    // Generate timestamp and unique ID
    const timestamp = new Date();
    const submissionId = Utilities.getUuid();
    
    // Determine which form this is based on the data structure
    if (data.formType === 'auction-donations') {
      return handleAuctionDonation(spreadsheet, data, timestamp, submissionId);
    } else if (data.formType === 'table-sponsors') {
      return handleTableSponsorship(spreadsheet, data, timestamp, submissionId);
    } else {
      throw new Error('Unknown form type');
    }
    
  } catch (error) {
    console.error('Error processing form submission:', error);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Error processing form submission',
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function handleAuctionDonation(spreadsheet, data, timestamp, submissionId) {
  // Get the "Auction Donations" sheet (Tab 1)
  const sheet = spreadsheet.getSheetByName('Auction Donations');
  
  if (!sheet) {
    throw new Error('Auction Donations sheet not found');
  }
  
  // Prepare row data for auction donations
  const rowData = [
    timestamp,                           // A: Timestamp
    data.name || '',                     // B: Name
    data.email || '',                    // C: Email
    data.phone || '',                    // D: Phone
    data.address || '',                  // E: Address
    data.itemDescription || '',          // F: Item Description
    data.estimatedValue || '',           // G: Estimated Value
    data.pickupRequired || '',           // H: Pickup Required
    data.specialInstructions || '',      // I: Special Instructions
    data.contactPreference || '',        // J: Contact Preference
    submissionId,                        // K: Submission ID
    data.ipAddress || '',                // L: IP Address
    data.userAgent || '',                // M: User Agent
    'Submitted'                          // N: Status
  ];
  
  // Add the data to the sheet
  sheet.appendRow(rowData);
  
  // Return success response
  return ContentService
    .createTextOutput(JSON.stringify({
      success: true,
      message: 'Auction donation submitted successfully',
      submissionId: submissionId,
      timestamp: timestamp,
      formType: 'auction-donations'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

function handleTableSponsorship(spreadsheet, data, timestamp, submissionId) {
  // Get the "Table Sponsorships" sheet (Tab 2)
  const sheet = spreadsheet.getSheetByName('Table Sponsorships');
  
  if (!sheet) {
    throw new Error('Table Sponsorships sheet not found');
  }
  
  // Calculate totals
  const sponsorshipAmount = data.sponsorshipLevel ? getSponsorshipAmount(data.sponsorshipLevel) : 0;
  const ticketTotal = (data.ticketQuantity || 0) * (data.ticketPrice || 0);
  const monetaryDonation = parseFloat(data.monetaryDonation) || 0;
  const totalAmount = sponsorshipAmount + ticketTotal + monetaryDonation;
  
  // Mask credit card number for security (only show last 4 digits)
  const maskedCC = data.paymentMethod === 'credit' && data.creditCard && data.creditCard.number ? 
    data.creditCard.number.slice(-4) : '';
  
  // Prepare row data for table sponsorships
  const rowData = [
    timestamp,                                                    // A: Timestamp
    data.sponsorshipLevel || '',                                  // B: Sponsorship Level
    sponsorshipAmount,                                            // C: Sponsorship Amount
    data.ticketQuantity || 0,                                     // D: Ticket Quantity
    data.ticketPrice || 0,                                        // E: Ticket Price
    ticketTotal,                                                  // F: Ticket Total
    monetaryDonation,                                             // G: Monetary Donation
    data.silentAuctionDonation || '',                            // H: Silent Auction Donation
    data.name || '',                                              // I: Name
    data.email || '',                                             // J: Email
    data.phone || '',                                             // K: Phone
    data.address || '',                                           // L: Address
    data.paymentMethod || '',                                     // M: Payment Method
    maskedCC,                                                     // N: CC Last 4
    data.paymentMethod === 'credit' && data.creditCard ? data.creditCard.expiry : '', // O: CC Expiry
    data.paymentMethod === 'credit' && data.creditCard ? data.creditCard.cvc : '',    // P: CC CVC
    data.paymentMethod === 'credit' && data.creditCard ? data.creditCard.nameOnCard : '', // Q: CC Name
    data.paymentMethod === 'credit' && data.creditCard ? data.creditCard.zip : '',    // R: CC Zip
    data.ticketDelivery || '',                                    // S: Ticket Delivery
    totalAmount,                                                  // T: Total Amount
    submissionId,                                                 // U: Submission ID
    data.ipAddress || '',                                         // V: IP Address
    data.userAgent || '',                                         // W: User Agent
    data.referrer || '',                                          // X: Referrer
    'Submitted'                                                   // Y: Status
  ];
  
  // Add the data to the sheet
  sheet.appendRow(rowData);
  
  // Return success response
  return ContentService
    .createTextOutput(JSON.stringify({
      success: true,
      message: 'Table sponsorship submitted successfully',
      submissionId: submissionId,
      timestamp: timestamp,
      formType: 'table-sponsors'
    }))
    .setMimeType(ContentService.MimeType.JSON);
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

// Test functions for development
function testAuctionDonation() {
  const testData = {
    formType: 'auction-donations',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '707-555-0123',
    address: '123 Main St, Ukiah, CA 95482',
    itemDescription: 'Wine basket with local wines',
    estimatedValue: '150',
    pickupRequired: 'yes',
    specialInstructions: 'Please call before pickup',
    contactPreference: 'email'
  };
  
  const e = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(e);
  console.log('Auction donation test result:', result.getContent());
}

function testTableSponsorship() {
  const testData = {
    formType: 'table-sponsors',
    sponsorshipLevel: 'gold',
    ticketQuantity: 2,
    ticketPrice: 100,
    monetaryDonation: '50',
    silentAuctionDonation: 'Wine basket - $100 value',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '707-555-0456',
    address: '456 Oak St, Ukiah, CA 95482',
    paymentMethod: 'credit',
    creditCard: {
      number: '4111111111111111',
      expiry: '12/26',
      cvc: '123',
      nameOnCard: 'Jane Smith',
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
  console.log('Table sponsorship test result:', result.getContent());
}