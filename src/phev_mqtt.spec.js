import chai from 'chai';
import sinon from 'sinon';
import phevMqtt from '.';
import mqtt from './mqtt_stub'

const assert = chai.assert;

describe('mqtt wrapper', () => {
    
    it('Should send and receive buffer', (done) => {
        
        const sut = phevMqtt({mqtt, uri: ''})
        sut.subscribe('test')
        const sub = sut.messages('test').subscribe(x => {
            assert.deepEqual(x.message,Buffer.from([0,1,2,3,4]),'expected Buffer[0,1,2,3,4] got ' + x)
            sub.unsubscribe();
            sut.unsubscribe('test')
            done()
        })
        sut.send('test',Buffer.from([0,1,2,3,4]))
    })
})