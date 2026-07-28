import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../services/axios'

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/products/categories')
            return response.data
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to fetch categories')
        }
    }
)

const categorySlice = createSlice({
    name: 'categories',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchCategories.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false
                state.items = action.payload
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export default categorySlice.reducer
