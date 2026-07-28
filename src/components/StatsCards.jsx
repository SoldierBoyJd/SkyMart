import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { TbShoppingBag, TbCurrencyDollar, TbStarFilled, TbLayoutGrid } from 'react-icons/tb'
import { selectCartTotal, selectCartCount } from '../features/cart/cartSlice'
import { formatPrice } from '../utils/helpers'

const CONFIGS = [
  {
    id: 'cart-count',
    icon: TbShoppingBag,
    label: 'Cart Items',
    sub: 'In your bag',
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
    ring: 'ring-emerald-400/20',
  },
  {
    id: 'cart-value',
    icon: TbCurrencyDollar,
    label: 'Cart Value',
    sub: 'Ready to checkout',
    color: 'text-sky-400',
    bg: 'bg-sky-400/10',
    ring: 'ring-sky-400/20',
  },
  {
    id: 'top-products',
    icon: TbStarFilled,
    label: 'Top Products',
    sub: 'Highly rated',
    color: 'text-amber-400',
    bg: 'bg-amber-400/10',
    ring: 'ring-amber-400/20',
  },
  {
    id: 'categories',
    icon: TbLayoutGrid,
    label: 'Categories',
    sub: 'To explore',
    color: 'text-violet-400',
    bg: 'bg-violet-400/10',
    ring: 'ring-violet-400/20',
  },
]

export default function StatsCards() {
  const cartCount = useSelector(selectCartCount)
  const cartTotal = useSelector(selectCartTotal)
  const catCount  = useSelector(s => s.categories.items.length) || 6

  const values = [cartCount, formatPrice(cartTotal), '5', catCount]

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 mb-10">
      {CONFIGS.map((cfg, i) => (
        <motion.div
          key={cfg.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
          className="card p-5 flex items-center gap-4 hover:-translate-y-0.5 hover:border-white/[0.12]
                     hover:shadow-lift transition-all duration-300"
        >
          <div className={`w-10 h-10 rounded-lg ${cfg.bg} ring-1 ${cfg.ring}
                           flex items-center justify-center shrink-0`}>
            <cfg.icon className={`text-xl ${cfg.color}`} />
          </div>
          <div className="min-w-0">
            <div className="text-xl font-black text-white leading-tight truncate">{values[i]}</div>
            <div className="text-ink-secondary text-xs font-medium mt-0.5">{cfg.label}</div>
            <div className="text-ink-muted text-2xs mt-0.5">{cfg.sub}</div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
