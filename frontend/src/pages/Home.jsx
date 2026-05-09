import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import {
  CheckCircleIcon,
  ArrowRightIcon,
  StarIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/solid'
import { PhoneIcon } from '@heroicons/react/24/outline'
import SectionLabel from '../components/ui/SectionLabel'
import PageTransition from '../components/ui/PageTransition'
import FadeIn from '../components/ui/FadeIn'
import { featuredServices } from '../data/services.data'

/* ─── Helpers ─── */
function FadeStagger({ children, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

/* ─── Hero ─── */
const heroContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.14 } } }
const heroItem = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
}

const STATS = [
  { value: '15+', label: 'Years Experience' },
  { value: '1 Day', label: 'Turnaround' },
  { value: 'Pan India', label: 'Coverage' },
  { value: '100%', label: 'Bank Accepted' },
]

const TRUST_ITEMS = [
  'IBBI Registered Valuer',
  '34AB Income Tax Approved Valuer',
  'GST Registered Firm',
]

function HeroSection() {
  return (
    <section className="relative bg-forest min-h-screen flex items-center overflow-hidden pt-16">
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-gold animate-orb-float pointer-events-none blur-[120px]" />
      <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-gold/40 animate-orb-float pointer-events-none blur-[100px] [animation-delay:-4s]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 lg:py-32">
        <div className="grid lg:grid-cols-[55%_45%] gap-12 lg:gap-16 items-center">
          {/* Left */}
          <motion.div variants={heroContainer} initial="hidden" animate="visible">
            <motion.div variants={heroItem}>
              <span className="inline-flex items-center gap-2 bg-gold/10 border border-gold/25 rounded-full px-4 py-1.5 mb-7">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                <span className="text-gold font-jost text-xs font-medium tracking-wide">
                  IBBI Registered Valuer · GST Registered · Pan India
                </span>
              </span>
            </motion.div>

            <motion.h1
              variants={heroItem}
              className="font-cormorant font-bold text-cream leading-[1.1] mb-6"
              style={{ fontSize: 'clamp(2.8rem, 5vw, 4.5rem)' }}
            >
              India's Trusted<br />
              Property{' '}
              <em className="text-gold" style={{ fontStyle: 'italic' }}>Valuation</em>
              <br />
              Experts
            </motion.h1>

            <motion.p
              variants={heroItem}
              className="text-cream/60 font-jost text-base md:text-lg leading-relaxed mb-9 max-w-lg"
            >
              IBBI Registered Valuers delivering accurate, bank-accepted property
              valuation reports across India — fast, reliable, and 100% approved.
            </motion.p>

            <motion.div variants={heroItem} className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link to="/contact" className="gold-btn rounded-lg px-7 py-3.5">
                Get Free Quote
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
              <Link to="/services" className="outline-btn rounded-lg px-7 py-3.5">
                View Services
              </Link>
            </motion.div>

            <motion.div variants={heroItem} className="flex flex-col sm:flex-row gap-4">
              {TRUST_ITEMS.map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-gold flex-shrink-0" />
                  <span className="text-cream/60 text-xs font-jost">{t}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Property photo + stats overlay */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                alt="Premium property valuation"
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/60 to-transparent" />

              {/* IBBI Badge */}
              <div className="absolute top-5 left-5 bg-gold rounded-xl px-4 py-2.5 shadow-lg">
                <p className="font-jost font-bold text-forest text-[10px] uppercase tracking-wider">IBBI Registered</p>
                <p className="font-cormorant font-bold text-forest text-base leading-none">Registered Valuer</p>
              </div>

              {/* Stats overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5 space-y-3">
                <div className="grid grid-cols-2 gap-2.5">
                  {STATS.map((s) => (
                    <div key={s.label} className="text-center p-3 rounded-xl"
                      style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)' }}>
                      <div className="font-cormorant font-bold text-gold text-3xl mb-0.5">{s.value}</div>
                      <div className="text-cream/70 text-[11px] font-jost">{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)' }}>
                  <div className="flex -space-x-1.5">
                    {['R', 'P', 'A'].map((l) => (
                      <div key={l} className="w-8 h-8 rounded-full bg-gold/30 border-2 border-white/20 flex items-center justify-center">
                        <span className="text-gold text-xs font-bold font-cormorant">{l}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-cream/70 text-sm font-jost">
                    <span className="text-cream font-semibold">5000+</span> satisfied clients
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex gap-2 flex-wrap">
              {['Bank Approved', 'IBBI Registered', 'GST Invoice', 'Pan India'].map((b) => (
                <span key={b} className="bg-gold/10 border border-gold/20 text-gold text-[11px] font-jost px-3 py-1 rounded-full">
                  {b}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 56L60 46C120 36 240 16 360 11C480 6 600 16 720 21C840 26 960 26 1080 21C1200 16 1320 6 1380 1L1440 -4V56H0Z" fill="#c8a96e" />
        </svg>
      </div>
    </section>
  )
}

/* ─── Marquee Trust Bar ─── */
const MARQUEE_ITEMS = [
  'IBBI Registered Valuer',
  '34AB Income Tax Approved Valuer',
  'Chartered Engineer',
  '24hr Delivery',
  'Delhi NCT',
  'Pan India',
  'GST Registered',
  'Bank Accepted Reports',
  'CE Certificate',
  '5000+ Properties Valued',
]

function MarqueeTrustBar() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]
  return (
    <div className="bg-gold py-3.5 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((it, i) => (
          <span key={i} className="inline-flex items-center gap-3 mx-2">
            <span className="text-forest font-jost font-semibold text-sm tracking-wide">{it}</span>
            <span className="text-forest/40">◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}

/* ─── Services Preview ─── */
const SERVICE_CARD_IMAGES = {
  'capital-gain-tax': 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=70',
  'property-valuation': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=70',
  'chartered-engineer-certificate': 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=70',
}

function ServiceCard({ svc }) {
  const imgSrc = SERVICE_CARD_IMAGES[svc.id]
  return (
    <Link
      to={`/services/${svc.id}`}
      className="group block bg-white rounded-2xl border border-forest/5 border-t-2 border-t-transparent hover:border-t-gold card-hover h-full overflow-hidden"
    >
      {imgSrc && (
        <div className="relative h-44 overflow-hidden">
          <img
            src={imgSrc}
            alt={svc.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
          <span className="absolute top-3 left-3 bg-gold/90 text-forest text-[10px] font-jost font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide">
            {svc.category}
          </span>
        </div>
      )}
      <div className="p-7">
        <div className="flex items-start justify-between mb-3">
          <span className="text-3xl">{svc.emoji}</span>
          <span className="font-cormorant text-5xl font-bold text-forest/8 leading-none select-none">{svc.number}</span>
        </div>
        <h3 className="font-cormorant text-xl font-semibold text-forest mb-2 group-hover:text-gold transition-colors duration-200">
          {svc.title}
        </h3>
        <p className="text-text-muted text-sm font-jost leading-relaxed mb-4">{svc.shortDesc}</p>
        <div className="flex items-center gap-1 text-gold text-sm font-jost font-medium">
          Learn more <ChevronRightIcon className="w-4 h-4" />
        </div>
      </div>
    </Link>
  )
}

function ServicesPreview() {
  return (
    <section className="py-20 lg:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-14">
          <SectionLabel className="justify-center mb-4">Our Services</SectionLabel>
          <h2 className="section-heading text-forest mb-4">
            Expert Valuation for<br />Every Need
          </h2>
          <p className="text-text-muted font-jost max-w-xl mx-auto leading-relaxed">
            From capital gain tax certificates to bank valuation reports — comprehensive property
            valuation services trusted by clients and institutions across India.
          </p>
        </FadeIn>

        <FadeStagger className="grid md:grid-cols-3 gap-6 mb-10">
          {featuredServices.map((svc) => (
            <motion.div key={svc.id} variants={item}>
              <ServiceCard svc={svc} />
            </motion.div>
          ))}
        </FadeStagger>

        <FadeIn className="text-center">
          <Link to="/services" className="ghost-btn text-base">
            View All 6 Services
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </FadeIn>
      </div>
    </section>
  )
}

/* ─── Property Gallery ─── */
const GALLERY_ITEMS = [
  {
    category: 'Residential',
    examples: 'Apartments, Houses & Villas',
    img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=75',
    count: '2,000+',
  },
  {
    category: 'Commercial',
    examples: 'Offices, Retail & Showrooms',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=75',
    count: '800+',
  },
  {
    category: 'Industrial',
    examples: 'Warehouses & Factories',
    img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=75',
    count: '400+',
  },
  {
    category: 'Agricultural',
    examples: 'Farmland, Plots & Rural Land',
    img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=75',
    count: '500+',
  },
]

function GallerySection() {
  return (
    <section className="py-20 lg:py-28 bg-forest">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-14">
          <SectionLabel light className="justify-center mb-4">Our Portfolio</SectionLabel>
          <h2 className="font-cormorant font-bold text-cream mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Properties We Value
          </h2>
          <p className="text-cream/50 font-jost max-w-lg mx-auto text-sm leading-relaxed">
            From budget apartments to premium commercial complexes — accurate valuations for every property type across India.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {GALLERY_ITEMS.map((g, i) => (
            <FadeIn key={g.category} delay={i * 0.1}>
              <div className="group relative rounded-2xl overflow-hidden cursor-default" style={{ aspectRatio: '3/4' }}>
                <img
                  src={g.img}
                  alt={g.category + ' property valuation'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/40 to-transparent group-hover:via-forest/20 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="inline-block bg-gold/20 border border-gold/30 text-gold text-[10px] font-jost px-2.5 py-0.5 rounded-full mb-2">
                    {g.count} valued
                  </span>
                  <h3 className="font-cormorant font-bold text-cream text-xl mb-0.5">{g.category}</h3>
                  <p className="text-cream/60 text-xs font-jost">{g.examples}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Why Us ─── */
const WHY_REASONS = [
  { n: '01', title: 'IBBI Registered Valuer', desc: 'Registered valuer under IBBI for Land & Building assets — recognized under Section 34AB of the Income Tax Act.' },
  { n: '02', title: 'Simple Documentation', desc: 'Share basic documents online — no complicated paperwork or repeated follow-ups.' },
  { n: '03', title: '100% Online Process', desc: 'No site visit required for most reports. Submit documents and receive your report digitally.' },
  { n: '04', title: 'GST Registered', desc: 'Full GST compliance. Receive proper tax invoices for all services.' },
  { n: '05', title: '34AB Income Tax Approved Valuer', desc: 'Approved valuer under Section 34AB of the Income Tax Act — reports accepted by all Income Tax authorities.' },
  { n: '06', title: '15-Year Track Record', desc: 'Over 15 years delivering accurate, timely reports with a 100% acceptance rate.' },
]

function WhyUsSection() {
  return (
    <section id="why-us" className="py-20 lg:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[35%_65%] gap-16 items-start">
          <FadeIn direction="left">
            <SectionLabel className="mb-6">Why Choose Us</SectionLabel>
            <h2 className="font-cormorant font-bold text-forest leading-tight mb-8"
              style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)' }}>
              Why<br />Y.P. &<br />Associates?
            </h2>
            <div className="space-y-8">
              {[
                { value: '5000+', label: 'Properties Valued' },
                { value: '98%', label: 'Client Satisfaction' },
                { value: '15+', label: 'Years Experience' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-cormorant text-5xl font-bold text-gold">{s.value}</div>
                  <div className="text-forest/50 font-jost text-sm mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeStagger className="grid sm:grid-cols-2 gap-5">
            {WHY_REASONS.map((r) => (
              <motion.div
                key={r.n}
                variants={item}
                className="relative p-6 rounded-2xl border border-forest/10 bg-white hover:border-gold/40 hover:shadow-md transition-all duration-300 group"
              >
                <span className="absolute top-4 right-5 font-cormorant text-4xl font-bold text-gold/10 group-hover:text-gold/20 transition-colors select-none">
                  {r.n}
                </span>
                <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center mb-4">
                  <span className="text-gold text-xs font-bold font-jost">{r.n}</span>
                </div>
                <h3 className="font-cormorant text-lg font-semibold text-forest mb-2 group-hover:text-gold transition-colors">
                  {r.title}
                </h3>
                <p className="text-forest/50 text-sm font-jost leading-relaxed">{r.desc}</p>
              </motion.div>
            ))}
          </FadeStagger>
        </div>
      </div>
    </section>
  )
}

/* ─── Process Preview ─── */
const PROCESS_STEPS = [
  { step: '01', title: 'Contact Us', desc: 'Call or fill our enquiry form with your property details.' },
  { step: '02', title: 'Share Documents', desc: 'Send property papers via WhatsApp or email — completely online.' },
  { step: '03', title: 'Expert Analysis', desc: 'Our Chartered Engineers review and compute the valuation.' },
  { step: '04', title: 'Receive Report', desc: 'Get your signed, stamped report digitally within 24 hours.' },
]

function ProcessPreview() {
  return (
    <section className="py-20 lg:py-28 bg-forest relative overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1920&q=40"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-10"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-diagonal-lines pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-14">
          <SectionLabel light className="justify-center mb-4">How It Works</SectionLabel>
          <h2 className="font-cormorant font-bold text-cream mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Simple 4-Step Process
          </h2>
          <p className="text-cream/50 font-jost max-w-lg mx-auto">
            Get your property valuation report in 4 simple steps — no site visit required for most cases.
          </p>
        </FadeIn>

        <FadeStagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {PROCESS_STEPS.map((s, i) => (
            <motion.div key={s.step} variants={item} className="relative text-center group">
              {i < PROCESS_STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[60%] right-[-40%] h-px bg-gold/20" />
              )}
              <div className="w-16 h-16 rounded-2xl bg-gold/10 border border-gold/30 group-hover:bg-gold transition-colors duration-300 mx-auto mb-5 flex items-center justify-center shadow-lg">
                <span className="font-cormorant font-bold text-gold group-hover:text-forest text-lg transition-colors">
                  {s.step}
                </span>
              </div>
              <h3 className="font-cormorant text-lg font-semibold text-cream mb-2">{s.title}</h3>
              <p className="text-cream/50 text-sm font-jost leading-relaxed max-w-[180px] mx-auto">{s.desc}</p>
            </motion.div>
          ))}
        </FadeStagger>

        <FadeIn className="text-center">
          <Link to="/process" className="inline-flex items-center gap-2 text-gold border border-gold/30 font-jost font-medium text-sm px-6 py-2.5 rounded-lg hover:bg-gold/10 transition-colors">
            Learn More About Our Process
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </FadeIn>
      </div>
    </section>
  )
}

/* ─── Testimonials ─── */
const TESTIMONIALS = [
  {
    name: 'Rajesh Gupta',
    city: 'New Delhi',
    rating: 5,
    service: 'Capital Gain Tax Valuation',
    text: 'Excellent service! Got my FMV certificate within 24 hours. The report was accepted by my CA and the Income Tax portal without any issues. Highly professional team.',
    initials: 'RG',
    bg: '#3B82F6',
  },
  {
    name: 'Priya Sharma',
    city: 'Noida',
    rating: 5,
    service: 'Loan Estimate Report',
    text: 'SBI required a valuation report for my home loan. Y.P. Associates delivered it the same day I sent the documents. The bank accepted it immediately. Very impressed!',
    initials: 'PS',
    bg: '#8B5CF6',
  },
  {
    name: 'Amit Chandra',
    city: 'Gurgaon',
    rating: 5,
    service: 'Property Valuation Report',
    text: 'I needed a valuation for a property dispute settlement. The report was thorough, well-documented, and the CE stamp gave it the authority our lawyer needed. Thank you!',
    initials: 'AC',
    bg: '#10B981',
  },
]

function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-14">
          <SectionLabel className="justify-center mb-4">Client Reviews</SectionLabel>
          <h2 className="section-heading text-forest mb-4">What Our Clients Say</h2>
          <p className="text-text-muted font-jost max-w-md mx-auto text-sm">
            Real feedback from real clients across India.
          </p>
        </FadeIn>

        <FadeStagger className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={i} variants={item}>
              <div className="bg-white rounded-2xl p-7 border border-forest/5 h-full flex flex-col shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="text-gold/20 font-cormorant text-8xl leading-none -mb-4 -mt-2 select-none">"</div>
                <div className="flex gap-0.5 mb-3 mt-2">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <StarIcon key={j} className="w-4 h-4 text-gold" />
                  ))}
                </div>
                <p className="text-text-dark font-jost text-sm leading-relaxed flex-1 mb-5">{t.text}</p>
                <div className="border-t border-forest/10 pt-4 flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 text-white font-jost font-bold text-sm shadow-sm"
                    style={{ background: t.bg }}
                  >
                    {t.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-cormorant font-semibold text-forest text-base">{t.name}</p>
                    <p className="text-text-muted text-xs font-jost">{t.city}</p>
                  </div>
                  <span className="text-[10px] font-jost text-gold/70 bg-gold/8 border border-gold/15 px-2 py-0.5 rounded-full text-right flex-shrink-0">
                    {t.service}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </FadeStagger>
      </div>
    </section>
  )
}

/* ─── CTA Banner ─── */
function CTABanner() {
  return (
    <FadeIn>
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-forest" />
        <div className="absolute inset-0 bg-diagonal-lines pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold/5 blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionLabel className="justify-center mb-5" light>Get Started Today</SectionLabel>
          <h2 className="font-cormorant font-bold text-cream mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Ready to Get Your Property Valued?
          </h2>
          <p className="text-cream/55 font-jost mb-8 max-w-lg mx-auto leading-relaxed">
            Join 5000+ satisfied clients who trust Y.P. & Associates for accurate, fast, and
            IBBI-registered property valuations.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <Link to="/contact" className="gold-btn rounded-lg px-8 py-3.5">
              Get Free Consultation
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
            <Link to="/services" className="outline-btn rounded-lg px-8 py-3.5">
              Explore Services
            </Link>
          </div>
          <a href="tel:+919958067860" className="inline-flex items-center gap-2 text-gold font-jost font-medium">
            <PhoneIcon className="w-4 h-4" />
            +91 9958067860
          </a>
        </div>
      </section>
    </FadeIn>
  )
}

/* ─── Page ─── */
export default function Home() {
  return (
    <PageTransition>
      <Helmet>
        <title>Y.P. & Associates — IBBI Registered Valuer | Property Valuation</title>
        <meta name="description" content="IBBI registered and 34AB Income Tax approved valuer providing property valuation reports across India. 15+ years, 1-day turnaround, 100% bank accepted." />
        <meta property="og:title" content="Y.P. & Associates — IBBI Registered Property Valuation" />
        <meta property="og:description" content="Certified valuation reports for capital gains, bank loans, legal matters & more." />
      </Helmet>
      <HeroSection />
      <MarqueeTrustBar />
      <ServicesPreview />
      <GallerySection />
      <WhyUsSection />
      <ProcessPreview />
      <TestimonialsSection />
      <CTABanner />
    </PageTransition>
  )
}
