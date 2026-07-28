import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiArrowRight } from 'react-icons/hi'
import { RiFlashlightFill } from 'react-icons/ri'
import Navbar        from '../components/Navbar'
import Hero          from '../components/Hero'
import StatsCards    from '../components/StatsCards'
import CategoryGrid  from '../components/CategoryGrid'
import { ProductRow } from '../components/ProductCard'
import Footer        from '../components/Footer'
import CartDrawer    from '../components/CartDrawer'
import { fetchTopRated, fetchNewArrivals } from '../features/products/productSlice'

function SectionHead({ icon, title, link }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <span className="text-base">{icon}</span>
        <span className="text-white font-bold text-lg tracking-tight">{title}</span>
      </div>
      <Link to={link}
        className="group inline-flex items-center gap-1 text-xs text-ink-muted font-semibold
                   uppercase tracking-widest hover:text-lime-vivid transition-colors duration-200">
        See all <HiArrowRight className="text-xs group-hover:translate-x-0.5 transition-transform" />
      </Link>
    </div>
  )
}

function ListPanel({ products, loading }) {
  if (loading) {
    return (
      <div className="card p-4 space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="skel w-11 h-11 rounded-lg shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="skel h-2.5 w-3/4 rounded-pill" />
              <div className="skel h-2 w-1/3 rounded-pill" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="card p-4 divide-y divide-outline">
      {products.slice(0, 5).map(p => <ProductRow key={p.id} product={p} />)}
    </div>
  )
}

export default function Home() {
  const dispatch = useDispatch()
  const { topRated, newArrivals, loading } = useSelector(s => s.products)

  useEffect(() => {
    dispatch(fetchTopRated())
    dispatch(fetchNewArrivals())
  }, [dispatch])

  return (
    <div className="min-h-screen bg-void">
      <Navbar />
      <CartDrawer />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Hero />
        <StatsCards />
        <CategoryGrid />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}>
            <SectionHead icon="⭐" title="Top Rated" link="/products" />
            <ListPanel products={topRated} loading={loading && topRated.length === 0} />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.14 }}>
            <SectionHead icon="⚡" title="New Arrivals" link="/products" />
            <ListPanel products={newArrivals} loading={loading && newArrivals.length === 0} />
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative overflow-hidden rounded-2xl mb-12">
          <div className="absolute inset-0 bg-surface" />
          <div className="absolute inset-0 bg-grid-lines bg-grid opacity-50" />
          <div className="orb orb-lime w-[500px] h-[500px] -right-20 -top-20 opacity-40" />
          <div className="orb orb-blue w-[300px] h-[300px] -left-10 bottom-0 opacity-30" />

          <div className="relative z-10 px-8 md:px-12 py-12 flex flex-col md:flex-row
                           items-center justify-between gap-8">
            <div>
              <p className="text-lime-vivid text-xs font-bold uppercase tracking-widest mb-3">
                Limited time
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-3">
                Free shipping on<br />orders over $299
              </h2>
              <p className="text-ink-secondary text-base">
                Shop thousands of products — fast delivery, zero compromise.
              </p>
            </div>
            <div className="shrink-0">
              <Link to="/products" className="btn-lime-lg">
                Browse All <HiArrowRight />
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { n: '20K+', l: 'Products',         accent: true  },
            { n: '50K+', l: 'Happy Customers',  accent: false },
            { n: '4.9',  l: 'Average Rating',   accent: false },
            { n: '99%',  l: 'On-time Delivery', accent: false },
          ].map(({ n, l, accent }) => (
            <div key={l} className={`rounded-xl p-5 border text-center
              ${accent ? 'bg-lime-vivid/10 border-lime-vivid/30' : 'bg-raised border-outline'}`}>
              <p className={`text-2xl font-black ${accent ? 'text-lime-vivid' : 'text-white'}`}>{n}</p>
              <p className="text-ink-muted text-xs mt-0.5 font-medium">{l}</p>
            </div>
          ))}
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
