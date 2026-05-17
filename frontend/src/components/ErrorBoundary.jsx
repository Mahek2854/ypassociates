import { Component } from 'react'

export default class ErrorBoundary extends Component {
  state = { hasError: false, error: null }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-cream px-4">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">⚠️</span>
            </div>
            <h2 className="font-cormorant text-3xl font-bold text-forest mb-3">
              Something went wrong
            </h2>
            <p className="text-text-muted font-jost text-sm leading-relaxed mb-6">
              An unexpected error occurred. Please refresh the page or call us directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="bg-gold text-forest font-jost font-semibold px-6 py-3 rounded-lg hover:bg-gold-light transition-colors"
              >
                Refresh Page
              </button>
              <a
                href="tel:+919958067860"
                className="border border-forest/20 text-forest font-jost font-medium px-6 py-3 rounded-lg hover:border-gold hover:text-gold transition-colors"
              >
                +91 9958067860
              </a>
            </div>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
