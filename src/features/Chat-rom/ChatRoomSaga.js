import { call, debounce, put, takeLatest } from 'redux-saga/effects'
import RoomAPI from '../../AxiosClient/RoomAPI'
import userApi from '../../AxiosClient/UserAPI'
import { roomActions } from './ChatRoomSlice'
import { userActions } from './userSlice'

function* fetchUserList(action) {
    try {
        const userList = yield call(userApi.find, action.payload)
        yield put(userActions.fetchUserSuccess(userList))
    } catch (error) {
        yield put(userActions.fetchUserFailed(error.response))
    }
}

function* handleSearchDebounce(action) {
    yield put(userActions.setFilter(action.payload))
}
function* fetchRoomInfo(action) {
    const roomInfo = yield call(RoomAPI.getById, action.payload)
    yield put(roomActions.fetchRoomInfoSuccess(roomInfo))
}

function* addUser(action) {
    console.log(action.payload)
    try {
        const data = yield call(RoomAPI.addUser, action.payload.params)
        const roomInfo = yield call(RoomAPI.getById, action.payload.roomId)
        yield put(roomActions.fetchRoomInfoSuccess(roomInfo))
        yield put(userActions.addUserSuccess(data))
    } catch (error) {
        yield put(userActions.addUserFailed(error.message))
    }
}

export default function* ChatRoomSaga() {
    yield takeLatest(userActions.fetchUser.type, fetchUserList)
    yield debounce(1000, userActions.fetchUserWithDebounce.type, handleSearchDebounce)
    yield takeLatest(roomActions.fetchRoomInfo.type, fetchRoomInfo)
    yield takeLatest(userActions.addUser.type, addUser)
}
