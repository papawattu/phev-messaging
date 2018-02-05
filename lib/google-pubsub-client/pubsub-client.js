'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _pubsub = require('@google-cloud/pubsub');

var _pubsub2 = _interopRequireDefault(_pubsub);

var _phevUtils = require('phev-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PubSubClient = function PubSubClient() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$pubSub = _ref.pubSub,
        pubSub = _ref$pubSub === undefined ? (0, _pubsub2.default)() : _ref$pubSub,
        _ref$topicName = _ref.topicName,
        topicName = _ref$topicName === undefined ? 'receive' : _ref$topicName,
        _ref$subscriptionName = _ref.subscriptionName,
        subscriptionName = _ref$subscriptionName === undefined ? 'send' : _ref$subscriptionName;

    var topic = void 0,
        publisher = void 0;

    var start = function start() {
        _phevUtils.log.info('Started Google PubSub');
        topic = pubSub.topic(topicName);
        publisher = topic.publisher();

        return Promise.resolve();
    };
    var stop = function stop() {
        return Promise.resolve();
    };

    var publish = function publish(message) {
        _phevUtils.log.debug('Publish ' + JSON.stringify(message));

        publisher.publish(message);
    };

    var registerHandler = function registerHandler(handler) {

        var subscription = pubSub.subscription(subscriptionName);
        subscription.removeListener('message', handler);
        subscription.on('message', function (message) {
            _phevUtils.log.debug('Incoming message ' + JSON.stringify(message.data));

            message.ack();
            handler(message.data);
        });
    };
    return {
        start: start,
        stop: stop,
        publish: publish,
        registerHandler: registerHandler
    };
};

exports.default = PubSubClient;