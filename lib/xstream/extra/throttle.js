"use strict";
var index_1 = require('../index');
var ThrottleOperator = (function () {
    function ThrottleOperator(dt, ins) {
        this.dt = dt;
        this.ins = ins;
        this.type = 'throttle';
        this.out = null;
        this.id = null;
    }
    ThrottleOperator.prototype._start = function (out) {
        this.out = out;
        this.ins._add(this);
    };
    ThrottleOperator.prototype._stop = function () {
        this.ins._remove(this);
        this.out = null;
        this.id = null;
    };
    ThrottleOperator.prototype.clearInterval = function () {
        var id = this.id;
        if (id !== null) {
            clearInterval(id);
        }
        this.id = null;
    };
    ThrottleOperator.prototype._n = function (t) {
        var _this = this;
        var u = this.out;
        if (!u)
            return;
        if (this.id)
            return;
        u._n(t);
        this.id = setInterval(function () {
            _this.clearInterval();
        }, this.dt);
    };
    ThrottleOperator.prototype._e = function (err) {
        var u = this.out;
        if (!u)
            return;
        this.clearInterval();
        u._e(err);
    };
    ThrottleOperator.prototype._c = function () {
        var u = this.out;
        if (!u)
            return;
        this.clearInterval();
        u._c();
    };
    return ThrottleOperator;
}());
/**
 * Emits event and drops subsequent events until a certain amount of silence has passed.
 *
 * Marble diagram:
 *
 * ```text
 * --1-2-----3--4----5|
 *     throttle(60)
 * --1-------3-------5-|
 * ```
 *
 * Example:
 *
 * ```js
 * import fromDiagram from 'xstream/extra/fromDiagram'
 * import throttle from 'xstream/extra/throttle'
 *
 * const stream = fromDiagram('--1-2-----3--4----5|')
 *  .compose(throttle(60))
 *
 * stream.addListener({
 *   next: i => console.log(i),
 *   error: err => console.error(err),
 *   complete: () => console.log('completed')
 * })
 * ```
 *
 * ```text
 * > 1
 * > 3
 * > 5
 * > completed
 * ```
 *
 * @param {number} period The amount of silence required in milliseconds.
 * @return {Stream}
 */
function throttle(period) {
    return function throttleOperator(ins) {
        return new index_1.Stream(new ThrottleOperator(period, ins));
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = throttle;
//# sourceMappingURL=throttle.js.map