import _mqtt from 'mqtt'
import { Observable } from 'rxjs'

let debug = process.env.DEBUG ? true : false

const log = debug ? message => console.log(message) : undefined

const PhevMqtt = ( { mqtt, uri, options } ) => {
    
    log(`MQTT Uri ${uri} ${JSON.stringify(options)}`)

    const client = (mqtt || _mqtt).connect(uri, options)

    client.on('connected', ()=> log('Connected to ' + uri))
    client.on('error', err => log(err))
    client.on('message', (topic, msg) => log(`Received >> topic ${topic} >> ${JSON.stringify(msg)}`))

    const send = ( topic, message ) => { 
        log(`Sending >> topic ${topic} >> message ${JSON.stringify(message)}`)
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
