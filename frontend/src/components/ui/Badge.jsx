export default function Badge({ children, variant = 'gold', className = '' }) {
  const variants = {
    gold: 'bg-gold/10 text-gold border border-gold/20',
    forest: 'bg-forest/10 text-forest border border-forest/20',
    cream: 'bg-cream text-text-muted border border-forest/10',
    white: 'bg-white/10 text-cream border border-white/15',
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-jost font-medium tracking-wide ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}
