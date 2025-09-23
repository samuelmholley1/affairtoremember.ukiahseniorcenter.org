import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Auction Donations - An Affair to Remember',
  description: 'Donate items for the Ukiah Senior Center auction'
}

export default function AuctionDonationsPage() {
  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Auction Donations
          </h1>
          <p className="text-gray-600">
            Help support the Ukiah Senior Center
          </p>
        </div>

        <form className="space-y-6">
          <div>
            <label htmlFor="donor-name" className="block text-sm font-medium text-gray-700">
              Donor Name
            </label>
            <input
              type="text"
              id="donor-name"
              name="donor-name"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="item-description" className="block text-sm font-medium text-gray-700">
              Item Description
            </label>
            <textarea
              id="item-description"
              name="item-description"
              rows={4}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Please describe the item(s) you would like to donate..."
            />
          </div>

          <div>
            <label htmlFor="estimated-value" className="block text-sm font-medium text-gray-700">
              Estimated Value
            </label>
            <input
              type="number"
              id="estimated-value"
              name="estimated-value"
              min="0"
              step="0.01"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="0.00"
            />
          </div>

          <div>
            <label htmlFor="pickup-needed" className="flex items-center">
              <input
                type="checkbox"
                id="pickup-needed"
                name="pickup-needed"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">
                I need pickup assistance for this item
              </span>
            </label>
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
              Additional Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Any additional information..."
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit Donation
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}