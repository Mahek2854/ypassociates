import { useState } from 'react'
import axios from 'axios'

const SERVICES = [
  'Capital Gain Tax Valuation',
  'Property Valuation Report',
  'Chartered Engineer Certificate',
  'Loan Estimate Report',
  'Inheritance & Gift Valuation',
  'Insurance & Dispute Valuation',
]

const PROPERTY_TYPES = [
  'Residential Apartment',
  'Independent House / Villa',
  'Commercial Office',
  'Commercial Shop',
  'Industrial / Warehouse',
  'Agricultural Land',
  'Residential Plot',
  'Other',
]

const EMPTY_FORM = {
  name: '',
  phone: '',
  email: '',
  service: '',
  property_location: '',
  property_type: '',
  message: '',
}

export default function Contact() {
  const [form, setForm] = useState(EMPTY_FORM)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/enquiry`, form)
      setSuccess(true)
      setForm(EMPTY_FORM)
    } catch {
      setError('Submission failed. Please call us at +91 9958067860 or try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-gold font-medium text-sm uppercase tracking-widest mb-3">Get In Touch</p>
          <h2 className="section-heading text-forest">Request a Free Consultation</h2>
          <div className="gold-divider" />
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left — contact info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="font-playfair text-xl font-semibold text-forest mb-4">Contact Details</h3>
              <div className="space-y-4">
                <ContactItem
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  }
                  label="Phone"
                  value="+91 9958067860"
                  href="tel:+919958067860"
                />
                <ContactItem
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  }
                  label="Email"
                  value="info@ypassociates.in"
                  href="mailto:info@ypassociates.in"
                />
                <ContactItem
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  }
                  label="Location"
                  value="Mumbai, Maharashtra — Pan India Service"
                />
              </div>
            </div>

            <div className="bg-cream rounded-2xl p-6 border border-forest/5">
              <h4 className="font-playfair font-semibold text-forest mb-3">Working Hours</h4>
              <div className="space-y-2 text-sm text-forest/60">
                <div className="flex justify-between">
                  <span>Monday – Saturday</span>
                  <span className="font-medium text-forest">9:00 AM – 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-medium text-forest">10:00 AM – 4:00 PM</span>
                </div>
              </div>
              <p className="text-gold text-xs font-medium mt-4 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                Typically responds within 2 hours
              </p>
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-3">
            {success ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
                <div className="text-4xl mb-4">✅</div>
                <h3 className="font-playfair text-xl font-semibold text-forest mb-2">Enquiry Submitted!</h3>
                <p className="text-forest/60 text-sm mb-6">
                  Thank you! We've received your enquiry and will get back to you within 2 hours.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="bg-forest text-cream px-6 py-2.5 rounded text-sm font-medium hover:bg-forest/90 transition-colors"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-cream rounded-2xl p-8 border border-forest/5 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Full Name *" name="name" type="text" value={form.name} onChange={handleChange} placeholder="Rajesh Kumar" required />
                  <Field label="Phone Number *" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+91 9958067860" required />
                </div>

                <Field label="Email Address *" name="email" type="email" value={form.email} onChange={handleChange} placeholder="rajesh@example.com" required />

                <SelectField
                  label="Service Required *"
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  options={SERVICES}
                  required
                />

                <div className="grid sm:grid-cols-2 gap-5">
                  <Field
                    label="Property Location *"
                    name="property_location"
                    type="text"
                    value={form.property_location}
                    onChange={handleChange}
                    placeholder="e.g. Andheri, Mumbai"
                    required
                  />
                  <SelectField
                    label="Property Type *"
                    name="property_type"
                    value={form.property_type}
                    onChange={handleChange}
                    options={PROPERTY_TYPES}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-forest/70 mb-1.5">Additional Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Any specific requirements or questions..."
                    className="w-full px-4 py-3 rounded-lg border border-forest/15 bg-white text-forest text-sm placeholder-forest/30 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold resize-none transition"
                  />
                </div>

                {error && (
                  <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-forest text-cream py-3.5 rounded-lg text-sm font-semibold hover:bg-forest/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Submitting…
                    </>
                  ) : (
                    'Submit Enquiry'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({ label, name, type, value, onChange, placeholder, required }) {
  return (
    <div>
      <label className="block text-sm font-medium text-forest/70 mb-1.5">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 rounded-lg border border-forest/15 bg-white text-forest text-sm placeholder-forest/30 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition"
      />
    </div>
  )
}

function SelectField({ label, name, value, onChange, options, required }) {
  return (
    <div>
      <label className="block text-sm font-medium text-forest/70 mb-1.5">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-3 rounded-lg border border-forest/15 bg-white text-forest text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition appearance-none"
      >
        <option value="">Select…</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  )
}

function ContactItem({ icon, label, value, href }) {
  const content = (
    <div className="flex items-start gap-3 group">
      <div className="w-9 h-9 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center text-gold flex-shrink-0 mt-0.5 group-hover:bg-gold group-hover:text-forest transition-colors duration-200">
        {icon}
      </div>
      <div>
        <p className="text-xs text-forest/40 uppercase tracking-wide mb-0.5">{label}</p>
        <p className="text-sm font-medium text-forest">{value}</p>
      </div>
    </div>
  )
  return href ? <a href={href}>{content}</a> : content
}
