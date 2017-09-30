import net from 'net'
import { log } from 'phev-utils'

const SocketClient = ({ client = new net.Socket(), host, port } = {}) => ({
    publish: data => client.writable ? client.write(data) : undefined,
    start: () => new Promise((resolve, reject) => {
        if(client.writable) resolve(client)
        
        client.removeAllListeners()
   
        client.on('error', err => {
            console.log('***error')
            log.error(err)
            return reject(err)
        })
        client.on('connect', () => {
            console.log('***connect')
            log.debug(`Socket connected to ${host} ${port}`)
            return resolve(client)
        })
        client.on('close', () => console.log('***close'))
        client.on('drain', () => console.log('***drain'))
        client.on('end', () => console.log('***end'))
        client.on('lookup', () => console.log('***lookup'))
        client.on('timeout', () => console.log('***timeout'))
        
        client.connect(port, host)
    }),
    registerHandler: handler => {
        client.removeListener('data', handler)
        client.on('data', handler)
    },
    stop:  new Promise.resolve()
})

export default SocketClient