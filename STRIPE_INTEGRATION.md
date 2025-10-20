# Stripe Integration Guide

## Overview
This guide will help you integrate Stripe payment processing into the main landing page for ticket purchases.

## Current State
- The landing page (`/`) now displays event information and has a "Purchase Tickets" button
- When clicked, it shows a placeholder for Stripe integration
- The design is mobile-responsive and professional

## Stripe Integration Steps

### 1. Create Stripe Account
1. Go to https://stripe.com and create an account
2. Get your publishable key and secret key from the dashboard
3. For testing, use the test keys (they start with `pk_test_` and `sk_test_`)

### 2. Install Stripe Dependencies
```bash
yarn add @stripe/stripe-js stripe
```

### 3. Add Environment Variables
Add to your `.env.local`:
```bash
# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
```

### 4. Create Stripe Payment Intent API
Create `/src/app/api/create-payment-intent/route.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

export async function POST(request: NextRequest) {
  try {
    const { amount, ticketCount } = await request.json()
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe uses cents
      currency: 'usd',
      metadata: {
        ticketCount: ticketCount.toString(),
        event: 'An Affair to Remember 2026'
      }
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    )
  }
}
```

### 5. Update Landing Page with Stripe Elements
Replace the placeholder in `/src/app/page.tsx` with actual Stripe Elements:

```typescript
// Add these imports at the top
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

// Create a payment component
function PaymentForm({ ticketCount, totalAmount }: { ticketCount: number, totalAmount: number }) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    
    if (!stripe || !elements) return
    
    setIsProcessing(true)
    
    // Create payment intent
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: totalAmount, ticketCount })
    })
    
    const { clientSecret } = await response.json()
    
    // Confirm payment
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
      }
    })
    
    if (result.error) {
      console.error('Payment failed:', result.error)
    } else {
      console.log('Payment succeeded:', result.paymentIntent)
      // Handle success (redirect, show confirmation, etc.)
    }
    
    setIsProcessing(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <CardElement options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
          },
        }} />
      </div>
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold disabled:opacity-50"
      >
        {isProcessing ? 'Processing...' : `Pay $${totalAmount}`}
      </button>
    </form>
  )
}
```

### 6. Wrap Payment Form in Elements Provider
```typescript
// In your ticket form section, replace the placeholder with:
<Elements stripe={stripePromise}>
  <PaymentForm ticketCount={ticketCount} totalAmount={ticketCount * 75} />
</Elements>
```

## Recommended Ticket Options

### Individual Tickets
- **Price**: $100 per ticket
- **Includes**: Dinner, dancing, auction participation

### Sponsor Tables
- **Bronze Sponsor**: $500 (Table for 8, basic recognition)
- **Silver Sponsor**: $750 (Table for 8, complimentary wine, program recognition)
- **Gold Sponsor**: $1000 (Table for 8, complimentary wine, premium recognition, auction donation)

## Testing
1. Use Stripe test credit card numbers:
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`
   - Any future expiry date and any 3-digit CVC

## Production Deployment
1. Replace test keys with live keys in Vercel environment variables
2. Test with real cards in small amounts
3. Set up webhooks for payment confirmation
4. Add email confirmations

## Security Notes
- Never expose secret keys in client-side code
- Always validate payments on the server side
- Use HTTPS in production
- Set up webhook endpoints for payment confirmations

## Next Steps
1. Set up Stripe account and get API keys
2. Install dependencies and add environment variables
3. Create the payment intent API route
4. Update the landing page with Stripe Elements
5. Test with Stripe test cards
6. Deploy to Vercel with live keys for production