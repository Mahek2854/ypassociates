import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { PhoneIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Process', to: '/process' },
  { label: 'Contact', to: '/contact' },
]

function isActive(linkTo, pathname) {
  if (linkTo === '/') return pathname === '/'
  return pathname.startsWith(linkTo)
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setDrawerOpen(false) }, [pathname])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 bg-forest transition-all duration-300 ${
          scrolled ? 'py-2.5 border-b border-gold/30 shadow-lg shadow-black/30' : 'py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-gold rounded flex items-center justify-center flex-shrink-0">
              <span className="font-cormorant font-bold text-forest text-sm leading-none">YP</span>
            </div>
            <div className="leading-tight">
              <div className="font-cormorant font-semibold text-gold text-[17px] leading-none">
                Y.P. & Associates
              </div>
              <div className="text-cream/40 text-[9px] font-jost tracking-[0.2em] uppercase mt-0.5">
                Property Valuation
              </div>
            </div>
          </Link>

          {/* Desktop nav center */}
          <div className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.to} link={link} active={isActive(link.to, pathname)} />
            ))}
          </div>

          {/* Desktop right CTAs */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href="https://wa.me/919958067860"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded border border-green-500/30 text-green-400 flex items-center justify-center hover:bg-green-500/10 transition-colors"
              title="WhatsApp"
            >
              <WhatsAppIcon />
            </a>
            <a
              href="tel:+919958067860"
              className="gold-btn rounded"
            >
              <PhoneIcon className="w-4 h-4" />
              Call Now
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="md:hidden text-cream p-1.5 rounded hover:bg-white/10 transition-colors"
          >
            <Bars3Icon className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile full-screen drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-forest flex flex-col md:hidden"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <Link to="/" className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-gold rounded flex items-center justify-center">
                  <span className="font-cormorant font-bold text-forest text-sm">YP</span>
                </div>
                <span className="font-cormorant font-semibold text-gold text-lg">Y.P. & Associates</span>
              </Link>
              <button
                onClick={() => setDrawerOpen(false)}
                className="text-cream p-1.5 hover:bg-white/10 rounded transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex-1 px-5 pt-8 flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.3 }}
                >
                  <Link
                    to={link.to}
                    className={`block py-3.5 px-4 font-cormorant text-2xl font-semibold rounded-lg transition-colors ${
                      isActive(link.to, pathname)
                        ? 'text-gold bg-gold/10'
                        : 'text-cream hover:text-gold hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="px-5 pb-8 flex flex-col gap-3">
              <a
                href="tel:+919958067860"
                className="gold-btn justify-center rounded-lg py-3.5"
              >
                <PhoneIcon className="w-4 h-4" />
                +91 9958067860
              </a>
              <a
                href="https://wa.me/919958067860"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-green-500/30 text-green-400 font-jost font-medium text-sm px-6 py-3.5 rounded-lg text-center flex items-center justify-center gap-2 hover:bg-green-500/10 transition-colors"
              >
                <WhatsAppIcon />
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function NavLink({ link, active }) {
  return (
    <Link
      to={link.to}
      className={`relative font-jost text-sm font-medium pb-1 transition-colors duration-200 group ${
        active ? 'text-gold' : 'text-cream/75 hover:text-gold'
      }`}
    >
      {link.label}
      {/* Active indicator */}
      {active ? (
        <motion.span
          layoutId="nav-underline"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold rounded-full"
        />
      ) : (
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold rounded-full group-hover:w-full transition-all duration-300" />
      )}
    </Link>
  )
}

function WhatsAppIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}
