import _mqtt from 'mqtt'
import { Observable } from 'rxjs'

const log = process.env.DEBUG ? message => console.log(message) : undefined

const PhevMqtt = ( { mqtt, uri, options } ) => {
    
    const client = mqtt.connect(uri, options)
    
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
export default PhevMqtt 
