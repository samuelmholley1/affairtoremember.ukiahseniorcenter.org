'use client'

import { useState } from 'react'

interface AuctionDonationFormData {
  name: string
  email: string
  phone: string
  address: string
  itemDescription: string
  estimatedValue: string
  pickupRequired: string
  specialInstructions: string
  contactPreference: string
}

interface SubmissionState {
  isSubmitting: boolean
  isSubmitted: boolean
  error: string | null
  submissionId: string | null
}

export default function AuctionDonationForm() {
  const [formData, setFormData] = useState<AuctionDonationFormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    itemDescription: '',
    estimatedValue: '',
    pickupRequired: 'no',
    specialInstructions: '',
    contactPreference: 'email'
  })

  const [submissionState, setSubmissionState] = useState<SubmissionState>({
    isSubmitting: false,
    isSubmitted: false,
    error: null,
    submissionId: null
  })

  const handleInputChange = (field: keyof AuctionDonationFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    setSubmissionState({
      isSubmitting: true,
      isSubmitted: false,
      error: null,
      submissionId: null
    })

    try {
      // Prepare data for Google Sheets
      const submissionData = {
        ...formData,
        formType: 'auction-donations',
        timestamp: new Date().toISOString(),
        ipAddress: '', // Could be populated client-side if needed
        userAgent: navigator.userAgent
      }

      // Use the new Google Sheets API endpoint
      const API_URL = process.env.NEXT_PUBLIC_AUCTION_API_URL || '/api/auction-donations'
      
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
      console.error('Form submission error:', error)
      setSubmissionState({
        isSubmitting: false,
        isSubmitted: false,
        error: error instanceof Error ? error.message : 'An error occurred while submitting the form',
        submissionId: null
      })
    }
  }

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Auction Donations
          </h1>
          <p className="text-xl text-gray-600">
            Help make our auction spectacular by donating items, services, or experiences for &quot;An Affair to Remember&quot;
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
                  Donation Submitted Successfully!
                </h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>Thank you for your generous donation! Your confirmation ID is: <strong>{submissionState.submissionId}</strong></p>
                  <p className="mt-1">We&apos;ll contact you soon to coordinate pickup or delivery details.</p>
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

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          
          {/* Donor Information Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Donor Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
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
                  Email Address *
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
                  Phone Number *
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
                  placeholder="Street, City, State, ZIP"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Item Information Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Item Information</h2>
            <div className="space-y-6">
              <div>
                <label htmlFor="itemDescription" className="block text-sm font-medium text-gray-700 mb-2">
                  Item Description *
                </label>
                <textarea
                  id="itemDescription"
                  rows={4}
                  required
                  value={formData.itemDescription}
                  onChange={(e) => handleInputChange('itemDescription', e.target.value)}
                  placeholder="Please provide a detailed description of the item(s), service(s), or experience(s) you would like to donate..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="estimatedValue" className="block text-sm font-medium text-gray-700 mb-2">
                    Estimated Value ($)
                  </label>
                  <input
                    type="number"
                    id="estimatedValue"
                    min="0"
                    step="0.01"
                    value={formData.estimatedValue}
                    onChange={(e) => handleInputChange('estimatedValue', e.target.value)}
                    placeholder="0.00"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pickup Required?
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="yes"
                        checked={formData.pickupRequired === 'yes'}
                        onChange={(e) => handleInputChange('pickupRequired', e.target.value)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">Yes, please arrange pickup</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="no"
                        checked={formData.pickupRequired === 'no'}
                        onChange={(e) => handleInputChange('pickupRequired', e.target.value)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">No, I can deliver</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Information</h2>
            <div className="space-y-6">
              <div>
                <label htmlFor="specialInstructions" className="block text-sm font-medium text-gray-700 mb-2">
                  Special Instructions or Notes
                </label>
                <textarea
                  id="specialInstructions"
                  rows={3}
                  value={formData.specialInstructions}
                  onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                  placeholder="Any special handling instructions, delivery notes, or additional information..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Contact Method
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="email"
                      checked={formData.contactPreference === 'email'}
                      onChange={(e) => handleInputChange('contactPreference', e.target.value)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Email</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="phone"
                      checked={formData.contactPreference === 'phone'}
                      onChange={(e) => handleInputChange('contactPreference', e.target.value)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Phone</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="border-t pt-8">
            <button
              type="submit"
              disabled={submissionState.isSubmitting || submissionState.isSubmitted}
              className={`w-full py-3 px-6 rounded-md font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
                submissionState.isSubmitting || submissionState.isSubmitted
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white`}
            >
              {submissionState.isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : submissionState.isSubmitted ? (
                'Submitted Successfully'
              ) : (
                'Submit Auction Donation'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}