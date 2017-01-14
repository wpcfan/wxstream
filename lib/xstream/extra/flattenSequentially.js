"use strict";
var index_1 = require('../index');
var FSInner = (function () {
    function FSInner(out, op) {
        this.out = out;
        this.op = op;
    }
    FSInner.prototype._n = function (t) {
        this.out._n(t);
    };
    FSInner.prototype._e = function (err) {
        this.out._e(err);
    };
    FSInner.prototype._c = function () {
        this.op.less();
    };
    return FSInner;
}());
var FlattenSeqOperator = (function () {
    function FlattenSeqOperator(ins) {
        this.type = 'flattenSequentially';
        this.ins = ins;
        this.out = null;
        this.open = true;
        this.active = null;
        this.activeIL = null;
        this.seq = [];
    }
    FlattenSeqOperator.prototype._start = function (out) {
        this.out = out;
        this.open = true;
        this.active = null;
        this.activeIL = new FSInner(out, this);
        this.seq = [];
        this.ins._add(this);
    };
    FlattenSeqOperator.prototype._stop = function () {
        this.ins._remove(this);
        if (this.active && this.activeIL) {
            this.active._remove(this.activeIL);
        }
        this.open = true;
        this.active = null;
        this.activeIL = null;
        this.seq = [];
        this.out = null;
    };
    FlattenSeqOperator.prototype.less = function () {
        this.active = null;
        var seq = this.seq;
        if (seq.length > 0) {
            this._n(seq.shift());
        }
        if (!this.open && !this.active) {
            this.out._c();
        }
    };
    FlattenSeqOperator.prototype._n = function (s) {
        var u = this.out;
        if (!u)
            return;
        if (this.active) {
            this.seq.push(s);
        }
        else {
            this.active = s;
            s._add(this.activeIL);
        }
    };
    FlattenSeqOperator.prototype._e = function (err) {
        var u = this.out;
        if (!u)
            return;
        u._e(err);
    };
    FlattenSeqOperator.prototype._c = function () {
        var u = this.out;
        if (!u)
            return;
        this.open = false;
        if (!this.active && this.seq.length === 0) {
            u._c();
        }
    };
    return FlattenSeqOperator;
}());
exports.FlattenSeqOperator = FlattenSeqOperator;
/**
 * Flattens a "stream of streams", handling only one nested stream at a time,
 * with no concurrency, but does not drop nested streams like `flatten` does.
 *
 * If the input stream is a stream that emits streams, then this operator will
 * return an output stream which is a flat stream: emits regular events. The
 * flattening happens sequentially and without concurrency. It works like this:
 * when the input stream emits a nested stream, *flattenSequentially* will start
 * imitating that nested one. When the next nested stream is emitted on the
 * input stream, *flattenSequentially* will keep that in a buffer, and only
 * start imitating it once the previous nested stream completes.
 *
 * In essence, `flattenSequentially` concatenates all nested streams.
 *
 * Marble diagram:
 *
 * ```text
 * --+--------+-------------------------
 *   \        \
 *    \       ----1----2---3--|
 *    --a--b----c----d--|
 *          flattenSequentially
 * -----a--b----c----d------1----2---3--
 * ```
 *
 * @return {Stream}
 */
function flattenSequentially(ins) {
    return new index_1.Stream(new FlattenSeqOperator(ins));
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = flattenSequentially;
//# sourceMappingURL=flattenSequentially.js.map