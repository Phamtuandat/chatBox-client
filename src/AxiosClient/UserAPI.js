import AxiosClient from './AxiosClient'

const userApi = {
    find(params) {
        return AxiosClient.get('/user/find', { params })
    },
}
export default userApi
