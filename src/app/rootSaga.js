import ChatRoomSaga from '../features/Chat-rom/ChatRoomSaga'
import { all } from 'redux-saga/effects'

export default function* rootSaga() {
    yield all([ChatRoomSaga()])
}
