import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi'
import { RiFlashlightFill } from 'react-icons/ri'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-void flex items-center justify-center px-5 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-lines bg-grid opacity-30" />
      <div className="orb orb-lime w-[500px] h-[500px] top-1/2 left-1/2
                      -translate-x-1/2 -translate-y-1/2 opacity-20" />

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center max-w-md">

        <div className="w-16 h-16 rounded-2xl bg-lime-vivid flex items-center justify-center
                        mx-auto mb-8 shadow-lime-md animate-pulse-lime">
          <RiFlashlightFill className="text-void text-3xl" />
        </div>

        <p className="text-lime-vivid text-xs font-bold uppercase tracking-[0.2em] mb-3">
          Error 404
        </p>
        <h1 className="text-6xl font-black text-white tracking-tight mb-4">
          Lost in space.
        </h1>
        <p className="text-ink-muted text-base leading-relaxed mb-10">
          The page you're looking for drifted off. Let's navigate you back to safety.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/home" className="btn-lime-lg w-full sm:w-auto">
            <HiArrowLeft /> Back Home
          </Link>
          <Link to="/products" className="btn-ghost-lg w-full sm:w-auto">
            Browse Products <HiArrowRight />
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
