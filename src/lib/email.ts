import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.ZOHO_USER,
    pass: process.env.ZOHO_APP_PASSWORD,
  },
})

interface EmailAttachment {
  filename: string
  content: Buffer
  contentType: string
}

interface SendNotificationOptions {
  subject: string
  html: string
  attachments?: EmailAttachment[]
}

export async function sendNotificationEmail({ subject, html, attachments }: SendNotificationOptions) {
  try {
    const mailOptions = {
      from: '"Affair to Remember" <alerts@samuelholley.com>',
      to: 'sam@samuelholley.com',
      replyTo: 'sam@samuelholley.com',
      subject,
      html,
      attachments,
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('✓ Notification email sent:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Failed to send notification email:', error)
    // Don't throw — email failure shouldn't block form submission
    return { success: false, error: error instanceof Error ? error.message : 'Unknown email error' }
  }
}

export function buildAuctionDonationEmail(data: {
  submissionId: string
  timestamp: string
  name: string
  email: string
  phone: string
  address: string
  itemDescription: string
  estimatedValue: string
  pickupRequired: string
  specialInstructions: string
  contactPreference: string
  auctionType: string
  hasPhoto: boolean
  clientIP: string
  userAgent: string
}) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #1e40af; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0; font-size: 22px;">🎁 New Auction Donation Submitted</h1>
        <p style="margin: 5px 0 0; opacity: 0.9;">Submission ID: ${data.submissionId}</p>
      </div>
      <div style="background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb;">
        <h2 style="color: #1e40af; border-bottom: 2px solid #1e40af; padding-bottom: 8px;">Donor Information</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 6px 0; font-weight: bold; width: 160px;">Name:</td><td>${data.name}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">Email:</td><td><a href="mailto:${data.email}">${data.email}</a></td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">Phone:</td><td><a href="tel:${data.phone}">${data.phone}</a></td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">Address:</td><td>${data.address}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">Contact Pref:</td><td>${data.contactPreference}</td></tr>
        </table>

        <h2 style="color: #1e40af; border-bottom: 2px solid #1e40af; padding-bottom: 8px; margin-top: 20px;">Item Details</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 6px 0; font-weight: bold; width: 160px;">Auction Type:</td><td><strong>${data.auctionType || 'Not specified'}</strong></td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">Description:</td><td>${data.itemDescription}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">Estimated Value:</td><td>${data.estimatedValue ? '$' + data.estimatedValue : 'Not provided'}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">Pickup Required:</td><td>${data.pickupRequired}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">Special Notes:</td><td>${data.specialInstructions || 'None'}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">Photo Attached:</td><td>${data.hasPhoto ? '✅ Yes (see attachment)' : '❌ No'}</td></tr>
        </table>

        <h2 style="color: #6b7280; border-bottom: 1px solid #d1d5db; padding-bottom: 8px; margin-top: 20px; font-size: 14px;">Metadata</h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 12px; color: #6b7280;">
          <tr><td style="padding: 4px 0; font-weight: bold; width: 160px;">Timestamp:</td><td>${data.timestamp}</td></tr>
          <tr><td style="padding: 4px 0; font-weight: bold;">IP Address:</td><td>${data.clientIP}</td></tr>
          <tr><td style="padding: 4px 0; font-weight: bold;">User Agent:</td><td>${data.userAgent}</td></tr>
        </table>
      </div>
      <div style="background: #1e40af; color: white; padding: 12px 20px; border-radius: 0 0 8px 8px; text-align: center; font-size: 12px;">
        Affair to Remember — Ukiah Senior Center
      </div>
    </div>
  `
}

export function buildSponsorshipEmail(data: {
  submissionId: string
  timestamp: string
  sponsorshipLevel: string
  sponsorshipAmount: number
  ticketQuantity: number
  ticketPrice: number
  ticketTotal: number
  monetaryDonation: number
  silentAuctionDonation: string
  totalAmount: number
  name: string
  email: string
  phone: string
  address: string
  paymentMethod: string
  ticketDelivery: string
  paymentStatus: string
  clientIP: string
  userAgent: string
  referrer: string
}) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #047857; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0; font-size: 22px;">🎟️ New Table Sponsorship Submitted</h1>
        <p style="margin: 5px 0 0; opacity: 0.9;">Submission ID: ${data.submissionId}</p>
      </div>
      <div style="background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb;">

        <div style="background: #ecfdf5; border: 2px solid #047857; border-radius: 8px; padding: 16px; margin-bottom: 20px; text-align: center;">
          <div style="font-size: 28px; font-weight: bold; color: #047857;">$${data.totalAmount.toLocaleString()}</div>
          <div style="color: #065f46; font-size: 14px;">Total Amount</div>
        </div>

        <h2 style="color: #047857; border-bottom: 2px solid #047857; padding-bottom: 8px;">Order Details</h2>
        <table style="width: 100%; border-collapse: collapse;">
          ${data.sponsorshipLevel ? `<tr><td style="padding: 6px 0; font-weight: bold; width: 180px;">Sponsorship Level:</td><td>${data.sponsorshipLevel.charAt(0).toUpperCase() + data.sponsorshipLevel.slice(1)} ($${data.sponsorshipAmount.toLocaleString()})</td></tr>` : ''}
          ${data.ticketQuantity > 0 ? `<tr><td style="padding: 6px 0; font-weight: bold;">Tickets:</td><td>${data.ticketQuantity} × $${data.ticketPrice} = $${data.ticketTotal.toLocaleString()}</td></tr>` : ''}
          ${data.monetaryDonation > 0 ? `<tr><td style="padding: 6px 0; font-weight: bold;">Monetary Donation:</td><td>$${data.monetaryDonation.toLocaleString()}</td></tr>` : ''}
          ${data.silentAuctionDonation ? `<tr><td style="padding: 6px 0; font-weight: bold;">Silent Auction Item:</td><td>${data.silentAuctionDonation}</td></tr>` : ''}
          <tr><td style="padding: 6px 0; font-weight: bold;">Payment Method:</td><td>${data.paymentMethod === 'credit' ? 'Credit Card (Stripe)' : 'Check'}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">Payment Status:</td><td>${data.paymentStatus}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">Ticket Delivery:</td><td>${data.ticketDelivery === 'pickup' ? 'Pickup at USC' : 'Will Call at Event'}</td></tr>
        </table>

        <h2 style="color: #047857; border-bottom: 2px solid #047857; padding-bottom: 8px; margin-top: 20px;">Attendee Information</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 6px 0; font-weight: bold; width: 180px;">Name:</td><td>${data.name}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">Email:</td><td><a href="mailto:${data.email}">${data.email}</a></td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">Phone:</td><td><a href="tel:${data.phone}">${data.phone}</a></td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">Address:</td><td>${data.address}</td></tr>
        </table>

        <h2 style="color: #6b7280; border-bottom: 1px solid #d1d5db; padding-bottom: 8px; margin-top: 20px; font-size: 14px;">Metadata</h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 12px; color: #6b7280;">
          <tr><td style="padding: 4px 0; font-weight: bold; width: 180px;">Timestamp:</td><td>${data.timestamp}</td></tr>
          <tr><td style="padding: 4px 0; font-weight: bold;">IP Address:</td><td>${data.clientIP}</td></tr>
          <tr><td style="padding: 4px 0; font-weight: bold;">User Agent:</td><td>${data.userAgent}</td></tr>
          <tr><td style="padding: 4px 0; font-weight: bold;">Referrer:</td><td>${data.referrer || 'Direct'}</td></tr>
        </table>
      </div>
      <div style="background: #047857; color: white; padding: 12px 20px; border-radius: 0 0 8px 8px; text-align: center; font-size: 12px;">
        Affair to Remember — Ukiah Senior Center
      </div>
    </div>
  `
}
