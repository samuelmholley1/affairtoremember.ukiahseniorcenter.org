import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <p className="text-xl text-gray-600 mb-2">
            Ukiah Senior Center Annual Fundraiser
          </p>
          <p className="text-lg text-gray-500">
            Join us for an elegant evening supporting our community seniors
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                🎁 Auction Donations
              </h2>
              <p className="text-gray-600 mb-6">
                Help make our auction spectacular by donating items, services, or experiences. 
                Every donation helps support vital programs for seniors in our community.
              </p>
              <Link
                href="/auction-donations"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Donate Items
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                � Tickets & Sponsorships
              </h2>
              <p className="text-gray-600 mb-6">
                Purchase tickets for &quot;A Night at the Speakeasy&quot; or become a sponsor with multiple 
                levels available. Support the Ukiah Senior Center while enjoying an elegant evening.
              </p>
              <Link
                href="/table-sponsors"
                className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Get Tickets & Sponsor
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              About the Event
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              An Affair to Remember is our annual fundraising event that brings the community together 
              to support the vital services provided by the Ukiah Senior Center. Through this elegant 
              evening of dining, entertainment, and giving, we raise funds to ensure seniors in our 
              community have access to nutritious meals, social activities, and essential support services.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 text-center">
              <div>
                <h3 className="font-semibold text-gray-900">Date</h3>
                <p className="text-gray-600">Saturday, April 11, 2026</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Theme</h3>
                <p className="text-gray-600">A Night at the Speakeasy</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Location</h3>
                <p className="text-gray-600">To Be Announced</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
