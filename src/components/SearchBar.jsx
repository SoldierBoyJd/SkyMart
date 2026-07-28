import { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HiSearch, HiX } from 'react-icons/hi'
import { searchProducts, fetchProducts, setSearchQuery } from '../features/products/productSlice'
import { debounce } from '../utils/helpers'

export default function SearchBar({ placeholder = 'Search products…' }) {
  const dispatch = useDispatch()
  const { searchQuery, searchLoading } = useSelector(s => s.products)
  const [local, setLocal] = useState(searchQuery)

  const doSearch = useCallback(
    debounce(q => {
      dispatch(setSearchQuery(q))
      if (q.trim()) dispatch(searchProducts({ query: q.trim(), limit: 100 }))
      else dispatch(fetchProducts({ limit: 100 }))
    }, 380),
    [dispatch]
  )

  useEffect(() => { setLocal(searchQuery) }, [searchQuery])

  const handleChange = e => { setLocal(e.target.value); doSearch(e.target.value) }
  const handleClear  = () => { setLocal(''); dispatch(setSearchQuery('')); dispatch(fetchProducts({ limit: 100 })) }

  return (
    <div className="relative">
      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
        {searchLoading
          ? <span className="w-4 h-4 border-2 border-outline border-t-lime-vivid rounded-full animate-spin block" />
          : <HiSearch className="text-ink-muted text-base" />
        }
      </div>

      <input
        type="search"
        value={local}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label="Search products"
        className="field pl-10 pr-9 text-sm"
      />

      {local && (
        <button onClick={handleClear} aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-ink-muted
                     hover:text-white rounded transition-colors duration-150">
          <HiX className="text-sm" />
        </button>
      )}
    </div>
  )
}
