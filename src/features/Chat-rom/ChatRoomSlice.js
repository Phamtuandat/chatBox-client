import { createSlice } from '@reduxjs/toolkit'

const ChatRoomSlice = createSlice({
    name: 'chatRoom',
    initialState: {
        roomInfo: {},
        loading: false,
    },
    reducers: {
        fetchRoomInfo: (state) => {
            state.loading = true
        },
        fetchRoomInfoSuccess: (state, action) => {
            state.roomInfo = action.payload
            state.loading = false
        },
        fetchRoomInfoFailed: (state, action) => {
            state.loading = false
        },
    },
})

const { actions, reducer } = ChatRoomSlice

export const roomActions = actions

export const loadingSelector = (state) => state.Room.loading
export const roomInfoSelector = (state) => state.Room.roomInfo

export default reducer
