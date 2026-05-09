import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import {
  PhoneIcon, DocumentTextIcon, MagnifyingGlassIcon,
  CalculatorIcon, PencilSquareIcon, EnvelopeIcon,
} from '@heroicons/react/24/outline'
import SectionLabel from '../components/ui/SectionLabel'
import PageTransition from '../components/ui/PageTransition'
import FadeIn from '../components/ui/FadeIn'

const STEPS = [
  {
    number: '01',
    title: 'Contact & Consultation',
    icon: PhoneIcon,
    time: 'Day 0 — Free',
    desc: "Reach out via call, WhatsApp, or our contact form. Tell us your property type, location, and the purpose of valuation. We'll guide you to the exact service you need — completely free of charge.",
    actions: ['Call or WhatsApp +91 9958067860', 'Fill our online enquiry form', 'Tell us your property details', 'We confirm service type and quote'],
  },
  {
    number: '02',
    title: 'Document Submission',
    icon: DocumentTextIcon,
    time: 'Day 0–1',
    desc: "Share your property documents via WhatsApp or email. No physical visit to our office is required. We accept documents in PDF, JPG, or any common format. We'll acknowledge receipt and confirm the timeline.",
    actions: ['Share sale deed / title documents', 'Send property photographs (if available)', 'Share location details (Google Maps pin welcome)', 'We send payment link & confirm start date'],
  },
  {
    number: '03',
    title: 'Site Visit / Remote Analysis',
    icon: MagnifyingGlassIcon,
    time: 'Day 1',
    desc: 'For most reports, we conduct the analysis remotely using the documents, photographs, and location data you share. For complex cases (structural assessments, post-damage valuation), a site visit is arranged.',
    actions: ['Remote analysis using documents & photos', 'Location analysis using satellite & field data', 'Comparable sales research in the area', 'Site visit arranged for complex cases'],
  },
  {
    number: '04',
    title: 'Valuation Computation',
    icon: CalculatorIcon,
    time: 'Day 1',
    desc: 'Our Chartered Engineer applies the appropriate valuation methodology — Comparable Sales, Income, or Cost Approach — to determine the market value. All computations are documented and verified.',
    actions: ['Apply appropriate valuation methodology', 'Research comparable sales data', 'Compute and cross-verify the value', 'CE review and technical sign-off'],
  },
  {
    number: '05',
    title: 'Report Preparation',
    icon: PencilSquareIcon,
    time: 'Day 1–2',
    desc: "The valuation report is prepared in the appropriate format — Income Tax format, bank format, court format, or general format — with full documentation, methodology, and the Chartered Engineer's signature and CE seal.",
    actions: ['Draft report in required format', 'Include full methodology and data', 'CE signature and official stamp', 'Quality review and final approval'],
  },
  {
    number: '06',
    title: 'Report Delivery & Support',
    icon: EnvelopeIcon,
    time: 'Day 1–2 — Done',
    desc: 'The completed, signed, and stamped report is delivered to you digitally via WhatsApp and email. Physical copies are available on request. We remain available for any follow-up questions or bank/CA queries.',
    actions: ['PDF delivery via WhatsApp & email', 'Physical hard copy available on request', 'Direct delivery to bank branch if needed', 'Free post-delivery support for queries'],
  },
]

const DOCUMENTS = [
  { icon: '📄', title: 'Sale Deed / Title Deed', desc: 'The primary ownership document for the property.' },
  { icon: '🗺️', title: 'Building Plan', desc: 'Approved building plan / layout plan from the municipality.' },
  { icon: '📋', title: 'Property Tax Receipts', desc: 'Latest property tax payment receipts from the local body.' },
  { icon: '📸', title: 'Property Photographs', desc: 'Recent photos of the property — exterior and interior if possible.' },
  { icon: '📍', title: 'Location Details', desc: 'Complete address with locality, pin code, or Google Maps link.' },
  { icon: '📑', title: 'Society / NOC Documents', desc: 'Society NOC or occupancy certificate for apartments/flats.' },
]

const FAQ = [
  { q: 'Do you need to physically visit the property?', a: 'No, for most reports we work remotely. You share documents, photos, and location details, and we complete the valuation without visiting your property. Site visits are only required for complex structural assessments or post-damage valuations.' },
  { q: 'How do I share my documents?', a: 'The easiest way is via WhatsApp (+91 9958067860). You can also email them to info@ypassociates.in. We accept PDF, JPG, PNG, and most common document formats. Quality scans are preferred but photos of documents are also fine.' },
  { q: 'What if I don\'t have all the required documents?', a: 'Contact us first — we\'ll guide you on the minimum documents needed for your specific case. Often, we can work with what you have and request additional documents only if absolutely necessary.' },
  { q: 'How do I receive the report?', a: 'The report is delivered as a PDF via WhatsApp and email. For reports requiring a physical stamp (some bank requirements), we can courier a hard copy to your address or deliver directly to the bank branch.' },
  { q: 'What payment methods do you accept?', a: 'We accept UPI (PhonePe, GPay, Paytm), bank transfer (NEFT/IMPS), and net banking. We send a GST invoice for all payments. Advance payment is typically required before we begin work.' },
  { q: 'Can I get an urgent/same-day report?', a: 'Yes. For most service types, we offer same-day (within 24 hours) delivery for an additional urgent fee. Mention urgent requirement when you contact us and we\'ll confirm availability.' },
  { q: 'What if my bank rejects the report?', a: 'This is very rare, but if it happens, we will investigate the bank\'s specific requirements and revise the report at no charge. We have a very high acceptance rate because we\'re familiar with what each major bank requires.' },
  { q: 'Do you provide Pan India services?', a: 'Yes. We provide valuation services for properties across all states and union territories of India. Since most of our work is done remotely, location is not a constraint. Simply share your documents and we\'ll take it from there.' },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-forest/10 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-white hover:bg-cream/50 transition-colors"
      >
        <span className="font-cormorant font-semibold text-forest text-base">{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDownIcon className="w-4 h-4 text-gold flex-shrink-0" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="ans"
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
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

export default function Process() {
  return (
    <PageTransition>
      <Helmet>
        <title>Our Process | Y.P. & Associates — Property Valuation</title>
        <meta name="description" content="Simple 6-step online process to get your property valuation report. No site visit needed. Share documents and receive your report in 1–2 days." />
      </Helmet>

      {/* Hero */}
      <section className="bg-forest pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-diagonal-lines pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-cream/40 text-xs font-jost mb-8">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRightIcon className="w-3 h-3" />
            <span className="text-gold">Process</span>
          </div>
          <SectionLabel light className="mb-5">How We Work</SectionLabel>
          <h1 className="font-cormorant font-bold text-cream mb-5"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)' }}>
            Our Process
          </h1>
          <p className="text-cream/55 font-jost max-w-xl leading-relaxed">
            A streamlined 6-step process designed to be completely online, fast, and hassle-free.
            Most reports are delivered within 24 hours.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <SectionLabel className="justify-center mb-4">Step by Step</SectionLabel>
            <h2 className="section-heading text-forest">6-Step Valuation Journey</h2>
          </FadeIn>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold/40 via-gold/20 to-transparent transform md:-translate-x-px hidden sm:block" />

            <div className="space-y-10">
              {STEPS.map((step, i) => {
                const isEven = i % 2 === 0
                return (
                  <FadeIn key={step.number} delay={0.05}>
                    <div className={`relative flex flex-col md:flex-row gap-6 ${!isEven ? 'md:flex-row-reverse' : ''}`}>
                      {/* Number circle — center on desktop */}
                      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-gold border-4 border-cream z-10 items-center justify-center">
                        <span className="font-cormorant font-bold text-forest text-lg">{step.number}</span>
                      </div>

                      {/* Content card */}
                      <div className={`flex-1 ${isEven ? 'md:pr-20' : 'md:pl-20'}`}>
                        <div className="bg-white rounded-2xl border border-forest/5 p-7 card-hover">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="md:hidden w-10 h-10 rounded-full bg-gold flex items-center justify-center flex-shrink-0">
                              <span className="font-cormorant font-bold text-forest text-sm">{step.number}</span>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-forest/5 flex items-center justify-center">
                              <step.icon className="w-5 h-5 text-gold" />
                            </div>
                            <div>
                              <h3 className="font-cormorant font-semibold text-forest text-xl">{step.title}</h3>
                              <span className="text-gold text-xs font-jost font-medium">{step.time}</span>
                            </div>
                          </div>
                          <p className="text-text-muted font-jost text-sm leading-relaxed mb-4">{step.desc}</p>
                          <ul className="space-y-1.5">
                            {step.actions.map((a) => (
                              <li key={a} className="flex items-center gap-2 text-text-dark text-sm font-jost">
                                <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0" />
                                {a}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Empty half for alternating layout */}
                      <div className="hidden md:block flex-1" />
                    </div>
                  </FadeIn>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Documents section */}
      <section className="py-20 bg-forest">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <SectionLabel light className="justify-center mb-4">What to Prepare</SectionLabel>
            <h2 className="font-cormorant font-bold text-cream mb-4"
              style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}>
              Commonly Required Documents
            </h2>
            <p className="text-cream/50 font-jost max-w-lg mx-auto text-sm">
              You may not need all of these. Contact us first and we'll confirm exactly what's required for your case.
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {DOCUMENTS.map((doc, i) => (
              <FadeIn key={doc.title} delay={i * 0.07}>
                <div className="p-5 rounded-xl border border-white/5 hover:border-gold/25 hover:bg-white/5 transition-all duration-300 group">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl flex-shrink-0">{doc.icon}</span>
                    <div>
                      <h4 className="font-cormorant font-semibold text-cream text-base mb-1 group-hover:text-gold transition-colors">
                        {doc.title}
                      </h4>
                      <p className="text-cream/45 font-jost text-sm leading-relaxed">{doc.desc}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-10">
            <SectionLabel className="justify-center mb-4">Common Questions</SectionLabel>
            <h2 className="section-heading text-forest">Process FAQs</h2>
          </FadeIn>
          <div className="space-y-2">
            {FAQ.map((f) => <FAQItem key={f.q} q={f.q} a={f.a} />)}
          </div>

          <FadeIn className="mt-12 text-center">
            <p className="text-text-muted font-jost text-sm mb-4">Still have questions?</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="tel:+919958067860" className="gold-btn rounded-lg">Call Us Now</a>
              <Link to="/contact" className="dark:text-forest border border-forest/20 text-forest font-jost font-medium text-sm px-6 py-3 rounded-lg hover:border-gold hover:text-gold transition-colors inline-flex items-center gap-2 justify-center">
                Send a Message
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </PageTransition>
  )
}
