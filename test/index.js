/*
 * @Descripttion: 
 * @Author: xutao
 * @Date: 2019-12-30 16:50:45
 * @LastEditors  : xutao
 * @LastEditTime : 2019-12-31 16:55:18
 */
let { EventEmitter } = require("../build/index.js");

let callback = function (...args) {
    console.log('callback: ', this.firstName);
}
let callback1 = function (...args) {
    console.log('callback: ', this.lastName);
}
let context1 = {
    firstName: 'xu',
    lastName: 'tao'
};
let context2 = {
    firstName: 'xu1',
    lastName: 'tao1'
};
EventEmitter.on('test1', callback);
EventEmitter.on('test2', callback, context1);
EventEmitter.on('test3', callback, context2);

console.log(EventEmitter._events);
console.log(EventEmitter._eventContexts);

EventEmitter.once('test1', callback1);
EventEmitter.once('test2', callback1, context1);
EventEmitter.once('test3', callback1, context2);

console.log(EventEmitter._events);
console.log(EventEmitter._eventContexts);

// EventEmitter.emit('test1');
// EventEmitter.emit('test2');
// EventEmitter.emit('test3');
// console.log(EventEmitter._events);
// console.log(EventEmitter._eventContexts);

EventEmitter.off('test3');
console.log(EventEmitter._events);
console.log(EventEmitter._eventContexts);
