/*
 * @Descripttion: 基础工具方法模块
 * @Author: xutao
 * @Date: 2019-09-15 18:00:05
 * @LastEditors  : xutao
 * @LastEditTime : 2019-12-30 15:56:03
 */
export var util;
(function (util) {
    function isFunction(data) {
        return Object.prototype.toString.call(data) === "[object Function]";
    }
    util.isFunction = isFunction;
})(util || (util = {}));
//# sourceMappingURL=util.js.map