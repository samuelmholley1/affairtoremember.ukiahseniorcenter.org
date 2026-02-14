'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'

interface Donation {
  [key: string]: string
}

type AuctionFilter = 'all' | 'live' | 'silent'

const colors = {
  navy: '#042148',
  burgundy: '#9F3833',
  black: '#000000',
  white: '#FFFFFF',
  neutralStroke: '#E5E7EB',
  lightGray: '#F9FAFB',
  gray: '#6B7280',
}

export default function DonationListPage() {
  const [donations, setDonations] = useState<Donation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<AuctionFilter>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortField, setSortField] = useState<string>('Timestamp')
  const [sortAsc, setSortAsc] = useState(false)

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await fetch('/api/donation-list')
        const data = await res.json()
        if (data.success) {
          setDonations(data.donations)
        } else {
          setError(data.message || 'Failed to load donations')
        }
      } catch {
        setError('Failed to fetch donations')
      } finally {
        setLoading(false)
      }
    }
    fetchDonations()
  }, [])

  const filtered = useMemo(() => {
    let list = donations

    // Filter by auction type
    if (filter !== 'all') {
      const keyword = filter === 'live' ? 'live' : 'silent'
      list = list.filter((d) => {
        const auctionType = (
          d['Auction Type'] || d['auctionType'] || ''
        ).toLowerCase()
        return auctionType.includes(keyword)
      })
    }

    // Search across key fields
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      list = list.filter((d) =>
        [
          d['Name'],
          d['Email'],
          d['Phone'],
          d['Item Description'],
          d['Estimated Value'],
          d['Special Instructions'],
          d['Auction Type'],
          d['Submission ID'],
        ]
          .filter(Boolean)
          .some((val) => val.toLowerCase().includes(q))
      )
    }

    // Sort
    list = [...list].sort((a, b) => {
      const aVal = a[sortField] || ''
      const bVal = b[sortField] || ''
      const cmp = aVal.localeCompare(bVal, undefined, { numeric: true })
      return sortAsc ? cmp : -cmp
    })

    return list
  }, [donations, filter, searchQuery, sortField, sortAsc])

  const counts = useMemo(() => {
    let live = 0
    let silent = 0
    let both = 0
    donations.forEach((d) => {
      const t = (d['Auction Type'] || d['auctionType'] || '').toLowerCase()
      const isLive = t.includes('live')
      const isSilent = t.includes('silent')
      if (isLive && isSilent) both++
      else if (isLive) live++
      else if (isSilent) silent++
    })
    return { total: donations.length, live: live + both, silent: silent + both, both }
  }, [donations])

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortAsc(!sortAsc)
    } else {
      setSortField(field)
      setSortAsc(true)
    }
  }

  const sortIcon = (field: string) => {
    if (sortField !== field) return ' ↕'
    return sortAsc ? ' ↑' : ' ↓'
  }

  const formatDate = (iso: string) => {
    if (!iso) return ''
    try {
      return new Date(iso).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      })
    } catch {
      return iso
    }
  }

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ fontFamily: 'Georgia, serif' }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: colors.navy }} />
          <p style={{ color: colors.gray }}>Loading donations…</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ fontFamily: 'Georgia, serif' }}
      >
        <div className="text-center max-w-md">
          <p className="text-red-600 text-lg font-semibold mb-2">Error</p>
          <p style={{ color: colors.gray }}>{error}</p>
          <Link
            href="/admin"
            className="inline-block mt-4 px-4 py-2 text-white rounded-md text-sm"
            style={{ backgroundColor: colors.navy }}
          >
            Back to Admin
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Georgia, serif' }}>
      <div className="max-w-[95rem] mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: colors.navy }}>
              Auction Donation List
            </h1>
            <p className="text-sm mt-1" style={{ color: colors.gray }}>
              Internal view — {counts.total} total donation{counts.total !== 1 ? 's' : ''}
            </p>
          </div>
          <Link
            href="/admin"
            className="px-4 py-2 text-sm font-medium text-white rounded-md self-start"
            style={{ backgroundColor: colors.navy }}
          >
            ← Admin Dashboard
          </Link>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`p-4 rounded-lg border text-left transition-shadow hover:shadow-md ${filter === 'all' ? 'ring-2' : ''}`}
            style={{
              borderColor: colors.neutralStroke,
              outline: filter === 'all' ? `2px solid ${colors.navy}` : undefined,
            }}
          >
            <p className="text-2xl font-bold" style={{ color: colors.navy }}>{counts.total}</p>
            <p className="text-sm" style={{ color: colors.gray }}>All Donations</p>
          </button>
          <button
            onClick={() => setFilter('live')}
            className={`p-4 rounded-lg border text-left transition-shadow hover:shadow-md`}
            style={{
              borderColor: colors.neutralStroke,
              outline: filter === 'live' ? `2px solid ${colors.burgundy}` : undefined,
            }}
          >
            <p className="text-2xl font-bold" style={{ color: colors.burgundy }}>{counts.live}</p>
            <p className="text-sm" style={{ color: colors.gray }}>Live Auction</p>
          </button>
          <button
            onClick={() => setFilter('silent')}
            className={`p-4 rounded-lg border text-left transition-shadow hover:shadow-md`}
            style={{
              borderColor: colors.neutralStroke,
              outline: filter === 'silent' ? `2px solid ${colors.navy}` : undefined,
            }}
          >
            <p className="text-2xl font-bold" style={{ color: colors.navy }}>{counts.silent}</p>
            <p className="text-sm" style={{ color: colors.gray }}>Silent Auction</p>
          </button>
          <div
            className="p-4 rounded-lg border"
            style={{ borderColor: colors.neutralStroke }}
          >
            <p className="text-2xl font-bold" style={{ color: colors.gray }}>{counts.both}</p>
            <p className="text-sm" style={{ color: colors.gray }}>Both Types</p>
          </div>
        </div>

        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name, email, item, value…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-96 px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2"
            style={{ borderColor: colors.neutralStroke, outlineColor: colors.navy }}
          />
        </div>

        {/* Active filter label */}
        {filter !== 'all' && (
          <div className="mb-4 flex items-center gap-2">
            <span
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white"
              style={{ backgroundColor: filter === 'live' ? colors.burgundy : colors.navy }}
            >
              {filter === 'live' ? 'Live Auction' : 'Silent Auction'}
              <button
                onClick={() => setFilter('all')}
                className="ml-2 hover:opacity-80"
                aria-label="Clear filter"
              >
                ✕
              </button>
            </span>
            <span className="text-sm" style={{ color: colors.gray }}>
              Showing {filtered.length} of {counts.total}
            </span>
          </div>
        )}

        {/* Table */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 border rounded-lg" style={{ borderColor: colors.neutralStroke }}>
            <p className="text-lg font-semibold" style={{ color: colors.navy }}>
              No donations found
            </p>
            <p className="text-sm mt-1" style={{ color: colors.gray }}>
              {searchQuery ? 'Try a different search term.' : 'No donations have been submitted yet.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto border rounded-lg" style={{ borderColor: colors.neutralStroke }}>
            <table className="min-w-full divide-y" style={{ borderColor: colors.neutralStroke }}>
              <thead style={{ backgroundColor: colors.lightGray }}>
                <tr>
                  {[
                    { key: 'Timestamp', label: 'Date' },
                    { key: 'Name', label: 'Donor' },
                    { key: 'Email', label: 'Email' },
                    { key: 'Phone', label: 'Phone' },
                    { key: 'Item Description', label: 'Item' },
                    { key: 'Estimated Value', label: 'Est. Value' },
                    { key: 'Auction Type', label: 'Type' },
                    { key: 'Pickup Required', label: 'Pickup' },
                    { key: 'Contact Preference', label: 'Contact Pref' },
                    { key: 'Special Instructions', label: 'Notes' },
                    { key: 'Status', label: 'Status' },
                    { key: 'Submission ID', label: 'ID' },
                  ].map((col) => (
                    <th
                      key={col.key}
                      className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider cursor-pointer select-none whitespace-nowrap hover:bg-gray-200"
                      style={{ color: colors.navy }}
                      onClick={() => handleSort(col.key)}
                    >
                      {col.label}
                      <span className="text-gray-400">{sortIcon(col.key)}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: colors.neutralStroke }}>
                {filtered.map((d, idx) => {
                  const auctionType = (d['Auction Type'] || d['auctionType'] || '').toLowerCase()
                  const isLive = auctionType.includes('live')
                  const isSilent = auctionType.includes('silent')

                  return (
                    <tr
                      key={d['Submission ID'] || idx}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-3 py-3 text-sm whitespace-nowrap" style={{ color: colors.black }}>
                        {formatDate(d['Timestamp'])}
                      </td>
                      <td className="px-3 py-3 text-sm font-medium whitespace-nowrap" style={{ color: colors.navy }}>
                        {d['Name']}
                      </td>
                      <td className="px-3 py-3 text-sm whitespace-nowrap">
                        <a href={`mailto:${d['Email']}`} className="underline" style={{ color: colors.burgundy }}>
                          {d['Email']}
                        </a>
                      </td>
                      <td className="px-3 py-3 text-sm whitespace-nowrap" style={{ color: colors.black }}>
                        {d['Phone'] && (
                          <a href={`tel:${d['Phone']}`} className="underline" style={{ color: colors.burgundy }}>
                            {d['Phone']}
                          </a>
                        )}
                      </td>
                      <td className="px-3 py-3 text-sm max-w-xs" style={{ color: colors.black }}>
                        <div className="line-clamp-3">{d['Item Description']}</div>
                      </td>
                      <td className="px-3 py-3 text-sm whitespace-nowrap font-medium" style={{ color: colors.black }}>
                        {d['Estimated Value'] ? `$${d['Estimated Value'].replace(/^\$/, '')}` : '—'}
                      </td>
                      <td className="px-3 py-3 text-sm whitespace-nowrap">
                        <div className="flex gap-1">
                          {isLive && (
                            <span
                              className="inline-block px-2 py-0.5 rounded-full text-xs font-medium text-white"
                              style={{ backgroundColor: colors.burgundy }}
                            >
                              Live
                            </span>
                          )}
                          {isSilent && (
                            <span
                              className="inline-block px-2 py-0.5 rounded-full text-xs font-medium text-white"
                              style={{ backgroundColor: colors.navy }}
                            >
                              Silent
                            </span>
                          )}
                          {!isLive && !isSilent && (
                            <span className="text-xs" style={{ color: colors.gray }}>
                              Not specified
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-3 py-3 text-sm whitespace-nowrap" style={{ color: colors.black }}>
                        {d['Pickup Required'] === 'yes' ? (
                          <span className="text-orange-600 font-medium">Yes</span>
                        ) : (
                          <span style={{ color: colors.gray }}>No</span>
                        )}
                      </td>
                      <td className="px-3 py-3 text-sm whitespace-nowrap capitalize" style={{ color: colors.black }}>
                        {d['Contact Preference'] || '—'}
                      </td>
                      <td className="px-3 py-3 text-sm max-w-xs" style={{ color: colors.black }}>
                        <div className="line-clamp-2">{d['Special Instructions'] || '—'}</div>
                      </td>
                      <td className="px-3 py-3 text-sm whitespace-nowrap">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                            (d['Status'] || '').toLowerCase() === 'submitted'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {d['Status'] || '—'}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-xs whitespace-nowrap font-mono" style={{ color: colors.gray }}>
                        {d['Submission ID'] || '—'}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8 pt-6 border-t" style={{ borderColor: colors.neutralStroke }}>
          <p className="text-xs" style={{ color: colors.gray }}>
            Ukiah Senior Center — Internal Use Only
          </p>
        </div>
      </div>
    </div>
  )
}
