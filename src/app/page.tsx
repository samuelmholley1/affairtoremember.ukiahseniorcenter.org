import Link from "next/link";

export default function Home() {
  // Brand colors
  const colors = {
    navy: '#042148',
    burgundy: '#9F3833',
    white: '#FFFFFF',
    lightGray: '#F9FAFB'
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ 
      background: `linear-gradient(135deg, ${colors.lightGray} 0%, ${colors.white} 100%)`,
      fontFamily: 'Georgia, serif'
    }}>
      <div className="max-w-4xl mx-auto px-8 py-16">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: colors.navy }}>
            An Affair to Remember
          </h1>
        </div>

        {/* Two Big Buttons */}
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          
          {/* Auction Donations Button */}
          <Link
            href="/auction-donations"
            className="group block"
          >
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border-2 border-transparent hover:border-opacity-20" 
                 style={{ borderColor: colors.burgundy }}>
              <div className="text-6xl mb-6">🎁</div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: colors.burgundy }}>
                Auction Donations
              </h2>
              <div className="inline-block px-8 py-4 rounded-xl text-white font-semibold text-lg transition-colors"
                   style={{ backgroundColor: colors.burgundy }}>
                Donate Items →
              </div>
            </div>
          </Link>

          {/* Table Sponsors Button */}
          <Link
            href="/table-sponsors"
            className="group block"
          >
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border-2 border-transparent hover:border-opacity-20"
                 style={{ borderColor: colors.navy }}>
              <div className="text-6xl mb-6">🎟️</div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: colors.navy }}>
                Tickets & Sponsorships
              </h2>
              <div className="inline-block px-8 py-4 rounded-xl text-white font-semibold text-lg transition-colors"
                   style={{ backgroundColor: colors.navy }}>
                Get Tickets →
              </div>
            </div>
          </Link>

        </div>

      </div>
    </div>
  );
}