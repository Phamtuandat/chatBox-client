import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import AuthApi from '../../AxiosClient/AuthAPI'

export const register = createAsyncThunk('user/register', async (payload) => {
    const data = await AuthApi.register(payload)
    localStorage.setItem('user', JSON.stringify(data.user))
    localStorage.setItem('token', data.token)
    return data
})
export const signin = createAsyncThunk('user/signin', async (payload) => {
    const data = await AuthApi.signIn(payload)
    localStorage.setItem('user', JSON.stringify(data.user))
    localStorage.setItem('token', data.token)
    return data
})
export const signinWithGoogle = createAsyncThunk('user/signinWithGoogle', async (payload) => {
    const data = await AuthApi.signInWithGoogle(payload)
    localStorage.setItem('user', JSON.stringify(data.user))
    localStorage.setItem('token', data.token)
    return data
})

const AuthSlice = createSlice({
    name: 'user',
    initialState: {
        current:
            {
                user: JSON.parse(localStorage.getItem('user')),
                token: localStorage.getItem('token'),
            } || {},
    },
    reducers: {
        Logout: (state) => {
            localStorage.removeItem('user')
            localStorage.removeItem('token')
            return (state = {})
        },
    },
    extraReducers: {
        [register.fulfilled]: (state, action) => {
            state.current = action.payload
        },
        [signin.fulfilled]: (state, action) => {
            state.current = action.payload
        },
        [signinWithGoogle.fulfilled]: (state, action) => {
            state.current = action.payload
        },
    },
})

const { actions, reducer } = AuthSlice
export const { Logout, loginWithGoogle } = actions

export default reducer
