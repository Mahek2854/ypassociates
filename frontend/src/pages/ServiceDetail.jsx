import { useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/solid'
import { ClockIcon, CurrencyRupeeIcon, DocumentIcon } from '@heroicons/react/24/outline'
import SectionLabel from '../components/ui/SectionLabel'
import PageTransition from '../components/ui/PageTransition'
import FadeIn from '../components/ui/FadeIn'
import { services } from '../data/services.data'

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-forest/10 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-white hover:bg-cream/60 transition-colors"
      >
        <span className="font-cormorant font-semibold text-forest text-base">{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} className="flex-shrink-0">
          <ChevronDownIcon className="w-4 h-4 text-gold" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="px-5 py-4 text-text-muted font-jost text-sm leading-relaxed border-t border-forest/5 bg-cream/40">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ServiceDetail() {
  const { serviceId } = useParams()
  const svc = services.find((s) => s.id === serviceId)

  if (!svc) return <Navigate to="/services" replace />

  const others = services.filter((s) => s.id !== svc.id)

  return (
    <PageTransition>
      <Helmet>
        <title>{svc.title} | Y.P. & Associates</title>
        <meta name="description" content={svc.shortDesc} />
      </Helmet>

      {/* Hero */}
      <section className="bg-forest pt-32 pb-14 relative overflow-hidden">
        <div className="absolute inset-0 bg-diagonal-lines pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-cream/40 text-xs font-jost mb-7">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRightIcon className="w-3 h-3" />
            <Link to="/services" className="hover:text-gold transition-colors">Services</Link>
            <ChevronRightIcon className="w-3 h-3" />
            <span className="text-gold">{svc.title}</span>
          </div>

          <div className="flex items-start gap-5">
            <div className="text-5xl md:text-6xl">{svc.emoji}</div>
            <div>
              <span className="inline-block bg-gold/15 text-gold text-[10px] font-jost font-medium px-2.5 py-0.5 rounded-full uppercase tracking-wide mb-3">
                {svc.category}
              </span>
              <h1 className="font-cormorant font-bold text-cream"
                style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
                {svc.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[320px_1fr] gap-10 items-start">

            {/* Sticky Sidebar */}
            <div className="lg:sticky lg:top-24 space-y-4">
              {/* Quick info */}
              <div className="bg-white rounded-2xl border border-forest/5 p-6">
                <h3 className="font-cormorant font-semibold text-forest text-lg mb-4">Quick Info</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-cream/60">
                    <ClockIcon className="w-5 h-5 text-gold flex-shrink-0" />
                    <div>
                      <p className="text-[10px] font-jost text-text-muted uppercase tracking-wide">Turnaround</p>
                      <p className="font-jost font-medium text-forest text-sm">{svc.turnaround}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-cream/60">
                    <CurrencyRupeeIcon className="w-5 h-5 text-gold flex-shrink-0" />
                    <div>
                      <p className="text-[10px] font-jost text-text-muted uppercase tracking-wide">Price Range</p>
                      <p className="font-jost font-medium text-forest text-sm">{svc.priceRange}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-cream/60">
                    <DocumentIcon className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] font-jost text-text-muted uppercase tracking-wide mb-1">Documents Needed</p>
                      <ul className="space-y-1">
                        {svc.documentsNeeded.slice(0, 3).map((d) => (
                          <li key={d} className="text-forest text-xs font-jost">· {d}</li>
                        ))}
                        {svc.documentsNeeded.length > 3 && (
                          <li className="text-gold text-xs font-jost">+ {svc.documentsNeeded.length - 3} more</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA card */}
              <div className="bg-forest rounded-2xl p-6">
                <h3 className="font-cormorant font-semibold text-cream text-lg mb-2">Get This Report</h3>
                <p className="text-cream/50 font-jost text-xs mb-5 leading-relaxed">
                  Share your property details and get your report in {svc.turnaround}.
                </p>
                <Link to="/contact" className="gold-btn rounded-lg w-full justify-center mb-2">
                  Request a Quote
                </Link>
                <a href="tel:+919958067860" className="outline-btn rounded-lg w-full justify-center text-xs py-2.5">
                  Call Us Now
                </a>
              </div>

              {/* Other services */}
              <div className="bg-white rounded-2xl border border-forest/5 p-6">
                <h3 className="font-cormorant font-semibold text-forest text-base mb-4">Other Services</h3>
                <div className="space-y-2">
                  {others.slice(0, 4).map((s) => (
                    <Link
                      key={s.id}
                      to={`/services/${s.id}`}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-cream/60 transition-colors group"
                    >
                      <span className="text-xl">{s.emoji}</span>
                      <span className="font-jost text-sm text-forest group-hover:text-gold transition-colors leading-tight">
                        {s.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Right main content */}
            <div className="space-y-10">
              {/* Description */}
              <FadeIn>
                <div className="bg-white rounded-2xl border border-forest/5 p-8">
                  <SectionLabel className="mb-5">About This Service</SectionLabel>
                  <div className="space-y-4">
                    {svc.description.map((para, i) => (
                      <p key={i} className="text-text-dark font-jost text-sm leading-[1.8]">{para}</p>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* What's Included */}
              <FadeIn>
                <div className="bg-white rounded-2xl border border-forest/5 p-8">
                  <SectionLabel className="mb-5">What's Included</SectionLabel>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {svc.bullets.map((b) => (
                      <div key={b} className="flex items-start gap-2.5 p-3 rounded-lg bg-cream/50">
                        <CheckCircleIcon className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                        <span className="font-jost text-sm text-text-dark">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* Documents Required */}
              <FadeIn>
                <div className="bg-white rounded-2xl border border-forest/5 p-8">
                  <SectionLabel className="mb-5">Documents Required</SectionLabel>
                  <ol className="space-y-3">
                    {svc.documentsNeeded.map((doc, i) => (
                      <li key={doc} className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-gold text-xs font-bold font-jost flex-shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span className="font-jost text-sm text-text-dark leading-relaxed">{doc}</span>
                      </li>
                    ))}
                  </ol>
                  <p className="text-text-muted text-xs font-jost mt-5 p-3 bg-gold/5 border border-gold/10 rounded-lg">
                    💡 <strong className="text-forest">Tip:</strong> Don't worry if you don't have all documents. Call us and we'll guide you on exactly what's needed for your case.
                  </p>
                </div>
              </FadeIn>

              {/* Who Needs This */}
              <FadeIn>
                <div className="bg-white rounded-2xl border border-forest/5 p-8">
                  <SectionLabel className="mb-5">Who Needs This</SectionLabel>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {svc.whoNeeds.map((w) => (
                      <div key={w.title} className="p-5 rounded-xl bg-forest border border-white/5 hover:border-gold/20 transition-colors group">
                        <h4 className="font-cormorant font-semibold text-cream text-lg mb-1.5 group-hover:text-gold transition-colors">
                          {w.title}
                        </h4>
                        <p className="text-cream/50 font-jost text-sm leading-relaxed">{w.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* FAQ */}
              <FadeIn>
                <div className="bg-white rounded-2xl border border-forest/5 p-8">
                  <SectionLabel className="mb-5">Frequently Asked Questions</SectionLabel>
                  <div className="space-y-2">
                    {svc.faq.map((f) => (
                      <FAQItem key={f.q} q={f.q} a={f.a} />
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
