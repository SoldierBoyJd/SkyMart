export const formatPrice = price =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    }).format(price)

export const formatDiscount = discountPercentage =>
    `${Math.round(discountPercentage)}% OFF`

export const getDiscountedPrice = (price, discountPercentage) =>
    price - (price * discountPercentage) / 100

export const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 17) return 'Good Afternoon'
    if (hour < 21) return 'Good Evening'
    return 'Good Night'
}

export const truncateText = (text, length = 60) => {
    if (!text) return ''
    return text.length > length ? `${text.substring(0, length)}...` : text
}

export const getCategoryIcon = category => {
    const iconMap = {
        electronics: '💻',
        smartphones: '📱',
        laptops: '💻',
        fragrances: '🌸',
        skincare: '🧴',
        groceries: '🛒',
        'home-decoration': '🏠',
        furniture: '🪑',
        tops: '👕',
        'womens-dresses': '👗',
        'womens-shoes': '👠',
        'mens-shirts': '👔',
        'mens-shoes': '👟',
        'mens-watches': '⌚',
        'womens-watches': '⌚',
        'womens-bags': '👜',
        'womens-jewellery': '💍',
        sunglasses: '🕶️',
        automotive: '🚗',
        motorcycle: '🏍️',
        lighting: '💡',
        sports: '⚽',
        accessories: '🎒',
        clothing: '👕',
        home: '🏠',
        beauty: '💄',
    }
    const key = category?.slug || category?.name?.toLowerCase() || ''
    for (const [k, v] of Object.entries(iconMap)) {
        if (key.includes(k)) return v
    }
    return '📦'
}

export const getCategoryLabel = category => {
    if (typeof category === 'string') return category
    return category?.name || category?.slug || 'Unknown'
}

export const debounce = (fn, delay) => {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => fn(...args), delay)
    }
}

export const getInitials = (firstName, lastName) => {
    const f = firstName?.charAt(0)?.toUpperCase() || ''
    const l = lastName?.charAt(0)?.toUpperCase() || ''
    return `${f}${l}`
}

export const getStarRating = rating => {
    const full = Math.floor(rating)
    const hasHalf = rating % 1 >= 0.5
    const empty = 5 - full - (hasHalf ? 1 : 0)
    return { full, hasHalf, empty }
}
