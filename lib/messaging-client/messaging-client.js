'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _phevUtils = require('phev-utils');

var MessagingClient = function MessagingClient(_ref) {
    var messaging = _ref.messaging;


    var registerHandler = function registerHandler(handler) {
        return messaging.registerHandler(handler);
    };

    var start = function start() {
        return messaging.start();
    };

    var stop = function stop() {
        return messaging.stop();
    };

    var publish = function publish(message) {
        return messaging.publish(message);
    };

    return {
        start: start,
        stop: stop,
        registerHandler: registerHandler,
        publish: publish
    };
};

exports.default = MessagingClient;