import net from 'net'
import { log } from 'phev-utils'

const SocketClient = ({ client = new net.Socket(), host, port } = {}) => ({
    publish: data => client.writable ? client.write(data) : undefined,
    start: () => new Promise((resolve, reject) => {
        if(client.writable) resolve(client)
        
        client.removeAllListeners()
   
        client.on('error', err => {
            log.error(err)
            return reject(err)
        })
        client.on('connect', () => {
            log.debug(`Socket connected to ${host} ${port}`)
            return resolve(client)
        })

        client.connect(port, host)
    }),
    registerHandler: handler => {
        client.removeListener('data', handler)
        client.on('data', handler)
    },
})

export default SocketClient