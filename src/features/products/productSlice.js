import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../services/axios'

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async ({ limit = 30, skip = 0, category = '' } = {}, { rejectWithValue }) => {
        try {
            const url = category ? `/products/category/${category}` : '/products'
            const response = await axiosInstance.get(url, { params: { limit, skip } })
            return response.data
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to fetch products')
        }
    }
)

export const searchProducts = createAsyncThunk(
    'products/searchProducts',
    async ({ query, limit = 30 } = {}, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/products/search', { params: { q: query, limit } })
            return response.data
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Search failed')
        }
    }
)

export const fetchTopRated = createAsyncThunk(
    'products/fetchTopRated',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/products', {
                params: { limit: 10, sortBy: 'rating', order: 'desc' },
            })
            return response.data
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to fetch top rated')
        }
    }
)

export const fetchNewArrivals = createAsyncThunk(
    'products/fetchNewArrivals',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/products', { params: { limit: 10, skip: 20 } })
            return response.data
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to fetch new arrivals')
        }
    }
)

const productSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        topRated: [],
        newArrivals: [],
        total: 0,
        loading: false,
        searchLoading: false,
        error: null,
        searchQuery: '',
        selectedCategory: '',
        currentPage: 1,
        itemsPerPage: 12,
    },
    reducers: {
        setSearchQuery(state, action) {
            state.searchQuery = action.payload
        },
        setSelectedCategory(state, action) {
            state.selectedCategory = action.payload
            state.currentPage = 1
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload
        },
        clearProducts(state) {
            state.items = []
            state.total = 0
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchProducts.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false
                state.items = action.payload.products
                state.total = action.payload.total
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(searchProducts.pending, state => {
                state.searchLoading = true
                state.error = null
            })
            .addCase(searchProducts.fulfilled, (state, action) => {
                state.searchLoading = false
                state.items = action.payload.products
                state.total = action.payload.total
            })
            .addCase(searchProducts.rejected, (state, action) => {
                state.searchLoading = false
                state.error = action.payload
            })
            .addCase(fetchTopRated.fulfilled, (state, action) => {
                state.topRated = action.payload.products
            })
            .addCase(fetchNewArrivals.fulfilled, (state, action) => {
                state.newArrivals = action.payload.products
            })
    },
})

export const { setSearchQuery, setSelectedCategory, setCurrentPage, clearProducts } =
    productSlice.actions
export default productSlice.reducer
