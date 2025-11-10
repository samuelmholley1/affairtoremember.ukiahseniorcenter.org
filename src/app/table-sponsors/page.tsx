import Script from 'next/script'
import SponsorshipForm from '@/components/SponsorshipForm'

export default function TableSponsorsPage() {
  return (
    <>
      {/* Zeffy embed script (loads the modal behavior) */}
      <Script
        src="https://zeffy-scripts.s3.ca-central-1.amazonaws.com/embed-form-script.min.js"
        strategy="afterInteractive"
      />

      <main className="mx-auto max-w-4xl px-4">
        <div className="my-8 text-center">
          <h2 className="text-2xl font-semibold">Purchase Tickets</h2>
          <p className="mt-2 text-sm text-muted-foreground">Click below to open the Zeffy ticket modal.</p>

          {/* Zeffy button: the script will attach modal behavior to elements with this attribute */}
          <button
            zeffy-form-link="https://www.zeffy.com/embed/ticketing/an-affair-to-remember-2026-a-night-at-the-speakeasy?modal=true"
            className="mt-4 inline-flex items-center rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            type="button"
          >
            Buy Tickets (Zeffy)
          </button>
        </div>

        {/* Existing sponsorship form component */}
        <SponsorshipForm />
      </main>
    </>
  )
}