const steps = [
  {
    step: '01',
    title: 'Contact Us',
    description: 'Call or fill our online form with your property details and requirement.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    step: '02',
    title: 'Share Documents',
    description: 'Upload property papers via WhatsApp or email — we accept all common formats.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    step: '03',
    title: 'Expert Analysis',
    description: 'Our Chartered Engineers review your documents and conduct a thorough valuation.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    step: '04',
    title: 'Receive Report',
    description: 'Get your signed, stamped valuation report delivered digitally within 24 hours.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

export default function Process() {
  return (
    <section id="process" className="py-20 lg:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-gold font-medium text-sm uppercase tracking-widest mb-3">How It Works</p>
          <h2 className="section-heading text-forest">Simple 4-Step Process</h2>
          <div className="gold-divider" />
          <p className="text-forest/60 max-w-xl mx-auto text-base leading-relaxed">
            Getting your property valuation report is fast, simple, and completely online.
          </p>
        </div>

        <div className="relative">
          {/* Connector line — desktop only */}
          <div className="hidden lg:block absolute top-16 left-[calc(12.5%+2rem)] right-[calc(12.5%+2rem)] h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <div key={step.step} className="relative flex flex-col items-center text-center group">
                {/* Step circle */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-forest group-hover:bg-gold transition-colors duration-300 flex items-center justify-center text-cream group-hover:text-forest shadow-lg">
                    {step.icon}
                  </div>
                  {/* Connector arrow for mobile */}
                  {idx < steps.length - 1 && (
                    <div className="lg:hidden absolute -bottom-10 left-1/2 -translate-x-1/2 text-gold/40">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  )}
                </div>

                <span className="font-playfair text-4xl font-bold text-forest/10 absolute -top-2 right-1/2 translate-x-8 select-none">
                  {step.step}
                </span>

                <h3 className="font-playfair text-lg font-semibold text-forest mb-2">{step.title}</h3>
                <p className="text-forest/55 text-sm leading-relaxed max-w-[200px]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-forest text-cream px-8 py-3.5 rounded text-sm font-semibold hover:bg-forest/90 transition-colors duration-200"
          >
            Start Your Valuation
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
