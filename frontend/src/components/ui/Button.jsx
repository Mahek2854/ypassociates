export default function Button({ variant = 'primary', children, className = '', as: Tag = 'button', ...props }) {
  const base =
    'inline-flex items-center justify-center gap-2 font-jost font-medium text-sm rounded transition-all duration-200 active:scale-[0.97]'
  const variants = {
    primary: 'bg-gold text-forest px-6 py-3 hover:bg-gold-light shadow-sm hover:shadow-gold/20',
    outline: 'border border-cream/40 text-cream px-6 py-3 hover:border-gold hover:text-gold',
    ghost: 'text-gold px-4 py-2 hover:bg-gold/10',
    dark: 'bg-forest text-cream px-6 py-3 hover:bg-forest/90 border border-white/10',
  }
  return (
    <Tag className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </Tag>
  )
}
