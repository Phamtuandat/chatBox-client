import { combineReducers, configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import user from '../features/Auth/AuthSlice'
import rootSaga from './rootSaga'
import userReducer from '../../src/features/Chat-rom/userSlice'
import RoomReducer from '../../src/features/Chat-rom/ChatRoomSlice'
const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
    Auth: user,
    Room: RoomReducer,
    user: userReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)
