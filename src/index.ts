import { util } from "./util";

/*
 * @Descripttion: 事件管理器
 * @Author: xutao
 * @Date: 2019-07-23 10:38:09
 * @LastEditors  : xutao
 * @LastEditTime : 2020-01-02 11:27:04
 */
interface eventInfo {
    name: string,
    args: any[]
}
export class EventEmitter {

    private static _events: any = {};
    private static _eventContexts: any = {};
    private static _eventsCache: eventInfo[];
    /**
     * 延迟事件最大执行时间
     * 单位：毫秒
     */
    public static maxWaitEventTime: number = 16;

    /**
     * 事件注册
     * @param name 
     * @param fn 
     */
    static on(name: string | number, fn: Function, context?: Object) {

        if (!util.isFunction(fn)) {
            console.warn('EventEmitter on: fn must be Function');
            return;
        }

        this._events[name] || (this._events[name] = []);
        this._eventContexts[name] || (this._eventContexts[name] = []);
        let cbs: Function[] = this._events[name];
        if (cbs.indexOf(fn) === -1) {
            this._events[name].push(fn);
            this._eventContexts[name].push(context);
        }
    }

    /**
     * 事件注册，执行单次
     * @param name 
     * @param fn 
     * @param context 
     */
    static once(name: string | number, fn: Function, context?: Object) {
        if (!util.isFunction(fn)) {
            console.warn('EventEmitter on: fn must be Function');
            return;
        }

        let callback: Function = function (...args: any[]) {
            EventEmitter.off(name, callback);
            if (context) {
                fn.bind(context)(args);
            } else {
                fn(args);
            }
        }

        this.on(name, callback, context);
    }

    /**
     * 事件回调销毁
     * @param name 事件名
     * @param fn 回调函数
     */
    static off(name: string | number, fn?: Function) {
        let cbs: Function[] = this._events[name];
        let contexts: any[] = this._eventContexts[name];
        if (!cbs) {
            return;
        }
        if (fn == null) {
            delete this._events[name];
            delete this._eventContexts[name];
            return;
        }
        for (let len = cbs.length, i = len - 1; i >= 0; i--) {
            let cb: Function = cbs[i];
            if (cb === fn) {
                cbs.splice(i, 1);
                contexts.splice(i, 1);
                break;
            }
        }
    }

    /**
     * 事件触发
     * @param name 
     * @param args 
     */
    static emit(name: string | number, ...args: any[]) {
        let cbs: Function[] = this._events[name];
        let contexts: any[] = this._eventContexts[name];
        if (!cbs) {
            return;
        }
        for (let len = cbs.length, i = len - 1; i >= 0; i--) {
            let cb = cbs[i];
            let context = contexts[i];
            try {
                if (context) {
                    cb.call(context, args);
                } else {
                    cb(args);
                }
            } catch (e) {
                console.error('EventEmitter emit: ', e);
            }
        }
    }

    /**
     * 
     * @param name 
     * @param args 
     */
    static sendEvent(name: string | number, ...args: any[]) {
        (this._eventsCache || (this._eventsCache = [])).push(<eventInfo>{
            name,
            args
        });
    }

    static flushEvents() {
        let date1 = new Date().getTime();
        for (let i = 0, len = this._eventsCache.length; i < len; i++) {
            let waitEvent: eventInfo = this._eventsCache[i];
            this.emit(waitEvent.name, waitEvent.args);
            let date2 = new Date().getTime();
            // 超过最大时间暂停事件执行
            if (date2 - date1 >= this.maxWaitEventTime) {
                this._eventsCache.splice(0, i);
                console.warn(`EventEmitter clearEvents: 超过事件执行时间限制${this.maxWaitEventTime}`);
                return;
            }
        }

        this._eventsCache = [];

    }
}
