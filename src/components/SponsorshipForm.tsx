'use client'

import { useState, useEffect } from 'react'

interface SponsorshipLevel {
  id: string
  name: string
  price: number
  benefits: string[]
}

interface FormData {
  sponsorshipLevel: string
  ticketQuantity: number
  monetaryDonation: string
  silentAuctionDonation: string
  name: string
  address: string
  phone: string
  email: string
  paymentMethod: 'credit' | 'check'
  ticketDelivery: 'pickup' | 'willcall'
}

interface SubmissionState {
  isSubmitting: boolean
  isSubmitted: boolean
  error: string | null
  submissionId: string | null
}

const sponsorshipLevels: SponsorshipLevel[] = [
  {
    id: 'diamond',
    name: 'Diamond Sponsor',
    price: 2500,
    benefits: [
      '2 Reserved Tables for 8',
      '4 bottles of wine',
      'Recognition on advertising',
      'Banner at the event',
      'Media acknowledgement'
    ]
  },
  {
    id: 'platinum',
    name: 'Platinum Sponsor',
    price: 1500,
    benefits: [
      '1 Reserved table for 8',
      '2 bottles of wine',
      'Recognition on advertising',
      'Banner at the event',
      'Media acknowledgement'
    ]
  },
  {
    id: 'gold',
    name: 'Gold Sponsor',
    price: 750,
    benefits: [
      '4 Tickets',
      '1 bottle of wine',
      'Reserved seating',
      'Media acknowledgement'
    ]
  },
  {
    id: 'ruby',
    name: 'Ruby Sponsor',
    price: 400,
    benefits: [
      '2 Tickets',
      '1 bottle of wine',
      'Reserved seating',
      'Media acknowledgement'
    ]
  }
]

export default function SponsorshipForm() {
  const [formData, setFormData] = useState<FormData>({
    sponsorshipLevel: '',
    ticketQuantity: 0,
    monetaryDonation: '',
    silentAuctionDonation: '',
    name: '',
    address: '',
    phone: '',
    email: '',
    paymentMethod: 'check',
    ticketDelivery: 'pickup'
  })

  const [submissionState, setSubmissionState] = useState<SubmissionState>({
    isSubmitting: false,
    isSubmitted: false,
    error: null,
    submissionId: null
  })

  // Check if current date is after 3/28/26 for ticket pricing
  const [ticketPrice, setTicketPrice] = useState(100)
  
  useEffect(() => {
    const currentDate = new Date()
    const priceChangeDate = new Date('2026-03-28')
    
    if (currentDate > priceChangeDate) {
      setTicketPrice(110)
    } else {
      setTicketPrice(100)
    }
  }, [])

  // Calculate total amount
  const calculateTotal = () => {
    let total = 0
    
    // Add sponsorship amount
    if (formData.sponsorshipLevel) {
      const sponsor = sponsorshipLevels.find(s => s.id === formData.sponsorshipLevel)
      if (sponsor) {
        total += sponsor.price
      }
    }
    
    // Add ticket amount
    total += formData.ticketQuantity * ticketPrice
    
    // Add monetary donation
    if (formData.monetaryDonation) {
      total += parseFloat(formData.monetaryDonation) || 0
    }
    
    return total
  }

  const handleInputChange = (field: keyof FormData, value: string | number | 'credit' | 'check' | 'pickup' | 'willcall') => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }



  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      setSubmissionState({
        isSubmitting: false,
        isSubmitted: false,
        error: 'Please fill in all required fields (Name, Email, Phone, Address)',
        submissionId: null
      })
      return false
    }
    return true
  }

  const handleCheckPayment = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setSubmissionState({
      isSubmitting: true,
      isSubmitted: false,
      error: null,
      submissionId: null
    })

    try {
      // Prepare data for Google Sheets (check payment)
      const submissionData = {
        ...formData,
        paymentMethod: 'check',
        formType: 'table-sponsors',
        ticketPrice,
        timestamp: new Date().toISOString(),
        ipAddress: '',
        userAgent: navigator.userAgent,
        referrer: document.referrer
      }

      const API_URL = process.env.NEXT_PUBLIC_SPONSORSHIP_API_URL || '/api/table-sponsors'
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData)
      })

      const result = await response.json()

      if (result.success) {
        setSubmissionState({
          isSubmitting: false,
          isSubmitted: true,
          error: null,
          submissionId: result.submissionId
        })
      } else {
        throw new Error(result.message || 'Submission failed')
      }
    } catch (error) {
      console.error('Check payment submission error:', error)
      setSubmissionState({
        isSubmitting: false,
        isSubmitted: false,
        error: error instanceof Error ? error.message : 'An error occurred while submitting the form',
        submissionId: null
      })
    }
  }

  const handleCreditCardPayment = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    // Calculate total for payment
    const total = calculateTotal()
    
    if (total <= 0) {
      setSubmissionState({
        isSubmitting: false,
        isSubmitted: false,
        error: 'Please select a sponsorship level, tickets, or add a donation before proceeding',
        submissionId: null
      })
      return
    }

    try {
      // Save the form data to Google Sheets with pending status
      const submissionData = {
        ...formData,
        paymentMethod: 'credit',
        formType: 'table-sponsors',
        ticketPrice,
        paymentStatus: 'pending-payment',
        timestamp: new Date().toISOString(),
        ipAddress: '',
        userAgent: navigator.userAgent,
        referrer: document.referrer
      }

      const API_URL = process.env.NEXT_PUBLIC_SPONSORSHIP_API_URL || '/api/table-sponsors'
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData)
      })

      const result = await response.json()

      if (result.success) {
        // For now, show success with instructions to integrate Stripe later
        setSubmissionState({
          isSubmitting: false,
          isSubmitted: true,
          error: null,
          submissionId: result.submissionId
        })
        
        // TODO: When Stripe is ready, redirect to Stripe checkout
        alert(`Order saved! Submission ID: ${result.submissionId}\nTotal: $${total}\n\n(Stripe integration will be added here)`)
      } else {
        throw new Error(result.message || 'Submission failed')
      }
    } catch (error) {
      console.error('Credit card payment error:', error)
      setSubmissionState({
        isSubmitting: false,
        isSubmitted: false,
        error: error instanceof Error ? error.message : 'An error occurred while processing payment',
        submissionId: null
      })
    }
  }

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Support the Ukiah Senior Center
          </h1>
          <p className="text-xl text-gray-600">
            Purchase Tickets and/or Become a Sponsor for &apos;An Affair to Remember&apos; on Saturday, April 11, 2026.
          </p>
        </div>

        {/* Success Message */}
        {submissionState.isSubmitted && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  Form Submitted Successfully!
                </h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>Thank you for your submission. Your confirmation ID is: <strong>{submissionState.submissionId}</strong></p>
                  <p className="mt-1">You should receive a confirmation email shortly. If paying by check, please mail your payment to the address provided above.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {submissionState.error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Submission Error
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{submissionState.error}</p>
                  <p className="mt-1">Please try again or contact us directly if the problem persists.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg p-8 space-y-12">
          
          {/* Sponsorship Levels Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Sponsorship Levels</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {sponsorshipLevels.map((sponsor) => (
                <div
                  key={sponsor.id}
                  className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
                    formData.sponsorshipLevel === sponsor.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleInputChange('sponsorshipLevel', sponsor.id)}
                >
                  <div className="flex items-center mb-4">
                    <input
                      type="radio"
                      id={sponsor.id}
                      name="sponsorship"
                      value={sponsor.id}
                      checked={formData.sponsorshipLevel === sponsor.id}
                      onChange={() => handleInputChange('sponsorshipLevel', sponsor.id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor={sponsor.id} className="ml-3">
                      <span className="text-lg font-semibold text-gray-900">{sponsor.name}</span>
                      <span className="ml-2 text-lg font-bold text-blue-600">${sponsor.price.toLocaleString()}</span>
                    </label>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {sponsor.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Individual Tickets Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Individual Tickets</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center space-x-4">
                <label htmlFor="ticketQuantity" className="text-sm font-medium text-gray-700">
                  # of Tickets:
                </label>
                <input
                  type="number"
                  id="ticketQuantity"
                  min="0"
                  max="20"
                  value={formData.ticketQuantity}
                  onChange={(e) => handleInputChange('ticketQuantity', parseInt(e.target.value) || 0)}
                  className="w-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <span className="text-sm text-gray-600">
                  Single Tickets @ ${ticketPrice}.00 each{ticketPrice === 110 ? '' : '; after 3/28/26 $110.00 each'}
                </span>
              </div>
              {formData.ticketQuantity > 0 && (
                <p className="mt-2 text-sm font-medium text-blue-600">
                  Subtotal: ${(formData.ticketQuantity * ticketPrice).toLocaleString()}
                </p>
              )}
            </div>
          </div>

          {/* Donations Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Donations</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="monetaryDonation" className="block text-sm font-medium text-gray-700 mb-2">
                  Enclosed is my monetary donation in the amount of $
                </label>
                <input
                  type="number"
                  id="monetaryDonation"
                  min="0"
                  step="0.01"
                  value={formData.monetaryDonation}
                  onChange={(e) => handleInputChange('monetaryDonation', e.target.value)}
                  placeholder="0.00"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="silentAuctionDonation" className="block text-sm font-medium text-gray-700 mb-2">
                  I would like to donate an item for the Silent Auction (Description and Value)
                </label>
                <textarea
                  id="silentAuctionDonation"
                  rows={3}
                  value={formData.silentAuctionDonation}
                  onChange={(e) => handleInputChange('silentAuctionDonation', e.target.value)}
                  placeholder="Describe item and estimated value"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Attendee Information Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Attendee Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                  Address *
                </label>
                <input
                  type="text"
                  id="address"
                  required
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Street address, city, state, zip"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Payment Information Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Information</h2>
            
            <div className="space-y-6">
              {/* Payment Method Selection */}
              <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Your Payment Method</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-2">💳 Credit Card</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Pay securely online with Stripe. You&apos;ll be redirected to complete your payment.
                    </p>
                    <ul className="text-xs text-gray-500 space-y-1">
                      <li>• Instant processing</li>
                      <li>• Secure encryption</li>
                      <li>• Immediate confirmation</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-2">📄 Check Payment</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Submit your order now and mail your check to complete the transaction.
                    </p>
                    <ul className="text-xs text-gray-500 space-y-1">
                      <li>• No processing fees</li>
                      <li>• Mail payment to USC</li>
                      <li>• Include submission ID</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Check Payment Instructions */}
              <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">📝 Check Payment Instructions</h3>
                <p className="text-sm text-gray-700">
                  If paying by check, make checks payable to <strong>Ukiah Senior Center</strong> and write <strong>&quot;AATR&quot;</strong> in the memo. 
                  Include your submission ID with your payment and mail to:<br/><br/>
                  <strong>Ukiah Senior Center</strong><br/>
                  Attn: AATR<br/>
                  499 Leslie St.<br/>
                  Ukiah, CA 95482
                </p>
              </div>
            </div>
          </div>

          {/* Ticket Delivery Options */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Ticket Delivery Options</h2>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="pickup"
                  checked={formData.ticketDelivery === 'pickup'}
                  onChange={(e) => handleInputChange('ticketDelivery', e.target.value as 'pickup' | 'willcall')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Pick Up Tickets @ USC</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="willcall"
                  checked={formData.ticketDelivery === 'willcall'}
                  onChange={(e) => handleInputChange('ticketDelivery', e.target.value as 'pickup' | 'willcall')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Hold my tickets at Will Call</span>
              </label>
            </div>
          </div>

          {/* Total and Submit */}
          <div className="border-t pt-8">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-semibold text-gray-900">Total Amount:</span>
              <span className="text-2xl font-bold text-blue-600">${calculateTotal().toLocaleString()}</span>
            </div>
            
            {/* Two Submit Buttons */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Check Payment Button */}
              <button
                type="button"
                onClick={handleCheckPayment}
                disabled={submissionState.isSubmitting || submissionState.isSubmitted}
                className={`w-full py-3 px-6 rounded-md font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
                  submissionState.isSubmitting || submissionState.isSubmitted
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                } text-white`}
              >
                {submissionState.isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : submissionState.isSubmitted ? (
                  '✓ Submitted Successfully'
                ) : (
                  '📄 Submit & Pay by Check'
                )}
              </button>

              {/* Credit Card Payment Button */}
              <button
                type="button"
                onClick={handleCreditCardPayment}
                disabled={submissionState.isSubmitting || submissionState.isSubmitted || calculateTotal() <= 0}
                className={`w-full py-3 px-6 rounded-md font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
                  submissionState.isSubmitting || submissionState.isSubmitted || calculateTotal() <= 0
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                } text-white`}
              >
                {calculateTotal() <= 0 ? (
                  '💳 Select Items to Pay'
                ) : (
                  '💳 Pay with Credit Card'
                )}
              </button>
            </div>
            
            {calculateTotal() <= 0 && (
              <p className="text-center text-sm text-gray-500 mt-3">
                Please select a sponsorship level, tickets, or add a donation to continue
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}