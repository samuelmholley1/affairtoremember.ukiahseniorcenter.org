import type { Metadata } from 'next'
import AuctionDonationForm from '@/components/AuctionDonationForm'

export const metadata: Metadata = {
  title: 'Auction Donations - An Affair to Remember',
  description: 'Donate items for the Ukiah Senior Center auction'
}

export default function AuctionDonationsPage() {
  return <AuctionDonationForm />
}