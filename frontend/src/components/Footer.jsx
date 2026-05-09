const serviceLinks = [
  'Capital Gain Tax Valuation',
  'Property Valuation Report',
  'Chartered Engineer Certificate',
  'Loan Estimate Report',
  'Inheritance & Gift Valuation',
  'Insurance & Dispute Valuation',
]

const legalLinks = ['Privacy Policy', 'Terms of Service', 'Disclaimer', 'Sitemap']

export default function Footer() {
  return (
    <footer className="bg-forest text-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top */}
        <div className="py-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 bg-gold rounded flex items-center justify-center">
                <span className="text-forest font-playfair font-bold text-sm">YP</span>
              </div>
              <div>
                <span className="font-playfair font-bold text-gold text-lg block leading-none">Y.P. & Associates</span>
                <span className="text-cream/40 text-[10px] tracking-widest uppercase">Property Valuation Experts</span>
              </div>
            </div>
            <p className="text-cream/50 text-sm leading-relaxed max-w-xs mb-6">
              Government approved Chartered Engineers delivering accurate, bank-accepted property valuation reports across India since 2017.
            </p>
            <div className="space-y-2 text-sm text-cream/50">
              <p className="flex items-center gap-2">
                <span className="text-gold font-semibold text-xs">GST:</span> 27AABCY1234Z1Z5
              </p>
              <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-3 py-1">
                <svg className="w-3.5 h-3.5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gold text-xs font-medium">IBBI Registered Valuer</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-playfair font-semibold text-cream mb-4 text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#services"
                    className="text-cream/45 hover:text-gold text-sm transition-colors duration-200 leading-snug block"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-playfair font-semibold text-cream mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <div className="space-y-3 text-sm text-cream/50">
              <p>
                <a href="tel:+919958067860" className="hover:text-gold transition-colors">
                  +91 9958067860
                </a>
              </p>
              <p>
                <a href="mailto:info@ypassociates.in" className="hover:text-gold transition-colors">
                  info@ypassociates.in
                </a>
              </p>
              <p className="leading-relaxed">Mumbai, Maharashtra<br />Pan India Service Available</p>
              <a
                href="#contact"
                className="inline-block bg-gold text-forest px-4 py-2 rounded text-xs font-semibold hover:bg-yellow-500 transition-colors mt-2"
              >
                Get Free Quote
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-cream/30 text-xs">
            © {new Date().getFullYear()} Y.P. & Associates. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {legalLinks.map((link) => (
              <a key={link} href="#" className="text-cream/30 hover:text-gold text-xs transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
