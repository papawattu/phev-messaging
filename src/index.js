import { messages, send, subscribe } from './mqtt_client'

const phevMqtt = () => ({
    send : send,
    messages : topic => {
        subscribe(topic)
        return messages(topic)
    }
})
