import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { ArrowRightIcon, ClockIcon } from '@heroicons/react/24/outline'
import { CheckCircleIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import SectionLabel from '../components/ui/SectionLabel'
import PageTransition from '../components/ui/PageTransition'
import FadeIn from '../components/ui/FadeIn'
import { services } from '../data/services.data'

const SERVICE_IMAGES = {
  'capital-gain-tax': 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=70',
  'property-valuation': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=70',
  'chartered-engineer-certificate': 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=70',
  'loan-estimate-report': 'https://images.unsplash.com/photo-1565728744382-61accd4aa148?auto=format&fit=crop&w=800&q=70',
  'inheritance-gift-valuation': 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=70',
  'insurance-dispute-valuation': 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=70',
}

function ServiceCard({ svc, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: (index % 2) * 0.1, ease: 'easeOut' }}
      className="group bg-white rounded-2xl border border-forest/5 overflow-hidden card-hover flex flex-col shadow-sm hover:shadow-lg transition-shadow duration-300"
    >
      {/* Header image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={SERVICE_IMAGES[svc.id]}
          alt={svc.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=60' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="text-3xl">{svc.emoji}</span>
          <span className="bg-gold/90 text-forest text-[10px] font-jost font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide">
            {svc.category}
          </span>
        </div>
        <span className="absolute top-4 right-4 font-cormorant font-bold text-white/20 text-5xl leading-none select-none">
          {svc.number}
        </span>
      </div>

      <div className="p-8 flex flex-col flex-1">
        {/* Top */}
        <div className="mb-5">
          <h3 className="font-cormorant font-bold text-forest text-2xl leading-tight group-hover:text-gold transition-colors duration-200">
            {svc.title}
          </h3>
        </div>

        <p className="text-text-muted font-jost text-sm leading-relaxed mb-5">
          {svc.description[0]}
        </p>

        {/* Bullets */}
        <ul className="space-y-2 mb-6">
          {svc.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2">
              <CheckCircleIcon className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
              <span className="text-text-dark text-sm font-jost">{b}</span>
            </li>
          ))}
        </ul>

        {/* Turnaround badge */}
        <div className="flex items-center gap-1.5 mb-6">
          <ClockIcon className="w-4 h-4 text-gold" />
          <span className="text-xs font-jost font-medium text-gold bg-gold/8 border border-gold/20 px-2.5 py-0.5 rounded-full">
            Ready in {svc.turnaround}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 mt-auto pt-4 border-t border-forest/5">
          <Link
            to={`/services/${svc.id}`}
            className="flex items-center gap-1 text-text-muted hover:text-gold font-jost text-sm transition-colors"
          >
            Learn More <ChevronRightIcon className="w-4 h-4" />
          </Link>
          <Link
            to="/contact"
            className="ml-auto gold-btn rounded-lg py-2 px-4 text-xs"
          >
            Get Quote
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default function Services() {
  return (
    <PageTransition>
      <Helmet>
        <title>Our Services | Y.P. & Associates — Property Valuation</title>
        <meta name="description" content="Comprehensive property valuation services: Capital Gain Tax, Bank Valuation, Chartered Engineer Certificate, Inheritance Valuation & more. Pan India." />
      </Helmet>

      {/* Hero */}
      <section className="bg-forest pt-32 pb-20 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=40"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-10"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-diagonal-lines pointer-events-none" />
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-gold/5 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-cream/40 text-xs font-jost mb-8">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRightIcon className="w-3 h-3" />
            <span className="text-gold">Services</span>
          </div>

          <SectionLabel light className="mb-5">What We Offer</SectionLabel>
          <h1 className="font-cormorant font-bold text-cream mb-5"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)' }}>
            Our Valuation Services
          </h1>
          <p className="text-cream/55 font-jost max-w-xl leading-relaxed">
            Six specialized valuation services — each designed to meet specific legal, tax, and
            banking requirements across India.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-7">
            {services.map((svc, i) => (
              <ServiceCard key={svc.id} svc={svc} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <FadeIn>
        <section className="bg-forest py-14">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-6 justify-between">
            <div>
              <h3 className="font-cormorant font-bold text-cream text-2xl mb-1">
                Not sure which service you need?
              </h3>
              <p className="text-cream/50 font-jost text-sm">
                Call us or send a WhatsApp — we'll guide you to the right service free of charge.
              </p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <a href="tel:+919958067860" className="gold-btn rounded-lg">
                Call Now
              </a>
              <Link to="/contact" className="outline-btn rounded-lg">
                Free Consultation
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </FadeIn>
    </PageTransition>
  )
}
