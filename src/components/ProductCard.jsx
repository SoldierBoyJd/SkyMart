import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { HiOutlineShoppingBag, HiCheck } from 'react-icons/hi'
import { TbStarFilled } from 'react-icons/tb'
import { addToCart, openCart } from '../features/cart/cartSlice'
import { formatPrice, truncateText } from '../utils/helpers'

export function ProductRow({ product }) {
  const dispatch = useDispatch()
  const [added, setAdded] = useState(false)
  const [err, setErr]     = useState(false)
  const inCart = useSelector(s => s.cart.items.some(i => i.id === product.id))
  const discounted = product.price * (1 - product.discountPercentage / 100)

  const handleAdd = () => {
    dispatch(addToCart(product))
    dispatch(openCart())
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <motion.div whileHover={{ x: 3 }} transition={{ duration: 0.15 }}
      className="flex items-center gap-3 py-2.5 group">
      <div className="w-11 h-11 rounded-lg overflow-hidden bg-overlay border border-outline shrink-0">
        {!err
          ? <img src={product.thumbnail} alt={product.title}
              className="w-full h-full object-cover" onError={() => setErr(true)} />
          : <div className="w-full h-full flex items-center justify-center text-xl">📦</div>
        }
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white text-xs font-semibold truncate group-hover:text-lime-vivid
                       transition-colors duration-150 leading-tight">
          {product.title}
        </p>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-lime-vivid text-xs font-black">{formatPrice(discounted)}</span>
          {product.discountPercentage > 1 && (
            <span className="text-ink-muted text-2xs line-through">{formatPrice(product.price)}</span>
          )}
        </div>
      </div>
      <motion.button onClick={handleAdd} whileTap={{ scale: 0.9 }}
        aria-label={`Add ${product.title} to cart`}
        className={`p-2 rounded-lg transition-all duration-150 shrink-0
          ${added || inCart
            ? 'bg-lime-vivid/15 text-lime-vivid'
            : 'text-ink-muted hover:text-lime-vivid hover:bg-lime-vivid/10'
          }`}>
        {added ? <HiCheck className="text-sm" /> : <HiOutlineShoppingBag className="text-sm" />}
      </motion.button>
    </motion.div>
  )
}

export default function ProductCard({ product }) {
  const dispatch = useDispatch()
  const [added, setAdded] = useState(false)
  const [err, setErr]     = useState(false)
  const inCart = useSelector(s => s.cart.items.some(i => i.id === product.id))
  const discounted = product.price * (1 - product.discountPercentage / 100)

  const handleAdd = e => {
    e.stopPropagation()
    dispatch(addToCart(product))
    dispatch(openCart())
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="card group overflow-hidden hover:border-white/[0.13] hover:shadow-lift flex flex-col cursor-default"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-overlay">
        {!err
          ? <img src={product.thumbnail} alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={() => setErr(true)} />
          : <div className="w-full h-full flex items-center justify-center text-5xl bg-raised">📦</div>
        }

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {product.discountPercentage > 4 && (
          <div className="absolute top-2.5 left-2.5">
            <span className="tag-lime text-[10px]">
              -{Math.round(product.discountPercentage)}%
            </span>
          </div>
        )}

        <div className="absolute top-2.5 right-2.5">
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-pill
                           bg-black/50 backdrop-blur-sm text-ink-secondary border border-white/10 capitalize">
            {product.category?.replace(/-/g, ' ')}
          </span>
        </div>

        <motion.button onClick={handleAdd}
          initial={{ opacity: 0, y: 8 }}
          whileHover="show"
          aria-label="Quick add to cart"
          className={`absolute bottom-3 inset-x-3 py-2 rounded-lg text-xs font-bold
                      flex items-center justify-center gap-1.5
                      opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0
                      transition-all duration-200
                      ${added || inCart
                        ? 'bg-lime-vivid text-void'
                        : 'bg-black/70 backdrop-blur-sm text-white border border-white/15 hover:bg-lime-vivid hover:text-void hover:border-transparent'
                      }`}
        >
          {added
            ? <><HiCheck className="text-sm" /> Added</>
            : inCart
              ? <><HiCheck className="text-sm" /> In Cart</>
              : <><HiOutlineShoppingBag className="text-sm" /> Quick Add</>
          }
        </motion.button>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-1 mb-1.5">
          <TbStarFilled className="text-amber-400 text-xs shrink-0" />
          <span className="text-ink-muted text-2xs font-semibold">{product.rating?.toFixed(1)}</span>
        </div>

        <h3 className="text-white text-sm font-semibold leading-snug mb-1 line-clamp-2
                        group-hover:text-lime-vivid/90 transition-colors duration-200">
          {product.title}
        </h3>

        <p className="text-ink-muted text-xs leading-relaxed line-clamp-2 mb-3 flex-1">
          {truncateText(product.description, 72)}
        </p>

        <div className="flex items-center justify-between mt-auto pt-2 border-t border-outline">
          <div>
            <span className="text-white font-black text-base">{formatPrice(discounted)}</span>
            {product.discountPercentage > 0.5 && (
              <span className="text-ink-muted text-xs line-through ml-1.5">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
          <motion.button onClick={handleAdd} whileTap={{ scale: 0.93 }}
            aria-label={`Add ${product.title} to cart`}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold
                        transition-all duration-200
                        ${added || inCart
                          ? 'bg-lime-vivid text-void shadow-lime-sm'
                          : 'bg-lime-vivid/10 text-lime-vivid hover:bg-lime-vivid hover:text-void'
                        }`}
          >
            {added ? <HiCheck className="text-xs" /> : <HiOutlineShoppingBag className="text-xs" />}
            {added ? 'Added' : inCart ? 'In Cart' : 'Add'}
          </motion.button>
        </div>
      </div>
    </motion.article>
  )
}
