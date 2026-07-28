import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiArrowRight, HiSparkles } from 'react-icons/hi'
import { TbTruckDelivery, TbShieldCheck, TbStar } from 'react-icons/tb'
import { getGreeting } from '../utils/helpers'

const TRUST_PILLS = [
  { icon: TbTruckDelivery, text: 'Free shipping $299+' },
  { icon: TbShieldCheck,   text: 'Secure checkout'     },
  { icon: TbStar,          text: '4.9 avg rating'      },
]

const stagger = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { staggerChildren: 0.09 } },
}

const item = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
}

export default function Hero() {
  const { user, isAuthenticated } = useSelector(s => s.auth)
  const greeting = getGreeting()
  const greetEmoji =
    greeting.includes('Morning')   ? '☀️'
    : greeting.includes('Afternoon') ? '⛅'
    : greeting.includes('Evening')   ? '🌆' : '🌙'

  return (
    <section className="relative overflow-hidden rounded-2xl mb-6">
      <div className="absolute inset-0 bg-surface" />
      <div className="absolute inset-0 bg-grid-lines bg-grid opacity-100" />
      <div className="absolute inset-0 bg-lime-ray" />
      <div className="orb orb-lime w-[500px] h-[500px] -top-40 -right-20 opacity-60 animate-float" />
      <div className="orb orb-blue w-[300px] h-[300px] top-20 -left-20 opacity-40" style={{ animationDelay: '2s' }} />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-lime-vivid/40 to-transparent" />

      <div className="relative z-10 px-6 sm:px-10 py-12 md:py-16">
        <motion.div variants={stagger} initial="hidden" animate="show"
          className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">

          <div className="flex-1 max-w-2xl">
            {isAuthenticated && (
              <motion.div variants={item}
                className="inline-flex items-center gap-2 bg-lime-vivid/10 border border-lime-vivid/25
                           text-lime-vivid text-xs font-bold uppercase tracking-widest px-3 py-1.5
                           rounded-pill mb-5">
                <span>{greetEmoji}</span>
                {greeting}
              </motion.div>
            )}

            {!isAuthenticated && (
              <motion.div variants={item}
                className="inline-flex items-center gap-2 bg-white/[0.05] border border-outline
                           text-ink-secondary text-xs font-semibold uppercase tracking-widest px-3 py-1.5
                           rounded-pill mb-5">
                <HiSparkles className="text-lime-vivid" />
                New arrivals every week
              </motion.div>
            )}

            <motion.h1 variants={item}
              className="text-5xl sm:text-6xl md:text-7xl font-black tracking-[-0.03em] leading-[0.95] mb-5">
              {isAuthenticated && user ? (
                <>
                  <span className="text-white">Hey, </span>
                  <span className="text-lime-vivid">{user.firstName}.</span>
                  <br />
                  <span className="text-white">What's next?</span>
                </>
              ) : (
                <>
                  <span className="text-white">Shop</span>
                  <br />
                  <span className="text-lime-vivid">smarter.</span>
                  <br />
                  <span className="text-white">Live better.</span>
                </>
              )}
            </motion.h1>

            <motion.p variants={item}
              className="text-ink-secondary text-lg leading-relaxed max-w-lg mb-8">
              {isAuthenticated
                ? "Today's hand-picked deals across electronics, fashion, home & more. Built for people who value quality."
                : 'Thousands of curated products. Lightning delivery. Prices that actually make sense.'}
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-3">
              <Link to="/products" className="btn-lime-lg group">
                Shop Now
                <HiArrowRight className="group-hover:translate-x-0.5 transition-transform duration-150" />
              </Link>
              <Link to="/about" className="btn-ghost-lg">
                Our Story
              </Link>
            </motion.div>

            <motion.div variants={item} className="flex flex-wrap gap-2 mt-7">
              {TRUST_PILLS.map(({ icon: Icon, text }) => (
                <span key={text}
                  className="inline-flex items-center gap-1.5 text-xs text-ink-muted
                             bg-white/[0.04] border border-outline px-3 py-1.5 rounded-pill">
                  <Icon className="text-lime-vivid text-sm shrink-0" />
                  {text}
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div variants={item} className="flex flex-row lg:flex-col gap-3 w-full lg:w-auto">
            {[
              { value: '20K+', sub: 'Products',  accent: true  },
              { value: '50K+', sub: 'Customers', accent: false },
              { value: '4.9★', sub: 'Avg Rating',accent: false },
            ].map(({ value, sub, accent }) => (
              <div key={sub}
                className={`flex-1 lg:w-44 rounded-xl p-5 border text-center
                  ${accent ? 'bg-lime-vivid/10 border-lime-vivid/30' : 'bg-raised border-outline'}`}>
                <div className={`text-2xl font-black ${accent ? 'text-lime-vivid' : 'text-white'}`}>
                  {value}
                </div>
                <div className="text-ink-muted text-xs mt-0.5 font-medium">{sub}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
