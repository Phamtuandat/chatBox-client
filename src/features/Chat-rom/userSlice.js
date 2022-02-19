import { createSlice } from '@reduxjs/toolkit'

const ChatRoomSlice = createSlice({
    name: 'chatRoom',
    initialState: {
        loading: false,
        userList: [],
        filter: {},
        errors: '',
    },
    reducers: {
        fetchUser: (state) => {
            state.loading = true
        },
        fetchUserSuccess: (state, action) => {
            state.loading = false
            state.userList = action.payload
        },
        fetchUserFailed: (state, action) => {
            state.loading = false
            state.errors = action.payload
        },
        setFilter: (state, action) => {
            state.filter = action.payload
        },
        fetchUserWithDebounce: (state, action) => {
            // state.filter = action.payload
        },
        clearResult: (state) => {
            state.userList = []
        },
        addUser: (state) => {
            state.loading = true
        },
        addUserSuccess: (state, action) => {
            state.loading = false
        },
        addUserFailed: (state, action) => {
            state.loading = false
            state.errors = action.payload
        },
    },
})

const { actions, reducer } = ChatRoomSlice

export const userActions = actions

export const filterSelector = (state) => state.user.filter
export const userListSelector = (state) => state.user.userList
export const loadingSelector = (state) => state.user.loading

export default reducer
