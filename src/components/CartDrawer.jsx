import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { HiX, HiOutlineShoppingBag, HiTrash } from 'react-icons/hi'
import { TbMinus, TbPlus } from 'react-icons/tb'
import { RiFlashlightFill } from 'react-icons/ri'
import {
  closeCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart,
  selectCartItems, selectCartTotal, selectCartOpen,
} from '../features/cart/cartSlice'
import { formatPrice } from '../utils/helpers'

function CartItem({ item }) {
  const dispatch = useDispatch()
  const [err, setErr] = useState(false)

  return (
    <motion.div layout
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24, transition: { duration: 0.18 } }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="group flex items-center gap-3 p-3 rounded-xl
                 bg-surface border border-outline hover:border-white/[0.1] transition-all duration-200"
    >
      <div className="w-14 h-14 rounded-lg overflow-hidden bg-overlay border border-outline shrink-0">
        {!err
          ? <img src={item.thumbnail} alt={item.title}
              className="w-full h-full object-cover" onError={() => setErr(true)} />
          : <div className="w-full h-full flex items-center justify-center text-2xl">📦</div>
        }
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-white text-xs font-semibold truncate leading-tight">{item.title}</p>
        <p className="text-lime-vivid text-sm font-black mt-0.5">{formatPrice(item.price)}</p>
        <p className="text-ink-muted text-2xs mt-0.5">{formatPrice(item.price * item.quantity)} total</p>
      </div>

      <div className="flex flex-col items-end gap-2 shrink-0">
        <button onClick={() => dispatch(removeFromCart(item.id))}
          aria-label="Remove"
          className="p-1 rounded-md text-ink-faint hover:text-red-400 hover:bg-red-400/10
                     opacity-0 group-hover:opacity-100 transition-all duration-150">
          <HiTrash className="text-xs" />
        </button>

        <div className="flex items-center gap-1 bg-raised rounded-lg p-0.5 border border-outline">
          <button onClick={() => dispatch(decreaseQuantity(item.id))} aria-label="Decrease"
            className="w-6 h-6 flex items-center justify-center rounded-md text-ink-muted
                       hover:text-white hover:bg-white/[0.08] transition-all duration-150">
            <TbMinus className="text-xs" />
          </button>
          <span className="text-white text-xs font-black w-5 text-center select-none">
            {item.quantity}
          </span>
          <button onClick={() => dispatch(increaseQuantity(item.id))} aria-label="Increase"
            className="w-6 h-6 flex items-center justify-center rounded-md text-ink-muted
                       hover:text-white hover:bg-white/[0.08] transition-all duration-150">
            <TbPlus className="text-xs" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default function CartDrawer() {
  const dispatch = useDispatch()
  const isOpen   = useSelector(selectCartOpen)
  const items    = useSelector(selectCartItems)
  const total    = useSelector(selectCartTotal)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div key="backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 bg-black/65 backdrop-blur-[6px] z-40"
            onClick={() => dispatch(closeCart())}
            aria-hidden="true"
          />

          <motion.aside key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 320, mass: 0.9 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-[400px]
                       flex flex-col bg-surface border-l border-outline"
            aria-label="Shopping cart"
          >
            <div className="h-px bg-gradient-to-r from-transparent via-lime-vivid/40 to-transparent" />

            <div className="flex items-center justify-between px-5 py-4 border-b border-outline">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-md bg-lime-vivid/15 border border-lime-vivid/30
                                flex items-center justify-center">
                  <HiOutlineShoppingBag className="text-lime-vivid text-sm" />
                </div>
                <h2 className="text-white font-bold text-base">Cart</h2>
                {items.length > 0 && (
                  <span className="bg-lime-vivid text-void text-[10px] font-black
                                   px-2 py-0.5 rounded-pill leading-none">
                    {items.length}
                  </span>
                )}
              </div>
              <button onClick={() => dispatch(closeCart())} aria-label="Close cart"
                className="p-2 rounded-lg text-ink-muted hover:text-white hover:bg-white/[0.06]
                           transition-all duration-150 focus-visible:outline-none
                           focus-visible:ring-2 focus-visible:ring-white/20">
                <HiX className="text-lg" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-2.5 no-scrollbar">
              {items.length === 0 ? (
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  className="h-full flex flex-col items-center justify-center gap-4 py-20">
                  <div className="w-20 h-20 rounded-2xl bg-raised border border-outline
                                  flex items-center justify-center">
                    <HiOutlineShoppingBag className="text-ink-faint text-3xl" />
                  </div>
                  <div className="text-center">
                    <p className="text-white font-semibold">Cart is empty</p>
                    <p className="text-ink-muted text-sm mt-1">Add some products to get going</p>
                  </div>
                </motion.div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {items.map(item => <CartItem key={item.id} item={item} />)}
                </AnimatePresence>
              )}
            </div>

            {items.length > 0 && (
              <div className="px-5 py-5 border-t border-outline space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-ink-muted">
                    <span>Subtotal</span>
                    <span className="text-white font-semibold">{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-ink-muted">
                    <span>Shipping</span>
                    <span className="text-lime-vivid font-semibold">
                      {total >= 299 ? 'Free' : formatPrice(9.99)}
                    </span>
                  </div>
                  <div className="divider" />
                  <div className="flex justify-between items-baseline">
                    <span className="text-ink-secondary font-medium">Total</span>
                    <span className="text-white font-black text-xl">
                      {formatPrice(total >= 299 ? total : total + 9.99)}
                    </span>
                  </div>
                </div>

                <motion.button whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.975 }}
                  className="w-full bg-lime-vivid text-void font-black py-3.5 rounded-xl text-sm
                             hover:bg-lime-soft hover:shadow-lime-md transition-all duration-200
                             flex items-center justify-center gap-2
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-vivid/60">
                  <RiFlashlightFill className="text-base" />
                  Checkout →
                </motion.button>

                <button onClick={() => dispatch(clearCart())}
                  className="w-full text-ink-muted text-xs hover:text-red-400
                             transition-colors duration-150 py-1 focus-visible:outline-none">
                  Clear cart
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
