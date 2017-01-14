"use strict";
var index_1 = require('../index');
var concat_1 = require('./concat');
function interpolate(y, from, to) {
    return (from * (1 - y) + to * y);
}
function flip(fn) {
    return function (x) { return 1 - fn(1 - x); };
}
function createEasing(fn) {
    var fnFlipped = flip(fn);
    return {
        easeIn: function (x, from, to) {
            return interpolate(fn(x), from, to);
        },
        easeOut: function (x, from, to) {
            return interpolate(fnFlipped(x), from, to);
        },
        easeInOut: function (x, from, to) {
            var y = (x < 0.5) ?
                (fn(2 * x) * 0.5) :
                (0.5 + fnFlipped(2 * (x - 0.5)) * 0.5);
            return interpolate(y, from, to);
        }
    };
}
;
var easingPower2 = createEasing(function (x) { return x * x; });
var easingPower3 = createEasing(function (x) { return x * x * x; });
var easingPower4 = createEasing(function (x) {
    var xx = x * x;
    return xx * xx;
});
var EXP_WEIGHT = 6;
var EXP_MAX = Math.exp(EXP_WEIGHT) - 1;
function expFn(x) {
    return (Math.exp(x * EXP_WEIGHT) - 1) / EXP_MAX;
}
var easingExponential = createEasing(expFn);
var OVERSHOOT = 1.70158;
var easingBack = createEasing(function (x) { return x * x * ((OVERSHOOT + 1) * x - OVERSHOOT); });
var PARAM1 = 7.5625;
var PARAM2 = 2.75;
function easeOutFn(x) {
    var z = x;
    if (z < 1 / PARAM2) {
        return (PARAM1 * z * z);
    }
    else if (z < 2 / PARAM2) {
        return (PARAM1 * (z -= 1.5 / PARAM2) * z + 0.75);
    }
    else if (z < 2.5 / PARAM2) {
        return (PARAM1 * (z -= 2.25 / PARAM2) * z + 0.9375);
    }
    else {
        return (PARAM1 * (z -= 2.625 / PARAM2) * z + 0.984375);
    }
}
var easingBounce = createEasing(function (x) { return 1 - easeOutFn(1 - x); });
var easingCirc = createEasing(function (x) { return -(Math.sqrt(1 - x * x) - 1); });
var PERIOD = 0.3;
var OVERSHOOT_ELASTIC = PERIOD / 4;
var AMPLITUDE = 1;
function elasticIn(x) {
    var z = x;
    if (z <= 0) {
        return 0;
    }
    else if (z >= 1) {
        return 1;
    }
    else {
        z -= 1;
        return -(AMPLITUDE * Math.pow(2, 10 * z))
            * Math.sin((z - OVERSHOOT_ELASTIC) * (2 * Math.PI) / PERIOD);
    }
}
var easingElastic = createEasing(elasticIn);
var HALF_PI = Math.PI * 0.5;
var easingSine = createEasing(function (x) { return 1 - Math.cos(x * HALF_PI); });
var DEFAULT_INTERVAL = 15;
/**
 * Creates a stream of numbers emitted in a quick burst, following a numeric
 * function like sine or elastic or quadratic. tween() is meant for creating
 * streams for animations.
 *
 * Example:
 *
 * ```js
 * import tween from 'xstream/extra/tween'
 *
 * const stream = tween({
 *   from: 20,
 *   to: 100,
 *   ease: tween.exponential.easeIn,
 *   duration: 1000, // milliseconds
 * })
 *
 * stream.addListener({
 *   next: (x) => console.log(x),
 *   error: (err) => console.error(err),
 *   complete: () => console.log('concat completed'),
 * })
 * ```
 *
 * The stream would behave like the plot below:
 *
 * ```text
 * 100                  #
 * |
 * |
 * |
 * |
 * 80                  #
 * |
 * |
 * |
 * |                  #
 * 60
 * |
 * |                 #
 * |
 * |                #
 * 40
 * |               #
 * |              #
 * |            ##
 * |         ###
 * 20########
 * +---------------------> time
 * ```
 *
 * Provide a configuration object with **from**, **to**, **duration**, **ease**,
 * **interval** (optional), and this factory function will return a stream of
 * numbers following that pattern. The first number emitted will be `from`, and
 * the last number will be `to`. The numbers in between follow the easing
 * function you specify in `ease`, and the stream emission will last in total
 * `duration` milliseconds.
 *
 * The easing functions are attached to `tween` too, such as
 * `tween.linear.ease`, `tween.power2.easeIn`, `tween.exponential.easeOut`, etc.
 * Here is a list of all the available easing options:
 *
 * - `tween.linear` with ease
 * - `tween.power2` with easeIn, easeOut, easeInOut
 * - `tween.power3` with easeIn, easeOut, easeInOut
 * - `tween.power4` with easeIn, easeOut, easeInOut
 * - `tween.exponential` with easeIn, easeOut, easeInOut
 * - `tween.back` with easeIn, easeOut, easeInOut
 * - `tween.bounce` with easeIn, easeOut, easeInOut
 * - `tween.circular` with easeIn, easeOut, easeInOut
 * - `tween.elastic` with easeIn, easeOut, easeInOut
 * - `tween.sine` with easeIn, easeOut, easeInOut
 *
 * @factory true
 * @param {TweenConfig} config An object with properties `from: number`,
 * `to: number`, `duration: number`, `ease: function` (optional, defaults to
 * linear), `interval: number` (optional, defaults to 15).
 * @return {Stream}
 */
function tween(_a) {
    var from = _a.from, to = _a.to, duration = _a.duration, _b = _a.ease, ease = _b === void 0 ? tweenFactory.linear.ease : _b, _c = _a.interval, interval = _c === void 0 ? DEFAULT_INTERVAL : _c;
    var totalTicks = Math.round(duration / interval);
    return index_1.Stream.periodic(interval)
        .take(totalTicks)
        .map(function (tick) { return ease(tick / totalTicks, from, to); })
        .compose(function (s) { return concat_1.default(s, index_1.Stream.of(to)); });
}
var tweenFactory = tween;
tweenFactory.linear = { ease: interpolate };
tweenFactory.power2 = easingPower2;
tweenFactory.power3 = easingPower3;
tweenFactory.power4 = easingPower4;
tweenFactory.exponential = easingExponential;
tweenFactory.back = easingBack;
tweenFactory.bounce = easingBounce;
tweenFactory.circular = easingCirc;
tweenFactory.elastic = easingElastic;
tweenFactory.sine = easingSine;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = tweenFactory;
//# sourceMappingURL=tween.js.map