const services = [
  {
    icon: '📈',
    title: 'Capital Gain Tax Valuation',
    description:
      'Accurate fair market value reports for capital gains computation. Accepted by Income Tax authorities for property sale transactions.',
  },
  {
    icon: '🏢',
    title: 'Property Valuation Report',
    description:
      'Comprehensive valuation of residential, commercial, and industrial properties for sale, purchase, mortgage, or legal purposes.',
  },
  {
    icon: '📜',
    title: 'Chartered Engineer Certificate',
    description:
      'Official CE-stamped certificates for construction quality, structural safety, area certificates, and completion reports.',
  },
  {
    icon: '🏦',
    title: 'Loan Estimate Report',
    description:
      'Bank-accepted valuation reports for home loans, LAP, and mortgage. Accepted by all major nationalised and private banks.',
  },
  {
    icon: '👨‍👩‍👧',
    title: 'Inheritance & Gift Valuation',
    description:
      'Fair market value reports for inherited or gifted properties required for stamp duty, legal documentation, and tax compliance.',
  },
  {
    icon: '⚖️',
    title: 'Insurance & Dispute Valuation',
    description:
      'Independent property valuation for insurance claims, legal disputes, court cases, and arbitration proceedings.',
  },
]

export default function Services() {
  return (
    <section id="services" className="py-20 lg:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-gold font-medium text-sm uppercase tracking-widest mb-3">What We Offer</p>
          <h2 className="section-heading text-forest">Our Valuation Services</h2>
          <div className="gold-divider" />
          <p className="text-forest/60 max-w-xl mx-auto text-base leading-relaxed">
            Comprehensive property valuation solutions tailored to your needs, backed by certified expertise.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white rounded-2xl p-7 border border-forest/5 card-hover group cursor-default"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="font-playfair text-lg font-semibold text-forest mb-3 group-hover:text-gold transition-colors duration-200">
                {service.title}
              </h3>
              <p className="text-forest/60 text-sm leading-relaxed">{service.description}</p>
              <div className="mt-5 flex items-center gap-1 text-gold text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <a href="#contact">Enquire Now</a>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
