import type { Metadata } from 'next'
import SponsorshipForm from '@/components/SponsorshipForm'

export const metadata: Metadata = {
  title: 'Sponsorship & Tickets - An Affair to Remember: A Night at the Speakeasy',
  description: 'Purchase tickets and sponsor the Ukiah Senior Center event on April 11, 2026'
}

export default function TableSponsorsPage() {
  return <SponsorshipForm />
}