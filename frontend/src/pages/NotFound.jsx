import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { ArrowLeftIcon, HomeIcon } from '@heroicons/react/24/outline'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-forest flex items-center justify-center px-4 relative overflow-hidden">
      <Helmet>
        <title>404 — Page Not Found | Y.P. & Associates</title>
      </Helmet>

      {/* Orb */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-gold/5 blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative text-center max-w-lg"
      >
        <div className="font-cormorant font-bold text-gold/20 leading-none mb-4 select-none"
          style={{ fontSize: 'clamp(6rem, 20vw, 12rem)' }}>
          404
        </div>
        <div className="w-12 h-px bg-gold mx-auto mb-6" />
        <h1 className="font-cormorant font-bold text-cream text-4xl md:text-5xl mb-4">
          Page Not Found
        </h1>
        <p className="text-cream/50 font-jost text-base leading-relaxed mb-10">
          The page you're looking for doesn't exist or may have been moved.
          Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="gold-btn rounded-lg px-7 py-3"
          >
            <HomeIcon className="w-4 h-4" />
            Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="outline-btn rounded-lg px-7 py-3"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Go Back
          </button>
        </div>

        <div className="mt-12 flex justify-center gap-6 text-sm font-jost text-cream/30">
          <Link to="/services" className="hover:text-gold transition-colors">Services</Link>
          <Link to="/about" className="hover:text-gold transition-colors">About</Link>
          <Link to="/contact" className="hover:text-gold transition-colors">Contact</Link>
        </div>
      </motion.div>
    </div>
  )
}
