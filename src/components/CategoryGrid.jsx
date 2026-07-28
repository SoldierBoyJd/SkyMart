import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiArrowRight } from 'react-icons/hi'
import { fetchCategories } from '../features/category/categorySlice'
import CategoryCard from './CategoryCard'

const DISPLAY = [
  { slug: 'electronics',        name: 'Electronics', count: 17 },
  { slug: 'clothing',           name: 'Clothing',    count:  2 },
  { slug: 'furniture',          name: 'Furniture',   count:  3 },
  { slug: 'home-decoration',    name: 'Home',        count: 14 },
  { slug: 'sports-accessories', name: 'Sports',      count:  8 },
  { slug: 'womens-bags',        name: 'Accessories', count:  6 },
]

export default function CategoryGrid() {
  const dispatch = useDispatch()
  const { items } = useSelector(s => s.categories)

  useEffect(() => {
    if (items.length === 0) dispatch(fetchCategories())
  }, [dispatch, items.length])

  const displayCats = items.length > 0
    ? items.slice(0, 6).map((c, i) => ({ ...c, count: DISPLAY[i]?.count }))
    : DISPLAY

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-5">
        <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}>
          <p className="text-ink-muted text-xs font-semibold uppercase tracking-widest mb-1">Browse</p>
          <h2 className="text-2xl font-black text-white tracking-tight">Shop by Category</h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}>
          <Link to="/products"
            className="group inline-flex items-center gap-1.5 text-sm text-lime-vivid font-semibold
                       hover:gap-2.5 transition-all duration-200">
            View All
            <HiArrowRight className="text-sm group-hover:translate-x-0.5 transition-transform duration-150" />
          </Link>
        </motion.div>
      </div>

      <div className="overflow-hidden mb-4 rounded-lg border border-outline bg-raised py-2.5">
        <div className="marquee-track gap-6 px-4">
          {[...DISPLAY, ...DISPLAY].map(({ name }, i) => (
            <span key={i} className="text-ink-faint text-xs font-semibold uppercase tracking-widest whitespace-nowrap">
              {name} &nbsp;·
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {displayCats.map((cat, i) => (
          <CategoryCard key={cat.slug || cat.name || i} category={cat} count={cat.count} index={i} />
        ))}
      </div>
    </section>
  )
}
