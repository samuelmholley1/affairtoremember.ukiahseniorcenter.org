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
  creditCard: {
    number: string
    expiry: string
    cvc: string
    nameOnCard: string
    zip: string
  }
  ticketDelivery: 'pickup' | 'willcall'
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
    paymentMethod: 'credit',
    creditCard: {
      number: '',
      expiry: '',
      cvc: '',
      nameOnCard: '',
      zip: ''
    },
    ticketDelivery: 'pickup'
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

  const handleCreditCardChange = (field: keyof FormData['creditCard'], value: string) => {
    setFormData(prev => ({
      ...prev,
      creditCard: {
        ...prev.creditCard,
        [field]: value
      }
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form validation and submission logic would go here
    console.log('Form submitted:', formData)
    alert('Form submitted successfully! (This is a demo - no actual processing)')
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

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 space-y-12">
          
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
              <div>
                <div className="flex space-x-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="credit"
                      checked={formData.paymentMethod === 'credit'}
                      onChange={(e) => handleInputChange('paymentMethod', e.target.value as 'credit' | 'check')}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">Credit Card</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="check"
                      checked={formData.paymentMethod === 'check'}
                      onChange={(e) => handleInputChange('paymentMethod', e.target.value as 'credit' | 'check')}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">Check</span>
                  </label>
                </div>
              </div>

              {/* Credit Card Fields */}
              {formData.paymentMethod === 'credit' && (
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">CREDIT CARD</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Your credit card information will not be retained after transaction.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label htmlFor="ccNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        CC# *
                      </label>
                      <input
                        type="text"
                        id="ccNumber"
                        required={formData.paymentMethod === 'credit'}
                        value={formData.creditCard.number}
                        onChange={(e) => handleCreditCardChange('number', e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="ccExpiry" className="block text-sm font-medium text-gray-700 mb-1">
                        Exp (MM/YY) *
                      </label>
                      <input
                        type="text"
                        id="ccExpiry"
                        required={formData.paymentMethod === 'credit'}
                        value={formData.creditCard.expiry}
                        onChange={(e) => handleCreditCardChange('expiry', e.target.value)}
                        placeholder="MM/YY"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="ccCvc" className="block text-sm font-medium text-gray-700 mb-1">
                        CVC *
                      </label>
                      <input
                        type="text"
                        id="ccCvc"
                        required={formData.paymentMethod === 'credit'}
                        value={formData.creditCard.cvc}
                        onChange={(e) => handleCreditCardChange('cvc', e.target.value)}
                        placeholder="123"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="ccName" className="block text-sm font-medium text-gray-700 mb-1">
                        Name on card *
                      </label>
                      <input
                        type="text"
                        id="ccName"
                        required={formData.paymentMethod === 'credit'}
                        value={formData.creditCard.nameOnCard}
                        onChange={(e) => handleCreditCardChange('nameOnCard', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="ccZip" className="block text-sm font-medium text-gray-700 mb-1">
                        Zip *
                      </label>
                      <input
                        type="text"
                        id="ccZip"
                        required={formData.paymentMethod === 'credit'}
                        value={formData.creditCard.zip}
                        onChange={(e) => handleCreditCardChange('zip', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Check Payment Instructions */}
              {formData.paymentMethod === 'check' && (
                <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">CHECK</h3>
                  <p className="text-sm text-gray-700">
                    Please make checks payable to <strong>Ukiah Senior Center</strong> and write <strong>&quot;AATR&quot;</strong> in the memo. 
                    Mail this form with payment to:<br/><br/>
                    <strong>Ukiah Senior Center</strong><br/>
                    Attn: AATR<br/>
                    499 Leslie St.<br/>
                    Ukiah, CA 95482
                  </p>
                </div>
              )}
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
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-md font-semibold text-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Submit Sponsorship & Ticket Order
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}