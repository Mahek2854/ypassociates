import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { CheckBadgeIcon } from '@heroicons/react/24/solid'
import { ChevronRightIcon, ShieldCheckIcon, BoltIcon, EyeIcon } from '@heroicons/react/24/outline'
import SectionLabel from '../components/ui/SectionLabel'
import PageTransition from '../components/ui/PageTransition'
import FadeIn from '../components/ui/FadeIn'

const CREDENTIALS = [
  {
    icon: '🏛️',
    title: 'GST Registration',
    sub: 'GSTIN: 09XXXXX1234Z1Z5',
    desc: 'Fully GST-compliant firm. Proper tax invoices issued for all services.',
  },
  {
    icon: '🏅',
    title: 'IBBI Registered Valuer',
    sub: 'Registration: Active & Valid',
    desc: 'IBBI Registered Valuer for Land & Building — recognized under Section 34AB of the Income Tax Act.',
  },
  {
    icon: '⚙️',
    title: 'Chartered Engineer',
    sub: 'IEI/CE/GZB/2019-XXX',
    desc: 'Licensed CE from the Institution of Engineers (India), Ghaziabad Chapter.',
  },
  {
    icon: '📋',
    title: '34AB Income Tax Approved Valuer',
    sub: 'Income Tax Act — Section 34AB',
    desc: 'Approved valuer under Section 34AB of the Income Tax Act, recognized by all Income Tax authorities across India.',
  },
]

const VALUES = [
  {
    Icon: ShieldCheckIcon,
    title: 'Accuracy',
    desc: 'Every valuation is based on thorough research, comparable data, and professional judgment. Our reports are consistently accepted by banks, courts, and tax authorities.',
  },
  {
    Icon: BoltIcon,
    title: 'Speed',
    desc: 'We understand time is critical in property transactions. Our 1-day turnaround ensures you never face delays in loans, tax filings, or legal proceedings.',
  },
  {
    Icon: EyeIcon,
    title: 'Transparency',
    desc: 'Clear methodology, documented data sources, and reasoned conclusions. You always know how and why we arrived at the value stated in our reports.',
  },
]

export default function About() {
  return (
    <PageTransition>
      <Helmet>
        <title>About Us — Yatendra Paliwal | Y.P. & Associates</title>
        <meta name="description" content="Meet Yatendra Paliwal — Chartered Engineer, Government Approved Valuer with 7+ years of expertise in property valuation across Delhi NCT and Pan India." />
      </Helmet>

      {/* Hero */}
      <section className="bg-forest pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-diagonal-lines pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-cream/40 text-xs font-jost mb-8">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRightIcon className="w-3 h-3" />
            <span className="text-gold">About</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left — Portrait placeholder */}
            <FadeIn direction="left">
              <div className="relative">
                {/* Decorative gold frame */}
                <div className="absolute -top-4 -left-4 w-full h-full border-2 border-gold/30 rounded-2xl" />
                <div className="relative bg-forest rounded-2xl overflow-hidden aspect-[4/5] border border-gold/20 flex items-center justify-center">
                  {/* Background property image */}
                  <img
                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=60"
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover opacity-20"
                    aria-hidden="true"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest/95 via-forest/70 to-forest/50" />
                  <div className="relative z-10 text-center px-6">
                    <div className="w-32 h-32 rounded-full bg-gold/15 border-2 border-gold/30 mx-auto flex items-center justify-center mb-6 shadow-xl">
                      <span className="font-cormorant font-bold text-gold text-5xl">YP</span>
                    </div>
                    <div className="w-16 h-0.5 bg-gold/30 mx-auto mb-4" />
                    <p className="font-cormorant text-gold text-xl font-semibold">Yatendra Paliwal</p>
                    <p className="text-cream/50 font-jost text-sm mb-5">Chartered Engineer & Founder</p>
                    <div className="flex flex-col gap-2">
                      <span className="inline-flex items-center justify-center gap-1.5 bg-gold/15 border border-gold/25 text-gold text-[11px] font-jost px-3 py-1 rounded-full">
                        IBBI Registered Valuer
                      </span>
                      <span className="inline-flex items-center justify-center gap-1.5 bg-gold/15 border border-gold/25 text-gold text-[11px] font-jost px-3 py-1 rounded-full">
                        34AB Income Tax Approved Valuer
                      </span>
                    </div>
                  </div>
                  <div className="absolute top-6 right-6 w-16 h-16 rounded-full bg-gold/5 blur-xl" />
                  <div className="absolute bottom-6 left-6 w-12 h-12 rounded-full bg-gold/5 blur-xl" />
                </div>
              </div>
            </FadeIn>

            {/* Right — Story */}
            <FadeIn direction="right">
              <SectionLabel light className="mb-5">Our Story</SectionLabel>
              <h1 className="font-cormorant font-bold text-cream mb-6"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
                About<br />
                <span className="text-gold">Yatendra Paliwal</span>
              </h1>

              <div className="space-y-4 text-cream/60 font-jost text-sm leading-relaxed mb-8">
                <p>
                  Y.P. & Associates was founded by Yatendra Paliwal, a licensed Chartered Engineer
                  registered with the Institution of Engineers (India) and a Government Approved
                  Valuer recognized by the Income Tax Department of India.
                </p>
                <p>
                  With over 7 years of experience in property valuation across Ghaziabad, Delhi NCT,
                  and the National Capital Region, Yatendra has built a reputation for delivering
                  accurate, fast, and professionally impeccable valuation reports.
                </p>
                <p>
                  The firm was established in 2019 with a clear mission: to make professional property
                  valuation accessible to every Indian — whether they are a homeowner in a tier-2 city
                  filing their first ITR or an NRI settling a complex inheritance matter.
                </p>
              </div>

              <div className="space-y-2.5 mb-8">
                {[
                  'Chartered Engineer — Institution of Engineers (India)',
                  'IBBI Registered Valuer — Land & Building',
                  '34AB Income Tax Approved Valuer',
                  'GST Registered Firm — 09XXXXX1234Z1Z5',
                  'Registered in Delhi NCT & Uttar Pradesh',
                  '5000+ Valuation Reports Delivered',
                ].map((c) => (
                  <div key={c} className="flex items-center gap-2">
                    <CheckBadgeIcon className="w-4 h-4 text-gold flex-shrink-0" />
                    <span className="text-cream/70 text-sm font-jost">{c}</span>
                  </div>
                ))}
              </div>

              <Link to="/contact" className="gold-btn rounded-lg">
                Get in Touch
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-20 bg-cream relative overflow-hidden">
        <div className="absolute inset-0 bg-diagonal-lines pointer-events-none opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <SectionLabel className="justify-center mb-4">Verified & Certified</SectionLabel>
            <h2 className="section-heading text-forest mb-4">Our Credentials</h2>
            <p className="text-text-muted font-jost max-w-lg mx-auto">
              Every credential listed here is verifiable. We believe in complete transparency.
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CREDENTIALS.map((c, i) => (
              <FadeIn key={c.title} delay={i * 0.08}>
                <div className="bg-white rounded-2xl border border-forest/5 card-hover h-full overflow-hidden group">
                  <div className="h-24 relative overflow-hidden bg-gradient-to-br from-forest to-forest/80 flex items-center justify-center">
                    <span className="text-5xl opacity-80 group-hover:scale-110 transition-transform duration-300">{c.icon}</span>
                    <div className="absolute inset-0 bg-diagonal-lines opacity-30" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-cormorant font-semibold text-forest text-lg mb-1">{c.title}</h3>
                    <p className="text-gold text-xs font-jost font-medium mb-3">{c.sub}</p>
                    <p className="text-text-muted text-sm font-jost leading-relaxed">{c.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-forest">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <SectionLabel light className="justify-center mb-4">Our Pillars</SectionLabel>
            <h2 className="font-cormorant font-bold text-cream mb-4"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              What Drives Us
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {VALUES.map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.1}>
                <div className="text-center p-8 rounded-2xl border border-white/5 hover:border-gold/25 hover:bg-white/5 transition-all duration-300 group">
                  <div className="w-16 h-16 rounded-2xl bg-gold/10 border border-gold/20 mx-auto mb-5 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                    <v.Icon className="w-7 h-7 text-gold" />
                  </div>
                  <h3 className="font-cormorant font-bold text-cream text-2xl mb-3 group-hover:text-gold transition-colors">
                    {v.title}
                  </h3>
                  <p className="text-cream/50 font-jost text-sm leading-relaxed">{v.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
