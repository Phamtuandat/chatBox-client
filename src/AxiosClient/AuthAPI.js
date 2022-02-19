import AxiosClient from './AxiosClient'

const AuthApi = {
    register(params) {
        return AxiosClient.post('/auth/register', params)
    },
    signIn(params) {
        return AxiosClient.post('/auth/signin', params)
    },
}

export default AuthApi
