import { motion } from 'framer-motion'
import { RiFlashlightFill } from 'react-icons/ri'
import { TbCube, TbUsers, TbStarFilled, TbTruckDelivery, TbBulb, TbHeart, TbShieldCheck } from 'react-icons/tb'
import Navbar     from '../components/Navbar'
import Footer     from '../components/Footer'
import CartDrawer from '../components/CartDrawer'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] },
})

const STATS = [
  { icon: TbCube,          value: '20K+', label: 'Products',        color: 'text-lime-vivid',  bg: 'bg-lime-vivid/10 border-lime-vivid/25'   },
  { icon: TbUsers,         value: '50K+', label: 'Happy Customers', color: 'text-sky-400',     bg: 'bg-sky-400/10 border-sky-400/20'         },
  { icon: TbStarFilled,    value: '4.9',  label: 'Avg. Rating',     color: 'text-amber-400',   bg: 'bg-amber-400/10 border-amber-400/20'     },
  { icon: TbTruckDelivery, value: '99%',  label: 'On-time Delivery',color: 'text-emerald-400', bg: 'bg-emerald-400/10 border-emerald-400/20' },
]

const VALUES = [
  {
    icon: TbBulb,
    title: 'Innovation first',
    desc: 'We constantly push the boundaries of what e-commerce can feel like — fast, modern, intuitive.',
    gradient: 'from-amber-400/10',
  },
  {
    icon: TbHeart,
    title: 'Customer obsessed',
    desc: 'Every decision starts with a single question: does this make our customers happier?',
    gradient: 'from-rose-400/10',
  },
  {
    icon: TbShieldCheck,
    title: 'Trust & transparency',
    desc: 'Secure payments, authentic products, and honest pricing — no tricks, no traps.',
    gradient: 'from-emerald-400/10',
  },
]

export default function About() {
  return (
    <div className="min-h-screen bg-void">
      <Navbar />
      <CartDrawer />

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-surface" />
          <div className="absolute inset-0 bg-grid-lines bg-grid opacity-40" />
          <div className="orb orb-lime w-[700px] h-[700px] left-1/2 -translate-x-1/2 -top-40 opacity-30" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
                          py-24 flex flex-col items-center text-center">
            <motion.div {...fade(0)}
              className="w-20 h-20 rounded-3xl bg-lime-vivid flex items-center justify-center
                         shadow-lime-lg mb-8 animate-pulse-lime">
              <RiFlashlightFill className="text-void text-4xl" />
            </motion.div>

            <motion.h1 {...fade(0.08)}
              className="text-6xl sm:text-7xl font-black tracking-[-0.03em] leading-[0.92] mb-6">
              <span className="text-white">About </span>
              <span className="text-lime-vivid">SkyMart</span>
            </motion.h1>

            <motion.p {...fade(0.14)}
              className="text-ink-secondary text-xl max-w-xl leading-relaxed text-balance">
              A next-generation e-commerce platform built to make online shopping fast, fair,
              and enjoyable — for <em className="not-italic text-white font-semibold">everyone</em>.
            </motion.p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {STATS.map(({ icon: Icon, value, label, color, bg }, i) => (
              <motion.div key={label} {...fade(i * 0.07)}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className={`rounded-xl border p-6 text-center ${bg} hover:shadow-lift transition-all duration-300`}>
                <Icon className={`text-2xl mx-auto mb-3 ${color}`} />
                <p className={`text-3xl font-black mb-1 ${color}`}>{value}</p>
                <p className="text-ink-muted text-sm">{label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <motion.div {...fade()} className="card overflow-hidden">
            <div className="h-0.5 bg-gradient-to-r from-lime-vivid/60 via-lime-vivid/20 to-transparent" />

            <div className="p-8 md:p-12 grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lime-vivid text-xs font-bold uppercase tracking-widest mb-4">
                  Our story
                </p>
                <h2 className="text-4xl font-black text-white tracking-tight mb-6">
                  Built by shoppers,<br />for shoppers.
                </h2>
                <div className="space-y-4 text-ink-secondary text-sm leading-relaxed">
                  <p>
                    SkyMart started in 2022 as a side project — two engineers tired of bloated,
                    slow e-commerce experiences. We asked: what if shopping online was
                    actually <span className="text-white font-semibold">enjoyable</span>?
                  </p>
                  <p>
                    Three years later, SkyMart serves over 50,000 customers. We stock electronics,
                    fashion, jewelry, and everyday essentials — at prices that don't require
                    a second mortgage.
                  </p>
                  <p>
                    Our technology-first approach means faster load times, smarter recommendations,
                    and a checkout that actually works on mobile.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { n: '2022', l: 'Founded'       },
                  { n: '50+',  l: 'Team members'  },
                  { n: '120+', l: 'Cities served' },
                  { n: '2K+',  l: 'Orders/day'    },
                ].map(({ n, l }) => (
                  <div key={l}
                    className="bg-void rounded-xl border border-outline p-5 text-center
                               hover:-translate-y-1 hover:border-white/[0.12] transition-all duration-200">
                    <p className="text-2xl font-black text-lime-vivid">{n}</p>
                    <p className="text-ink-muted text-xs mt-1">{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                label: 'Mission',
                title: 'Democratize great products',
                desc: 'Making premium, quality goods accessible to everyone — regardless of budget or geography.',
                accent: true,
              },
              {
                label: 'Vision',
                title: 'Effortless, every time',
                desc: 'A world where every purchase is instant, every product is authentic, and every customer feels valued.',
                accent: false,
              },
            ].map(({ label, title, desc, accent }, i) => (
              <motion.div key={label} {...fade(i * 0.1)}
                className={`rounded-2xl border p-8 relative overflow-hidden
                  ${accent ? 'bg-lime-vivid/[0.07] border-lime-vivid/25' : 'card'}`}>
                {accent && (
                  <div className="orb orb-lime w-64 h-64 -top-10 -right-10 opacity-30" />
                )}
                <p className={`text-xs font-bold uppercase tracking-widest mb-3 relative z-10
                               ${accent ? 'text-lime-vivid' : 'text-ink-muted'}`}>
                  {label}
                </p>
                <h3 className="text-xl font-black text-white mb-2 relative z-10">{title}</h3>
                <p className="text-ink-secondary text-sm leading-relaxed relative z-10">{desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <motion.div {...fade()} className="text-center mb-10">
            <p className="text-ink-muted text-xs font-bold uppercase tracking-widest mb-2">
              What drives us
            </p>
            <h2 className="text-4xl font-black text-white tracking-tight">Our core values</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4">
            {VALUES.map(({ icon: Icon, title, desc, gradient }, i) => (
              <motion.div key={title} {...fade(i * 0.08)}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="card p-7 relative overflow-hidden hover:border-white/[0.14]
                           hover:shadow-lift transition-all duration-300">
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} to-transparent opacity-0
                                 hover:opacity-100 transition-opacity duration-300 rounded-xl`} />
                <div className="relative z-10">
                  <div className="w-11 h-11 rounded-xl bg-white/[0.05] border border-outline
                                  flex items-center justify-center mb-5">
                    <Icon className="text-lime-vivid text-xl" />
                  </div>
                  <h3 className="text-white font-bold text-base mb-2">{title}</h3>
                  <p className="text-ink-muted text-sm leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
