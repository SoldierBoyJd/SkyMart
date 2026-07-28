import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const REGISTRY_KEY = 'skymart_users'

const SEED_USERS = [
    {
        id: 1,
        username: 'emilys',
        email: 'emily.smith@skymart.com',
        password: 'emilyspass',
        firstName: 'Emily',
        lastName: 'Smith',
        createdAt: '2024-01-01T00:00:00.000Z',
    },
]

export const getUserRegistry = () => {
    try {
        const raw = localStorage.getItem(REGISTRY_KEY)
        if (raw) return JSON.parse(raw)
        localStorage.setItem(REGISTRY_KEY, JSON.stringify(SEED_USERS))
        return SEED_USERS
    } catch {
        return SEED_USERS
    }
}

const saveUserRegistry = users => {
    try {
        localStorage.setItem(REGISTRY_KEY, JSON.stringify(users))
    } catch { }
}

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ username, password }, { rejectWithValue }) => {
        await new Promise(r => setTimeout(r, 280))

        if (!username?.trim()) return rejectWithValue('Username is required.')
        if (!password?.trim()) return rejectWithValue('Password is required.')

        const registry = getUserRegistry()

        const user = registry.find(
            u =>
                u.username.toLowerCase() === username.trim().toLowerCase() ||
                u.email.toLowerCase() === username.trim().toLowerCase()
        )

        if (!user) {
            return rejectWithValue('No account found with that username. Please register first.')
        }

        if (user.password !== password) {
            return rejectWithValue('Incorrect password. Please try again.')
        }

        const { password: _pw, ...safeUser } = user
        return { ...safeUser, token: `skymart-token-${user.id}-${Date.now()}` }
    }
)

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async ({ firstName, lastName, email, password }, { rejectWithValue }) => {
        await new Promise(r => setTimeout(r, 280))

        if (!firstName?.trim()) return rejectWithValue('First name is required.')
        if (!lastName?.trim()) return rejectWithValue('Last name is required.')
        if (!email?.trim()) return rejectWithValue('Email address is required.')
        if (!password) return rejectWithValue('Password is required.')

        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRe.test(email.trim())) {
            return rejectWithValue('Please enter a valid email address.')
        }

        if (password.length < 6) {
            return rejectWithValue('Password must be at least 6 characters.')
        }

        const registry = getUserRegistry()

        if (registry.some(u => u.email.toLowerCase() === email.trim().toLowerCase())) {
            return rejectWithValue('An account with this email already exists. Sign in instead.')
        }

        let baseUsername = email.trim().split('@')[0].toLowerCase().replace(/[^a-z0-9_]/g, '')
        let username = baseUsername
        let suffix = 1
        while (registry.some(u => u.username === username)) {
            username = `${baseUsername}${suffix++}`
        }

        const newUser = {
            id: Date.now(),
            username,
            email: email.trim().toLowerCase(),
            password,
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            createdAt: new Date().toISOString(),
        }

        saveUserRegistry([...registry, newUser])

        const { password: _pw, ...safeUser } = newUser
        return { ...safeUser, token: `skymart-token-${newUser.id}-${Date.now()}` }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: null,
    },
    reducers: {
        logout(state) {
            state.user = null
            state.token = null
            state.isAuthenticated = false
            state.error = null
            state.loading = false
        },
        clearError(state) {
            state.error = null
        },
    },
    extraReducers: builder => {
        builder
            .addCase(loginUser.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.loading = false
                state.user = {
                    id: payload.id,
                    username: payload.username,
                    email: payload.email,
                    firstName: payload.firstName,
                    lastName: payload.lastName,
                }
                state.token = payload.token
                state.isAuthenticated = true
            })
            .addCase(loginUser.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })
            .addCase(registerUser.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(registerUser.fulfilled, (state, { payload }) => {
                state.loading = false
                state.user = {
                    id: payload.id,
                    username: payload.username,
                    email: payload.email,
                    firstName: payload.firstName,
                    lastName: payload.lastName,
                }
                state.token = payload.token
                state.isAuthenticated = true
            })
            .addCase(registerUser.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })
    },
})

export const { logout, clearError } = authSlice.actions
export default authSlice.reducer
