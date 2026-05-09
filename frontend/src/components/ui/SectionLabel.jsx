export default function SectionLabel({ children, light = false, className = '' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="w-8 h-px bg-gold flex-shrink-0" />
      <span className={`font-jost font-medium text-xs uppercase tracking-[0.2em] ${light ? 'text-gold' : 'text-gold'}`}>
        {children}
      </span>
    </div>
  )
}
