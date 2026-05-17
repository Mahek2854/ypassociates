import { useState, useEffect } from 'react'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000'

function exportCSV(rows) {
  const headers = ['ID', 'Name', 'Phone', 'Email', 'Service', 'Location', 'Property Type', 'Message', 'Date']
  const data = rows.map((e) => [
    e.id, e.name, e.phone, e.email, e.service,
    e.property_location, e.property_type,
    (e.message || '').replace(/\n/g, ' '),
    new Date(e.created_at).toLocaleDateString('en-IN'),
  ])
  const csv = [headers, ...data]
    .map((row) => row.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(','))
    .join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `yp-enquiries-${new Date().toISOString().split('T')[0]}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

/* ─── Login screen ─── */
function LoginScreen({ onLogin, error }) {
  const [input, setInput] = useState('')
  return (
    <div className="min-h-screen bg-forest flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl">
        <div className="text-center mb-7">
          <div className="w-12 h-12 bg-gold rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="font-cormorant font-bold text-forest text-lg">YP</span>
          </div>
          <h1 className="font-cormorant font-bold text-forest text-2xl">Admin Access</h1>
          <p className="text-text-muted font-jost text-sm mt-1">Enter your admin token to continue</p>
        </div>

        {error && (
          <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-2 mb-4 text-center">
            {error}
          </p>
        )}

        <form
          onSubmit={(e) => { e.preventDefault(); onLogin(input) }}
          className="space-y-4"
        >
          <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Admin token"
            autoComplete="current-password"
            className="w-full px-4 py-3 rounded-lg border border-forest/15 text-forest text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold"
            required
          />
          <button
            type="submit"
            className="w-full bg-gold text-forest font-jost font-semibold py-3 rounded-lg hover:bg-gold-light transition-colors flex items-center justify-center gap-2"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}

/* ─── File preview helper ─── */
function FilePreview({ filename }) {
  const ext = filename.split('.').pop().toLowerCase()
  const isImage = ['jpg', 'jpeg', 'png'].includes(ext)
  const url = `${API}/uploads/${filename}`
  const displayName = filename.replace(/^[a-f0-9]{32}_/, '')
  const icon = ext === 'pdf' ? '📄' : ['doc', 'docx'].includes(ext) ? '📝' : '🖼️'

  return isImage ? (
    <a href={url} target="_blank" rel="noopener noreferrer"
      className="block rounded-xl overflow-hidden border border-forest/10 hover:border-gold/40 transition-colors group">
      <img src={url} alt={displayName} className="w-full max-h-48 object-cover group-hover:opacity-90 transition-opacity" />
      <div className="px-3 py-2 bg-cream/60 flex items-center justify-between">
        <span className="font-jost text-xs text-forest truncate">{displayName}</span>
        <span className="text-gold text-xs font-jost ml-2 flex-shrink-0">View ↗</span>
      </div>
    </a>
  ) : (
    <a href={url} target="_blank" rel="noopener noreferrer" download={displayName}
      className="flex items-center gap-3 px-4 py-3 rounded-xl border border-forest/10 hover:border-gold/40 hover:bg-gold/5 transition-all group">
      <span className="text-2xl flex-shrink-0">{icon}</span>
      <div className="flex-1 min-w-0">
        <p className="font-jost text-sm text-forest truncate">{displayName}</p>
        <p className="font-jost text-xs text-text-muted uppercase">{ext} document</p>
      </div>
      <span className="text-gold text-xs font-jost flex-shrink-0 group-hover:underline">Download ↓</span>
    </a>
  )
}

/* ─── Message modal ─── */
function MessageModal({ enquiry, onClose }) {
  if (!enquiry) return null
  const files = enquiry.uploaded_files ? JSON.parse(enquiry.uploaded_files) : []

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-7 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-5">
          <div>
            <h3 className="font-cormorant font-bold text-forest text-xl">{enquiry.name}</h3>
            <p className="text-text-muted font-jost text-xs mt-0.5">{enquiry.service} · {enquiry.property_location}</p>
          </div>
          <button onClick={onClose} className="text-text-muted hover:text-forest text-xl leading-none">×</button>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm font-jost mb-5">
          <div><p className="text-text-muted text-xs uppercase tracking-wide mb-1">Phone</p>
            <a href={`tel:${enquiry.phone}`} className="text-forest hover:text-gold">{enquiry.phone}</a></div>
          <div><p className="text-text-muted text-xs uppercase tracking-wide mb-1">Email</p>
            <a href={`mailto:${enquiry.email}`} className="text-forest hover:text-gold break-all">{enquiry.email}</a></div>
          <div><p className="text-text-muted text-xs uppercase tracking-wide mb-1">Property Type</p>
            <p className="text-forest">{enquiry.property_type}</p></div>
          <div><p className="text-text-muted text-xs uppercase tracking-wide mb-1">Date</p>
            <p className="text-forest">{new Date(enquiry.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p></div>
        </div>

        {enquiry.message && (
          <div className="bg-cream rounded-xl p-4 mb-4">
            <p className="text-text-muted text-xs uppercase tracking-wide mb-2">Message</p>
            <p className="text-forest font-jost text-sm leading-relaxed whitespace-pre-wrap">{enquiry.message}</p>
          </div>
        )}

        {/* Attached files */}
        {files.length > 0 && (
          <div className="mb-4">
            <p className="text-text-muted text-xs uppercase tracking-wide mb-3">
              Attached Documents ({files.length})
            </p>
            <div className="space-y-2">
              {files.map((filename, i) => (
                <FilePreview key={i} filename={filename} />
              ))}
            </div>
          </div>
        )}

        {files.length === 0 && (
          <p className="text-text-muted/50 font-jost text-xs mb-4 italic">No documents attached</p>
        )}

        <div className="mt-5 flex gap-3">
          <a href={`tel:${enquiry.phone}`} className="flex-1 text-center bg-gold text-forest font-jost font-semibold text-sm py-2.5 rounded-lg hover:bg-gold-light transition-colors">
            Call
          </a>
          <a
            href={`https://wa.me/91${enquiry.phone}?text=Hi%20${encodeURIComponent(enquiry.name)}%2C%20this%20is%20Y.P.%20%26%20Associates%20regarding%20your%20property%20valuation%20enquiry.`}
            target="_blank" rel="noopener noreferrer"
            className="flex-1 text-center bg-green-500 text-white font-jost font-semibold text-sm py-2.5 rounded-lg hover:bg-green-600 transition-colors"
          >
            WhatsApp
          </a>
          <a href={`mailto:${enquiry.email}`} className="flex-1 text-center bg-forest text-cream font-jost font-semibold text-sm py-2.5 rounded-lg hover:bg-forest/80 transition-colors">
            Email
          </a>
        </div>
      </div>
    </div>
  )
}

/* ─── Main Dashboard ─── */
export default function Admin() {
  const [token, setToken] = useState(() => sessionStorage.getItem('yp_admin_token') || '')
  const [enquiries, setEnquiries] = useState([])
  const [loading, setLoading] = useState(false)
  const [authError, setAuthError] = useState('')
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [selected, setSelected] = useState(null) // message modal

  useEffect(() => {
    if (token) fetchEnquiries(token)
  }, [token])

  const fetchEnquiries = async (tok) => {
    setLoading(true)
    setError('')
    try {
      const res = await axios.get(`${API}/api/enquiries`, {
        headers: { Authorization: `Bearer ${tok}` },
      })
      setEnquiries(res.data)
    } catch (e) {
      if (e.response?.status === 401 || e.response?.status === 403) {
        setAuthError('Invalid token. Please try again.')
        sessionStorage.removeItem('yp_admin_token')
        setToken('')
      } else {
        setError('Failed to load enquiries. Check your connection.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = (tok) => {
    sessionStorage.setItem('yp_admin_token', tok)
    setToken(tok)
    setAuthError('')
  }

  const handleSignOut = () => {
    sessionStorage.removeItem('yp_admin_token')
    setToken('')
    setEnquiries([])
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/api/enquiries/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setEnquiries((prev) => prev.filter((e) => e.id !== id))
      setDeleteConfirm(null)
    } catch {
      setError('Failed to delete enquiry.')
    }
  }

  const filtered = enquiries.filter((e) =>
    [e.name, e.email, e.phone, e.service, e.property_location].some((v) =>
      v?.toLowerCase().includes(search.toLowerCase())
    )
  )

  const thisMonth = enquiries.filter(
    (e) => new Date(e.created_at).getMonth() === new Date().getMonth()
      && new Date(e.created_at).getFullYear() === new Date().getFullYear()
  ).length

  if (!token) {
    return <LoginScreen onLogin={handleLogin} error={authError} />
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-forest sticky top-0 z-40 px-6 py-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gold rounded flex items-center justify-center flex-shrink-0">
            <span className="font-cormorant font-bold text-forest text-sm">YP</span>
          </div>
          <div className="leading-tight">
            <p className="font-cormorant font-semibold text-gold text-base leading-none">Admin Dashboard</p>
            <p className="text-cream/40 text-[10px] font-jost uppercase tracking-wider">Y.P. & Associates</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a href="/" className="text-cream/50 hover:text-gold text-xs font-jost transition-colors">
            ← View Site
          </a>
          <button
            onClick={handleSignOut}
            className="text-cream/60 hover:text-gold text-xs font-jost transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Enquiries', value: enquiries.length, color: 'text-forest' },
            { label: 'This Month', value: thisMonth, color: 'text-gold' },
            { label: 'Search Results', value: filtered.length, color: 'text-forest' },
            { label: 'Services', value: [...new Set(enquiries.map((e) => e.service))].length, color: 'text-forest' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl p-5 border border-forest/5 shadow-sm">
              <div className={`font-cormorant font-bold text-4xl ${s.color} mb-1`}>{s.value}</div>
              <div className="text-text-muted font-jost text-xs">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5 items-stretch sm:items-center justify-between">
          <input
            type="text"
            placeholder="Search name, email, phone, service, location…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-96 px-4 py-2.5 rounded-lg border border-forest/15 text-forest text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 bg-white"
          />
          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={() => fetchEnquiries(token)}
              disabled={loading}
              className="px-4 py-2.5 text-sm font-jost text-forest border border-forest/20 rounded-lg hover:border-gold hover:text-gold transition-colors bg-white disabled:opacity-50"
            >
              {loading ? 'Loading…' : 'Refresh'}
            </button>
            <button
              onClick={() => exportCSV(filtered)}
              disabled={filtered.length === 0}
              className="px-4 py-2.5 text-sm font-jost bg-gold text-forest font-semibold rounded-lg hover:bg-gold-light transition-colors disabled:opacity-40"
            >
              Export CSV ({filtered.length})
            </button>
          </div>
        </div>

        {error && (
          <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-5">
            {error}
          </div>
        )}

        {loading && (
          <div className="text-center py-24 text-text-muted font-jost">
            <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin mx-auto mb-3" />
            Loading enquiries…
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-24 text-text-muted font-jost">
            {search ? 'No enquiries match your search.' : 'No enquiries yet.'}
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <div className="bg-white rounded-2xl border border-forest/5 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-forest">
                    {['#', 'Name', 'Phone', 'Email', 'Service', 'Location', 'Type', 'Date', 'Actions'].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-cream/60 font-jost text-xs uppercase tracking-wider whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((e, i) => (
                    <tr
                      key={e.id}
                      className={`border-t border-forest/5 hover:bg-gold/5 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-cream/30'}`}
                    >
                      <td className="px-4 py-3 text-text-muted font-jost text-xs">{e.id}</td>

                      <td className="px-4 py-3 whitespace-nowrap">
                        <button
                          onClick={() => setSelected(e)}
                          className="font-cormorant font-semibold text-forest hover:text-gold transition-colors text-base"
                        >
                          {e.name}
                        </button>
                      </td>

                      <td className="px-4 py-3 font-jost whitespace-nowrap">
                        <a href={`tel:${e.phone}`} className="text-text-dark hover:text-gold transition-colors">
                          {e.phone}
                        </a>
                      </td>

                      <td className="px-4 py-3 font-jost max-w-[180px] truncate">
                        <a href={`mailto:${e.email}`} className="text-text-dark hover:text-gold transition-colors">
                          {e.email}
                        </a>
                      </td>

                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="bg-gold/10 text-gold text-[10px] font-jost font-medium px-2 py-0.5 rounded-full">
                          {e.service.replace(' Valuation', '').replace(' Report', '').replace(' Certificate', '')}
                        </span>
                      </td>

                      <td className="px-4 py-3 text-text-muted font-jost whitespace-nowrap text-xs">
                        {e.property_location}
                      </td>

                      <td className="px-4 py-3 text-text-muted font-jost whitespace-nowrap text-xs">
                        {e.property_type.replace('Residential Apartment / Flat', 'Flat').replace('Independent House / Bungalow', 'House')}
                      </td>

                      <td className="px-4 py-3 text-text-muted font-jost whitespace-nowrap text-xs">
                        {new Date(e.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' })}
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setSelected(e)}
                            className="text-gold hover:text-forest text-xs font-jost transition-colors whitespace-nowrap"
                          >
                            View
                          </button>
                          {deleteConfirm === e.id ? (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleDelete(e.id)}
                                className="text-red-600 hover:text-red-700 text-xs font-jost font-medium whitespace-nowrap"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => setDeleteConfirm(null)}
                                className="text-text-muted text-xs font-jost"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirm(e.id)}
                              className="text-text-muted hover:text-red-500 text-xs font-jost transition-colors"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-4 py-3 border-t border-forest/5 bg-cream/30 flex items-center justify-between">
              <p className="text-text-muted font-jost text-xs">
                Showing {filtered.length} of {enquiries.length} enquiries
              </p>
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="text-gold hover:text-forest text-xs font-jost transition-colors"
                >
                  Clear search
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Message detail modal */}
      <MessageModal enquiry={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
