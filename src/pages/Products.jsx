import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { HiX, HiChevronDown, HiFilter } from 'react-icons/hi'
import { TbSortAscending } from 'react-icons/tb'
import Navbar      from '../components/Navbar'
import SearchBar   from '../components/SearchBar'
import ProductGrid from '../components/ProductGrid'
import Footer      from '../components/Footer'
import CartDrawer  from '../components/CartDrawer'
import {
  fetchProducts, searchProducts, setSelectedCategory,
} from '../features/products/productSlice'
import { fetchCategories } from '../features/category/categorySlice'
import { getCategoryLabel } from '../utils/helpers'

const SORTS = [
  { value: '',           label: 'Relevance' },
  { value: 'price-asc',  label: 'Price ↑'   },
  { value: 'price-desc', label: 'Price ↓'   },
  { value: 'rating',     label: 'Top Rated' },
  { value: 'az',         label: 'A → Z'     },
]

export default function Products() {
  const dispatch = useDispatch()
  const { items, loading, error, searchQuery, selectedCategory } = useSelector(s => s.products)
  const { items: cats } = useSelector(s => s.categories)

  const [sort,     setSort]     = useState('')
  const [catOpen,  setCatOpen]  = useState(false)
  const [sortOpen, setSortOpen] = useState(false)

  useEffect(() => {
    if (cats.length === 0) dispatch(fetchCategories())
  }, [dispatch, cats.length])

  useEffect(() => {
    if (searchQuery)           dispatch(searchProducts({ query: searchQuery, limit: 100 }))
    else if (selectedCategory) dispatch(fetchProducts({ category: selectedCategory, limit: 100 }))
    else                       dispatch(fetchProducts({ limit: 100 }))
  }, [dispatch, selectedCategory, searchQuery])

  const sorted = (() => {
    if (!sort) return items
    const cp = [...items]
    if (sort === 'price-asc')  return cp.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') return cp.sort((a, b) => b.price - a.price)
    if (sort === 'rating')     return cp.sort((a, b) => b.rating - a.rating)
    if (sort === 'az')         return cp.sort((a, b) => a.title.localeCompare(b.title))
    return cp
  })()

  const activeCat  = selectedCategory
    ? (cats.find(c => c.slug === selectedCategory)?.name || selectedCategory)
    : null
  const hasFilters = selectedCategory || searchQuery || sort

  return (
    <div className="min-h-screen bg-void">
      <Navbar />
      <CartDrawer />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }} className="mb-8">
          <div className="flex items-baseline gap-3 mb-1">
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-[-0.03em]">
              All Products
            </h1>
            {!loading && (
              <span className="text-ink-muted text-lg font-medium">({sorted.length})</span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 text-sm">
            {activeCat && (
              <span className="tag-lime">
                {activeCat}
                <button onClick={() => dispatch(setSelectedCategory(''))}
                  className="ml-1 hover:opacity-70 transition-opacity" aria-label="Remove category filter">
                  <HiX className="text-[10px]" />
                </button>
              </span>
            )}
            {searchQuery && <span className="tag-white">"{searchQuery}"</span>}
            {sort && (
              <span className="tag-white capitalize">
                {SORTS.find(s => s.value === sort)?.label}
              </span>
            )}
          </div>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-3 mb-7">
          <div className="flex-1"><SearchBar /></div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <button onClick={() => { setCatOpen(p => !p); setSortOpen(false) }}
                className={`flex items-center gap-2 h-[44px] px-4 rounded-lg border text-sm font-medium
                           transition-all duration-200 focus-visible:outline-none
                           focus-visible:ring-2 focus-visible:ring-lime-vivid/50
                           ${selectedCategory
                             ? 'border-lime-vivid/40 text-lime-vivid bg-lime-vivid/[0.06]'
                             : 'border-outline text-ink-muted hover:text-white hover:bg-white/[0.04]'
                           }`}>
                <HiFilter className="text-sm shrink-0" />
                <span className="hidden sm:block max-w-[100px] truncate">{activeCat || 'Filter'}</span>
                <HiChevronDown className={`text-xs transition-transform duration-200 ${catOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {catOpen && (
                  <motion.div initial={{ opacity: 0, y: 6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.14 }}
                    className="absolute right-0 mt-2 w-56 bg-overlay border border-outline
                               rounded-xl shadow-lift-lg z-30 overflow-hidden max-h-72 overflow-y-auto no-scrollbar">
                    <div className="p-1.5">
                      <button onClick={() => { dispatch(setSelectedCategory('')); setCatOpen(false) }}
                        className={`w-full text-left px-3 py-2.5 text-sm rounded-lg transition-all duration-150
                          ${!selectedCategory
                            ? 'bg-lime-vivid/15 text-lime-vivid font-semibold'
                            : 'text-ink-muted hover:text-white hover:bg-white/[0.05]'
                          }`}>
                        All Categories
                      </button>
                      {cats.map(cat => (
                        <button key={cat.slug}
                          onClick={() => { dispatch(setSelectedCategory(cat.slug)); setCatOpen(false) }}
                          className={`w-full text-left px-3 py-2.5 text-sm rounded-lg transition-all duration-150 capitalize
                            ${selectedCategory === cat.slug
                              ? 'bg-lime-vivid/15 text-lime-vivid font-semibold'
                              : 'text-ink-muted hover:text-white hover:bg-white/[0.05]'
                            }`}>
                          {getCategoryLabel(cat).replace(/-/g, ' ')}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative">
              <button onClick={() => { setSortOpen(p => !p); setCatOpen(false) }}
                className={`flex items-center gap-2 h-[44px] px-4 rounded-lg border text-sm font-medium
                           transition-all duration-200 focus-visible:outline-none
                           focus-visible:ring-2 focus-visible:ring-lime-vivid/50
                           ${sort
                             ? 'border-lime-vivid/40 text-lime-vivid bg-lime-vivid/[0.06]'
                             : 'border-outline text-ink-muted hover:text-white hover:bg-white/[0.04]'
                           }`}>
                <TbSortAscending className="text-base shrink-0" />
                <span className="hidden sm:block">Sort</span>
                <HiChevronDown className={`text-xs transition-transform duration-200 ${sortOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {sortOpen && (
                  <motion.div initial={{ opacity: 0, y: 6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.14 }}
                    className="absolute right-0 mt-2 w-44 bg-overlay border border-outline
                               rounded-xl shadow-lift z-30 overflow-hidden">
                    <div className="p-1.5">
                      {SORTS.map(opt => (
                        <button key={opt.value}
                          onClick={() => { setSort(opt.value); setSortOpen(false) }}
                          className={`w-full text-left px-3 py-2.5 text-sm rounded-lg transition-all duration-150
                            ${sort === opt.value
                              ? 'bg-lime-vivid/15 text-lime-vivid font-semibold'
                              : 'text-ink-muted hover:text-white hover:bg-white/[0.05]'
                            }`}>
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {hasFilters && (
              <motion.button initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                onClick={() => { dispatch(setSelectedCategory('')); setSort(''); dispatch(fetchProducts({ limit: 100 })) }}
                className="h-[44px] px-3 rounded-lg border border-outline text-ink-muted
                           hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/[0.05]
                           transition-all duration-200 focus-visible:outline-none"
                aria-label="Clear all filters">
                <HiX className="text-base" />
              </motion.button>
            )}
          </div>
        </div>

        <ProductGrid products={sorted} loading={loading} error={error} />
      </main>

      <Footer />
    </div>
  )
}
