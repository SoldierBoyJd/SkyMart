import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HiOutlineUser, HiOutlineAtSymbol, HiOutlineLockClosed,
  HiEye, HiEyeOff, HiArrowRight, HiCheck, HiX,
} from 'react-icons/hi'
import { RiFlashlightFill } from 'react-icons/ri'
import { registerUser, clearError } from '../features/auth/authSlice'

const RULES = {
  firstName: v => !v.trim() ? 'First name is required.' : '',
  lastName:  v => !v.trim() ? 'Last name is required.'  : '',
  email:     v => !v.trim()
                    ? 'Email is required.'
                    : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
                      ? 'Enter a valid email address.'
                      : '',
  password:  v => !v
                    ? 'Password is required.'
                    : v.length < 6
                      ? 'At least 6 characters required.'
                      : '',
  confirm:   (v, form) => !v
                    ? 'Please confirm your password.'
                    : v !== form.password
                      ? 'Passwords do not match.'
                      : '',
}

function strengthOf(pw) {
  if (!pw) return { score: 0, label: '', color: '' }
  let s = 0
  if (pw.length >= 6)           s++
  if (pw.length >= 10)          s++
  if (/[A-Z]/.test(pw))         s++
  if (/[0-9]/.test(pw))         s++
  if (/[^A-Za-z0-9]/.test(pw))  s++
  if (s <= 1) return { score: s, label: 'Weak',   color: 'bg-red-500'    }
  if (s <= 2) return { score: s, label: 'Fair',   color: 'bg-amber-400'  }
  if (s <= 3) return { score: s, label: 'Good',   color: 'bg-sky-400'    }
  return             { score: s, label: 'Strong', color: 'bg-lime-vivid' }
}

function Field({ name, value, placeholder, icon: Icon, type, autoComplete, error, onChange, onBlur, suffix }) {
  const hasError = !!error
  return (
    <div>
      <div className="relative">
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted
                         text-sm pointer-events-none z-10" />
        <input
          name={name} type={type} value={value}
          onChange={onChange} onBlur={onBlur}
          placeholder={placeholder} autoComplete={autoComplete}
          aria-label={placeholder} aria-invalid={hasError}
          className={`field pl-9 text-sm pr-9 transition-all duration-200
            ${hasError
              ? 'border-red-500/50 focus:border-red-500/70 focus:ring-red-500/20'
              : value && !hasError
                ? 'border-lime-vivid/30 focus:border-lime-vivid/50'
                : ''
            }`}
        />
        {suffix}
      </div>
      <AnimatePresence>
        {hasError && (
          <motion.p
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0,  height: 'auto' }}
            exit={{    opacity: 0, y: -4, height: 0 }}
            transition={{ duration: 0.18 }}
            className="text-red-400 text-2xs mt-1.5 ml-1 font-medium overflow-hidden"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Register() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, loading, error } = useSelector(s => s.auth)

  const [form,    setForm]    = useState({ firstName: '', lastName: '', email: '', password: '', confirm: '' })
  const [touched, setTouched] = useState({})
  const [show,    setShow]    = useState({ password: false, confirm: false })

  useEffect(() => {
    if (isAuthenticated) navigate('/home', { replace: true })
    return () => dispatch(clearError())
  }, [isAuthenticated, navigate, dispatch])

  const getErr = name =>
    touched[name]
      ? (name === 'confirm' ? RULES.confirm(form.confirm, form) : RULES[name]?.(form[name]) ?? '')
      : ''

  const onChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (error) dispatch(clearError())
  }

  const onBlur = e => setTouched(t => ({ ...t, [e.target.name]: true }))

  const allGood = Object.keys(RULES).every(k =>
    !(k === 'confirm' ? RULES.confirm(form.confirm, form) : RULES[k]?.(form[k]))
  )

  const onSubmit = e => {
    e.preventDefault()
    if (loading) return
    setTouched({ firstName: true, lastName: true, email: true, password: true, confirm: true })
    if (!allGood) return
    dispatch(registerUser({
      firstName: form.firstName,
      lastName:  form.lastName,
      email:     form.email,
      password:  form.password,
    }))
  }

  const strength = strengthOf(form.password)

  return (
    <div className="min-h-screen bg-void flex overflow-hidden">
      <div className="hidden lg:flex flex-1 flex-col relative overflow-hidden">
        <div className="absolute inset-0 bg-surface" />
        <div className="absolute inset-0 bg-grid-lines bg-grid opacity-50" />
        <div className="orb orb-lime   w-[500px] h-[500px] -top-20 -right-20 opacity-40" />
        <div className="orb orb-purple w-[300px] h-[300px] bottom-20 left-10  opacity-30" />

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

          <div className="flex-1 flex flex-col justify-center max-w-sm">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
              <p className="text-lime-vivid text-xs font-bold uppercase tracking-[0.2em] mb-5">
                Join SkyMart
              </p>
              <h1 className="text-5xl font-black tracking-[-0.03em] leading-[0.95] mb-5 text-white">
                Start shopping<br />
                <span className="text-lime-vivid">smarter.</span>
              </h1>
              <p className="text-ink-secondary text-base leading-relaxed mb-10">
                Create your account in seconds and get access to thousands of curated products.
              </p>
              {[
                { text: 'Instant account creation'          },
                { text: 'No credit card required to browse' },
                { text: 'Free shipping on orders over $299' },
              ].map(({ text }) => (
                <div key={text} className="flex items-center gap-3 mb-3">
                  <span className="w-5 h-5 rounded-full bg-lime-vivid/20 border border-lime-vivid/40
                                   flex items-center justify-center text-lime-vivid text-xs font-black">
                    ✓
                  </span>
                  <span className="text-ink-secondary text-sm">{text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          <p className="text-ink-muted text-xs">© {new Date().getFullYear()} SkyMart, Inc.</p>
        </div>
      </div>

      <div className="flex-1 lg:max-w-[520px] flex items-center justify-center
                      p-5 sm:p-10 bg-void overflow-y-auto">
        <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[420px] py-8">

          <Link to="/" className="inline-flex items-center gap-2 mb-8 group lg:hidden">
            <div className="w-8 h-8 rounded-xl bg-lime-vivid flex items-center justify-center">
              <RiFlashlightFill className="text-void text-base" />
            </div>
            <span className="text-white font-extrabold text-lg">
              Sky<span className="text-lime-vivid">Mart</span>
            </span>
          </Link>

          <h2 className="text-3xl font-black text-white mb-1 tracking-tight">Create account</h2>
          <p className="text-ink-muted text-sm mb-7">
            Already have one?{' '}
            <Link to="/login"
              className="text-lime-vivid hover:text-lime-soft font-semibold transition-colors duration-150">
              Sign in →
            </Link>
          </p>

          <form onSubmit={onSubmit} className="space-y-4" noValidate>
            <div className="grid grid-cols-2 gap-3">
              {['firstName', 'lastName'].map((name, i) => (
                <Field key={name}
                  name={name}
                  value={form[name]}
                  placeholder={i === 0 ? 'First name' : 'Last name'}
                  icon={HiOutlineUser}
                  type="text"
                  autoComplete={i === 0 ? 'given-name' : 'family-name'}
                  error={getErr(name)}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              ))}
            </div>

            <Field
              name="email" value={form.email} placeholder="Email address"
              icon={HiOutlineAtSymbol} type="email" autoComplete="email"
              error={getErr('email')} onChange={onChange} onBlur={onBlur}
            />

            <div>
              <Field
                name="password" value={form.password} placeholder="Password"
                icon={HiOutlineLockClosed}
                type={show.password ? 'text' : 'password'}
                autoComplete="new-password"
                error={getErr('password')} onChange={onChange} onBlur={onBlur}
                suffix={
                  <button type="button" tabIndex={-1}
                    onClick={() => setShow(s => ({ ...s, password: !s.password }))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted
                               hover:text-white transition-colors duration-150 focus-visible:outline-none"
                    aria-label="Toggle password visibility">
                    {show.password ? <HiEyeOff className="text-base" /> : <HiEye className="text-base" />}
                  </button>
                }
              />
              {form.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i}
                        className={`h-1 flex-1 rounded-pill transition-all duration-300
                          ${i <= strength.score ? strength.color : 'bg-outline'}`}
                      />
                    ))}
                  </div>
                  <p className={`text-2xs font-semibold
                    ${strength.score <= 1 ? 'text-red-400'
                    : strength.score <= 2 ? 'text-amber-400'
                    : strength.score <= 3 ? 'text-sky-400'
                    : 'text-lime-vivid'}`}>
                    {strength.label} password{strength.score >= 4 && ' ✓'}
                  </p>
                </div>
              )}
            </div>

            <Field
              name="confirm" value={form.confirm} placeholder="Confirm password"
              icon={HiOutlineLockClosed}
              type={show.confirm ? 'text' : 'password'}
              autoComplete="new-password"
              error={getErr('confirm')} onChange={onChange} onBlur={onBlur}
              suffix={
                form.confirm && !getErr('confirm') ? (
                  <HiCheck className="absolute right-3 top-1/2 -translate-y-1/2 text-lime-vivid text-base pointer-events-none" />
                ) : (
                  <button type="button" tabIndex={-1}
                    onClick={() => setShow(s => ({ ...s, confirm: !s.confirm }))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted
                               hover:text-white transition-colors duration-150 focus-visible:outline-none"
                    aria-label="Toggle confirm password visibility">
                    {show.confirm ? <HiEyeOff className="text-base" /> : <HiEye className="text-base" />}
                  </button>
                )
              }
            />

            <AnimatePresence>
              {error && (
                <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                  className="flex items-start gap-2.5 text-red-400 text-xs
                             bg-red-500/[0.08] border border-red-500/20 rounded-lg px-3.5 py-3">
                  <HiX className="text-sm shrink-0 mt-0.5" />
                  <span>{error}</span>
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
                  Creating account…
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Create account <HiArrowRight />
                </span>
              )}
            </motion.button>

            <p className="text-ink-muted text-xs text-center pt-1">
              By creating an account you agree to our{' '}
              <span className="text-ink-secondary">Terms of Service</span>
              {' '}and{' '}
              <span className="text-ink-secondary">Privacy Policy</span>.
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
