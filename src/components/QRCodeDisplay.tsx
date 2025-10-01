'use client'

import { useEffect, useState } from 'react'
import QRCode from 'qrcode'

interface QRCodeDisplayProps {
  url: string
  title: string
  description: string
  size?: number
}

export default function QRCodeDisplay({ url, title, description, size = 200 }: QRCodeDisplayProps) {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        setIsLoading(true)
        setError('')
        
        const qrCodeUrl = await QRCode.toDataURL(url, {
          width: size,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          },
          errorCorrectionLevel: 'M'
        })
        
        setQrCodeDataUrl(qrCodeUrl)
      } catch (err) {
        console.error('Error generating QR code:', err)
        setError('Failed to generate QR code')
      } finally {
        setIsLoading(false)
      }
    }

    if (url) {
      generateQRCode()
    }
  }, [url, size])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center" style={{ width: size, height: size }}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center bg-red-50 border border-red-200 rounded-lg" style={{ width: size, height: size }}>
        <p className="text-red-600 text-sm text-center px-4">{error}</p>
      </div>
    )
  }

  return (
    <div className="inline-block">
      <img 
        src={qrCodeDataUrl} 
        alt={`QR Code for ${title}: ${description}`}
        className="mx-auto border border-gray-200 rounded-lg shadow-sm"
        style={{ width: size, height: size }}
      />
      <p className="mt-2 text-xs text-gray-500 text-center">
        {title}
      </p>
    </div>
  )
}