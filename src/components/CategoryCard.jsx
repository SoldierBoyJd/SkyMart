import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { HiArrowUpRight } from 'react-icons/hi2'
import { setSelectedCategory } from '../features/products/productSlice'
import { getCategoryIcon, getCategoryLabel } from '../utils/helpers'

export default function CategoryCard({ category, count, index }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const label = getCategoryLabel(category).replace(/-/g, ' ')
  const icon  = getCategoryIcon(category)
  const slug  = category?.slug || (typeof category === 'string' ? category : '')

  const handleClick = () => {
    dispatch(setSelectedCategory(slug))
    navigate('/products')
  }

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, delay: index * 0.045, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.97 }}
      onClick={handleClick}
      className="group relative card p-5 flex flex-col items-center gap-3 text-center
                 hover:border-lime-vivid/30 hover:bg-lime-vivid/[0.04] hover:shadow-lift
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-vivid/50
                 overflow-hidden cursor-pointer w-full"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                      bg-gradient-to-b from-lime-vivid/[0.06] to-transparent rounded-xl pointer-events-none" />

      <div className="relative text-3xl group-hover:scale-110 transition-transform duration-300 leading-none">
        {icon}
      </div>

      <div className="relative">
        <p className="text-white text-xs font-semibold capitalize leading-tight">{label}</p>
        {count !== undefined && (
          <p className="text-ink-muted text-2xs mt-0.5">{count} items</p>
        )}
      </div>

      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <HiArrowUpRight className="text-lime-vivid text-xs" />
      </div>
    </motion.button>
  )
}
