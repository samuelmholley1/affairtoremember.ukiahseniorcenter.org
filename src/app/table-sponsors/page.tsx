import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Table Sponsors - An Affair to Remember',
  description: 'Sponsor a table for the Ukiah Senior Center event'
}

export default function TableSponsorsPage() {
  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Table Sponsors
          </h1>
          <p className="text-gray-600">
            Support the Ukiah Senior Center
          </p>
        </div>

        <form className="space-y-6">
          <div>
            <label htmlFor="sponsor-name" className="block text-sm font-medium text-gray-700">
              Sponsor Name/Organization
            </label>
            <input
              type="text"
              id="sponsor-name"
              name="sponsor-name"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="contact-person" className="block text-sm font-medium text-gray-700">
              Contact Person
            </label>
            <input
              type="text"
              id="contact-person"
              name="contact-person"
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
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="sponsorship-level" className="block text-sm font-medium text-gray-700">
              Sponsorship Level
            </label>
            <select
              id="sponsorship-level"
              name="sponsorship-level"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a level</option>
              <option value="bronze">Bronze - $250</option>
              <option value="silver">Silver - $500</option>
              <option value="gold">Gold - $750</option>
              <option value="platinum">Platinum - $1,000</option>
            </select>
          </div>

          <div>
            <label htmlFor="number-of-tables" className="block text-sm font-medium text-gray-700">
              Number of Tables
            </label>
            <select
              id="number-of-tables"
              name="number-of-tables"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select number</option>
              <option value="1">1 Table</option>
              <option value="2">2 Tables</option>
              <option value="3">3 Tables</option>
              <option value="4">4 Tables</option>
              <option value="5+">5+ Tables</option>
            </select>
          </div>

          <div>
            <label htmlFor="company-address" className="block text-sm font-medium text-gray-700">
              Company/Organization Address
            </label>
            <textarea
              id="company-address"
              name="company-address"
              rows={3}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Street address, city, state, zip"
            />
          </div>

          <div>
            <label htmlFor="special-requests" className="block text-sm font-medium text-gray-700">
              Special Seating Requests
            </label>
            <textarea
              id="special-requests"
              name="special-requests"
              rows={3}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Any special seating arrangements or accessibility needs..."
            />
          </div>

          <div>
            <label htmlFor="marketing-materials" className="flex items-center">
              <input
                type="checkbox"
                id="marketing-materials"
                name="marketing-materials"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">
                I will provide marketing materials for display
              </span>
            </label>
          </div>

          <div>
            <label htmlFor="additional-notes" className="block text-sm font-medium text-gray-700">
              Additional Notes
            </label>
            <textarea
              id="additional-notes"
              name="additional-notes"
              rows={3}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Any additional information or questions..."
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit Sponsorship Request
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}