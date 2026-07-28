import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        isOpen: false,
    },
    reducers: {
        addToCart(state, action) {
            const product = action.payload
            const existing = state.items.find(item => item.id === product.id)
            if (existing) {
                existing.quantity += 1
            } else {
                state.items.push({ ...product, quantity: 1 })
            }
        },
        removeFromCart(state, action) {
            state.items = state.items.filter(item => item.id !== action.payload)
        },
        increaseQuantity(state, action) {
            const item = state.items.find(i => i.id === action.payload)
            if (item) item.quantity += 1
        },
        decreaseQuantity(state, action) {
            const item = state.items.find(i => i.id === action.payload)
            if (item) {
                if (item.quantity === 1) {
                    state.items = state.items.filter(i => i.id !== action.payload)
                } else {
                    item.quantity -= 1
                }
            }
        },
        clearCart(state) {
            state.items = []
        },
        openCart(state) {
            state.isOpen = true
        },
        closeCart(state) {
            state.isOpen = false
        },
        toggleCart(state) {
            state.isOpen = !state.isOpen
        },
    },
})

export const {
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    openCart,
    closeCart,
    toggleCart,
} = cartSlice.actions

export const selectCartItems = state => state.cart.items
export const selectCartTotal = state =>
    state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
export const selectCartCount = state =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
export const selectCartOpen = state => state.cart.isOpen

export default cartSlice.reducer
