const reasons = [
  {
    number: '01',
    title: 'IBBI Registered Valuer',
    description:
      'Our valuers are registered under IBBI for Land & Building assets, ensuring your report holds full legal validity.',
  },
  {
    number: '02',
    title: 'Simple Documentation',
    description:
      'Just share basic property documents — we handle the rest. No complicated paperwork or multiple follow-ups.',
  },
  {
    number: '03',
    title: 'Pan India — 100% Online',
    description:
      'No site visit required for most reports. Submit documents online and receive your report from anywhere in India.',
  },
  {
    number: '04',
    title: 'GST Registered Firm',
    description:
      'We are a fully GST-compliant firm. Receive proper tax invoices for all valuation services without any issues.',
  },
  {
    number: '05',
    title: '34AB Income Tax Approved Valuer',
    description:
      'Approved valuer under Section 34AB of the Income Tax Act — reports accepted by all Income Tax authorities across India.',
  },
  {
    number: '06',
    title: '7-Year Track Record',
    description:
      'Over 7 years of delivering accurate, timely, and accepted valuation reports — 5000+ satisfied clients.',
  },
]

export default function WhyUs() {
  return (
    <section id="why-us" className="py-20 lg:py-28 bg-forest">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-gold font-medium text-sm uppercase tracking-widest mb-3">Our Advantage</p>
          <h2 className="section-heading text-cream">Why Choose Y.P. & Associates?</h2>
          <div className="gold-divider" />
          <p className="text-cream/50 max-w-xl mx-auto text-base leading-relaxed">
            Trusted by banks, courts, and clients across India for accurate and timely property valuations.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason) => (
            <div
              key={reason.number}
              className="relative p-7 rounded-2xl border border-white/5 bg-white/3 hover:bg-white/8 hover:border-gold/30 transition-all duration-300 group"
            >
              <span className="font-playfair text-5xl font-bold text-gold/15 group-hover:text-gold/25 transition-colors duration-300 absolute top-5 right-6 select-none">
                {reason.number}
              </span>
              <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center mb-5">
                <span className="font-playfair font-bold text-gold text-sm">{reason.number}</span>
              </div>
              <h3 className="font-playfair text-lg font-semibold text-cream mb-3 group-hover:text-gold transition-colors duration-200">
                {reason.title}
              </h3>
              <p className="text-cream/50 text-sm leading-relaxed">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
