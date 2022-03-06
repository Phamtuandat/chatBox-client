import AxiosClient from './AxiosClient'

const AuthApi = {
    register(params) {
        return AxiosClient.post('/auth/register', params)
    },
    signIn(params) {
        return AxiosClient.post('/auth/signin', params)
    },
    signInWithGoogle(params) {
        return AxiosClient.post('/auth/signinWithGoogle', params)
    },
}

export default AuthApi
