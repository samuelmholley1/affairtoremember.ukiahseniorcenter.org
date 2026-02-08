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
  auctionType: string[]
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
    contactPreference: 'email',
    auctionType: []
  })

  const [photo, setPhoto] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)

  const [submissionState, setSubmissionState] = useState<SubmissionState>({
    isSubmitting: false,
    isSubmitted: false,
    error: null,
    submissionId: null
  })

  const handleInputChange = (field: keyof AuctionDonationFormData, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleAuctionTypeChange = (type: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      auctionType: checked
        ? [...prev.auctionType, type]
        : prev.auctionType.filter(t => t !== type)
    }))
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('Photo must be under 10 MB')
        return
      }
      setPhoto(file)
      const reader = new FileReader()
      reader.onloadend = () => setPhotoPreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const removePhoto = () => {
    setPhoto(null)
    setPhotoPreview(null)
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
      const body = new FormData()
      body.append('name', formData.name)
      body.append('email', formData.email)
      body.append('phone', formData.phone)
      body.append('address', formData.address)
      body.append('itemDescription', formData.itemDescription)
      body.append('estimatedValue', formData.estimatedValue)
      body.append('pickupRequired', formData.pickupRequired)
      body.append('specialInstructions', formData.specialInstructions)
      body.append('contactPreference', formData.contactPreference)
      body.append('auctionType', formData.auctionType.join(', '))
      body.append('formType', 'auction-donations')
      body.append('timestamp', new Date().toISOString())
      body.append('userAgent', navigator.userAgent)

      if (photo) {
        body.append('photo', photo)
      }

      const API_URL = process.env.NEXT_PUBLIC_AUCTION_API_URL || '/api/auction-donations'
      
      const response = await fetch(API_URL, {
        method: 'POST',
        body,
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
      
      // Save form data to localStorage as backup
      const backupData = {
        ...formData,
        timestamp: new Date().toISOString(),
        formType: 'auction-donations'
      }
      localStorage.setItem('auction_donation_backup', JSON.stringify(backupData))
      
      setSubmissionState({
        isSubmitting: false,
        isSubmitted: false,
        error: error instanceof Error ? error.message : 'An error occurred while submitting the form',
        submissionId: null
      })
    }
  }

  const downloadReadableBackup = () => {
    const readableData = `
AUCTION DONATION SUBMISSION BACKUP
===================================
Date: ${new Date().toISOString()}

DONOR INFORMATION
-----------------
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Address: ${formData.address}

ITEM DETAILS
------------
Auction Type: ${formData.auctionType.join(', ') || 'Not specified'}
Description: ${formData.itemDescription}
Estimated Value: ${formData.estimatedValue}
Pickup Required: ${formData.pickupRequired}
Special Instructions: ${formData.specialInstructions}

CONTACT PREFERENCE
------------------
Preferred Contact Method: ${formData.contactPreference}

---
Please email this information to: 
Samuel Holley, Donation Data Clerk
sam@samuelholley.com
Subject: Auction Donation Submission (Failed Online Submission)
`
    
    const dataBlob = new Blob([readableData], { type: 'text/plain' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `auction-donation-${Date.now()}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const retrySubmission = () => {
    setSubmissionState({
      isSubmitting: false,
      isSubmitted: false,
      error: null,
      submissionId: null
    })
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

        {/* Error Message with Fallback Options */}
        {submissionState.error && (
          <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6 mb-8">
            <div className="mb-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3 flex-1">
                  <h3 className="text-lg font-bold text-red-900 mb-2">
                    ⚠️ Submission Failed
                  </h3>
                  <p className="text-red-800 mb-3">
                    {submissionState.error}
                  </p>
                  <p className="text-red-700 text-sm font-semibold mb-4">
                    Don&apos;t worry! Your information has been saved locally. You have several options:
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={retrySubmission}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Try Submitting Again
              </button>

              <button
                type="button"
                onClick={downloadReadableBackup}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Your Information (Text File)
              </button>

              <div className="bg-white border-2 border-red-200 rounded-lg p-4">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Alternative:</strong> Email your information directly to:
                </p>
                <div className="mb-2">
                  <div className="font-semibold text-gray-900">Samuel Holley</div>
                  <div className="text-xs text-gray-600">Donation Data Clerk</div>
                  <a 
                    href="mailto:sam@samuelholley.com?subject=Auction%20Donation%20Submission" 
                    className="text-blue-600 hover:text-blue-800 font-semibold underline"
                  >
                    sam@samuelholley.com
                  </a>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Click &quot;Download Your Information&quot; above, then attach the file to your email
                </p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded p-3 text-sm">
                <p className="text-gray-700">
                  <strong>Or call us:</strong> <a href="tel:7074624343" className="text-blue-600 hover:text-blue-800 font-semibold">(707) 462-4343</a>
                </p>
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
                <button
                  type="button"
                  onClick={() => handleInputChange('email', 'support@seniorctr.org')}
                  className="mt-1 text-xs text-blue-600 hover:text-blue-800 underline"
                >
                  No email? Fill support@seniorctr.org
                </button>
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

              {/* Auction Type Checkboxes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Auction Type *
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.auctionType.includes('Live')}
                      onChange={(e) => handleAuctionTypeChange('Live', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Live Auction</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.auctionType.includes('Silent')}
                      onChange={(e) => handleAuctionTypeChange('Silent', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Silent Auction</span>
                  </label>
                </div>
              </div>

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

              {/* Photo Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Photo of Item (optional)
                </label>
                <p className="text-xs text-gray-500 mb-2">Upload a photo of the item you&apos;re donating. Max 10 MB. This will be emailed to event coordinators only (not stored publicly).</p>
                {!photoPreview ? (
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors">
                    <svg className="w-8 h-8 text-gray-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm text-gray-500">Click to upload photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="relative inline-block">
                    <img src={photoPreview} alt="Item preview" className="max-h-48 rounded-lg border border-gray-200" />
                    <button
                      type="button"
                      onClick={removePhoto}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                    >
                      ×
                    </button>
                    <p className="text-xs text-gray-500 mt-1">{photo?.name}</p>
                  </div>
                )}
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
