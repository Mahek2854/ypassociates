import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Helmet } from 'react-helmet-async'
import { ChevronRightIcon, CheckCircleIcon } from '@heroicons/react/24/solid'
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline'
import SectionLabel from '../components/ui/SectionLabel'
import PageTransition from '../components/ui/PageTransition'
import FadeIn from '../components/ui/FadeIn'

const SERVICES = [
  'Capital Gain Tax Valuation',
  'Property Valuation Report',
  'Chartered Engineer Certificate',
  'Loan Estimate Report',
  'Inheritance & Gift Valuation',
  'Insurance & Dispute Valuation',
  'Not Sure — Help Me Choose',
]

const PROPERTY_TYPES = [
  'Residential Apartment / Flat',
  'Independent House / Bungalow',
  'Commercial Office',
  'Commercial Shop / Showroom',
  'Industrial Unit / Warehouse',
  'Agricultural Land',
  'Residential Plot',
  'Other',
]

const CALLBACK_TIMES = [
  'Morning (9 AM – 12 PM)',
  'Afternoon (12 PM – 4 PM)',
  'Evening (4 PM – 7 PM)',
  'Anytime',
]

const STEP_FIELDS = {
  1: ['name', 'phone', 'email'],
  2: ['service', 'property_location', 'property_type'],
  3: [],
}

export default function Contact() {
  const [step, setStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState([])

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({ mode: 'onBlur' })

  const nextStep = async () => {
    const valid = await trigger(STEP_FIELDS[step])
    if (valid) setStep((s) => s + 1)
  }

  const prevStep = () => setStep((s) => s - 1)

  const onSubmit = async (data) => {
    setSubmitting(true)
    try {
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('phone', data.phone)
      formData.append('email', data.email)
      formData.append('service', data.service)
      formData.append('property_location', data.property_location)
      formData.append('property_type', data.property_type)
      formData.append('message', `${data.message || ''}\n\nPreferred callback: ${data.callback_time || 'Anytime'}`)
      selectedFiles.forEach((f) => formData.append('files', f))

      await axios.post(
        `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/enquiry`,
        formData,
      )
      toast.success('Enquiry submitted! We\'ll be in touch within 2 hours.')
      setStep(4)
      setSelectedFiles([])
    } catch {
      toast.error('Something went wrong. Please call us directly at +91 9958067860.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <PageTransition>
      <Helmet>
        <title>Contact Us | Y.P. & Associates — Property Valuation</title>
        <meta name="description" content="Get in touch for a free property valuation consultation. Call, WhatsApp, or fill our enquiry form. Pan India service." />
      </Helmet>

      {/* Hero */}
      <section className="bg-forest pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-diagonal-lines pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-cream/40 text-xs font-jost mb-8">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRightIcon className="w-3 h-3" />
            <span className="text-gold">Contact</span>
          </div>
          <SectionLabel light className="mb-5">Get in Touch</SectionLabel>
          <h1 className="font-cormorant font-bold text-cream mb-4"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)' }}>
            Let's Talk
          </h1>
          <p className="text-cream/55 font-jost max-w-lg leading-relaxed">
            Share your property details and we'll guide you to the right valuation service.
            Free consultation, always.
          </p>
        </div>
      </section>

      {/* Main */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[400px_1fr] gap-12">

            {/* Left — Contact details */}
            <FadeIn direction="left" className="space-y-6">
              <div>
                <h2 className="font-cormorant font-bold text-forest text-2xl mb-6">Contact Details</h2>
                <div className="space-y-4">
                  <ContactBlock
                    Icon={PhoneIcon}
                    label="Phone"
                    value="+91 9958067860"
                    href="tel:+919958067860"
                  />
                  <ContactBlock
                    Icon={EnvelopeIcon}
                    label="Email"
                    value="info@ypassociates.in"
                    href="mailto:info@ypassociates.in"
                  />
                  <ContactBlock
                    Icon={MapPinIcon}
                    label="Location"
                    value="Ghaziabad, Uttar Pradesh — Pan India Service"
                  />
                  <ContactBlock
                    Icon={ClockIcon}
                    label="Office Hours"
                    value="Mon–Sat 9AM–7PM · Sun 10AM–4PM"
                  />
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/919958067860"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-[#25D366]/10 border border-[#25D366]/30 text-[#128C7E] rounded-xl px-5 py-4 hover:bg-[#25D366]/15 transition-colors font-jost font-medium text-sm"
              >
                <svg className="w-6 h-6 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <div>
                  <p className="text-[#128C7E] font-semibold">Send via WhatsApp</p>
                  <p className="text-[#128C7E]/60 text-xs">Fastest response — usually within minutes</p>
                </div>
              </a>

              {/* Map placeholder */}
              <div className="rounded-xl overflow-hidden border border-forest/10">
                <div className="bg-forest/5 h-52 flex items-center justify-center">
                  <div className="text-center">
                    <MapPinIcon className="w-8 h-8 text-gold mx-auto mb-2" />
                    <p className="text-text-muted font-jost text-sm">Ghaziabad, UP</p>
                    <p className="text-text-muted/60 font-jost text-xs">Pan India service · No site visit needed</p>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Right — Multi-step form */}
            <FadeIn direction="right">
              <div className="bg-white rounded-2xl border border-forest/5 overflow-hidden">
                {/* Progress bar */}
                {step < 4 && (
                  <div className="p-6 border-b border-forest/5">
                    <div className="flex items-center gap-2 mb-4">
                      {[1, 2, 3].map((s) => (
                        <div key={s} className={`flex items-center gap-2 ${s < 3 ? 'flex-1' : ''}`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-jost font-bold transition-all duration-300 ${
                            step > s
                              ? 'bg-gold text-forest'
                              : step === s
                              ? 'bg-forest text-cream'
                              : 'bg-forest/10 text-text-muted'
                          }`}>
                            {step > s ? <CheckCircleIcon className="w-4 h-4" /> : s}
                          </div>
                          {s < 3 && (
                            <div className={`flex-1 h-px transition-colors duration-500 ${step > s ? 'bg-gold' : 'bg-forest/10'}`} />
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between text-xs font-jost text-text-muted">
                      <span className={step >= 1 ? 'text-forest font-medium' : ''}>Personal Details</span>
                      <span className={step >= 2 ? 'text-forest font-medium' : ''}>Property Details</span>
                      <span className={step >= 3 ? 'text-forest font-medium' : ''}>Additional Info</span>
                    </div>
                  </div>
                )}

                <form onSubmit={(e) => e.preventDefault()} onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}>
                  <div className="p-7">
                    {/* Step 4 — Success */}
                    {step === 4 && (
                      <div className="text-center py-10">
                        <div className="w-16 h-16 rounded-full bg-green-50 border-2 border-green-200 mx-auto flex items-center justify-center mb-5">
                          <CheckCircleIcon className="w-8 h-8 text-green-500" />
                        </div>
                        <h3 className="font-cormorant font-bold text-forest text-2xl mb-2">Enquiry Submitted!</h3>
                        <p className="text-text-muted font-jost text-sm mb-6 leading-relaxed max-w-xs mx-auto">
                          Thank you! We've received your enquiry and will contact you within 2 hours during working hours.
                        </p>
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="ghost-btn text-sm border border-forest/10 rounded-lg px-5 py-2"
                        >
                          Submit Another Enquiry
                        </button>
                      </div>
                    )}

                    {/* Step 1 — Personal */}
                    {step === 1 && (
                      <div className="space-y-5">
                        <div>
                          <h3 className="font-cormorant font-bold text-forest text-xl mb-1">Personal Details</h3>
                          <p className="text-text-muted font-jost text-xs">Step 1 of 3</p>
                        </div>
                        <FormField label="Full Name *" error={errors.name?.message}>
                          <input
                            {...register('name', { required: 'Name is required' })}
                            className="input-field"
                            placeholder="Rajesh Kumar"
                          />
                        </FormField>
                        <FormField label="Phone Number *" error={errors.phone?.message}>
                          <input
                            {...register('phone', {
                              required: 'Phone is required',
                              pattern: { value: /^[6-9]\d{9}$/, message: 'Enter a valid 10-digit phone number' },
                            })}
                            className="input-field"
                            placeholder="9958067860"
                            type="tel"
                          />
                        </FormField>
                        <FormField label="Email Address *" error={errors.email?.message}>
                          <input
                            {...register('email', {
                              required: 'Email is required',
                              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address' },
                            })}
                            className="input-field"
                            placeholder="rajesh@example.com"
                            type="email"
                          />
                        </FormField>
                      </div>
                    )}

                    {/* Step 2 — Property */}
                    {step === 2 && (
                      <div className="space-y-5">
                        <div>
                          <h3 className="font-cormorant font-bold text-forest text-xl mb-1">Property Details</h3>
                          <p className="text-text-muted font-jost text-xs">Step 2 of 3</p>
                        </div>
                        <FormField label="Service Required *" error={errors.service?.message}>
                          <select
                            {...register('service', { required: 'Please select a service' })}
                            className="input-field"
                          >
                            <option value="">Select a service…</option>
                            {SERVICES.map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </FormField>
                        <FormField label="Property Location *" error={errors.property_location?.message}>
                          <input
                            {...register('property_location', { required: 'Location is required' })}
                            className="input-field"
                            placeholder="e.g. Sector 62, Noida, UP"
                          />
                        </FormField>
                        <FormField label="Property Type *" error={errors.property_type?.message}>
                          <select
                            {...register('property_type', { required: 'Please select a property type' })}
                            className="input-field"
                          >
                            <option value="">Select property type…</option>
                            {PROPERTY_TYPES.map((t) => (
                              <option key={t} value={t}>{t}</option>
                            ))}
                          </select>
                        </FormField>
                        <FormField label="Approximate Area (optional)">
                          <input
                            {...register('area')}
                            className="input-field"
                            placeholder="e.g. 1200 sq. ft."
                          />
                        </FormField>
                      </div>
                    )}

                    {/* Step 3 — Additional */}
                    {step === 3 && (
                      <div className="space-y-5">
                        <div>
                          <h3 className="font-cormorant font-bold text-forest text-xl mb-1">Additional Information</h3>
                          <p className="text-text-muted font-jost text-xs">Step 3 of 3 — Last step!</p>
                        </div>
                        <FormField label="Message / Specific Requirements">
                          <textarea
                            {...register('message')}
                            className="input-field resize-none"
                            rows={4}
                            placeholder="Any specific requirements, questions, or context about your property..."
                          />
                        </FormField>
                        <FormField label="Attach Documents (optional)">
                          <div
                            className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors cursor-pointer ${
                              selectedFiles.length > 0
                                ? 'border-gold/60 bg-gold/5'
                                : 'border-forest/15 hover:border-gold/40'
                            }`}
                            onClick={() => document.getElementById('file-upload').click()}
                          >
                            <input
                              type="file"
                              multiple
                              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                              className="hidden"
                              id="file-upload"
                              onChange={(e) => setSelectedFiles(Array.from(e.target.files || []))}
                            />
                            {selectedFiles.length === 0 ? (
                              <>
                                <p className="text-text-muted font-jost text-sm">📎 Click to attach documents</p>
                                <p className="text-text-muted/50 font-jost text-xs mt-1">PDF, JPG, PNG, DOC up to 25 MB each</p>
                              </>
                            ) : (
                              <div className="space-y-1.5">
                                {selectedFiles.map((f, i) => {
                                  const tooBig = f.size > 25 * 1024 * 1024
                                  return (
                                    <div key={i} className={`flex items-center justify-between rounded-lg px-3 py-2 border ${tooBig ? 'bg-red-50 border-red-200' : 'bg-white border-gold/20'}`}>
                                      <span className={`font-jost text-xs truncate max-w-[70%] ${tooBig ? 'text-red-600' : 'text-forest'}`}>
                                        {tooBig ? '⚠️' : '📄'} {f.name}
                                      </span>
                                      <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                                        <span className={`font-jost text-xs ${tooBig ? 'text-red-500' : 'text-text-muted'}`}>
                                          {(f.size / 1024).toFixed(0)} KB
                                        </span>
                                        {tooBig && <span className="text-red-500 font-jost text-[10px] font-medium">Too large</span>}
                                      </div>
                                    </div>
                                  )
                                })}
                                <p className="text-gold font-jost text-xs mt-1 cursor-pointer">+ Add more files</p>
                              </div>
                            )}
                          </div>
                          {selectedFiles.some(f => f.size > 25 * 1024 * 1024) && (
                            <p className="text-red-500 font-jost text-xs mt-1.5">
                              ⚠️ Files over 25 MB will not be uploaded. Please compress or send via WhatsApp.
                            </p>
                          )}
                          {selectedFiles.length > 0 && (
                            <button
                              type="button"
                              onClick={() => { setSelectedFiles([]); document.getElementById('file-upload').value = '' }}
                              className="text-red-400 hover:text-red-600 font-jost text-xs mt-1.5 transition-colors"
                            >
                              ✕ Clear all files
                            </button>
                          )}
                          <p className="text-text-muted/60 font-jost text-xs mt-1.5">
                            Documents are saved securely and visible in the admin dashboard.
                          </p>
                        </FormField>
                        <FormField label="Preferred Callback Time">
                          <select {...register('callback_time')} className="input-field">
                            <option value="">Select preferred time…</option>
                            {CALLBACK_TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
                          </select>
                        </FormField>
                      </div>
                    )}
                  </div>

                  {/* Navigation buttons */}
                  {step < 4 && (
                    <div className="px-7 pb-7 flex gap-3">
                      {step > 1 && (
                        <button
                          type="button"
                          onClick={prevStep}
                          className="flex-1 border border-forest/15 text-forest font-jost font-medium text-sm py-3 rounded-lg hover:border-forest/30 transition-colors"
                        >
                          ← Back
                        </button>
                      )}
                      {step < 3 ? (
                        <button
                          type="button"
                          onClick={nextStep}
                          className="flex-1 gold-btn rounded-lg py-3 justify-center"
                        >
                          Next Step →
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={handleSubmit(onSubmit)}
                          disabled={submitting}
                          className="flex-1 gold-btn rounded-lg py-3 justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          {submitting ? (
                            <>
                              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                              </svg>
                              Submitting…
                            </>
                          ) : (
                            'Submit Enquiry ✓'
                          )}
                        </button>
                      )}
                    </div>
                  )}
                </form>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}

function ContactBlock({ Icon, label, value, href }) {
  const content = (
    <div className="flex items-start gap-3 group">
      <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/15 flex items-center justify-center text-gold flex-shrink-0 group-hover:bg-gold group-hover:text-forest transition-all duration-200">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-[10px] font-jost text-text-muted uppercase tracking-widest mb-0.5">{label}</p>
        <p className="font-jost text-sm font-medium text-forest">{value}</p>
      </div>
    </div>
  )
  return href ? (
    <a href={href} className="block hover:opacity-80 transition-opacity">{content}</a>
  ) : content
}

function FormField({ label, error, children }) {
  return (
    <div>
      <label className="block text-xs font-jost font-medium text-text-muted mb-1.5 uppercase tracking-wide">
        {label}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs font-jost mt-1">{error}</p>}
    </div>
  )
}
