import { Link } from 'react-router-dom'
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline'

const serviceLinks = [
  { label: 'Capital Gain Tax Valuation', to: '/services/capital-gain-tax' },
  { label: 'Property Valuation Report', to: '/services/property-valuation' },
  { label: 'Chartered Engineer Certificate', to: '/services/chartered-engineer-certificate' },
  { label: 'Loan Estimate Report', to: '/services/loan-estimate-report' },
  { label: 'Inheritance & Gift Valuation', to: '/services/inheritance-gift-valuation' },
  { label: 'Insurance & Dispute Valuation', to: '/services/insurance-dispute-valuation' },
]

const companyLinks = [
  { label: 'About Us', to: '/about' },
  { label: 'Our Process', to: '/process' },
  { label: 'Contact', to: '/contact' },
  { label: 'Privacy Policy', to: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-forest relative overflow-hidden">
      {/* Diagonal pattern overlay */}
      <div className="absolute inset-0 bg-diagonal-lines pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top 4-column grid */}
        <div className="py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1 — Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 bg-gold rounded flex items-center justify-center flex-shrink-0">
                <span className="font-cormorant font-bold text-forest text-sm">YP</span>
              </div>
              <div>
                <div className="font-cormorant font-semibold text-gold text-lg leading-none">
                  Y.P. & Associates
                </div>
                <div className="text-cream/40 text-[9px] font-jost tracking-[0.2em] uppercase mt-0.5">
                  Property Valuation
                </div>
              </div>
            </div>
            <p className="text-cream/50 text-sm font-jost leading-relaxed mb-5">
              Government approved Chartered Engineers delivering accurate, bank-accepted property valuation reports across India since 2019.
            </p>
            <div className="space-y-1.5 text-xs font-jost text-cream/40 mb-5">
              <p><span className="text-gold font-medium">GST:</span> 09XXXXX1234Z1Z5</p>
              <p><span className="text-gold font-medium">CE Reg:</span> IEI/CE/GZB/2019-XXX</p>
            </div>
            {/* Social / contact icons */}
            <div className="flex gap-2">
              <a
                href="tel:+919958067860"
                className="w-8 h-8 rounded border border-gold/20 text-gold flex items-center justify-center hover:bg-gold/10 transition-colors"
                title="Call us"
              >
                <PhoneIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://wa.me/919958067860"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded border border-green-500/20 text-green-400 flex items-center justify-center hover:bg-green-500/10 transition-colors"
                title="WhatsApp"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
              <a
                href="mailto:info@ypassociates.in"
                className="w-8 h-8 rounded border border-gold/20 text-gold flex items-center justify-center hover:bg-gold/10 transition-colors"
                title="Email"
              >
                <EnvelopeIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Col 2 — Services */}
          <div>
            <h4 className="font-cormorant font-semibold text-cream text-base mb-4 uppercase tracking-wider text-xs font-jost">
              Our Services
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-cream/45 hover:text-gold text-sm font-jost transition-colors duration-200 leading-snug"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Company */}
          <div>
            <h4 className="text-xs font-jost font-medium uppercase tracking-wider text-cream/60 mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-cream/45 hover:text-gold text-sm font-jost transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <p className="text-xs font-jost font-medium uppercase tracking-wider text-cream/60 mb-3">Working Hours</p>
              <div className="space-y-1 text-sm font-jost text-cream/45">
                <p>Mon – Sat: <span className="text-cream/70">9 AM – 7 PM</span></p>
                <p>Sunday: <span className="text-cream/70">10 AM – 4 PM</span></p>
              </div>
            </div>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h4 className="text-xs font-jost font-medium uppercase tracking-wider text-cream/60 mb-4">
              Contact
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-2.5">
                <PhoneIcon className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <div className="text-sm font-jost">
                  <a href="tel:+919958067860" className="text-cream/70 hover:text-gold transition-colors">
                    +91 9958067860
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <EnvelopeIcon className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <div className="text-sm font-jost">
                  <a href="mailto:info@ypassociates.in" className="text-cream/70 hover:text-gold transition-colors">
                    info@ypassociates.in
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPinIcon className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <p className="text-cream/50 text-sm font-jost leading-relaxed">
                  Ghaziabad, Uttar Pradesh<br />
                  <span className="text-gold/70">Pan India Service Available</span>
                </p>
              </div>
            </div>

            <Link
              to="/contact"
              className="mt-6 gold-btn rounded-lg inline-flex"
            >
              Get Free Quote
            </Link>
          </div>
        </div>

        {/* Gold divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

        {/* Bottom bar */}
        <div className="py-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-cream/30 text-xs font-jost">
            © {new Date().getFullYear()} Y.P. & Associates. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 bg-gold/10 border border-gold/20 rounded-full px-3 py-1 text-gold text-[11px] font-jost font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              IBBI Registered Valuer · Pan India
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
