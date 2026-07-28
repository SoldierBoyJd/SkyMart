import { motion } from 'framer-motion'
import { RiFlashlightFill } from 'react-icons/ri'

export default function Loader({ size = 'md', className = '' }) {
  const s = { sm: 'w-4 h-4 border-2', md: 'w-8 h-8 border-2', lg: 'w-12 h-12 border-3' }
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        className={`${s[size]} rounded-full border-outline border-t-lime-vivid`}
        animate={{ rotate: 360 }}
        transition={{ duration: 0.75, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}

export function PageLoader() {
  return (
    <div className="min-h-screen bg-void flex items-center justify-center">
      <div className="flex flex-col items-center gap-5">
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          className="w-14 h-14 rounded-2xl bg-lime-vivid flex items-center justify-center shadow-lime-md"
        >
          <RiFlashlightFill className="text-void text-2xl" />
        </motion.div>
        <div className="flex gap-1.5">
          {[0, 1, 2].map(i => (
            <motion.div key={i}
              className="w-1.5 h-1.5 rounded-full bg-ink-faint"
              animate={{ backgroundColor: ['#3A3A42', '#D9FF00', '#3A3A42'] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.18 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
