import AxiosClient from './AxiosClient'

const RoomAPI = {
    new(params) {
        return AxiosClient.post('/room/new', params)
    },
    deleteRoom(id) {
        return AxiosClient.delete(`/room/${id}`)
    },
    addUser(params) {
        return AxiosClient.post(`/room/addUser/${params.id}`, { userList: params.userList })
    },
    deleteUser(params) {
        return AxiosClient.delete(`/room/${params.id}`, params.userList)
    },
    getAll() {
        return AxiosClient.get('/room')
    },
    getById(id) {
        return AxiosClient.get(`/room/${id}`)
    },
}

export default RoomAPI
