"use strict";
var index_1 = require('../index');
var OtherIL = (function () {
    function OtherIL(out, op) {
        this.out = out;
        this.op = op;
    }
    OtherIL.prototype._n = function (t) {
        this.op.up();
    };
    OtherIL.prototype._e = function (err) {
        this.out._e(err);
    };
    OtherIL.prototype._c = function () {
        this.op.up();
    };
    return OtherIL;
}());
var DropUntilOperator = (function () {
    function DropUntilOperator(o, // o = other
        ins) {
        this.o = o;
        this.ins = ins;
        this.type = 'dropUntil';
        this.out = null;
        this.oil = index_1.NO_IL; // oil = other InternalListener
        this.on = false;
    }
    DropUntilOperator.prototype._start = function (out) {
        this.out = out;
        this.o._add(this.oil = new OtherIL(out, this));
        this.ins._add(this);
    };
    DropUntilOperator.prototype._stop = function () {
        this.ins._remove(this);
        this.o._remove(this.oil);
        this.out = null;
        this.oil = index_1.NO_IL;
    };
    DropUntilOperator.prototype.up = function () {
        this.on = true;
        this.o._remove(this.oil);
        this.oil = index_1.NO_IL;
    };
    DropUntilOperator.prototype._n = function (t) {
        var u = this.out;
        if (!u)
            return;
        if (!this.on)
            return;
        u._n(t);
    };
    DropUntilOperator.prototype._e = function (err) {
        var u = this.out;
        if (!u)
            return;
        u._e(err);
    };
    DropUntilOperator.prototype._c = function () {
        var u = this.out;
        if (!u)
            return;
        this.up();
        u._c();
    };
    return DropUntilOperator;
}());
exports.DropUntilOperator = DropUntilOperator;
/**
 * Starts emitting the input stream when another stream emits a next event. The
 * output stream will complete if/when the other stream completes.
 *
 * Marble diagram:
 *
 * ```text
 * ---1---2-----3--4----5----6---
 *   dropUntil( --------a--b--| )
 * ---------------------5----6|
 * ```
 *
 * Example:
 *
 * ```js
 * import dropUntil from 'xstream/extra/dropUntil'
 *
 * const other = xs.periodic(220).take(1)
 *
 * const stream = xs.periodic(50)
 *   .take(6)
 *   .compose(dropUntil(other))
 *
 * stream.addListener({
 *   next: i => console.log(i),
 *   error: err => console.error(err),
 *   complete: () => console.log('completed')
 * })
 * ```
 *
 * ```text
 * > 4
 * > 5
 * > completed
 * ```
 *
 * #### Arguments:
 *
 * @param {Stream} other Some other stream that is used to know when should the
 * output stream of this operator start emitting.
 * @return {Stream}
 */
function dropUntil(other) {
    return function dropUntilOperator(ins) {
        return new index_1.Stream(new DropUntilOperator(other, ins));
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = dropUntil;
//# sourceMappingURL=dropUntil.js.map