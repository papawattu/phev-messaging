import { log } from 'phev-utils'

const MessagingClient = ({ messaging }) => {

    const registerHandler = handler => messaging.registerHandler(handler)
    
    const start = () => messaging.start()

    const stop = () => messaging.stop()
    
    const publish = message => messaging.publish(message)
        
    return {
        start,
        stop,
        registerHandler,
        publish
    }
}

export default MessagingClient