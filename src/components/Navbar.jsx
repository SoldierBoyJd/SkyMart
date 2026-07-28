import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { RiFlashlightFill } from 'react-icons/ri'
import { HiOutlineShoppingBag, HiOutlineUser, HiMenuAlt3, HiX } from 'react-icons/hi'
import { PiSignOutBold } from 'react-icons/pi'
import { logout } from '../features/auth/authSlice'
import { toggleCart, selectCartCount } from '../features/cart/cartSlice'
import { getInitials } from '../utils/helpers'

const NAV_LINKS = [
  { label: 'Home',  path: '/home'     },
  { label: 'Shop',  path: '/products' },
  { label: 'About', path: '/about'    },
]

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef(null)

  const dispatch  = useDispatch()
  const navigate  = useNavigate()
  const location  = useLocation()
  const { user, isAuthenticated } = useSelector(s => s.auth)
  const cartCount = useSelector(selectCartCount)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handler = e => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [location.pathname])

  const isActive = path => location.pathname === path

  return (
    <>
      <motion.header
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300
          ${scrolled ? 'glass border-b border-outline' : 'bg-transparent'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[62px] flex items-center justify-between gap-4">
          <Link to="/home" className="flex items-center gap-2 group shrink-0">
            <div className="relative w-8 h-8 rounded-lg bg-lime-vivid flex items-center justify-center
                            group-hover:shadow-lime-sm group-hover:scale-105 transition-all duration-200">
              <RiFlashlightFill className="text-void text-base" />
            </div>
            <span className="text-white font-extrabold text-[17px] tracking-tight leading-none">
              Sky<span className="text-lime-vivid">Mart</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-0.5" aria-label="Primary navigation">
            {NAV_LINKS.map(({ label, path }) => (
              <Link key={path} to={path}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
                  ${isActive(path)
                    ? 'text-lime-vivid'
                    : 'text-ink-muted hover:text-white hover:bg-white/[0.05]'
                  }`}
              >
                {label}
                {isActive(path) && (
                  <motion.span layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg bg-lime-vivid/10 border border-lime-vivid/20"
                    transition={{ type: 'spring', bounce: 0.25, duration: 0.4 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <button onClick={() => dispatch(toggleCart())} aria-label="Cart"
              className="relative p-2.5 rounded-lg text-ink-muted hover:text-white hover:bg-white/[0.05]
                         transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-vivid/50">
              <HiOutlineShoppingBag className="text-xl" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span key={cartCount}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1
                               bg-lime-vivid text-void text-[10px] font-black rounded-pill
                               flex items-center justify-center leading-none">
                    {cartCount > 9 ? '9+' : cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {isAuthenticated && user ? (
              <div className="relative" ref={profileRef}>
                <button onClick={() => setProfileOpen(p => !p)} aria-label="Account"
                  className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-lg
                             hover:bg-white/[0.05] transition-all duration-200
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20">
                  <span className="w-7 h-7 rounded-md bg-lime-vivid flex items-center justify-center shrink-0">
                    <span className="text-void text-xs font-black leading-none">
                      {getInitials(user.firstName, user.lastName)}
                    </span>
                  </span>
                  <span className="hidden sm:block text-sm font-medium text-white leading-none">
                    {user.firstName}
                  </span>
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.96 }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                      className="absolute right-0 top-full mt-2 w-52 glass rounded-xl overflow-hidden shadow-lift"
                    >
                      <div className="px-4 py-3 border-b border-outline">
                        <p className="text-white text-sm font-semibold">{user.firstName} {user.lastName}</p>
                        <p className="text-ink-muted text-xs mt-0.5 truncate">{user.email}</p>
                      </div>
                      <div className="p-1.5">
                        <button onClick={() => { dispatch(logout()); navigate('/login') }}
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-ink-muted
                                     rounded-lg hover:bg-red-500/10 hover:text-red-400
                                     transition-all duration-150">
                          <PiSignOutBold className="text-base" />
                          Sign out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/login" className="btn-lime text-xs px-4 py-2 hidden sm:inline-flex">
                <HiOutlineUser className="text-sm" />
                Sign in
              </Link>
            )}

            <button onClick={() => setMobileOpen(p => !p)} aria-label="Menu"
              className="md:hidden p-2.5 rounded-lg text-ink-muted hover:text-white
                         hover:bg-white/[0.05] transition-all duration-200">
              {mobileOpen ? <HiX className="text-xl" /> : <HiMenuAlt3 className="text-xl" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden border-t border-outline"
            >
              <div className="px-4 py-3 space-y-0.5 bg-surface">
                {NAV_LINKS.map(({ label, path }) => (
                  <Link key={path} to={path}
                    className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150
                      ${isActive(path)
                        ? 'text-lime-vivid bg-lime-vivid/10'
                        : 'text-ink-muted hover:text-white hover:bg-white/[0.05]'
                      }`}
                  >
                    {label}
                  </Link>
                ))}
                {!isAuthenticated && (
                  <Link to="/login"
                    className="block mt-2 text-center bg-lime-vivid text-void font-bold py-3 rounded-lg text-sm">
                    Sign in
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <div className="h-[62px]" />
    </>
  )
}
