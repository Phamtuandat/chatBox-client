import AxiosClient from './AxiosClient'

const MessageApi = {
    getConversation(roomId, paginations) {
        return AxiosClient.get(`/chatRoom/${roomId}`, paginations)
    },
    postMess(roomId, message) {
        return AxiosClient.post(`/chatRoom/${roomId}`, message)
    },
}

export default MessageApi
