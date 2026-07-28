import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HiOutlineAtSymbol, HiOutlineLockClosed,
  HiEye, HiEyeOff, HiArrowRight, HiX,
} from 'react-icons/hi'
import { RiFlashlightFill } from 'react-icons/ri'
import { TbShield, TbTruckDelivery, TbStar } from 'react-icons/tb'
import { loginUser, clearError } from '../features/auth/authSlice'

const PERKS = [
  { icon: TbStar,          text: '4.9 average rating across 20K+ products' },
  { icon: TbTruckDelivery, text: 'Free shipping on orders over $299'        },
  { icon: TbShield,        text: 'Secure, encrypted checkout every time'    },
]

const validate = ({ username, password }) => {
  if (!username.trim()) return 'Username or email is required.'
  if (!password.trim()) return 'Password is required.'
  return null
}

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { loading, error, isAuthenticated } = useSelector(s => s.auth)
  const from = location.state?.from?.pathname || '/home'

  const [form,     setForm]     = useState({ username: '', password: '' })
  const [show,     setShow]     = useState(false)
  const [localErr, setLocalErr] = useState('')
  const [touched,  setTouched]  = useState({})

  useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true })
    return () => dispatch(clearError())
  }, [isAuthenticated, navigate, from, dispatch])

  const onChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    setLocalErr('')
    if (error) dispatch(clearError())
  }

  const onBlur = e => setTouched(t => ({ ...t, [e.target.name]: true }))

  const onSubmit = e => {
    e.preventDefault()
    if (loading) return
    setTouched({ username: true, password: true })
    const clientErr = validate(form)
    if (clientErr) { setLocalErr(clientErr); return }
    dispatch(loginUser({ username: form.username.trim(), password: form.password }))
  }

  const displayErr = localErr || error

  const fieldErr = name => {
    if (!touched[name]) return ''
    if (name === 'username' && !form.username.trim()) return 'Username or email is required.'
    if (name === 'password' && !form.password.trim()) return 'Password is required.'
    return ''
  }

  return (
    <div className="min-h-screen bg-void flex overflow-hidden">
      <div className="hidden lg:flex flex-1 flex-col relative overflow-hidden">
        <div className="absolute inset-0 bg-surface" />
        <div className="absolute inset-0 bg-grid-lines bg-grid opacity-60" />
        <div className="absolute inset-0 bg-lime-spot" />
        <div className="orb orb-lime   w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-45" />
        <div className="orb orb-purple w-[300px] h-[300px] bottom-0 right-0 opacity-25" />

        <div className="relative z-10 flex flex-col h-full px-14 py-12">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-lime-vivid flex items-center justify-center
                            group-hover:shadow-lime-sm transition-all duration-200">
              <RiFlashlightFill className="text-void text-lg" />
            </div>
            <span className="text-white font-extrabold text-xl tracking-tight">
              Sky<span className="text-lime-vivid">Mart</span>
            </span>
          </Link>

          <div className="flex-1 flex flex-col justify-center max-w-md">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
              <p className="text-lime-vivid text-xs font-bold uppercase tracking-[0.2em] mb-5">
                Welcome back
              </p>
              <h1 className="text-6xl font-black tracking-[-0.03em] leading-[0.95] mb-6 text-white">
                Shop the<br />
                <span className="text-lime-vivid">future.</span><br />
                Today.
              </h1>
              <p className="text-ink-secondary text-lg leading-relaxed mb-10">
                Thousands of products, lightning-fast delivery, and prices that make your wallet happy.
              </p>

              <div className="space-y-3">
                {PERKS.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-lime-vivid/15 border border-lime-vivid/25
                                    flex items-center justify-center shrink-0">
                      <Icon className="text-lime-vivid text-sm" />
                    </div>
                    <span className="text-ink-secondary text-sm">{text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <p className="text-ink-muted text-xs">© {new Date().getFullYear()} SkyMart, Inc.</p>
        </div>
      </div>

      <div className="flex-1 lg:max-w-[500px] flex items-center justify-center p-6 sm:p-10 bg-void">
        <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[400px]">

          <Link to="/" className="inline-flex items-center gap-2 mb-10 group lg:hidden">
            <div className="w-8 h-8 rounded-xl bg-lime-vivid flex items-center justify-center">
              <RiFlashlightFill className="text-void text-base" />
            </div>
            <span className="text-white font-extrabold text-lg">
              Sky<span className="text-lime-vivid">Mart</span>
            </span>
          </Link>

          <h2 className="text-3xl font-black text-white mb-1 tracking-tight">Sign in</h2>
          <p className="text-ink-muted text-sm mb-7">
            No account yet?{' '}
            <Link to="/register"
              className="text-lime-vivid hover:text-lime-soft font-semibold transition-colors duration-150">
              Create one free →
            </Link>
          </p>

          <div className="mb-6 flex items-start gap-3 p-3.5 rounded-xl
                          bg-lime-vivid/[0.07] border border-lime-vivid/20">
            <span className="text-base mt-0.5 shrink-0">💡</span>
            <div>
              <p className="text-lime-vivid text-xs font-bold mb-0.5">Demo account</p>
              <p className="text-ink-secondary text-xs leading-relaxed">
                username: <code className="font-mono bg-white/[0.06] px-1 py-0.5 rounded text-white">emilys</code>
                &ensp;/&ensp;
                password: <code className="font-mono bg-white/[0.06] px-1 py-0.5 rounded text-white">emilyspass</code>
              </p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-3" noValidate>
            <div>
              <div className="relative">
                <HiOutlineAtSymbol className="absolute left-3.5 top-1/2 -translate-y-1/2
                                              text-ink-muted text-sm pointer-events-none" />
                <input
                  name="username" type="text" value={form.username}
                  onChange={onChange} onBlur={onBlur}
                  placeholder="Username or email"
                  autoComplete="username" aria-label="Username or email"
                  aria-invalid={!!fieldErr('username')}
                  className={`field pl-9 text-sm transition-all duration-200
                    ${fieldErr('username')
                      ? 'border-red-500/50 focus:border-red-500/70 focus:ring-red-500/20'
                      : form.username ? 'border-lime-vivid/25' : ''
                    }`}
                />
              </div>
              <AnimatePresence>
                {fieldErr('username') && (
                  <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.18 }}
                    className="text-red-400 text-2xs mt-1.5 ml-1 font-medium overflow-hidden">
                    {fieldErr('username')}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div>
              <div className="relative">
                <HiOutlineLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2
                                                text-ink-muted text-sm pointer-events-none" />
                <input
                  name="password" type={show ? 'text' : 'password'} value={form.password}
                  onChange={onChange} onBlur={onBlur}
                  placeholder="Password" autoComplete="current-password" aria-label="Password"
                  aria-invalid={!!fieldErr('password')}
                  className={`field pl-9 pr-9 text-sm transition-all duration-200
                    ${fieldErr('password')
                      ? 'border-red-500/50 focus:border-red-500/70 focus:ring-red-500/20'
                      : form.password ? 'border-lime-vivid/25' : ''
                    }`}
                />
                <button type="button" onClick={() => setShow(s => !s)}
                  aria-label={show ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted
                             hover:text-white transition-colors duration-150 focus-visible:outline-none">
                  {show ? <HiEyeOff className="text-base" /> : <HiEye className="text-base" />}
                </button>
              </div>
              <AnimatePresence>
                {fieldErr('password') && (
                  <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.18 }}
                    className="text-red-400 text-2xs mt-1.5 ml-1 font-medium overflow-hidden">
                    {fieldErr('password')}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {displayErr && !localErr && (
                <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                  className="flex items-start gap-2.5 text-red-400 text-xs
                             bg-red-500/[0.08] border border-red-500/20 rounded-lg px-3.5 py-3">
                  <HiX className="text-sm shrink-0 mt-0.5" />
                  <span>{displayErr}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button type="submit" disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.015 }}
              whileTap={{   scale: loading ? 1 : 0.975 }}
              className="w-full btn-lime-lg mt-1 disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-void/30 border-t-void rounded-full animate-spin" />
                  Signing in…
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Sign in <HiArrowRight />
                </span>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
