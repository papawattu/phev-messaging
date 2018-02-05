'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mqtt2 = require('mqtt');

var _mqtt3 = _interopRequireDefault(_mqtt2);

var _rxjs = require('rxjs');

var _phevUtils = require('phev-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PhevMqtt = function PhevMqtt(_ref) {
    var _ref$mqtt = _ref.mqtt,
        mqtt = _ref$mqtt === undefined ? _mqtt3.default : _ref$mqtt,
        uri = _ref.uri,
        options = _ref.options;


    _phevUtils.log.info('Starting MQTT Uri ' + uri + ' ' + JSON.stringify(options));

    var client = mqtt.connect(uri, options);

    client.on('connected', function () {
        return _phevUtils.log.debug('Connected to ' + uri);
    });
    client.on('error', function (err) {
        return _phevUtils.log.error(err);
    });
    client.on('message', function (topic, msg) {
        return _phevUtils.log.debug('Received >> topic ' + topic + ' >> ' + JSON.stringify(msg));
    });

    var send = function send(topic, message) {
        _phevUtils.log.debug('Sending >> topic ' + topic + ' >> message ' + JSON.stringify(message));
        client.publish(topic, message);
        return message;
    };

    var subscribe = function subscribe(topic) {
        return client.subscribe(topic);
    };

    var unsubscribe = function unsubscribe(topic) {
        return client.unsubscribe(topic);
    };

    var observeEvent = function observeEvent(ev) {
        return _rxjs.Observable.fromEvent(client, ev, function (topic, message) {
            return { topic: topic, message: message };
        });
    };

    var messages = function messages(topic) {
        return observeEvent('message').filter(function (x) {
            return x.topic === topic;
        });
    };

    return {
        send: send,
        messages: messages,
        subscribe: subscribe,
        unsubscribe: unsubscribe,
        connected: client.connected,
        client: client
    };
};
exports.default = PhevMqtt;