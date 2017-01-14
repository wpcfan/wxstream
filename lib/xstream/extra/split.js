"use strict";
var index_1 = require('../index');
var SeparatorIL = (function () {
    function SeparatorIL(out, op) {
        this.out = out;
        this.op = op;
    }
    SeparatorIL.prototype._n = function (t) {
        this.op.up();
    };
    SeparatorIL.prototype._e = function (err) {
        this.out._e(err);
    };
    SeparatorIL.prototype._c = function () {
        this.op.curr._c();
        this.out._c();
    };
    return SeparatorIL;
}());
var SplitOperator = (function () {
    function SplitOperator(s, // s = separator
        ins) {
        this.s = s;
        this.ins = ins;
        this.type = 'split';
        this.curr = new index_1.Stream();
        this.out = null;
        this.sil = index_1.NO_IL; // sil = separator InternalListener
    }
    SplitOperator.prototype._start = function (out) {
        this.out = out;
        this.s._add(this.sil = new SeparatorIL(out, this));
        this.ins._add(this);
        out._n(this.curr);
    };
    SplitOperator.prototype._stop = function () {
        this.ins._remove(this);
        this.s._remove(this.sil);
        this.curr = new index_1.Stream();
        this.out = null;
        this.sil = index_1.NO_IL;
    };
    SplitOperator.prototype.up = function () {
        this.curr._c();
        this.out._n(this.curr = new index_1.Stream());
    };
    SplitOperator.prototype._n = function (t) {
        if (!this.out)
            return;
        this.curr._n(t);
    };
    SplitOperator.prototype._e = function (err) {
        var u = this.out;
        if (!u)
            return;
        u._e(err);
    };
    SplitOperator.prototype._c = function () {
        var u = this.out;
        if (!u)
            return;
        this.curr._c();
        u._c();
    };
    return SplitOperator;
}());
exports.SplitOperator = SplitOperator;
/**
 * Splits a stream using a separator stream. Returns a stream that emits
 * streams.
 *
 * Marble diagram:
 *
 * ```text
 * --1--2--3--4--5--6--7--8--9|
 *  split( --a----b--- )
 * ---------------------------|
 *   :        :    :
 *   1--2--3-|:    :
 *            4--5|:
 *                 -6--7--8--9|
 * ```
 *
 * Example:
 *
 * ```js
 * import split from 'xstream/extra/split'
 * import concat from 'xstream/extra/concat'
 *
 * const source = xs.periodic(50).take(10)
 * const separator = concat(xs.periodic(167).take(2), xs.never())
 * const result = source.compose(split(separator))
 *
 * result.addListener({
 *   next: stream => {
 *     stream.addListener({
 *       next: i => console.log(i),
 *       error: err => console.error(err),
 *       complete: () => console.log('inner completed')
 *     })
 *   },
 *   error: err => console.error(err),
 *   complete: () => console.log('outer completed')
 * })
 * ```
 *
 * ```text
 * > 0
 * > 1
 * > 2
 * > inner completed
 * > 3
 * > 4
 * > 5
 * > inner completed
 * > 6
 * > 7
 * > 8
 * > 9
 * > inner completed
 * > outer completed
 * ```
 *
 * @param {Stream} separator Some other stream that is used to know when to
 * split the output stream.
 * @return {Stream}
 */
function split(separator) {
    return function splitOperator(ins) {
        return new index_1.Stream(new SplitOperator(separator, ins));
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = split;
//# sourceMappingURL=split.js.map