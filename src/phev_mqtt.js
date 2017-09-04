import { Observable } from 'rxjs'

const phevMqtt = ( { mqtt, uri } ) => {
    
    const client = mqtt.connect(uri)
    
    const send = ( topic, message ) => { 
        client.publish(topic, message) 
        return message 
    }
    
    const subscribe = topic => client.subscribe(topic)
    
    const unsubscribe = topic => client.unsubscribe(topic)
    
    const observeEvent = ev => Observable.fromEvent(client, ev, (topic, message) => ({topic, message}))  
    
    const messages = topic => observeEvent('message').filter(x => x.topic === topic)
    
    return { 
        send: send, 
        messages: messages, 
        subscribe: subscribe, 
        unsubscribe: unsubscribe 
    }
}
export default phevMqtt 
