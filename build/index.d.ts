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
    static once(name: string | number, fn: Function, context?: Object): void;
    static off(name: string | number, fn?: Function): void;
    static emit(name: string | number, ...args: any[]): void;
    static sendEvent(name: string | number, ...args: any[]): void;
    static flushEvents(): void;
}
