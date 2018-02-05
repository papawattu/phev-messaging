'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mqtt2 = require('mqtt');

var _mqtt3 = _interopRequireDefault(_mqtt2);

var _phevUtils = require('phev-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MqttClient = function MqttClient() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$mqtt = _ref.mqtt,
        mqtt = _ref$mqtt === undefined ? _mqtt3.default : _ref$mqtt,
        mqttUri = _ref.mqttUri,
        _ref$topicName = _ref.topicName,
        topicName = _ref$topicName === undefined ? 'topic' : _ref$topicName,
        _ref$subscriptionName = _ref.subscriptionName,
        subscriptionName = _ref$subscriptionName === undefined ? 'subscription' : _ref$subscriptionName;

    var client = null;

    return {
        start: function start() {
            return new Promise(function (resolve, reject) {
                _phevUtils.log.info('Started MQTT');
                client = mqtt.connect(mqttUri);

                client.on('error', function (err) {
                    _phevUtils.log.error(err);
                    reject(err);
                });
                client.on('connect', function () {
                    _phevUtils.log.info('MQTT connected');
                    resolve(client);
                });
            });
        },
        registerHandler: function registerHandler(handler) {
            _phevUtils.log.debug('Registered Handler');

            client.subscribe(subscriptionName);
            client.removeListener('message', handler);
            client.on('message', function (subscription, message) {
                _phevUtils.log.debug('MQTT received message ' + subscription + ' : ' + JSON.stringify(message));
                if (subscription === subscriptionName) {
                    handler(message);
                } else {
                    _phevUtils.log.debug('Ignoring not subscribed to ' + subscription);
                }
            });
        },
        publish: function publish(message) {
            _phevUtils.log.debug('MQTT Publish to ' + topicName + ' :' + JSON.stringify(message));
            client.publish(topicName, message);
        },
        stop: function stop() {
            return new Promise(function (resolve, reject) {
                client.unsubscribe(subscriptionName);
                client.end(function () {
                    return resolve();
                });
            });
        }
    };
};

exports.default = MqttClient;