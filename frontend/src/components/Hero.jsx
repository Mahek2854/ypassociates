const stats = [
  { value: '7+', label: 'Years Experience' },
  { value: '1-Day', label: 'Turnaround' },
  { value: 'Pan India', label: 'Coverage' },
  { value: '100%', label: 'Bank Accepted' },
]

export default function Hero() {
  return (
    <section className="relative bg-forest min-h-screen flex items-center overflow-hidden pt-16">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gold/5 blur-3xl" />
        <div className="absolute bottom-0 -left-24 w-80 h-80 rounded-full bg-gold/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-gold/5" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — text */}
          <div>
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="text-gold text-sm font-medium">Government Approved Valuation Experts</span>
            </div>

            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-cream leading-tight mb-6">
              Expert Property<br />
              <span className="text-gold">Valuation</span> You<br />
              Can Trust
            </h1>

            <p className="text-cream/70 text-lg leading-relaxed mb-10 max-w-lg">
              Certified Chartered Engineers delivering accurate, bank-accepted property valuation reports across India — fast, reliable, and government approved.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="bg-gold text-forest px-7 py-3.5 rounded text-sm font-semibold hover:bg-yellow-500 transition-colors duration-200 text-center"
              >
                Get Free Consultation
              </a>
              <a
                href="#services"
                className="border border-cream/30 text-cream px-7 py-3.5 rounded text-sm font-medium hover:border-gold hover:text-gold transition-colors duration-200 text-center"
              >
                View Services
              </a>
            </div>
          </div>

          {/* Right — stats card */}
          <div className="lg:pl-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <p className="text-gold font-medium text-sm uppercase tracking-widest mb-6">Our Track Record</p>
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="font-playfair text-3xl font-bold text-gold mb-1">{stat.value}</div>
                    <div className="text-cream/60 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gold/20 border-2 border-forest flex items-center justify-center">
                      <span className="text-gold text-xs font-bold">{i}</span>
                    </div>
                  ))}
                </div>
                <p className="text-cream/60 text-sm">
                  <span className="text-cream font-semibold">500+</span> happy clients across India
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H0Z" fill="#f5f0e8" />
        </svg>
      </div>
    </section>
  )
}
