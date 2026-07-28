import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import productsReducer from '../features/products/productSlice'
import cartReducer from '../features/cart/cartSlice'
import categoryReducer from '../features/category/categorySlice'

const loadState = () => {
    try {
        const preloaded = {}

        const rawAuth = localStorage.getItem('skymart_auth')
        if (rawAuth) {
            const parsed = JSON.parse(rawAuth)
            preloaded.auth = {
                user: parsed.user ?? null,
                token: parsed.token ?? null,
                isAuthenticated: parsed.isAuthenticated ?? false,
                loading: false,
                error: null,
            }
        }

        const rawCart = localStorage.getItem('skymart_cart')
        if (rawCart) {
            const parsed = JSON.parse(rawCart)
            preloaded.cart = {
                items: parsed.items ?? [],
                isOpen: false,
            }
        }

        return preloaded
    } catch {
        return {}
    }
}

const saveState = state => {
    try {
        localStorage.setItem('skymart_auth', JSON.stringify({
            user: state.auth.user,
            token: state.auth.token,
            isAuthenticated: state.auth.isAuthenticated,
        }))
        localStorage.setItem('skymart_cart', JSON.stringify({
            items: state.cart.items,
        }))
    } catch { }
}

export const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productsReducer,
        cart: cartReducer,
        categories: categoryReducer,
    },
    preloadedState: loadState(),
})

store.subscribe(() => saveState(store.getState()))
