# An Affair to Remember - Ukiah Senior Center

This is a [Next.js](https://nextjs.org) project for the Ukiah Senior Center's annual fundraising event "An Affair to Remember". The website provides forms for auction donations and table sponsorships to support vital senior services in the community.

## Live Website

🌐 **URL**: [affairtoremember.ukiahseniorcenter.org](http://affairtoremember.ukiahseniorcenter.org)

## Repository

📦 **GitHub**: [samuelmholley1/affairtoremember.ukiahseniorcenter.org](https://github.com/samuelmholley1/affairtoremember.ukiahseniorcenter.org)

## Features

- **Homepage**: Event information and navigation
- **Auction Donations Form** (`/auction-donations`): For community members to donate items for the fundraising auction
- **Table Sponsors Form** (`/table-sponsors`): For businesses and organizations to sponsor tables at the event
- **Responsive Design**: Built with Tailwind CSS for mobile and desktop compatibility
- **TypeScript**: Type-safe development with full TypeScript support
- **Modern Stack**: Next.js 15 with App Router and React 19

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Package Manager**: Yarn Berry (with node_modules)
- **Linting**: ESLint
- **Version Control**: Git + GitHub

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- Yarn (Berry) or npm

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/samuelmholley1/affairtoremember.ukiahseniorcenter.org.git
   cd affairtoremember.ukiahseniorcenter.org
   ```

2. **Install dependencies**:
   ```bash
   yarn install
   ```

3. **Run the development server**:
   ```bash
   yarn dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Available Scripts

- `yarn dev` - Starts the development server
- `yarn build` - Creates an optimized production build
- `yarn start` - Starts the production server
- `yarn lint` - Runs ESLint for code quality checks

## Google Sheets Integration

The forms are integrated with Google Sheets API using a service account for secure, professional data collection.

### Setup Instructions

1. **Complete Setup**: Follow the detailed guide in `GOOGLE_SHEETS_API_SETUP.md`
2. **Production Deploy**: See `PRODUCTION_SETUP.md` for deployment instructions
3. **Environment Variables**: Configure your Google Cloud service account credentials

### API Endpoints

- **Auction Donations**: `/api/auction-donations`
- **Table Sponsorships**: `/api/table-sponsors`

### Security Features

- ✅ Service account authentication
- ✅ Credit card data masking
- ✅ Unique submission tracking
- ✅ Input validation and error handling
- ✅ Secure server-side Google Sheets API integration

## Project Structure

```
src/
├── app/
│   ├── auction-donations/     # Auction donation form page
│   │   └── page.tsx
│   ├── table-sponsors/        # Table sponsorship form page
│   │   └── page.tsx
│   ├── layout.tsx            # Root layout component
│   ├── page.tsx              # Homepage
│   └── globals.css           # Global styles
├── components/               # Reusable React components (future)
└── lib/                      # Utility functions (future)
```

## Forms

### Auction Donations (`/auction-donations`)
- Donor information collection
- Item description and estimated value
- Pickup assistance options
- Additional notes and special requirements

### Table Sponsors (`/table-sponsors`)
- Organization/sponsor details
- Sponsorship level selection (Bronze, Silver, Gold, Platinum)
- Table quantity and seating preferences
- Marketing materials coordination
- Special requests handling

## Deployment

This project is designed to be deployed on platforms like:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Digital Ocean App Platform**

For Vercel deployment:
```bash
npm i -g vercel
vercel
```

## Configuration

### Yarn Berry Setup
The project uses Yarn Berry with `node_modules` instead of Plug'n'Play (PnP) for better compatibility:

```yaml
# .yarnrc.yml
nodeLinker: node-modules
```

### Environment Variables (Future)
For production deployment, you may need to configure:
- `NEXT_PUBLIC_SITE_URL` - The production URL
- Database connection strings (when backend is added)
- Email service API keys (for form submissions)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## About the Ukiah Senior Center

The Ukiah Senior Center provides essential services to the senior community including:
- Nutritious meal programs
- Social activities and community engagement
- Health and wellness programs
- Transportation services
- Support services for independent living

"An Affair to Remember" is the annual fundraising event that helps sustain these vital community services.

## License

This project is created for the Ukiah Senior Center's fundraising event. All rights reserved.

## Contact

For questions about the event or this website, please contact the Ukiah Senior Center.

---

Built with ❤️ for the Ukiah Senior Center community
