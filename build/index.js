import { util } from "./util";
var EventEmitter = /** @class */ (function () {
    function EventEmitter() {
    }
    /**
     * 事件注册
     * @param name
     * @param fn
     */
    EventEmitter.on = function (name, fn, context) {
        if (!util.isFunction(fn)) {
            console.warn('EventEmitter on: fn must be Function');
            return;
        }
        this._events[name] || (this._events[name] = []);
        this._eventContexts[name] || (this._eventContexts[name] = []);
        var cbs = this._events[name];
        if (cbs.indexOf(fn) === -1) {
            this._events[name].push(fn);
            this._eventContexts[name].push(context);
        }
    };
    /**
     * 事件注册，执行单次
     * @param name
     * @param fn
     * @param context
     */
    EventEmitter.once = function (name, fn, context) {
        if (!util.isFunction(fn)) {
            console.warn('EventEmitter on: fn must be Function');
            return;
        }
        var callback = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            EventEmitter.off(name, callback);
            if (context) {
                fn.bind(context)(args);
            }
            else {
                fn(args);
            }
        };
        this.on(name, callback, context);
    };
    /**
     * 事件回调销毁
     * @param name 事件名
     * @param fn 回调函数
     */
    EventEmitter.off = function (name, fn) {
        var cbs = this._events[name];
        var contexts = this._eventContexts[name];
        if (!cbs) {
            return;
        }
        if (fn == null) {
            delete this._events[name];
            delete this._eventContexts[name];
            return;
        }
        for (var len = cbs.length, i = len - 1; i >= 0; i--) {
            var cb = cbs[i];
            if (cb === fn) {
                cbs.splice(i, 1);
                contexts.splice(i, 1);
                break;
            }
        }
    };
    /**
     * 事件触发
     * @param name
     * @param args
     */
    EventEmitter.emit = function (name) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var cbs = this._events[name];
        var contexts = this._eventContexts[name];
        if (!cbs) {
            return;
        }
        for (var len = cbs.length, i = len - 1; i >= 0; i--) {
            var cb = cbs[i];
            var context = contexts[i];
            try {
                if (context) {
                    cb.call(context, args);
                }
                else {
                    cb(args);
                }
            }
            catch (e) {
                console.error('EventEmitter emit: ', e);
            }
        }
    };
    /**
     *
     * @param name
     * @param args
     */
    EventEmitter.sendEvent = function (name) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        (this._eventsCache || (this._eventsCache = [])).push({
            name: name,
            args: args
        });
    };
    EventEmitter.flushEvents = function () {
        var date1 = new Date().getTime();
        for (var i = 0, len = this._eventsCache.length; i < len; i++) {
            var waitEvent = this._eventsCache[i];
            this.emit(waitEvent.name, waitEvent.args);
            var date2 = new Date().getTime();
            // 超过最大时间暂停事件执行
            if (date2 - date1 >= this.maxWaitEventTime) {
                this._eventsCache.splice(0, i);
                console.warn("EventEmitter clearEvents: \u8D85\u8FC7\u4E8B\u4EF6\u6267\u884C\u65F6\u95F4\u9650\u5236" + this.maxWaitEventTime);
                return;
            }
        }
        this._eventsCache = [];
    };
    EventEmitter._events = {};
    EventEmitter._eventContexts = {};
    /**
     * 延迟事件最大执行时间
     * 单位：毫秒
     */
    EventEmitter.maxWaitEventTime = 16;
    return EventEmitter;
}());
export { EventEmitter };
//# sourceMappingURL=index.js.map