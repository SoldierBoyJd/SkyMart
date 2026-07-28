import { motion, AnimatePresence } from 'framer-motion'
import ProductCard from './ProductCard'

function SkeletonCard() {
  return (
    <div className="card overflow-hidden">
      <div className="skel aspect-[4/3] w-full rounded-none" />
      <div className="p-4 space-y-3">
        <div className="skel h-2.5 w-1/3 rounded-pill" />
        <div className="skel h-3.5 w-3/4" />
        <div className="skel h-3 w-full" />
        <div className="skel h-3 w-4/5" />
        <div className="flex justify-between items-center pt-2">
          <div className="skel h-5 w-1/4" />
          <div className="skel h-7 w-20 rounded-lg" />
        </div>
      </div>
    </div>
  )
}

function EmptyState({ message, description }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="col-span-full flex flex-col items-center justify-center py-28 gap-4">
      <div className="w-20 h-20 rounded-2xl bg-raised border border-outline
                      flex items-center justify-center text-4xl">
        🔍
      </div>
      <div className="text-center">
        <p className="text-white font-bold text-lg">{message}</p>
        {description && <p className="text-ink-muted text-sm mt-1 max-w-sm">{description}</p>}
      </div>
    </motion.div>
  )
}

export default function ProductGrid({ products, loading, error }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-28 gap-4">
        <div className="text-5xl">⚠️</div>
        <p className="text-white font-bold">Something went wrong</p>
        <p className="text-ink-muted text-sm text-center max-w-sm">{error}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <AnimatePresence mode="popLayout">
        {products.length === 0 ? (
          <EmptyState
            message="No products found"
            description="Try adjusting your search or changing the filter."
          />
        ) : (
          products.map(p => <ProductCard key={p.id} product={p} />)
        )}
      </AnimatePresence>
    </div>
  )
}
