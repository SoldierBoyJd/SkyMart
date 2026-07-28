import { Link } from 'react-router-dom'
import { RiFlashlightFill } from 'react-icons/ri'
import { FiTwitter, FiInstagram, FiGithub } from 'react-icons/fi'
import { TbArrowRight } from 'react-icons/tb'

const COLS = {
  Product: [{ l: 'Shop',  p: '/products' }, { l: 'About', p: '/about' }],
  Support: [{ l: 'Help Center', p: '#' }, { l: 'Returns', p: '#' }, { l: 'Contact', p: '#' }],
  Legal:   [{ l: 'Privacy', p: '#' }, { l: 'Terms', p: '#' }],
}

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-outline">
      <div className="bg-lime-vivid/[0.06] border-b border-lime-vivid/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6
                        flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white font-bold text-base">Get the best deals first.</p>
            <p className="text-ink-muted text-sm">Join 50K+ shoppers. No spam, ever.</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <input type="email" placeholder="your@email.com" aria-label="Newsletter email"
              className="field text-sm flex-1 sm:w-56" />
            <button className="btn-lime px-4 py-2.5 shrink-0">
              <TbArrowRight className="text-base font-bold" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
          <div className="col-span-2 lg:col-span-2">
            <Link to="/home" className="inline-flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 rounded-lg bg-lime-vivid flex items-center justify-center
                              group-hover:shadow-lime-sm transition-all duration-200">
                <RiFlashlightFill className="text-void text-sm" />
              </div>
              <span className="text-white font-extrabold text-lg tracking-tight">
                Sky<span className="text-lime-vivid">Mart</span>
              </span>
            </Link>
            <p className="text-ink-muted text-sm leading-relaxed max-w-xs">
              A next-gen e-commerce platform built to make online shopping fast, fair, and enjoyable
              — for everyone.
            </p>
            <div className="flex items-center gap-2 mt-5">
              {[
                { Icon: FiTwitter,   label: 'Twitter'   },
                { Icon: FiInstagram, label: 'Instagram' },
                { Icon: FiGithub,    label: 'GitHub'    },
              ].map(({ Icon, label }) => (
                <a key={label} href="#" aria-label={label}
                  className="w-8 h-8 rounded-lg border border-outline text-ink-muted
                             hover:text-white hover:border-white/20 hover:bg-white/[0.05]
                             flex items-center justify-center transition-all duration-150
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20">
                  <Icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(COLS).map(([heading, links]) => (
            <div key={heading}>
              <p className="text-white text-xs font-bold uppercase tracking-widest mb-4">{heading}</p>
              <ul className="space-y-2.5">
                {links.map(({ l, p }) => (
                  <li key={l}>
                    <Link to={p}
                      className="text-ink-muted text-sm hover:text-white transition-colors duration-150">
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-outline
                        flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-ink-muted text-xs">
            © {new Date().getFullYear()} SkyMart, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-lime-vivid animate-pulse" />
            <span className="text-lime-vivid text-xs font-semibold">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
