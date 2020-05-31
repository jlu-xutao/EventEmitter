export declare class EventEmitter {
    private static _events;
    private static _eventContexts;
    private static _eventsCache;
    /**
     * 延迟事件最大执行时间
     * 单位：毫秒
     */
    static maxWaitEventTime: number;
    /**
     * 事件注册
     * @param name
     * @param fn
     */
    static on(name: string | number, fn: Function, context?: Object): void;
    /**
     * 事件注册，执行单次
     * @param name
     * @param fn
     * @param context
     */
    static once(name: string | number, fn: Function, context?: Object): void;
    /**
     * 事件回调销毁
     * @param name 事件名
     * @param fn 回调函数
     */
    static off(name: string | number, fn?: Function): void;
    /**
     * 事件触发
     * @param name
     * @param args
     */
    static emit(name: string | number, ...args: any[]): void;
    /**
     *
     * @param name
     * @param args
     */
    static sendEvent(name: string | number, ...args: any[]): void;
    static flushEvents(): void;
}
