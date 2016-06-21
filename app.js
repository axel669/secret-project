(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

(function () {
  try {
    cachedSetTimeout = setTimeout;
  } catch (e) {
    cachedSetTimeout = function () {
      throw new Error('setTimeout is not defined');
    }
  }
  try {
    cachedClearTimeout = clearTimeout;
  } catch (e) {
    cachedClearTimeout = function () {
      throw new Error('clearTimeout is not defined');
    }
  }
} ())
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = cachedSetTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    cachedClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        cachedSetTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],2:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/get-iterator"), __esModule: true };
},{"core-js/library/fn/get-iterator":18}],3:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/assign"), __esModule: true };
},{"core-js/library/fn/object/assign":19}],4:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/create"), __esModule: true };
},{"core-js/library/fn/object/create":20}],5:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/define-properties"), __esModule: true };
},{"core-js/library/fn/object/define-properties":21}],6:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":22}],7:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/keys"), __esModule: true };
},{"core-js/library/fn/object/keys":23}],8:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/set-prototype-of"), __esModule: true };
},{"core-js/library/fn/object/set-prototype-of":24}],9:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/promise"), __esModule: true };
},{"core-js/library/fn/promise":25}],10:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol"), __esModule: true };
},{"core-js/library/fn/symbol":26}],11:[function(require,module,exports){
"use strict";

exports["default"] = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

exports.__esModule = true;
},{}],12:[function(require,module,exports){
"use strict";

var _Object$defineProperty = require("babel-runtime/core-js/object/define-property")["default"];

exports["default"] = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;

      _Object$defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

exports.__esModule = true;
},{"babel-runtime/core-js/object/define-property":6}],13:[function(require,module,exports){
"use strict";

var _Object$assign = require("babel-runtime/core-js/object/assign")["default"];

exports["default"] = _Object$assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

exports.__esModule = true;
},{"babel-runtime/core-js/object/assign":3}],14:[function(require,module,exports){
"use strict";

var _Object$create = require("babel-runtime/core-js/object/create")["default"];

var _Object$setPrototypeOf = require("babel-runtime/core-js/object/set-prototype-of")["default"];

exports["default"] = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = _Object$create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

exports.__esModule = true;
},{"babel-runtime/core-js/object/create":4,"babel-runtime/core-js/object/set-prototype-of":8}],15:[function(require,module,exports){
"use strict";

exports["default"] = function (obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
};

exports.__esModule = true;
},{}],16:[function(require,module,exports){
(function (global){
// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g =
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this;

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = require("./runtime");

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}

module.exports = { "default": module.exports, __esModule: true };

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./runtime":17}],17:[function(require,module,exports){
(function (process,global){
/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

"use strict";

var _Symbol = require("babel-runtime/core-js/symbol")["default"];

var _Object$create = require("babel-runtime/core-js/object/create")["default"];

var _Object$setPrototypeOf = require("babel-runtime/core-js/object/set-prototype-of")["default"];

var _Promise = require("babel-runtime/core-js/promise")["default"];

!(function (global) {
  "use strict";

  var hasOwn = Object.prototype.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof _Symbol === "function" ? _Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided, then outerFn.prototype instanceof Generator.
    var generator = _Object$create((outerFn || Generator).prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      prototype[method] = function (arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function (genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor ? ctor === GeneratorFunction ||
    // For the native GeneratorFunction constructor, the best we can
    // do is to check its .name property.
    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
  };

  runtime.mark = function (genFun) {
    if (_Object$setPrototypeOf) {
      _Object$setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = _Object$create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `value instanceof AwaitArgument` to determine if the yielded value is
  // meant to be awaited. Some may consider the name of this method too
  // cutesy, but they are curmudgeons.
  runtime.awrap = function (arg) {
    return new AwaitArgument(arg);
  };

  function AwaitArgument(arg) {
    this.arg = arg;
  }

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value instanceof AwaitArgument) {
          return _Promise.resolve(value.arg).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return _Promise.resolve(value).then(function (unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof process === "object" && process.domain) {
      invoke = process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new _Promise(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
      // If enqueue has been called before, then we want to wait until
      // all previous Promises have been resolved before calling invoke,
      // so that results are always delivered in the correct order. If
      // enqueue has not been called before, then it is important to
      // call invoke immediately, without waiting on a callback to fire,
      // so that the async generator function has the opportunity to do
      // any necessary setup in a predictable way. This predictability
      // is why the Promise constructor synchronously invokes its
      // executor callback, and why async functions synchronously
      // execute code before the first await. Since we implement simple
      // async functions in terms of async generators, it is especially
      // important to get this right, even though it requires care.
      previousPromise ? previousPromise.then(callInvokeWithMethodAndArg,
      // Avoid propagating failures to Promises returned by later
      // invocations of the iterator.
      callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function (innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));

    return runtime.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
    : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          if (method === "return" || method === "throw" && delegate.iterator[method] === undefined) {
            // A return or throw (when the delegate iterator has no throw
            // method) always terminates the yield* loop.
            context.delegate = null;

            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            var returnMethod = delegate.iterator["return"];
            if (returnMethod) {
              var record = tryCatch(returnMethod, delegate.iterator, arg);
              if (record.type === "throw") {
                // If the return method threw an exception, let that
                // exception prevail over the original return or throw.
                method = "throw";
                arg = record.arg;
                continue;
              }
            }

            if (method === "return") {
              // Continue with the outer return, now that the delegate
              // iterator has been terminated.
              continue;
            }
          }

          var record = tryCatch(delegate.iterator[method], delegate.iterator, arg);

          if (record.type === "throw") {
            context.delegate = null;

            // Like returning generator.throw(uncaught), but without the
            // overhead of an extra function call.
            method = "throw";
            arg = record.arg;
            continue;
          }

          // Delegate generator ran and handled its own exceptions so
          // regardless of what the method was, we continue as if it is
          // "next" with an undefined arg.
          method = "next";
          arg = undefined;

          var info = record.arg;
          if (info.done) {
            context[delegate.resultName] = info.value;
            context.next = delegate.nextLoc;
          } else {
            state = GenStateSuspendedYield;
            return info;
          }

          context.delegate = null;
        }

        if (method === "next") {
          if (state === GenStateSuspendedYield) {
            context.sent = arg;
          } else {
            context.sent = undefined;
          }
        } else if (method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw arg;
          }

          if (context.dispatchException(arg)) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            method = "next";
            arg = undefined;
          }
        } else if (method === "return") {
          context.abrupt("return", arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done ? GenStateCompleted : GenStateSuspendedYield;

          var info = {
            value: record.arg,
            done: context.done
          };

          if (record.arg === ContinueSentinel) {
            if (context.delegate && method === "next") {
              // Deliberately forget the last sent value so that we don't
              // accidentally pass it on to the delegate.
              arg = undefined;
            }
          } else {
            return info;
          }
        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(arg) call above.
          method = "throw";
          arg = record.arg;
        }
      }
    };
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[iteratorSymbol] = function () {
    return this;
  };

  Gp[toStringTagSymbol] = "Generator";

  Gp.toString = function () {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function (object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function reset(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      this.sent = undefined;
      this.done = false;
      this.delegate = null;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function stop() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function dispatchException(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;
        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }
          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.next = finallyEntry.finallyLoc;
      } else {
        this.complete(record);
      }

      return ContinueSentinel;
    },

    complete: function complete(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" || record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = record.arg;
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }
    },

    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      return ContinueSentinel;
    }
  };
})(
// Among the various tricks for obtaining a reference to the global
// object, this seems to be the most reliable technique that does not
// use indirect eval (which violates Content Security Policy).
typeof global === "object" ? global : typeof window === "object" ? window : typeof self === "object" ? self : undefined);
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"_process":1,"babel-runtime/core-js/object/create":4,"babel-runtime/core-js/object/set-prototype-of":8,"babel-runtime/core-js/promise":9,"babel-runtime/core-js/symbol":10}],18:[function(require,module,exports){
require('../modules/web.dom.iterable');
require('../modules/es6.string.iterator');
module.exports = require('../modules/core.get-iterator');
},{"../modules/core.get-iterator":82,"../modules/es6.string.iterator":89,"../modules/web.dom.iterable":91}],19:[function(require,module,exports){
require('../../modules/es6.object.assign');
module.exports = require('../../modules/$.core').Object.assign;
},{"../../modules/$.core":32,"../../modules/es6.object.assign":84}],20:[function(require,module,exports){
var $ = require('../../modules/$');
module.exports = function create(P, D){
  return $.create(P, D);
};
},{"../../modules/$":57}],21:[function(require,module,exports){
var $ = require('../../modules/$');
module.exports = function defineProperties(T, D){
  return $.setDescs(T, D);
};
},{"../../modules/$":57}],22:[function(require,module,exports){
var $ = require('../../modules/$');
module.exports = function defineProperty(it, key, desc){
  return $.setDesc(it, key, desc);
};
},{"../../modules/$":57}],23:[function(require,module,exports){
require('../../modules/es6.object.keys');
module.exports = require('../../modules/$.core').Object.keys;
},{"../../modules/$.core":32,"../../modules/es6.object.keys":85}],24:[function(require,module,exports){
require('../../modules/es6.object.set-prototype-of');
module.exports = require('../../modules/$.core').Object.setPrototypeOf;
},{"../../modules/$.core":32,"../../modules/es6.object.set-prototype-of":86}],25:[function(require,module,exports){
require('../modules/es6.object.to-string');
require('../modules/es6.string.iterator');
require('../modules/web.dom.iterable');
require('../modules/es6.promise');
module.exports = require('../modules/$.core').Promise;
},{"../modules/$.core":32,"../modules/es6.object.to-string":87,"../modules/es6.promise":88,"../modules/es6.string.iterator":89,"../modules/web.dom.iterable":91}],26:[function(require,module,exports){
require('../../modules/es6.symbol');
require('../../modules/es6.object.to-string');
module.exports = require('../../modules/$.core').Symbol;
},{"../../modules/$.core":32,"../../modules/es6.object.to-string":87,"../../modules/es6.symbol":90}],27:[function(require,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],28:[function(require,module,exports){
module.exports = function(){ /* empty */ };
},{}],29:[function(require,module,exports){
var isObject = require('./$.is-object');
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"./$.is-object":50}],30:[function(require,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./$.cof')
  , TAG = require('./$.wks')('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};
},{"./$.cof":31,"./$.wks":80}],31:[function(require,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],32:[function(require,module,exports){
var core = module.exports = {version: '1.2.6'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],33:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./$.a-function');
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};
},{"./$.a-function":27}],34:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],35:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./$.fails')(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./$.fails":39}],36:[function(require,module,exports){
var isObject = require('./$.is-object')
  , document = require('./$.global').document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};
},{"./$.global":42,"./$.is-object":50}],37:[function(require,module,exports){
// all enumerable object keys, includes symbols
var $ = require('./$');
module.exports = function(it){
  var keys       = $.getKeys(it)
    , getSymbols = $.getSymbols;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = $.isEnum
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))keys.push(key);
  }
  return keys;
};
},{"./$":57}],38:[function(require,module,exports){
var global    = require('./$.global')
  , core      = require('./$.core')
  , ctx       = require('./$.ctx')
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && key in target;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(param){
        return this instanceof C ? new C(param) : C(param);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
  }
};
// type bitmap
$export.F = 1;  // forced
$export.G = 2;  // global
$export.S = 4;  // static
$export.P = 8;  // proto
$export.B = 16; // bind
$export.W = 32; // wrap
module.exports = $export;
},{"./$.core":32,"./$.ctx":33,"./$.global":42}],39:[function(require,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],40:[function(require,module,exports){
var ctx         = require('./$.ctx')
  , call        = require('./$.iter-call')
  , isArrayIter = require('./$.is-array-iter')
  , anObject    = require('./$.an-object')
  , toLength    = require('./$.to-length')
  , getIterFn   = require('./core.get-iterator-method');
module.exports = function(iterable, entries, fn, that){
  var iterFn = getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    call(iterator, f, step.value, entries);
  }
};
},{"./$.an-object":29,"./$.ctx":33,"./$.is-array-iter":48,"./$.iter-call":51,"./$.to-length":77,"./core.get-iterator-method":81}],41:[function(require,module,exports){
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = require('./$.to-iobject')
  , getNames  = require('./$').getNames
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return getNames(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.get = function getOwnPropertyNames(it){
  if(windowNames && toString.call(it) == '[object Window]')return getWindowNames(it);
  return getNames(toIObject(it));
};
},{"./$":57,"./$.to-iobject":76}],42:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],43:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};
},{}],44:[function(require,module,exports){
var $          = require('./$')
  , createDesc = require('./$.property-desc');
module.exports = require('./$.descriptors') ? function(object, key, value){
  return $.setDesc(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"./$":57,"./$.descriptors":35,"./$.property-desc":63}],45:[function(require,module,exports){
module.exports = require('./$.global').document && document.documentElement;
},{"./$.global":42}],46:[function(require,module,exports){
// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return              fn.apply(that, args);
};
},{}],47:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./$.cof');
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};
},{"./$.cof":31}],48:[function(require,module,exports){
// check on default Array iterator
var Iterators  = require('./$.iterators')
  , ITERATOR   = require('./$.wks')('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};
},{"./$.iterators":56,"./$.wks":80}],49:[function(require,module,exports){
// 7.2.2 IsArray(argument)
var cof = require('./$.cof');
module.exports = Array.isArray || function(arg){
  return cof(arg) == 'Array';
};
},{"./$.cof":31}],50:[function(require,module,exports){
module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};
},{}],51:[function(require,module,exports){
// call something on iterator step with safe closing on error
var anObject = require('./$.an-object');
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};
},{"./$.an-object":29}],52:[function(require,module,exports){
'use strict';
var $              = require('./$')
  , descriptor     = require('./$.property-desc')
  , setToStringTag = require('./$.set-to-string-tag')
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./$.hide')(IteratorPrototype, require('./$.wks')('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};
},{"./$":57,"./$.hide":44,"./$.property-desc":63,"./$.set-to-string-tag":69,"./$.wks":80}],53:[function(require,module,exports){
'use strict';
var LIBRARY        = require('./$.library')
  , $export        = require('./$.export')
  , redefine       = require('./$.redefine')
  , hide           = require('./$.hide')
  , has            = require('./$.has')
  , Iterators      = require('./$.iterators')
  , $iterCreate    = require('./$.iter-create')
  , setToStringTag = require('./$.set-to-string-tag')
  , getProto       = require('./$').getProto
  , ITERATOR       = require('./$.wks')('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , methods, key;
  // Fix native
  if($native){
    var IteratorPrototype = getProto($default.call(new Base));
    // Set @@toStringTag to native iterators
    setToStringTag(IteratorPrototype, TAG, true);
    // FF fix
    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    // fix Array#{values, @@iterator}.name in V8 / FF
    if(DEF_VALUES && $native.name !== VALUES){
      VALUES_BUG = true;
      $default = function values(){ return $native.call(this); };
    }
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES  ? $default : getMethod(VALUES),
      keys:    IS_SET      ? $default : getMethod(KEYS),
      entries: !DEF_VALUES ? $default : getMethod('entries')
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};
},{"./$":57,"./$.export":38,"./$.has":43,"./$.hide":44,"./$.iter-create":52,"./$.iterators":56,"./$.library":59,"./$.redefine":65,"./$.set-to-string-tag":69,"./$.wks":80}],54:[function(require,module,exports){
var ITERATOR     = require('./$.wks')('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ safe = true; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};
},{"./$.wks":80}],55:[function(require,module,exports){
module.exports = function(done, value){
  return {value: value, done: !!done};
};
},{}],56:[function(require,module,exports){
module.exports = {};
},{}],57:[function(require,module,exports){
var $Object = Object;
module.exports = {
  create:     $Object.create,
  getProto:   $Object.getPrototypeOf,
  isEnum:     {}.propertyIsEnumerable,
  getDesc:    $Object.getOwnPropertyDescriptor,
  setDesc:    $Object.defineProperty,
  setDescs:   $Object.defineProperties,
  getKeys:    $Object.keys,
  getNames:   $Object.getOwnPropertyNames,
  getSymbols: $Object.getOwnPropertySymbols,
  each:       [].forEach
};
},{}],58:[function(require,module,exports){
var $         = require('./$')
  , toIObject = require('./$.to-iobject');
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = $.getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};
},{"./$":57,"./$.to-iobject":76}],59:[function(require,module,exports){
module.exports = true;
},{}],60:[function(require,module,exports){
var global    = require('./$.global')
  , macrotask = require('./$.task').set
  , Observer  = global.MutationObserver || global.WebKitMutationObserver
  , process   = global.process
  , Promise   = global.Promise
  , isNode    = require('./$.cof')(process) == 'process'
  , head, last, notify;

var flush = function(){
  var parent, domain, fn;
  if(isNode && (parent = process.domain)){
    process.domain = null;
    parent.exit();
  }
  while(head){
    domain = head.domain;
    fn     = head.fn;
    if(domain)domain.enter();
    fn(); // <- currently we use it only for Promise - try / catch not required
    if(domain)domain.exit();
    head = head.next;
  } last = undefined;
  if(parent)parent.enter();
};

// Node.js
if(isNode){
  notify = function(){
    process.nextTick(flush);
  };
// browsers with MutationObserver
} else if(Observer){
  var toggle = 1
    , node   = document.createTextNode('');
  new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
  notify = function(){
    node.data = toggle = -toggle;
  };
// environments with maybe non-completely correct, but existent Promise
} else if(Promise && Promise.resolve){
  notify = function(){
    Promise.resolve().then(flush);
  };
// for other environments - macrotask based on:
// - setImmediate
// - MessageChannel
// - window.postMessag
// - onreadystatechange
// - setTimeout
} else {
  notify = function(){
    // strange IE + webpack dev server bug - use .call(global)
    macrotask.call(global, flush);
  };
}

module.exports = function asap(fn){
  var task = {fn: fn, next: undefined, domain: isNode && process.domain};
  if(last)last.next = task;
  if(!head){
    head = task;
    notify();
  } last = task;
};
},{"./$.cof":31,"./$.global":42,"./$.task":74}],61:[function(require,module,exports){
// 19.1.2.1 Object.assign(target, source, ...)
var $        = require('./$')
  , toObject = require('./$.to-object')
  , IObject  = require('./$.iobject');

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = require('./$.fails')(function(){
  var a = Object.assign
    , A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return a({}, A)[S] != 7 || Object.keys(a({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , $$    = arguments
    , $$len = $$.length
    , index = 1
    , getKeys    = $.getKeys
    , getSymbols = $.getSymbols
    , isEnum     = $.isEnum;
  while($$len > index){
    var S      = IObject($$[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  }
  return T;
} : Object.assign;
},{"./$":57,"./$.fails":39,"./$.iobject":47,"./$.to-object":78}],62:[function(require,module,exports){
// most Object methods by ES6 should accept primitives
var $export = require('./$.export')
  , core    = require('./$.core')
  , fails   = require('./$.fails');
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};
},{"./$.core":32,"./$.export":38,"./$.fails":39}],63:[function(require,module,exports){
module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};
},{}],64:[function(require,module,exports){
var redefine = require('./$.redefine');
module.exports = function(target, src){
  for(var key in src)redefine(target, key, src[key]);
  return target;
};
},{"./$.redefine":65}],65:[function(require,module,exports){
module.exports = require('./$.hide');
},{"./$.hide":44}],66:[function(require,module,exports){
// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y){
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};
},{}],67:[function(require,module,exports){
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var getDesc  = require('./$').getDesc
  , isObject = require('./$.is-object')
  , anObject = require('./$.an-object');
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = require('./$.ctx')(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};
},{"./$":57,"./$.an-object":29,"./$.ctx":33,"./$.is-object":50}],68:[function(require,module,exports){
'use strict';
var core        = require('./$.core')
  , $           = require('./$')
  , DESCRIPTORS = require('./$.descriptors')
  , SPECIES     = require('./$.wks')('species');

module.exports = function(KEY){
  var C = core[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])$.setDesc(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};
},{"./$":57,"./$.core":32,"./$.descriptors":35,"./$.wks":80}],69:[function(require,module,exports){
var def = require('./$').setDesc
  , has = require('./$.has')
  , TAG = require('./$.wks')('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};
},{"./$":57,"./$.has":43,"./$.wks":80}],70:[function(require,module,exports){
var global = require('./$.global')
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"./$.global":42}],71:[function(require,module,exports){
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject  = require('./$.an-object')
  , aFunction = require('./$.a-function')
  , SPECIES   = require('./$.wks')('species');
module.exports = function(O, D){
  var C = anObject(O).constructor, S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};
},{"./$.a-function":27,"./$.an-object":29,"./$.wks":80}],72:[function(require,module,exports){
module.exports = function(it, Constructor, name){
  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
  return it;
};
},{}],73:[function(require,module,exports){
var toInteger = require('./$.to-integer')
  , defined   = require('./$.defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};
},{"./$.defined":34,"./$.to-integer":75}],74:[function(require,module,exports){
var ctx                = require('./$.ctx')
  , invoke             = require('./$.invoke')
  , html               = require('./$.html')
  , cel                = require('./$.dom-create')
  , global             = require('./$.global')
  , process            = global.process
  , setTask            = global.setImmediate
  , clearTask          = global.clearImmediate
  , MessageChannel     = global.MessageChannel
  , counter            = 0
  , queue              = {}
  , ONREADYSTATECHANGE = 'onreadystatechange'
  , defer, channel, port;
var run = function(){
  var id = +this;
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listner = function(event){
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!setTask || !clearTask){
  setTask = function setImmediate(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(require('./$.cof')(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listner;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
    defer = function(id){
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listner, false);
  // IE8-
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set:   setTask,
  clear: clearTask
};
},{"./$.cof":31,"./$.ctx":33,"./$.dom-create":36,"./$.global":42,"./$.html":45,"./$.invoke":46}],75:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};
},{}],76:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./$.iobject')
  , defined = require('./$.defined');
module.exports = function(it){
  return IObject(defined(it));
};
},{"./$.defined":34,"./$.iobject":47}],77:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./$.to-integer')
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};
},{"./$.to-integer":75}],78:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./$.defined');
module.exports = function(it){
  return Object(defined(it));
};
},{"./$.defined":34}],79:[function(require,module,exports){
var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};
},{}],80:[function(require,module,exports){
var store  = require('./$.shared')('wks')
  , uid    = require('./$.uid')
  , Symbol = require('./$.global').Symbol;
module.exports = function(name){
  return store[name] || (store[name] =
    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
};
},{"./$.global":42,"./$.shared":70,"./$.uid":79}],81:[function(require,module,exports){
var classof   = require('./$.classof')
  , ITERATOR  = require('./$.wks')('iterator')
  , Iterators = require('./$.iterators');
module.exports = require('./$.core').getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};
},{"./$.classof":30,"./$.core":32,"./$.iterators":56,"./$.wks":80}],82:[function(require,module,exports){
var anObject = require('./$.an-object')
  , get      = require('./core.get-iterator-method');
module.exports = require('./$.core').getIterator = function(it){
  var iterFn = get(it);
  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};
},{"./$.an-object":29,"./$.core":32,"./core.get-iterator-method":81}],83:[function(require,module,exports){
'use strict';
var addToUnscopables = require('./$.add-to-unscopables')
  , step             = require('./$.iter-step')
  , Iterators        = require('./$.iterators')
  , toIObject        = require('./$.to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./$.iter-define')(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');
},{"./$.add-to-unscopables":28,"./$.iter-define":53,"./$.iter-step":55,"./$.iterators":56,"./$.to-iobject":76}],84:[function(require,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $export = require('./$.export');

$export($export.S + $export.F, 'Object', {assign: require('./$.object-assign')});
},{"./$.export":38,"./$.object-assign":61}],85:[function(require,module,exports){
// 19.1.2.14 Object.keys(O)
var toObject = require('./$.to-object');

require('./$.object-sap')('keys', function($keys){
  return function keys(it){
    return $keys(toObject(it));
  };
});
},{"./$.object-sap":62,"./$.to-object":78}],86:[function(require,module,exports){
// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = require('./$.export');
$export($export.S, 'Object', {setPrototypeOf: require('./$.set-proto').set});
},{"./$.export":38,"./$.set-proto":67}],87:[function(require,module,exports){

},{}],88:[function(require,module,exports){
'use strict';
var $          = require('./$')
  , LIBRARY    = require('./$.library')
  , global     = require('./$.global')
  , ctx        = require('./$.ctx')
  , classof    = require('./$.classof')
  , $export    = require('./$.export')
  , isObject   = require('./$.is-object')
  , anObject   = require('./$.an-object')
  , aFunction  = require('./$.a-function')
  , strictNew  = require('./$.strict-new')
  , forOf      = require('./$.for-of')
  , setProto   = require('./$.set-proto').set
  , same       = require('./$.same-value')
  , SPECIES    = require('./$.wks')('species')
  , speciesConstructor = require('./$.species-constructor')
  , asap       = require('./$.microtask')
  , PROMISE    = 'Promise'
  , process    = global.process
  , isNode     = classof(process) == 'process'
  , P          = global[PROMISE]
  , Wrapper;

var testResolve = function(sub){
  var test = new P(function(){});
  if(sub)test.constructor = Object;
  return P.resolve(test) === test;
};

var USE_NATIVE = function(){
  var works = false;
  function P2(x){
    var self = new P(x);
    setProto(self, P2.prototype);
    return self;
  }
  try {
    works = P && P.resolve && testResolve();
    setProto(P2, P);
    P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
    // actual Firefox has broken subclass support, test that
    if(!(P2.resolve(5).then(function(){}) instanceof P2)){
      works = false;
    }
    // actual V8 bug, https://code.google.com/p/v8/issues/detail?id=4162
    if(works && require('./$.descriptors')){
      var thenableThenGotten = false;
      P.resolve($.setDesc({}, 'then', {
        get: function(){ thenableThenGotten = true; }
      }));
      works = thenableThenGotten;
    }
  } catch(e){ works = false; }
  return works;
}();

// helpers
var sameConstructor = function(a, b){
  // library wrapper special case
  if(LIBRARY && a === P && b === Wrapper)return true;
  return same(a, b);
};
var getConstructor = function(C){
  var S = anObject(C)[SPECIES];
  return S != undefined ? S : C;
};
var isThenable = function(it){
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var PromiseCapability = function(C){
  var resolve, reject;
  this.promise = new C(function($$resolve, $$reject){
    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject  = $$reject;
  });
  this.resolve = aFunction(resolve),
  this.reject  = aFunction(reject)
};
var perform = function(exec){
  try {
    exec();
  } catch(e){
    return {error: e};
  }
};
var notify = function(record, isReject){
  if(record.n)return;
  record.n = true;
  var chain = record.c;
  asap(function(){
    var value = record.v
      , ok    = record.s == 1
      , i     = 0;
    var run = function(reaction){
      var handler = ok ? reaction.ok : reaction.fail
        , resolve = reaction.resolve
        , reject  = reaction.reject
        , result, then;
      try {
        if(handler){
          if(!ok)record.h = true;
          result = handler === true ? value : handler(value);
          if(result === reaction.promise){
            reject(TypeError('Promise-chain cycle'));
          } else if(then = isThenable(result)){
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch(e){
        reject(e);
      }
    };
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    chain.length = 0;
    record.n = false;
    if(isReject)setTimeout(function(){
      var promise = record.p
        , handler, console;
      if(isUnhandled(promise)){
        if(isNode){
          process.emit('unhandledRejection', value, promise);
        } else if(handler = global.onunhandledrejection){
          handler({promise: promise, reason: value});
        } else if((console = global.console) && console.error){
          console.error('Unhandled promise rejection', value);
        }
      } record.a = undefined;
    }, 1);
  });
};
var isUnhandled = function(promise){
  var record = promise._d
    , chain  = record.a || record.c
    , i      = 0
    , reaction;
  if(record.h)return false;
  while(chain.length > i){
    reaction = chain[i++];
    if(reaction.fail || !isUnhandled(reaction.promise))return false;
  } return true;
};
var $reject = function(value){
  var record = this;
  if(record.d)return;
  record.d = true;
  record = record.r || record; // unwrap
  record.v = value;
  record.s = 2;
  record.a = record.c.slice();
  notify(record, true);
};
var $resolve = function(value){
  var record = this
    , then;
  if(record.d)return;
  record.d = true;
  record = record.r || record; // unwrap
  try {
    if(record.p === value)throw TypeError("Promise can't be resolved itself");
    if(then = isThenable(value)){
      asap(function(){
        var wrapper = {r: record, d: false}; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      record.v = value;
      record.s = 1;
      notify(record, false);
    }
  } catch(e){
    $reject.call({r: record, d: false}, e); // wrap
  }
};

// constructor polyfill
if(!USE_NATIVE){
  // 25.4.3.1 Promise(executor)
  P = function Promise(executor){
    aFunction(executor);
    var record = this._d = {
      p: strictNew(this, P, PROMISE),         // <- promise
      c: [],                                  // <- awaiting reactions
      a: undefined,                           // <- checked in isUnhandled reactions
      s: 0,                                   // <- state
      d: false,                               // <- done
      v: undefined,                           // <- value
      h: false,                               // <- handled rejection
      n: false                                // <- notify
    };
    try {
      executor(ctx($resolve, record, 1), ctx($reject, record, 1));
    } catch(err){
      $reject.call(record, err);
    }
  };
  require('./$.redefine-all')(P.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var reaction = new PromiseCapability(speciesConstructor(this, P))
        , promise  = reaction.promise
        , record   = this._d;
      reaction.ok   = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      record.c.push(reaction);
      if(record.a)record.a.push(reaction);
      if(record.s)notify(record, false);
      return promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: P});
require('./$.set-to-string-tag')(P, PROMISE);
require('./$.set-species')(PROMISE);
Wrapper = require('./$.core')[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    var capability = new PromiseCapability(this)
      , $$reject   = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (!USE_NATIVE || testResolve(true)), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if(x instanceof P && sameConstructor(x.constructor, this))return x;
    var capability = new PromiseCapability(this)
      , $$resolve  = capability.resolve;
    $$resolve(x);
    return capability.promise;
  }
});
$export($export.S + $export.F * !(USE_NATIVE && require('./$.iter-detect')(function(iter){
  P.all(iter)['catch'](function(){});
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C          = getConstructor(this)
      , capability = new PromiseCapability(C)
      , resolve    = capability.resolve
      , reject     = capability.reject
      , values     = [];
    var abrupt = perform(function(){
      forOf(iterable, false, values.push, values);
      var remaining = values.length
        , results   = Array(remaining);
      if(remaining)$.each.call(values, function(promise, index){
        var alreadyCalled = false;
        C.resolve(promise).then(function(value){
          if(alreadyCalled)return;
          alreadyCalled = true;
          results[index] = value;
          --remaining || resolve(results);
        }, reject);
      });
      else resolve(results);
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C          = getConstructor(this)
      , capability = new PromiseCapability(C)
      , reject     = capability.reject;
    var abrupt = perform(function(){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  }
});
},{"./$":57,"./$.a-function":27,"./$.an-object":29,"./$.classof":30,"./$.core":32,"./$.ctx":33,"./$.descriptors":35,"./$.export":38,"./$.for-of":40,"./$.global":42,"./$.is-object":50,"./$.iter-detect":54,"./$.library":59,"./$.microtask":60,"./$.redefine-all":64,"./$.same-value":66,"./$.set-proto":67,"./$.set-species":68,"./$.set-to-string-tag":69,"./$.species-constructor":71,"./$.strict-new":72,"./$.wks":80}],89:[function(require,module,exports){
'use strict';
var $at  = require('./$.string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./$.iter-define')(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});
},{"./$.iter-define":53,"./$.string-at":73}],90:[function(require,module,exports){
'use strict';
// ECMAScript 6 symbols shim
var $              = require('./$')
  , global         = require('./$.global')
  , has            = require('./$.has')
  , DESCRIPTORS    = require('./$.descriptors')
  , $export        = require('./$.export')
  , redefine       = require('./$.redefine')
  , $fails         = require('./$.fails')
  , shared         = require('./$.shared')
  , setToStringTag = require('./$.set-to-string-tag')
  , uid            = require('./$.uid')
  , wks            = require('./$.wks')
  , keyOf          = require('./$.keyof')
  , $names         = require('./$.get-names')
  , enumKeys       = require('./$.enum-keys')
  , isArray        = require('./$.is-array')
  , anObject       = require('./$.an-object')
  , toIObject      = require('./$.to-iobject')
  , createDesc     = require('./$.property-desc')
  , getDesc        = $.getDesc
  , setDesc        = $.setDesc
  , _create        = $.create
  , getNames       = $names.get
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , setter         = false
  , HIDDEN         = wks('_hidden')
  , isEnum         = $.isEnum
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , useNative      = typeof $Symbol == 'function'
  , ObjectProto    = Object.prototype;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(setDesc({}, 'a', {
    get: function(){ return setDesc(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = getDesc(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  setDesc(it, key, D);
  if(protoDesc && it !== ObjectProto)setDesc(ObjectProto, key, protoDesc);
} : setDesc;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol.prototype);
  sym._k = tag;
  DESCRIPTORS && setter && setSymbolDesc(ObjectProto, tag, {
    configurable: true,
    set: function(value){
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    }
  });
  return sym;
};

var isSymbol = function(it){
  return typeof it == 'symbol';
};

var $defineProperty = function defineProperty(it, key, D){
  if(D && has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))setDesc(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return setDesc(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key);
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]
    ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  var D = getDesc(it = toIObject(it), key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = getNames(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN)result.push(key);
  return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var names  = getNames(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
  return result;
};
var $stringify = function stringify(it){
  if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
  var args = [it]
    , i    = 1
    , $$   = arguments
    , replacer, $replacer;
  while($$.length > i)args.push($$[i++]);
  replacer = args[1];
  if(typeof replacer == 'function')$replacer = replacer;
  if($replacer || !isArray(replacer))replacer = function(key, value){
    if($replacer)value = $replacer.call(this, key, value);
    if(!isSymbol(value))return value;
  };
  args[1] = replacer;
  return _stringify.apply($JSON, args);
};
var buggyJSON = $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
});

// 19.4.1.1 Symbol([description])
if(!useNative){
  $Symbol = function Symbol(){
    if(isSymbol(this))throw TypeError('Symbol is not a constructor');
    return wrap(uid(arguments.length > 0 ? arguments[0] : undefined));
  };
  redefine($Symbol.prototype, 'toString', function toString(){
    return this._k;
  });

  isSymbol = function(it){
    return it instanceof $Symbol;
  };

  $.create     = $create;
  $.isEnum     = $propertyIsEnumerable;
  $.getDesc    = $getOwnPropertyDescriptor;
  $.setDesc    = $defineProperty;
  $.setDescs   = $defineProperties;
  $.getNames   = $names.get = $getOwnPropertyNames;
  $.getSymbols = $getOwnPropertySymbols;

  if(DESCRIPTORS && !require('./$.library')){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }
}

var symbolStatics = {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    return keyOf(SymbolRegistry, key);
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
};
// 19.4.2.2 Symbol.hasInstance
// 19.4.2.3 Symbol.isConcatSpreadable
// 19.4.2.4 Symbol.iterator
// 19.4.2.6 Symbol.match
// 19.4.2.8 Symbol.replace
// 19.4.2.9 Symbol.search
// 19.4.2.10 Symbol.species
// 19.4.2.11 Symbol.split
// 19.4.2.12 Symbol.toPrimitive
// 19.4.2.13 Symbol.toStringTag
// 19.4.2.14 Symbol.unscopables
$.each.call((
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,' +
  'species,split,toPrimitive,toStringTag,unscopables'
).split(','), function(it){
  var sym = wks(it);
  symbolStatics[it] = useNative ? sym : wrap(sym);
});

setter = true;

$export($export.G + $export.W, {Symbol: $Symbol});

$export($export.S, 'Symbol', symbolStatics);

$export($export.S + $export.F * !useNative, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!useNative || buggyJSON), 'JSON', {stringify: $stringify});

// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);
},{"./$":57,"./$.an-object":29,"./$.descriptors":35,"./$.enum-keys":37,"./$.export":38,"./$.fails":39,"./$.get-names":41,"./$.global":42,"./$.has":43,"./$.is-array":49,"./$.keyof":58,"./$.library":59,"./$.property-desc":63,"./$.redefine":65,"./$.set-to-string-tag":69,"./$.shared":70,"./$.to-iobject":76,"./$.uid":79,"./$.wks":80}],91:[function(require,module,exports){
require('./es6.array.iterator');
var Iterators = require('./$.iterators');
Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;
},{"./$.iterators":56,"./es6.array.iterator":83}],92:[function(require,module,exports){
'use strict';

exports.__esModule = true;

exports['default'] = function (_ref) {
    var children = _ref.children;
    var _ref$style = _ref.style;
    var style = _ref$style === undefined ? {} : _ref$style;
    var className = _ref.className;
    var _ref$fill = _ref.fill;
    var fill = _ref$fill === undefined ? false : _ref$fill;

    if (fill === true) {
        style.width = '100%';
        style.height = '100%';
    }
    return React.createElement(
        'div',
        { style: style, className: className },
        children
    );
};

module.exports = exports['default'];

},{}],93:[function(require,module,exports){
"use strict";

var _inherits = require("babel-runtime/helpers/inherits")["default"];

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

exports.__esModule = true;

var Subscribable = (function (_React$Component) {
    _inherits(Subscribable, _React$Component);

    function Subscribable() {
        var _this = this;

        _classCallCheck(this, Subscribable);

        _React$Component.call(this);

        this.pubListen = function (evtType, listener) {
            _this.__tokens.push(PubSub.subscribe(evtType, listener));
        };

        this.clearSubs = function () {
            for (var _iterator = _this.__tokens, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _getIterator(_iterator);;) {
                var _ref;

                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref = _i.value;
                }

                var token = _ref;

                PubSub.unsubscribe(token);
            }
            _this.__tokens = [];
        };

        this.componentWillUnmount = function () {
            _this.clearSubs();
        };

        this.__tokens = [];
    }

    return Subscribable;
})(React.Component);

exports["default"] = Subscribable;
module.exports = exports["default"];

},{"babel-runtime/core-js/get-iterator":2,"babel-runtime/helpers/class-call-check":11,"babel-runtime/helpers/inherits":14}],94:[function(require,module,exports){
"use strict";

exports.__esModule = true;
var MainServer = API.create("SERVER_URL");

exports["default"] = {};
module.exports = exports["default"];

},{}],95:[function(require,module,exports){
"use strict";

var _Object$defineProperties = require("babel-runtime/core-js/object/define-properties")["default"];

exports.__esModule = true;
var currentState = undefined;
var currentLevel = undefined;

currentState = {
    game: {
        level: 1
    }
};

PubSub.subscribe("campdisco.game.answer", function (t, answer) {
    return currentLevel.processAnswer(answer);
});

exports["default"] = _Object$defineProperties({
    initLevel: function initLevel() {
        var level = 1;
        currentLevel = _Object$defineProperties({
            processAnswer: function processAnswer(answer) {
                if (answer === true) {
                    level += 1;
                }
            }
        }, {
            finished: {
                get: function get() {
                    return level >= 4;
                },
                configurable: true,
                enumerable: true
            }
        });

        PubSub.publish("campdisco.game.nextgame", null);
    }
}, {
    current: {
        get: function get() {
            return currentState;
        },
        configurable: true,
        enumerable: true
    },
    currentLevel: {
        get: function get() {
            return currentLevel;
        },
        configurable: true,
        enumerable: true
    }
});
module.exports = exports["default"];

},{"babel-runtime/core-js/object/define-properties":5}],96:[function(require,module,exports){
/*!
 *  howler.js v1.1.29
 *  howlerjs.com
 *
 *  (c) 2013-2016, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */
!function(){var e={},o=null,n=!0,r=!1;try{"undefined"!=typeof AudioContext?o=new AudioContext:"undefined"!=typeof webkitAudioContext?o=new webkitAudioContext:n=!1}catch(t){n=!1}if(!n)if("undefined"!=typeof Audio)try{new Audio}catch(t){r=!0}else r=!0;if(n){var a="undefined"==typeof o.createGain?o.createGainNode():o.createGain();a.gain.value=1,a.connect(o.destination)}var i=function(e){this._volume=1,this._muted=!1,this.usingWebAudio=n,this.ctx=o,this.noAudio=r,this._howls=[],this._codecs=e,this.iOSAutoEnable=!0};i.prototype={volume:function(e){var o=this;if(e=parseFloat(e),e>=0&&1>=e){o._volume=e,n&&(a.gain.value=e);for(var r in o._howls)if(o._howls.hasOwnProperty(r)&&o._howls[r]._webAudio===!1)for(var t=0;t<o._howls[r]._audioNode.length;t++)o._howls[r]._audioNode[t].volume=o._howls[r]._volume*o._volume;return o}return n?a.gain.value:o._volume},mute:function(){return this._setMuted(!0),this},unmute:function(){return this._setMuted(!1),this},_setMuted:function(e){var o=this;o._muted=e,n&&(a.gain.value=e?0:o._volume);for(var r in o._howls)if(o._howls.hasOwnProperty(r)&&o._howls[r]._webAudio===!1)for(var t=0;t<o._howls[r]._audioNode.length;t++)o._howls[r]._audioNode[t].muted=e},codecs:function(e){return this._codecs[e]},_enableiOSAudio:function(){var e=this;if(!o||!e._iOSEnabled&&/iPhone|iPad|iPod/i.test(navigator.userAgent)){e._iOSEnabled=!1;var n=function(){var r=o.createBuffer(1,1,22050),t=o.createBufferSource();t.buffer=r,t.connect(o.destination),"undefined"==typeof t.start?t.noteOn(0):t.start(0),setTimeout(function(){(t.playbackState===t.PLAYING_STATE||t.playbackState===t.FINISHED_STATE)&&(e._iOSEnabled=!0,e.iOSAutoEnable=!1,window.removeEventListener("touchend",n,!1))},0)};return window.addEventListener("touchend",n,!1),e}}};var u=null,d={};r||(u=new Audio,d={mp3:!!u.canPlayType("audio/mpeg;").replace(/^no$/,""),opus:!!u.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/,""),ogg:!!u.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),wav:!!u.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),aac:!!u.canPlayType("audio/aac;").replace(/^no$/,""),m4a:!!(u.canPlayType("audio/x-m4a;")||u.canPlayType("audio/m4a;")||u.canPlayType("audio/aac;")).replace(/^no$/,""),mp4:!!(u.canPlayType("audio/x-mp4;")||u.canPlayType("audio/mp4;")||u.canPlayType("audio/aac;")).replace(/^no$/,""),weba:!!u.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,"")});var l=new i(d),f=function(e){var r=this;r._autoplay=e.autoplay||!1,r._buffer=e.buffer||!1,r._duration=e.duration||0,r._format=e.format||null,r._loop=e.loop||!1,r._loaded=!1,r._sprite=e.sprite||{},r._src=e.src||"",r._pos3d=e.pos3d||[0,0,-.5],r._volume=void 0!==e.volume?e.volume:1,r._urls=e.urls||[],r._rate=e.rate||1,r._model=e.model||null,r._onload=[e.onload||function(){}],r._onloaderror=[e.onloaderror||function(){}],r._onend=[e.onend||function(){}],r._onpause=[e.onpause||function(){}],r._onplay=[e.onplay||function(){}],r._onendTimer=[],r._webAudio=n&&!r._buffer,r._audioNode=[],r._webAudio&&r._setupAudioNode(),"undefined"!=typeof o&&o&&l.iOSAutoEnable&&l._enableiOSAudio(),l._howls.push(r),r.load()};if(f.prototype={load:function(){var e=this,o=null;if(r)return void e.on("loaderror",new Error("No audio support."));for(var n=0;n<e._urls.length;n++){var t,a;if(e._format)t=e._format;else{if(a=e._urls[n],t=/^data:audio\/([^;,]+);/i.exec(a),t||(t=/\.([^.]+)$/.exec(a.split("?",1)[0])),!t)return void e.on("loaderror",new Error("Could not extract format from passed URLs, please add format parameter."));t=t[1].toLowerCase()}if(d[t]){o=e._urls[n];break}}if(!o)return void e.on("loaderror",new Error("No codec support for selected audio sources."));if(e._src=o,e._webAudio)s(e,o);else{var u=new Audio;u.addEventListener("error",function(){u.error&&4===u.error.code&&(i.noAudio=!0),e.on("loaderror",{type:u.error?u.error.code:0})},!1),e._audioNode.push(u),u.src=o,u._pos=0,u.preload="auto",u.volume=l._muted?0:e._volume*l.volume();var f=function(){e._duration=Math.ceil(10*u.duration)/10,0===Object.getOwnPropertyNames(e._sprite).length&&(e._sprite={_default:[0,1e3*e._duration]}),e._loaded||(e._loaded=!0,e.on("load")),e._autoplay&&e.play(),u.removeEventListener("canplaythrough",f,!1)};u.addEventListener("canplaythrough",f,!1),u.load()}return e},urls:function(e){var o=this;return e?(o.stop(),o._urls="string"==typeof e?[e]:e,o._loaded=!1,o.load(),o):o._urls},play:function(e,n){var r=this;return"function"==typeof e&&(n=e),e&&"function"!=typeof e||(e="_default"),r._loaded?r._sprite[e]?(r._inactiveNode(function(t){t._sprite=e;var a=t._pos>0?t._pos:r._sprite[e][0]/1e3,i=0;r._webAudio?(i=r._sprite[e][1]/1e3-t._pos,t._pos>0&&(a=r._sprite[e][0]/1e3+a)):i=r._sprite[e][1]/1e3-(a-r._sprite[e][0]/1e3);var u,d=!(!r._loop&&!r._sprite[e][2]),f="string"==typeof n?n:Math.round(Date.now()*Math.random())+"";if(function(){var o={id:f,sprite:e,loop:d};u=setTimeout(function(){!r._webAudio&&d&&r.stop(o.id).play(e,o.id),r._webAudio&&!d&&(r._nodeById(o.id).paused=!0,r._nodeById(o.id)._pos=0,r._clearEndTimer(o.id)),r._webAudio||d||r.stop(o.id),r.on("end",f)},i/r._rate*1e3),r._onendTimer.push({timer:u,id:o.id})}(),r._webAudio){var s=r._sprite[e][0]/1e3,_=r._sprite[e][1]/1e3;t.id=f,t.paused=!1,p(r,[d,s,_],f),r._playStart=o.currentTime,t.gain.value=r._volume,"undefined"==typeof t.bufferSource.start?d?t.bufferSource.noteGrainOn(0,a,86400):t.bufferSource.noteGrainOn(0,a,i):d?t.bufferSource.start(0,a,86400):t.bufferSource.start(0,a,i)}else{if(4!==t.readyState&&(t.readyState||!navigator.isCocoonJS))return r._clearEndTimer(f),function(){var o=r,a=e,i=n,u=t,d=function(){o.play(a,i),u.removeEventListener("canplaythrough",d,!1)};u.addEventListener("canplaythrough",d,!1)}(),r;t.readyState=4,t.id=f,t.currentTime=a,t.muted=l._muted||t.muted,t.volume=r._volume*l.volume(),setTimeout(function(){t.play()},0)}return r.on("play"),"function"==typeof n&&n(f),r}),r):("function"==typeof n&&n(),r):(r.on("load",function(){r.play(e,n)}),r)},pause:function(e){var o=this;if(!o._loaded)return o.on("play",function(){o.pause(e)}),o;o._clearEndTimer(e);var n=e?o._nodeById(e):o._activeNode();if(n)if(n._pos=o.pos(null,e),o._webAudio){if(!n.bufferSource||n.paused)return o;n.paused=!0,"undefined"==typeof n.bufferSource.stop?n.bufferSource.noteOff(0):n.bufferSource.stop(0)}else n.pause();return o.on("pause"),o},stop:function(e){var o=this;if(!o._loaded)return o.on("play",function(){o.stop(e)}),o;o._clearEndTimer(e);var n=e?o._nodeById(e):o._activeNode();if(n)if(n._pos=0,o._webAudio){if(!n.bufferSource||n.paused)return o;n.paused=!0,"undefined"==typeof n.bufferSource.stop?n.bufferSource.noteOff(0):n.bufferSource.stop(0)}else isNaN(n.duration)||(n.pause(),n.currentTime=0);return o},mute:function(e){var o=this;if(!o._loaded)return o.on("play",function(){o.mute(e)}),o;var n=e?o._nodeById(e):o._activeNode();return n&&(o._webAudio?n.gain.value=0:n.muted=!0),o},unmute:function(e){var o=this;if(!o._loaded)return o.on("play",function(){o.unmute(e)}),o;var n=e?o._nodeById(e):o._activeNode();return n&&(o._webAudio?n.gain.value=o._volume:n.muted=!1),o},volume:function(e,o){var n=this;if(e=parseFloat(e),e>=0&&1>=e){if(n._volume=e,!n._loaded)return n.on("play",function(){n.volume(e,o)}),n;var r=o?n._nodeById(o):n._activeNode();return r&&(n._webAudio?r.gain.value=e:r.volume=e*l.volume()),n}return n._volume},loop:function(e){var o=this;return"boolean"==typeof e?(o._loop=e,o):o._loop},sprite:function(e){var o=this;return"object"==typeof e?(o._sprite=e,o):o._sprite},pos:function(e,n){var r=this;if(!r._loaded)return r.on("load",function(){r.pos(e)}),"number"==typeof e?r:r._pos||0;e=parseFloat(e);var t=n?r._nodeById(n):r._activeNode();if(t)return e>=0?(r.pause(n),t._pos=e,r.play(t._sprite,n),r):r._webAudio?t._pos+(o.currentTime-r._playStart):t.currentTime;if(e>=0)return r;for(var a=0;a<r._audioNode.length;a++)if(r._audioNode[a].paused&&4===r._audioNode[a].readyState)return r._webAudio?r._audioNode[a]._pos:r._audioNode[a].currentTime},pos3d:function(e,o,n,r){var t=this;if(o="undefined"!=typeof o&&o?o:0,n="undefined"!=typeof n&&n?n:-.5,!t._loaded)return t.on("play",function(){t.pos3d(e,o,n,r)}),t;if(!(e>=0||0>e))return t._pos3d;if(t._webAudio){var a=r?t._nodeById(r):t._activeNode();a&&(t._pos3d=[e,o,n],a.panner.setPosition(e,o,n),a.panner.panningModel=t._model||"HRTF")}return t},fade:function(e,o,n,r,t){var a=this,i=Math.abs(e-o),u=e>o?"down":"up",d=i/.01,l=n/d;if(!a._loaded)return a.on("load",function(){a.fade(e,o,n,r,t)}),a;a.volume(e,t);for(var f=1;d>=f;f++)!function(){var e=a._volume+("up"===u?.01:-.01)*f,n=Math.round(1e3*e)/1e3,i=o;setTimeout(function(){a.volume(n,t),n===i&&r&&r()},l*f)}()},fadeIn:function(e,o,n){return this.volume(0).play().fade(0,e,o,n)},fadeOut:function(e,o,n,r){var t=this;return t.fade(t._volume,e,o,function(){n&&n(),t.pause(r),t.on("end")},r)},_nodeById:function(e){for(var o=this,n=o._audioNode[0],r=0;r<o._audioNode.length;r++)if(o._audioNode[r].id===e){n=o._audioNode[r];break}return n},_activeNode:function(){for(var e=this,o=null,n=0;n<e._audioNode.length;n++)if(!e._audioNode[n].paused){o=e._audioNode[n];break}return e._drainPool(),o},_inactiveNode:function(e){for(var o=this,n=null,r=0;r<o._audioNode.length;r++)if(o._audioNode[r].paused&&4===o._audioNode[r].readyState){e(o._audioNode[r]),n=!0;break}if(o._drainPool(),!n){var t;if(o._webAudio)t=o._setupAudioNode(),e(t);else{o.load(),t=o._audioNode[o._audioNode.length-1];var a=navigator.isCocoonJS?"canplaythrough":"loadedmetadata",i=function(){t.removeEventListener(a,i,!1),e(t)};t.addEventListener(a,i,!1)}}},_drainPool:function(){var e,o=this,n=0;for(e=0;e<o._audioNode.length;e++)o._audioNode[e].paused&&n++;for(e=o._audioNode.length-1;e>=0&&!(5>=n);e--)o._audioNode[e].paused&&(o._webAudio&&o._audioNode[e].disconnect(0),n--,o._audioNode.splice(e,1))},_clearEndTimer:function(e){for(var o=this,n=-1,r=0;r<o._onendTimer.length;r++)if(o._onendTimer[r].id===e){n=r;break}var t=o._onendTimer[n];t&&(clearTimeout(t.timer),o._onendTimer.splice(n,1))},_setupAudioNode:function(){var e=this,n=e._audioNode,r=e._audioNode.length;return n[r]="undefined"==typeof o.createGain?o.createGainNode():o.createGain(),n[r].gain.value=e._volume,n[r].paused=!0,n[r]._pos=0,n[r].readyState=4,n[r].connect(a),n[r].panner=o.createPanner(),n[r].panner.panningModel=e._model||"equalpower",n[r].panner.setPosition(e._pos3d[0],e._pos3d[1],e._pos3d[2]),n[r].panner.connect(n[r]),n[r]},on:function(e,o){var n=this,r=n["_on"+e];if("function"==typeof o)r.push(o);else for(var t=0;t<r.length;t++)o?r[t].call(n,o):r[t].call(n);return n},off:function(e,o){var n=this,r=n["_on"+e];if(o){for(var t=0;t<r.length;t++)if(o===r[t]){r.splice(t,1);break}}else n["_on"+e]=[];return n},unload:function(){for(var o=this,n=o._audioNode,r=0;r<o._audioNode.length;r++)n[r].paused||(o.stop(n[r].id),o.on("end",n[r].id)),o._webAudio?n[r].disconnect(0):n[r].src="";for(r=0;r<o._onendTimer.length;r++)clearTimeout(o._onendTimer[r].timer);var t=l._howls.indexOf(o);null!==t&&t>=0&&l._howls.splice(t,1),delete e[o._src],o=null}},n)var s=function(o,n){if(n in e)return o._duration=e[n].duration,void c(o);if(/^data:[^;]+;base64,/.test(n)){for(var r=atob(n.split(",")[1]),t=new Uint8Array(r.length),a=0;a<r.length;++a)t[a]=r.charCodeAt(a);_(t.buffer,o,n)}else{var i=new XMLHttpRequest;i.open("GET",n,!0),i.responseType="arraybuffer",i.onload=function(){_(i.response,o,n)},i.onerror=function(){o._webAudio&&(o._buffer=!0,o._webAudio=!1,o._audioNode=[],delete o._gainNode,delete e[n],o.load())};try{i.send()}catch(u){i.onerror()}}},_=function(n,r,t){o.decodeAudioData(n,function(o){o&&(e[t]=o,c(r,o))},function(e){r.on("loaderror",e)})},c=function(e,o){e._duration=o?o.duration:e._duration,0===Object.getOwnPropertyNames(e._sprite).length&&(e._sprite={_default:[0,1e3*e._duration]}),e._loaded||(e._loaded=!0,e.on("load")),e._autoplay&&e.play()},p=function(n,r,t){var a=n._nodeById(t);a.bufferSource=o.createBufferSource(),a.bufferSource.buffer=e[n._src],a.bufferSource.connect(a.panner),a.bufferSource.loop=r[0],r[0]&&(a.bufferSource.loopStart=r[1],a.bufferSource.loopEnd=r[1]+r[2]),a.bufferSource.playbackRate.value=n._rate};"function"==typeof define&&define.amd&&define(function(){return{Howler:l,Howl:f}}),"undefined"!=typeof exports&&(exports.Howler=l,exports.Howl=f),"undefined"!=typeof window&&(window.Howler=l,window.Howl=f)}();

},{}],97:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

require("theme/default");

require("lib/howler.min");

var _settings = require("settings");

var _datacenter = require("datacenter");

var _datacenter2 = _interopRequireDefault(_datacenter);

var _screenMainscreen = require('screen/mainscreen');

var _screenMainscreen2 = _interopRequireDefault(_screenMainscreen);

var _screenGamescreen = require('screen/gamescreen');

var _screenGamescreen2 = _interopRequireDefault(_screenGamescreen);

var _ReactRouter = ReactRouter;
var Route = _ReactRouter.Route;

if (_settings.Settings.has("version") === false) {
    _settings.Settings.write("version", 0);
    _settings.Settings.write("timerDuration", 5000);
}
_settings.Settings.write("timerDuration", 4000);

App.start(React.createElement(
    Route,
    null,
    React.createElement(Route, { path: "/", component: _screenMainscreen2["default"] }),
    React.createElement(Route, { path: "/game", component: _screenGamescreen2["default"] })
), {
    initialPath: '/game'
});

},{"babel-runtime/helpers/interop-require-default":15,"datacenter":94,"lib/howler.min":96,"screen/gamescreen":98,"screen/mainscreen":99,"settings":100,"theme/default":101}],98:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _gamestate = require('gamestate');

var _gamestate2 = _interopRequireDefault(_gamestate);

var _componentContainer = require('component/container');

var _componentContainer2 = _interopRequireDefault(_componentContainer);

var _componentSubscribable = require('component/subscribable');

var _componentSubscribable2 = _interopRequireDefault(_componentSubscribable);

var _settings = require('settings');

var animationTime = 250;

Style.create('game', {
    ".card": {
        position: 'absolute',
        transform: 'translate3d(-50%, -50%, 0)',
        backgroundColor: 'white',
        borderWidth: 3,
        borderStyle: 'solid',
        borderColor: 'transparent',
        boxShadow: '1px 1px 1px rgba(0, 0, 0, 0.35)',
        borderRadius: 5,
        ": before": {
            content: '""',
            display: 'block',
            paddingTop: '100%'
        }
    },
    ".cardInner": {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        padding: 2
    }
});

var collision = function collision(a, b) {
    return a.left < b.left + b.width && a.left + a.width > b.left && a.top < b.top + b.height && a.height + a.top > b.top;
};

var CDCard = (function (_React$Component) {
    _inherits(CDCard, _React$Component);

    function CDCard(props) {
        var _this = this;

        _classCallCheck(this, CDCard);

        _React$Component.call(this, props);

        this.rect = function () {
            return _this.refs.wrapper.getBoundingClientRect();
        };

        this.signal = function (selected, filler) {
            // console.log(active, filler);
            _this.setState({ selected: selected, fill: 0 });
            if (filler === true && selected === true) {
                _this.fillToken = PubSub.subscribe('system.framedraw', function () {
                    var fill = _this.state.fill;

                    fill += 1;
                    _this.setState({ fill: fill });
                    if (fill === 60) {
                        PubSub.unsubscribe(_this.fillToken);
                        _this.fillToken = null;
                        PubSub.publish("campdisco.game.forceAnswer", [null, null]);
                    }
                });
            } else {
                if (_this.fillToken !== null) {
                    PubSub.unsubscribe(_this.fillToken);
                    _this.fillToken = null;
                }
            }
        };

        this.setupMove = function (evt) {
            if (_this.touchID !== null) {
                return;
            }
            var target = evt.target;
            var _evt$changedTouches = evt.changedTouches;
            var touch = _evt$changedTouches[0];
            var x = touch.clientX;
            var y = touch.clientY;

            var rect = _this.rect();

            _this.touchID = touch.identifier;
            _this.offset = { x: x - (rect.left + rect.width / 2), y: y - (rect.top + rect.height / 2) };
            _this.prevCollision = _this.props.others.map(function () {
                return false;
            });
            _this.prevFill = false;
            _this.prevCount = 0;
            _this.setState({ active: true });
        };

        this.onTouchMove = function (evt) {
            evt.preventDefault();
            if (_this.state.active === false) {
                return;
            }

            // const [touch] = evt.changedTouches;
            var touch = Array.prototype.find.call(evt.changedTouches, function (touch) {
                return touch.identifier === _this.touchID;
            });
            if (touch === undefined) {
                return;
            }
            var x = touch.clientX;
            var y = touch.clientY;

            x -= _this.offset.x;
            y -= _this.offset.y;

            x = x / App.viewport.width * 100;
            y = y / App.viewport.height * 100;

            _this.setState({ x: x, y: y });
        };

        this.finish = function (_ref2) {
            var evt = _ref2[0];
            var _ref2$1 = _ref2[1];
            var forced = _ref2$1 === undefined ? null : _ref2$1;

            if (_this.state.active === false && forced === null) {
                return;
            }
            if (evt !== null) {
                var touch = Array.prototype.find.call(evt.changedTouches, function (touch) {
                    return touch.identifier === _this.touchID;
                });
                if (touch === undefined) {
                    return;
                }
            }

            var answer = false;
            var newPos = {};

            if (_this.prevCount === 1) {
                answer = _this.props.others[_this.prevCollision.indexOf(true)].props.correct;
            }
            if (forced !== null) {
                answer = forced;
            }

            PubSub.publish("campdisco.game.answer", answer);

            _this.setState({
                x: _this.props.x0,
                y: _this.props.y0,
                animating: true,
                active: false
            });
            _this.touchID = null;
            _this.prevFill = false;
            _this.prevCount = 0;
            _this.prevCollision = _this.props.others.map(function () {
                return false;
            });
            for (var _iterator = _this.props.others, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _getIterator(_iterator);;) {
                var _ref;

                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref = _i.value;
                }

                var other = _ref;

                other.signal(false, false);
            }
            chrono.trigger(animationTime, function () {
                return _this.setState({ animating: false });
            });
            // console.log('done!');
        };

        this.touchEnd = function (evt) {
            return PubSub.publishSync("campdisco.game.forceAnswer", [evt, null]);
        };

        this.componentDidUpdate = function () {
            if (_this.props.movable === false || _this.state.animating === true) {
                return;
            }

            var prevFill = _this.prevFill;
            var prevCount = _this.prevCount;
            var prevCollision = _this.prevCollision;

            var rect = _this.rect();
            var newCollisions = _this.props.others.map(function (other) {
                return collision(rect, other.rect());
            });
            var newCount = newCollisions.filter(function (i) {
                return i === true;
            }).length;
            var shouldFill = newCount === 1;

            newCollisions.forEach(function (current, index) {
                var prev = prevCollision[index];
                if (prevFill !== shouldFill || newCount !== prevCount || current !== prev) {
                    _this.props.others[index].signal(current, shouldFill);
                }
            });
            _this.prevCollision = newCollisions;
            _this.prevFill = shouldFill;
            _this.prevCount = newCount;
        };

        this.componentWillUnmount = function () {
            if (_this.answerToken !== null) {
                PubSub.unsubscribe(_this.answerToken);
            }
            if (_this.fillToken !== null) {
                PubSub.unsubscribe(_this.fillToken);
            }
        };

        this.render = function () {
            var _props = _this.props;
            var children = _props.children;
            var style = _props.style;
            var width = _props.width;
            var onDrag = _props.onDrag;
            var onDragStart = _props.onDragStart;
            var onDragEnd = _props.onDragEnd;
            var top = _props.top;
            var movable = _props.movable;
            var size = _props.size;
            var _state = _this.state;
            var x = _state.x;
            var y = _state.y;
            var animating = _state.animating;
            var fill = _state.fill;

            var cardStyle = {
                width: width * size + 'vh',
                top: y + '%',
                left: x + '%',
                transition: animating === true ? 'top ' + animationTime + 'ms linear, left ' + animationTime + 'ms linear, width ' + animationTime + 'ms linear' : null,
                zIndex: top === true ? '+100' : null
            };
            var listeners = movable === true ? {
                onTouchStart: _this.setupMove,
                onTouchMove: _this.onTouchMove,
                onTouchEnd: _this.touchEnd,
                onTouchCancel: _this.touchEnd
            } : {};

            if (_this.state.selected === true) {
                cardStyle.borderColor = 'cyan';
            }

            return React.createElement(
                'div',
                _extends({ className: Style.getClassName('game:card'), style: cardStyle }, listeners, { ref: 'wrapper' }),
                React.createElement('div', { style: { position: 'absolute', bottom: 0, left: 0, right: 0, height: fill * 1.66666 + '%', backgroundColor: 'cyan' } }),
                React.createElement(
                    'div',
                    { className: Style.getClassName("game:cardInner"), style: style },
                    children
                )
            );
        };

        this.state = {
            x: this.props.x0,
            y: this.props.y0,
            animating: false,
            selected: false,
            fill: 0,
            active: false
        };
        this.touchID = null;
        this.fillToken = null;
        if (this.props.movable === true) {
            this.answerToken = PubSub.subscribe("campdisco.game.forceAnswer", function (t, data) {
                // console.log(t, send);
                _this.finish(data);
            });
        } else {
            this.answerToken = null;
        }
    }

    return CDCard;
})(React.Component);

var correct = ["amazeen.mp3", "awesome.mp3", "excellent.mp3", "fantastic.mp3", "files.txt", "Good Job.mp3", "Good Work.mp3", "Great.mp3", "perfect.mp3", "Way to Go.mp3", "wonderful.mp3", "Woohoo.mp3", "Yippee.mp3", "You Did It.mp3"];
var wrong = ["no.mp3", "nope.mp3", "Not quite.mp3", "Thats Not it.mp3", "Try Again.mp3"];

var GameScreen = (function (_Subscribable) {
    _inherits(GameScreen, _Subscribable);

    _createClass(GameScreen, null, [{
        key: 'startingPos',
        get: function get() {
            return [{ x0: 20, y0: 25, correct: false, size: 1 }, { x0: 50, y0: 25, correct: false, size: 1.15 }, { x0: 80, y0: 25, correct: true, size: 1.3 }];
        }
    }]);

    // {x0: 50, y0: 80, fill: 0}

    function GameScreen(props) {
        var _this2 = this;

        _classCallCheck(this, GameScreen);

        _Subscribable.call(this, props);
        // const url = "https://res.cloudinary.com/dsjiwbe0q/image/upload/v1466295085/f7e57b7ccc7fcb3297c45d6a1af9787b_sh2spa.png";

        this.componentDidMount = function () {
            var allThings = _Object$keys(_this2.refs).filter(function (key) {
                return key.startsWith('target');
            }).map(function (key) {
                return _this2.refs[key];
            });
            _this2.movable = React.createElement(CDCard, { width: 30, size: 1, x0: 50, y0: 75, size: 1.3, others: allThings, movable: true });
            // this.token = PubSub.subscribe(
            _this2.pubListen('campdisco.game.answer', function callee$3$0(evt, answer) {
                var caudio;
                return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                    while (1) switch (context$4$0.prev = context$4$0.next) {
                        case 0:
                            // console.log(answer);
                            this.setState({ scale: 0 });
                            context$4$0.next = 3;
                            return _regeneratorRuntime.awrap(chrono.wait(310));

                        case 3:
                            if (answer === true) {
                                caudio = correct[Math.floor(Math.random() * correct.length)];

                                new Howl({ urls: ['audio/correct/' + caudio], onend: function onend() {
                                        return PubSub.publish('campdisco.response.finished');
                                    } }).play();
                            } else {
                                new Howl({ urls: ['audio/wrong/' + wrong[Math.floor(Math.random() * wrong.length)]], onend: function onend() {
                                        return PubSub.publish('campdisco.response.finished');
                                    } }).play();
                                // nope.play();
                                // this.refs.timer.reset();
                            }

                        case 4:
                        case 'end':
                            return context$4$0.stop();
                    }
                }, null, _this2);
            });
            _this2.pubListen('campdisco.response.finished', function () {
                return _this2.refs.timer.reset();
            });

            _this2.forceUpdate();
        };

        this.render = function () {
            var scale = _this2.state.scale;
            var choices = _this2.choices;
            var movable = _this2.movable;

            return React.createElement(
                _componentContainer2['default'],
                { fill: true, style: { backgroundColor: 'cyan' } },
                React.createElement(
                    UI.Pinboard,
                    { width: '100%', height: '100%' },
                    React.createElement('div', { style: { backgroundColor: 'rgba(0, 0, 0, 0.35)', width: '100%', height: '100%', display: _this2.state.paused === true ? '' : 'none', zIndex: '+1000', position: 'absolute' }, pinInfo: { width: '100%', height: '100%' } }),
                    React.createElement(UI.IconButton, { pinInfo: { bottom: 5, left: 5, width: 40, height: 40 }, icon: 'ion-pause', flush: true, fill: true, cornerRadius: 20, raised: true, iconSize: 20, onTap: function () {
                            return _this2.setState({ paused: true });
                        } }),
                    React.createElement(Timer, { pinInfo: { bottom: 5, right: 5, zIndex: '+100' }, ref: 'timer' })
                ),
                React.createElement(
                    'div',
                    { style: { transition: 'transform 300ms ease-in', transform: 'scale(' + scale + ', ' + scale + ')', position: 'absolute', width: '100%', height: '100%', top: 0 } },
                    choices,
                    movable
                )
            );
        };

        var url = "https://res.cloudinary.com/dsjiwbe0q/image/upload/v1466365486/8bit_mega_man_1_20276_6496_thumb_9812_xpu8wi.png";
        this.index = -1;
        this.state = {
            paused: false,
            scale: 1
        };
        this.choices = GameScreen.startingPos.map(function (pos, key) {
            var props = _extends({
                width: 30,
                ref: 'target' + key,
                movable: false,
                key: key
            }, pos);
            return React.createElement(
                CDCard,
                props,
                React.createElement(UI.Image, { source: url, width: '100%', height: '100%' })
            );
        });
    }

    return GameScreen;
})(_componentSubscribable2['default']);

var Arc = function Arc(_ref3) {
    var cx = _ref3.cx;
    var cy = _ref3.cy;
    var radius = _ref3.radius;
    var start = _ref3.start;
    var end = _ref3.end;

    var circ = Math.PI * 2 * radius;
    var first = start / 360;
    var second = end / 360 - first;

    return React.createElement('circle', { cx: cx, cy: cy, r: radius, strokeWidth: 3, strokeDasharray: '0 ' + first * circ + ' ' + second * circ + ' ' + circ, stroke: 'black', fill: 'transparent', transform: 'rotate(-90 ' + cx + ' ' + cy + ')' });
};

var Timer = (function (_Subscribable2) {
    _inherits(Timer, _Subscribable2);

    function Timer(props) {
        var _this3 = this;

        _classCallCheck(this, Timer);

        _Subscribable2.call(this, props);

        this.componentDidMount = function () {
            _this3.reset();
        };

        this.reset = function () {
            _this3.max = _settings.Settings.read("timerDuration");
            _this3.left = _this3.max;
            _this3.pubListen('campdisco.game.forceAnswer', function () {
                _this3.clearSubs();
            });
            _this3.pubListen("system.framedraw", function (t, time) {
                _this3.left -= time;
                // console.log(this.left);
                if (_this3.left <= 0) {
                    _this3.left = 0;
                    _this3.clearSubs();
                    PubSub.publish("campdisco.game.forceAnswer", [null, false]);
                }
                _this3.forceUpdate();
            });
        };

        this.render = function () {
            var s = 50;
            return React.createElement(
                'svg',
                { width: s, height: s },
                React.createElement(Arc, { cx: s / 2, cy: s / 2, radius: s / 2 - 3, start: 0, end: 360 * (_this3.left / _this3.max) })
            );
        };
    }

    return Timer;
})(_componentSubscribable2['default']);

var RealScreen = (function (_Subscribable3) {
    _inherits(RealScreen, _Subscribable3);

    function RealScreen() {
        var _this4 = this;

        _classCallCheck(this, RealScreen);

        _Subscribable3.call(this);

        this.componentDidMount = function () {
            // this.token = PubSub.subscribe(
            // window.nope = new Howl({urls: ['audio/Not quite.mp3'], onend: () => PubSub.publish('campdisco.response.finished')});
            _this4.pubListen("campdisco.response.finished", function () {
                // console.log(prevAnswer);
                if (_gamestate2['default'].currentLevel.finished === true) {
                    App.navigation.replace("/");
                } else {
                    _this4.setState({
                        current: Date.now()
                    });
                }
            });
            _gamestate2['default'].initLevel();
        };

        this.render = function () {
            var current = _this4.state.current;

            return React.createElement(
                UI.Screen,
                null,
                React.createElement(GameScreen, { key: current })
            );
        };

        this.state = { current: null };
    }

    return RealScreen;
})(_componentSubscribable2['default']);

exports['default'] = RealScreen;
module.exports = exports['default'];

// componentWillUnmount = () => {
//     PubSub.unsubscribe(this.token);
// }

// componentWillUnmount = () => {
//     PubSub.unsubscribe(this.token);
// }

},{"babel-runtime/core-js/get-iterator":2,"babel-runtime/core-js/object/keys":7,"babel-runtime/helpers/class-call-check":11,"babel-runtime/helpers/create-class":12,"babel-runtime/helpers/extends":13,"babel-runtime/helpers/inherits":14,"babel-runtime/helpers/interop-require-default":15,"babel-runtime/regenerator":16,"component/container":92,"component/subscribable":93,"gamestate":95,"settings":100}],99:[function(require,module,exports){
"use strict";

var _inherits = require("babel-runtime/helpers/inherits")["default"];

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

exports.__esModule = true;

var MainScreen = (function (_React$Component) {
    _inherits(MainScreen, _React$Component);

    function MainScreen(props) {
        _classCallCheck(this, MainScreen);

        _React$Component.call(this, props);

        this.render = function () {
            return React.createElement(
                UI.Screen,
                { title: "Camp Disco V3?" },
                React.createElement(UI.Button, { block: true, raised: true, text: "Play Game", onTap: function () {
                        return App.navigation.push('/game');
                    } })
            );
        };
    }

    return MainScreen;
})(React.Component);

exports["default"] = MainScreen;
module.exports = exports["default"];

},{"babel-runtime/helpers/class-call-check":11,"babel-runtime/helpers/inherits":14}],100:[function(require,module,exports){
"use strict";

exports.__esModule = true;
var appKey = "CHANGE_THIS";

exports["default"] = {
    Session: App.createSession(appKey),
    Settings: App.createSettings(appKey),
    GlobalSettings: App.createSettings(""),
    appKey: appKey
};
module.exports = exports["default"];

},{}],101:[function(require,module,exports){
'use strict';

var coolBlue = "#2FB1DF";

Theme.define({
    app: {
        backgroundColor: 'white',
        textColor: '#111'
    },
    button: {
        hoverColor: 'rgba(0, 0, 0, 0.11)',
        activeColor: 'rgba(0, 0, 0, 0.2)',
        raised: {
            color: coolBlue,
            textColor: 'white'
        }
    },
    card: {
        backgroundColor: 'white'
    },
    progressbar: {
        backgroundColor: '#B3CEED',
        color: '#3B8AF3'
    },
    radio: {
        grid: {
            selectedColor: coolBlue
        }
    },
    rangeInput: {
        track: {
            color: coolBlue
        }
    },
    'switch': {
        track: {
            color: coolBlue
        }
    },
    title: {
        backgroundColor: coolBlue,
        textColor: 'white'
    },
    userInput: {
        activeColor: '#2FB1DF',
        textColor: 'black'
    }
});

},{}]},{},[97])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy5hdG9tL3BhY2thZ2VzL2NhcmQtYmFiZWwvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi4uLy4uLy4uLy4uLy5hdG9tL3BhY2thZ2VzL2NhcmQtYmFiZWwvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvZ2V0LWl0ZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvYXNzaWduLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvY3JlYXRlLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnRpZXMuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9rZXlzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3Qvc2V0LXByb3RvdHlwZS1vZi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvcHJvbWlzZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvc3ltYm9sLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jbGFzcy1jYWxsLWNoZWNrLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jcmVhdGUtY2xhc3MuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2V4dGVuZHMuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2luaGVyaXRzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9pbnRlcm9wLXJlcXVpcmUtZGVmYXVsdC5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL3JlZ2VuZXJhdG9yL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvcmVnZW5lcmF0b3IvcnVudGltZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vZ2V0LWl0ZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvYXNzaWduLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvY3JlYXRlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnRpZXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9rZXlzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qvc2V0LXByb3RvdHlwZS1vZi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vcHJvbWlzZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuYS1mdW5jdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmFkZC10by11bnNjb3BhYmxlcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmFuLW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmNsYXNzb2YuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5jb2YuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5jb3JlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuY3R4LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuZGVmaW5lZC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmRlc2NyaXB0b3JzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuZG9tLWNyZWF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmVudW0ta2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmV4cG9ydC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmZhaWxzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuZm9yLW9mLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuZ2V0LW5hbWVzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuZ2xvYmFsLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaGFzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaGlkZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmh0bWwuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pbnZva2UuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaXMtYXJyYXktaXRlci5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmlzLWFycmF5LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaXMtb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaXRlci1jYWxsLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaXRlci1jcmVhdGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pdGVyLWRlZmluZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLml0ZXItZGV0ZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaXRlci1zdGVwLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaXRlcmF0b3JzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5rZXlvZi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmxpYnJhcnkuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5taWNyb3Rhc2suanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5vYmplY3QtYXNzaWduLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQub2JqZWN0LXNhcC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnByb3BlcnR5LWRlc2MuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5yZWRlZmluZS1hbGwuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5yZWRlZmluZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnNhbWUtdmFsdWUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5zZXQtcHJvdG8uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5zZXQtc3BlY2llcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnNldC10by1zdHJpbmctdGFnLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuc2hhcmVkLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuc3BlY2llcy1jb25zdHJ1Y3Rvci5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnN0cmljdC1uZXcuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5zdHJpbmctYXQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC50YXNrLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQudG8taW50ZWdlci5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnRvLWlvYmplY3QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC50by1sZW5ndGguanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC50by1vYmplY3QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC51aWQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC53a3MuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5hcnJheS5pdGVyYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmtleXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5zZXQtcHJvdG90eXBlLW9mLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QudG8tc3RyaW5nLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5wcm9taXNlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3IuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnN5bWJvbC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlLmpzIiwiQzovVXNlcnMvY21vcmdhbjIvRG9jdW1lbnRzL3Byb2dyYW1taW5nL2pzL2FwcHMvc2VjcmV0LXByb2plY3Qvc291cmNlL2NvbXBvbmVudC9jb250YWluZXIuanMiLCJDOi9Vc2Vycy9jbW9yZ2FuMi9Eb2N1bWVudHMvcHJvZ3JhbW1pbmcvanMvYXBwcy9zZWNyZXQtcHJvamVjdC9zb3VyY2UvY29tcG9uZW50L3N1YnNjcmliYWJsZS5qcyIsIkM6L1VzZXJzL2Ntb3JnYW4yL0RvY3VtZW50cy9wcm9ncmFtbWluZy9qcy9hcHBzL3NlY3JldC1wcm9qZWN0L3NvdXJjZS9kYXRhY2VudGVyLmpzIiwiQzovVXNlcnMvY21vcmdhbjIvRG9jdW1lbnRzL3Byb2dyYW1taW5nL2pzL2FwcHMvc2VjcmV0LXByb2plY3Qvc291cmNlL2dhbWVzdGF0ZS5qcyIsInNlY3JldC1wcm9qZWN0L3NvdXJjZS9saWIvaG93bGVyLm1pbi5qcyIsIkM6L1VzZXJzL2Ntb3JnYW4yL0RvY3VtZW50cy9wcm9ncmFtbWluZy9qcy9hcHBzL3NlY3JldC1wcm9qZWN0L3NvdXJjZS9tYWluLmpzIiwiQzovVXNlcnMvY21vcmdhbjIvRG9jdW1lbnRzL3Byb2dyYW1taW5nL2pzL2FwcHMvc2VjcmV0LXByb2plY3Qvc291cmNlL3NjcmVlbi9nYW1lc2NyZWVuLmpzIiwiQzovVXNlcnMvY21vcmdhbjIvRG9jdW1lbnRzL3Byb2dyYW1taW5nL2pzL2FwcHMvc2VjcmV0LXByb2plY3Qvc291cmNlL3NjcmVlbi9tYWluc2NyZWVuLmpzIiwiQzovVXNlcnMvY21vcmdhbjIvRG9jdW1lbnRzL3Byb2dyYW1taW5nL2pzL2FwcHMvc2VjcmV0LXByb2plY3Qvc291cmNlL3NldHRpbmdzLmpzIiwiQzovVXNlcnMvY21vcmdhbjIvRG9jdW1lbnRzL3Byb2dyYW1taW5nL2pzL2FwcHMvc2VjcmV0LXByb2plY3Qvc291cmNlL3RoZW1lL2RlZmF1bHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkhBOztBQ0FBOztBQ0FBOztBQ0FBOztBQ0FBOztBQ0FBOztBQ0FBOztBQ0FBOztBQ0FBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDdG9CQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7O0FDRkE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBOztBQ0ZBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QUM7QUFDcEMsa0JBQWMsRUFBRSxHQUFHLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQztBQUN0QyxVQUFNLEVBQU4sTUFBTTtDQUNUOzs7Ozs7QUNQRCxJQUFNLFFBQVEsR0FBRyxTQUFTLENBQUM7O0FBRTNCLEtBQUssQ0FBQyxNQUFNLENBQUM7QUFDVCxPQUFHLEVBQUU7QUFDRCx1QkFBZSxFQUFFLE9BQU87QUFDeEIsaUJBQVMsRUFBRSxNQUFNO0tBQ3BCO0FBQ0QsVUFBTSxFQUFFO0FBQ0osa0JBQVUsRUFBRSxxQkFBcUI7QUFDakMsbUJBQVcsRUFBRSxvQkFBb0I7QUFDakMsY0FBTSxFQUFFO0FBQ0osaUJBQUssRUFBRSxRQUFRO0FBQ2YscUJBQVMsRUFBRSxPQUFPO1NBQ3JCO0tBQ0o7QUFDRCxRQUFJLEVBQUU7QUFDRix1QkFBZSxFQUFFLE9BQU87S0FDM0I7QUFDRCxlQUFXLEVBQUU7QUFDVCx1QkFBZSxFQUFFLFNBQVM7QUFDMUIsYUFBSyxFQUFFLFNBQVM7S0FDbkI7QUFDRCxTQUFLLEVBQUU7QUFDSCxZQUFJLEVBQUU7QUFDRix5QkFBYSxFQUFFLFFBQVE7U0FDMUI7S0FDSjtBQUNELGNBQVUsRUFBRTtBQUNSLGFBQUssRUFBRTtBQUNILGlCQUFLLEVBQUUsUUFBUTtTQUNsQjtLQUNKO0FBQ0QsY0FBUTtBQUNKLGFBQUssRUFBRTtBQUNILGlCQUFLLEVBQUUsUUFBUTtTQUNsQjtLQUNKO0FBQ0QsU0FBSyxFQUFFO0FBQ0gsdUJBQWUsRUFBRSxRQUFRO0FBQ3pCLGlCQUFTLEVBQUUsT0FBTztLQUNyQjtBQUNELGFBQVMsRUFBRTtBQUNQLG1CQUFXLEVBQUUsU0FBUztBQUN0QixpQkFBUyxFQUFFLE9BQU87S0FDckI7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG5cbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuKGZ1bmN0aW9uICgpIHtcbiAgdHJ5IHtcbiAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNhY2hlZFNldFRpbWVvdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaXMgbm90IGRlZmluZWQnKTtcbiAgICB9XG4gIH1cbiAgdHJ5IHtcbiAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBpcyBub3QgZGVmaW5lZCcpO1xuICAgIH1cbiAgfVxufSAoKSlcbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IGNhY2hlZFNldFRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGNhY2hlZENsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQoZHJhaW5RdWV1ZSwgMCk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vZ2V0LWl0ZXJhdG9yXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ25cIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2NyZWF0ZVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnRpZXNcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qva2V5c1wiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qvc2V0LXByb3RvdHlwZS1vZlwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9wcm9taXNlXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbFwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59O1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX09iamVjdCRkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKVtcImRlZmF1bHRcIl07XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gKGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG5cbiAgICAgIF9PYmplY3QkZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgICBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICAgIGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICAgIHJldHVybiBDb25zdHJ1Y3RvcjtcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfT2JqZWN0JGFzc2lnbiA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2Fzc2lnblwiKVtcImRlZmF1bHRcIl07XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gX09iamVjdCRhc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkge1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59O1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX09iamVjdCRjcmVhdGUgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9jcmVhdGVcIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX09iamVjdCRzZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L3NldC1wcm90b3R5cGUtb2ZcIilbXCJkZWZhdWx0XCJdO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGZ1bmN0aW9uIChzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuICBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7XG4gIH1cblxuICBzdWJDbGFzcy5wcm90b3R5cGUgPSBfT2JqZWN0JGNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7XG4gICAgY29uc3RydWN0b3I6IHtcbiAgICAgIHZhbHVlOiBzdWJDbGFzcyxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9XG4gIH0pO1xuICBpZiAoc3VwZXJDbGFzcykgX09iamVjdCRzZXRQcm90b3R5cGVPZiA/IF9PYmplY3Qkc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzcztcbn07XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuICAgIFwiZGVmYXVsdFwiOiBvYmpcbiAgfTtcbn07XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7IiwiLy8gVGhpcyBtZXRob2Qgb2Ygb2J0YWluaW5nIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0IG5lZWRzIHRvIGJlXG4vLyBrZXB0IGlkZW50aWNhbCB0byB0aGUgd2F5IGl0IGlzIG9idGFpbmVkIGluIHJ1bnRpbWUuanNcbnZhciBnID1cbiAgdHlwZW9mIGdsb2JhbCA9PT0gXCJvYmplY3RcIiA/IGdsb2JhbCA6XG4gIHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIgPyB3aW5kb3cgOlxuICB0eXBlb2Ygc2VsZiA9PT0gXCJvYmplY3RcIiA/IHNlbGYgOiB0aGlzO1xuXG4vLyBVc2UgYGdldE93blByb3BlcnR5TmFtZXNgIGJlY2F1c2Ugbm90IGFsbCBicm93c2VycyBzdXBwb3J0IGNhbGxpbmdcbi8vIGBoYXNPd25Qcm9wZXJ0eWAgb24gdGhlIGdsb2JhbCBgc2VsZmAgb2JqZWN0IGluIGEgd29ya2VyLiBTZWUgIzE4My5cbnZhciBoYWRSdW50aW1lID0gZy5yZWdlbmVyYXRvclJ1bnRpbWUgJiZcbiAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZykuaW5kZXhPZihcInJlZ2VuZXJhdG9yUnVudGltZVwiKSA+PSAwO1xuXG4vLyBTYXZlIHRoZSBvbGQgcmVnZW5lcmF0b3JSdW50aW1lIGluIGNhc2UgaXQgbmVlZHMgdG8gYmUgcmVzdG9yZWQgbGF0ZXIuXG52YXIgb2xkUnVudGltZSA9IGhhZFJ1bnRpbWUgJiYgZy5yZWdlbmVyYXRvclJ1bnRpbWU7XG5cbi8vIEZvcmNlIHJlZXZhbHV0YXRpb24gb2YgcnVudGltZS5qcy5cbmcucmVnZW5lcmF0b3JSdW50aW1lID0gdW5kZWZpbmVkO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuL3J1bnRpbWVcIik7XG5cbmlmIChoYWRSdW50aW1lKSB7XG4gIC8vIFJlc3RvcmUgdGhlIG9yaWdpbmFsIHJ1bnRpbWUuXG4gIGcucmVnZW5lcmF0b3JSdW50aW1lID0gb2xkUnVudGltZTtcbn0gZWxzZSB7XG4gIC8vIFJlbW92ZSB0aGUgZ2xvYmFsIHByb3BlcnR5IGFkZGVkIGJ5IHJ1bnRpbWUuanMuXG4gIHRyeSB7XG4gICAgZGVsZXRlIGcucmVnZW5lcmF0b3JSdW50aW1lO1xuICB9IGNhdGNoKGUpIHtcbiAgICBnLnJlZ2VuZXJhdG9yUnVudGltZSA9IHVuZGVmaW5lZDtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IG1vZHVsZS5leHBvcnRzLCBfX2VzTW9kdWxlOiB0cnVlIH07XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBodHRwczovL3Jhdy5naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL21hc3Rlci9MSUNFTlNFIGZpbGUuIEFuXG4gKiBhZGRpdGlvbmFsIGdyYW50IG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW5cbiAqIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIF9TeW1ib2wgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL3N5bWJvbFwiKVtcImRlZmF1bHRcIl07XG5cbnZhciBfT2JqZWN0JGNyZWF0ZSA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2NyZWF0ZVwiKVtcImRlZmF1bHRcIl07XG5cbnZhciBfT2JqZWN0JHNldFByb3RvdHlwZU9mID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3Qvc2V0LXByb3RvdHlwZS1vZlwiKVtcImRlZmF1bHRcIl07XG5cbnZhciBfUHJvbWlzZSA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvcHJvbWlzZVwiKVtcImRlZmF1bHRcIl07XG5cbiEoZnVuY3Rpb24gKGdsb2JhbCkge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICB2YXIgaGFzT3duID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbiAgdmFyIHVuZGVmaW5lZDsgLy8gTW9yZSBjb21wcmVzc2libGUgdGhhbiB2b2lkIDAuXG4gIHZhciAkU3ltYm9sID0gdHlwZW9mIF9TeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IF9TeW1ib2wgOiB7fTtcbiAgdmFyIGl0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5pdGVyYXRvciB8fCBcIkBAaXRlcmF0b3JcIjtcbiAgdmFyIHRvU3RyaW5nVGFnU3ltYm9sID0gJFN5bWJvbC50b1N0cmluZ1RhZyB8fCBcIkBAdG9TdHJpbmdUYWdcIjtcblxuICB2YXIgaW5Nb2R1bGUgPSB0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiO1xuICB2YXIgcnVudGltZSA9IGdsb2JhbC5yZWdlbmVyYXRvclJ1bnRpbWU7XG4gIGlmIChydW50aW1lKSB7XG4gICAgaWYgKGluTW9kdWxlKSB7XG4gICAgICAvLyBJZiByZWdlbmVyYXRvclJ1bnRpbWUgaXMgZGVmaW5lZCBnbG9iYWxseSBhbmQgd2UncmUgaW4gYSBtb2R1bGUsXG4gICAgICAvLyBtYWtlIHRoZSBleHBvcnRzIG9iamVjdCBpZGVudGljYWwgdG8gcmVnZW5lcmF0b3JSdW50aW1lLlxuICAgICAgbW9kdWxlLmV4cG9ydHMgPSBydW50aW1lO1xuICAgIH1cbiAgICAvLyBEb24ndCBib3RoZXIgZXZhbHVhdGluZyB0aGUgcmVzdCBvZiB0aGlzIGZpbGUgaWYgdGhlIHJ1bnRpbWUgd2FzXG4gICAgLy8gYWxyZWFkeSBkZWZpbmVkIGdsb2JhbGx5LlxuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIERlZmluZSB0aGUgcnVudGltZSBnbG9iYWxseSAoYXMgZXhwZWN0ZWQgYnkgZ2VuZXJhdGVkIGNvZGUpIGFzIGVpdGhlclxuICAvLyBtb2R1bGUuZXhwb3J0cyAoaWYgd2UncmUgaW4gYSBtb2R1bGUpIG9yIGEgbmV3LCBlbXB0eSBvYmplY3QuXG4gIHJ1bnRpbWUgPSBnbG9iYWwucmVnZW5lcmF0b3JSdW50aW1lID0gaW5Nb2R1bGUgPyBtb2R1bGUuZXhwb3J0cyA6IHt9O1xuXG4gIGZ1bmN0aW9uIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBJZiBvdXRlckZuIHByb3ZpZGVkLCB0aGVuIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yLlxuICAgIHZhciBnZW5lcmF0b3IgPSBfT2JqZWN0JGNyZWF0ZSgob3V0ZXJGbiB8fCBHZW5lcmF0b3IpLnByb3RvdHlwZSk7XG4gICAgdmFyIGNvbnRleHQgPSBuZXcgQ29udGV4dCh0cnlMb2NzTGlzdCB8fCBbXSk7XG5cbiAgICAvLyBUaGUgLl9pbnZva2UgbWV0aG9kIHVuaWZpZXMgdGhlIGltcGxlbWVudGF0aW9ucyBvZiB0aGUgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzLlxuICAgIGdlbmVyYXRvci5faW52b2tlID0gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcblxuICAgIHJldHVybiBnZW5lcmF0b3I7XG4gIH1cbiAgcnVudGltZS53cmFwID0gd3JhcDtcblxuICAvLyBUcnkvY2F0Y2ggaGVscGVyIHRvIG1pbmltaXplIGRlb3B0aW1pemF0aW9ucy4gUmV0dXJucyBhIGNvbXBsZXRpb25cbiAgLy8gcmVjb3JkIGxpa2UgY29udGV4dC50cnlFbnRyaWVzW2ldLmNvbXBsZXRpb24uIFRoaXMgaW50ZXJmYWNlIGNvdWxkXG4gIC8vIGhhdmUgYmVlbiAoYW5kIHdhcyBwcmV2aW91c2x5KSBkZXNpZ25lZCB0byB0YWtlIGEgY2xvc3VyZSB0byBiZVxuICAvLyBpbnZva2VkIHdpdGhvdXQgYXJndW1lbnRzLCBidXQgaW4gYWxsIHRoZSBjYXNlcyB3ZSBjYXJlIGFib3V0IHdlXG4gIC8vIGFscmVhZHkgaGF2ZSBhbiBleGlzdGluZyBtZXRob2Qgd2Ugd2FudCB0byBjYWxsLCBzbyB0aGVyZSdzIG5vIG5lZWRcbiAgLy8gdG8gY3JlYXRlIGEgbmV3IGZ1bmN0aW9uIG9iamVjdC4gV2UgY2FuIGV2ZW4gZ2V0IGF3YXkgd2l0aCBhc3N1bWluZ1xuICAvLyB0aGUgbWV0aG9kIHRha2VzIGV4YWN0bHkgb25lIGFyZ3VtZW50LCBzaW5jZSB0aGF0IGhhcHBlbnMgdG8gYmUgdHJ1ZVxuICAvLyBpbiBldmVyeSBjYXNlLCBzbyB3ZSBkb24ndCBoYXZlIHRvIHRvdWNoIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBUaGVcbiAgLy8gb25seSBhZGRpdGlvbmFsIGFsbG9jYXRpb24gcmVxdWlyZWQgaXMgdGhlIGNvbXBsZXRpb24gcmVjb3JkLCB3aGljaFxuICAvLyBoYXMgYSBzdGFibGUgc2hhcGUgYW5kIHNvIGhvcGVmdWxseSBzaG91bGQgYmUgY2hlYXAgdG8gYWxsb2NhdGUuXG4gIGZ1bmN0aW9uIHRyeUNhdGNoKGZuLCBvYmosIGFyZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcIm5vcm1hbFwiLCBhcmc6IGZuLmNhbGwob2JqLCBhcmcpIH07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcInRocm93XCIsIGFyZzogZXJyIH07XG4gICAgfVxuICB9XG5cbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkU3RhcnQgPSBcInN1c3BlbmRlZFN0YXJ0XCI7XG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkID0gXCJzdXNwZW5kZWRZaWVsZFwiO1xuICB2YXIgR2VuU3RhdGVFeGVjdXRpbmcgPSBcImV4ZWN1dGluZ1wiO1xuICB2YXIgR2VuU3RhdGVDb21wbGV0ZWQgPSBcImNvbXBsZXRlZFwiO1xuXG4gIC8vIFJldHVybmluZyB0aGlzIG9iamVjdCBmcm9tIHRoZSBpbm5lckZuIGhhcyB0aGUgc2FtZSBlZmZlY3QgYXNcbiAgLy8gYnJlYWtpbmcgb3V0IG9mIHRoZSBkaXNwYXRjaCBzd2l0Y2ggc3RhdGVtZW50LlxuICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9O1xuXG4gIC8vIER1bW15IGNvbnN0cnVjdG9yIGZ1bmN0aW9ucyB0aGF0IHdlIHVzZSBhcyB0aGUgLmNvbnN0cnVjdG9yIGFuZFxuICAvLyAuY29uc3RydWN0b3IucHJvdG90eXBlIHByb3BlcnRpZXMgZm9yIGZ1bmN0aW9ucyB0aGF0IHJldHVybiBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0cy4gRm9yIGZ1bGwgc3BlYyBjb21wbGlhbmNlLCB5b3UgbWF5IHdpc2ggdG8gY29uZmlndXJlIHlvdXJcbiAgLy8gbWluaWZpZXIgbm90IHRvIG1hbmdsZSB0aGUgbmFtZXMgb2YgdGhlc2UgdHdvIGZ1bmN0aW9ucy5cbiAgZnVuY3Rpb24gR2VuZXJhdG9yKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSgpIHt9XG5cbiAgdmFyIEdwID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID0gR2VuZXJhdG9yLnByb3RvdHlwZTtcbiAgR2VuZXJhdG9yRnVuY3Rpb24ucHJvdG90eXBlID0gR3AuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvbjtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGVbdG9TdHJpbmdUYWdTeW1ib2xdID0gR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBcIkdlbmVyYXRvckZ1bmN0aW9uXCI7XG5cbiAgLy8gSGVscGVyIGZvciBkZWZpbmluZyB0aGUgLm5leHQsIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcyBvZiB0aGVcbiAgLy8gSXRlcmF0b3IgaW50ZXJmYWNlIGluIHRlcm1zIG9mIGEgc2luZ2xlIC5faW52b2tlIG1ldGhvZC5cbiAgZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3JNZXRob2RzKHByb3RvdHlwZSkge1xuICAgIFtcIm5leHRcIiwgXCJ0aHJvd1wiLCBcInJldHVyblwiXS5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2QpIHtcbiAgICAgIHByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24gKGFyZykge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBydW50aW1lLmlzR2VuZXJhdG9yRnVuY3Rpb24gPSBmdW5jdGlvbiAoZ2VuRnVuKSB7XG4gICAgdmFyIGN0b3IgPSB0eXBlb2YgZ2VuRnVuID09PSBcImZ1bmN0aW9uXCIgJiYgZ2VuRnVuLmNvbnN0cnVjdG9yO1xuICAgIHJldHVybiBjdG9yID8gY3RvciA9PT0gR2VuZXJhdG9yRnVuY3Rpb24gfHxcbiAgICAvLyBGb3IgdGhlIG5hdGl2ZSBHZW5lcmF0b3JGdW5jdGlvbiBjb25zdHJ1Y3RvciwgdGhlIGJlc3Qgd2UgY2FuXG4gICAgLy8gZG8gaXMgdG8gY2hlY2sgaXRzIC5uYW1lIHByb3BlcnR5LlxuICAgIChjdG9yLmRpc3BsYXlOYW1lIHx8IGN0b3IubmFtZSkgPT09IFwiR2VuZXJhdG9yRnVuY3Rpb25cIiA6IGZhbHNlO1xuICB9O1xuXG4gIHJ1bnRpbWUubWFyayA9IGZ1bmN0aW9uIChnZW5GdW4pIHtcbiAgICBpZiAoX09iamVjdCRzZXRQcm90b3R5cGVPZikge1xuICAgICAgX09iamVjdCRzZXRQcm90b3R5cGVPZihnZW5GdW4sIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2VuRnVuLl9fcHJvdG9fXyA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICAgICAgaWYgKCEodG9TdHJpbmdUYWdTeW1ib2wgaW4gZ2VuRnVuKSkge1xuICAgICAgICBnZW5GdW5bdG9TdHJpbmdUYWdTeW1ib2xdID0gXCJHZW5lcmF0b3JGdW5jdGlvblwiO1xuICAgICAgfVxuICAgIH1cbiAgICBnZW5GdW4ucHJvdG90eXBlID0gX09iamVjdCRjcmVhdGUoR3ApO1xuICAgIHJldHVybiBnZW5GdW47XG4gIH07XG5cbiAgLy8gV2l0aGluIHRoZSBib2R5IG9mIGFueSBhc3luYyBmdW5jdGlvbiwgYGF3YWl0IHhgIGlzIHRyYW5zZm9ybWVkIHRvXG4gIC8vIGB5aWVsZCByZWdlbmVyYXRvclJ1bnRpbWUuYXdyYXAoeClgLCBzbyB0aGF0IHRoZSBydW50aW1lIGNhbiB0ZXN0XG4gIC8vIGB2YWx1ZSBpbnN0YW5jZW9mIEF3YWl0QXJndW1lbnRgIHRvIGRldGVybWluZSBpZiB0aGUgeWllbGRlZCB2YWx1ZSBpc1xuICAvLyBtZWFudCB0byBiZSBhd2FpdGVkLiBTb21lIG1heSBjb25zaWRlciB0aGUgbmFtZSBvZiB0aGlzIG1ldGhvZCB0b29cbiAgLy8gY3V0ZXN5LCBidXQgdGhleSBhcmUgY3VybXVkZ2VvbnMuXG4gIHJ1bnRpbWUuYXdyYXAgPSBmdW5jdGlvbiAoYXJnKSB7XG4gICAgcmV0dXJuIG5ldyBBd2FpdEFyZ3VtZW50KGFyZyk7XG4gIH07XG5cbiAgZnVuY3Rpb24gQXdhaXRBcmd1bWVudChhcmcpIHtcbiAgICB0aGlzLmFyZyA9IGFyZztcbiAgfVxuXG4gIGZ1bmN0aW9uIEFzeW5jSXRlcmF0b3IoZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChnZW5lcmF0b3JbbWV0aG9kXSwgZ2VuZXJhdG9yLCBhcmcpO1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgcmVqZWN0KHJlY29yZC5hcmcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlY29yZC5hcmc7XG4gICAgICAgIHZhciB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcbiAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgQXdhaXRBcmd1bWVudCkge1xuICAgICAgICAgIHJldHVybiBfUHJvbWlzZS5yZXNvbHZlKHZhbHVlLmFyZykudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIGludm9rZShcIm5leHRcIiwgdmFsdWUsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgaW52b2tlKFwidGhyb3dcIiwgZXJyLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIF9Qcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24gKHVud3JhcHBlZCkge1xuICAgICAgICAgIC8vIFdoZW4gYSB5aWVsZGVkIFByb21pc2UgaXMgcmVzb2x2ZWQsIGl0cyBmaW5hbCB2YWx1ZSBiZWNvbWVzXG4gICAgICAgICAgLy8gdGhlIC52YWx1ZSBvZiB0aGUgUHJvbWlzZTx7dmFsdWUsZG9uZX0+IHJlc3VsdCBmb3IgdGhlXG4gICAgICAgICAgLy8gY3VycmVudCBpdGVyYXRpb24uIElmIHRoZSBQcm9taXNlIGlzIHJlamVjdGVkLCBob3dldmVyLCB0aGVcbiAgICAgICAgICAvLyByZXN1bHQgZm9yIHRoaXMgaXRlcmF0aW9uIHdpbGwgYmUgcmVqZWN0ZWQgd2l0aCB0aGUgc2FtZVxuICAgICAgICAgIC8vIHJlYXNvbi4gTm90ZSB0aGF0IHJlamVjdGlvbnMgb2YgeWllbGRlZCBQcm9taXNlcyBhcmUgbm90XG4gICAgICAgICAgLy8gdGhyb3duIGJhY2sgaW50byB0aGUgZ2VuZXJhdG9yIGZ1bmN0aW9uLCBhcyBpcyB0aGUgY2FzZVxuICAgICAgICAgIC8vIHdoZW4gYW4gYXdhaXRlZCBQcm9taXNlIGlzIHJlamVjdGVkLiBUaGlzIGRpZmZlcmVuY2UgaW5cbiAgICAgICAgICAvLyBiZWhhdmlvciBiZXR3ZWVuIHlpZWxkIGFuZCBhd2FpdCBpcyBpbXBvcnRhbnQsIGJlY2F1c2UgaXRcbiAgICAgICAgICAvLyBhbGxvd3MgdGhlIGNvbnN1bWVyIHRvIGRlY2lkZSB3aGF0IHRvIGRvIHdpdGggdGhlIHlpZWxkZWRcbiAgICAgICAgICAvLyByZWplY3Rpb24gKHN3YWxsb3cgaXQgYW5kIGNvbnRpbnVlLCBtYW51YWxseSAudGhyb3cgaXQgYmFja1xuICAgICAgICAgIC8vIGludG8gdGhlIGdlbmVyYXRvciwgYWJhbmRvbiBpdGVyYXRpb24sIHdoYXRldmVyKS4gV2l0aFxuICAgICAgICAgIC8vIGF3YWl0LCBieSBjb250cmFzdCwgdGhlcmUgaXMgbm8gb3Bwb3J0dW5pdHkgdG8gZXhhbWluZSB0aGVcbiAgICAgICAgICAvLyByZWplY3Rpb24gcmVhc29uIG91dHNpZGUgdGhlIGdlbmVyYXRvciBmdW5jdGlvbiwgc28gdGhlXG4gICAgICAgICAgLy8gb25seSBvcHRpb24gaXMgdG8gdGhyb3cgaXQgZnJvbSB0aGUgYXdhaXQgZXhwcmVzc2lvbiwgYW5kXG4gICAgICAgICAgLy8gbGV0IHRoZSBnZW5lcmF0b3IgZnVuY3Rpb24gaGFuZGxlIHRoZSBleGNlcHRpb24uXG4gICAgICAgICAgcmVzdWx0LnZhbHVlID0gdW53cmFwcGVkO1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSwgcmVqZWN0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHByb2Nlc3MgPT09IFwib2JqZWN0XCIgJiYgcHJvY2Vzcy5kb21haW4pIHtcbiAgICAgIGludm9rZSA9IHByb2Nlc3MuZG9tYWluLmJpbmQoaW52b2tlKTtcbiAgICB9XG5cbiAgICB2YXIgcHJldmlvdXNQcm9taXNlO1xuXG4gICAgZnVuY3Rpb24gZW5xdWV1ZShtZXRob2QsIGFyZykge1xuICAgICAgZnVuY3Rpb24gY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKSB7XG4gICAgICAgIHJldHVybiBuZXcgX1Byb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcmV2aW91c1Byb21pc2UgPVxuICAgICAgLy8gSWYgZW5xdWV1ZSBoYXMgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIHdlIHdhbnQgdG8gd2FpdCB1bnRpbFxuICAgICAgLy8gYWxsIHByZXZpb3VzIFByb21pc2VzIGhhdmUgYmVlbiByZXNvbHZlZCBiZWZvcmUgY2FsbGluZyBpbnZva2UsXG4gICAgICAvLyBzbyB0aGF0IHJlc3VsdHMgYXJlIGFsd2F5cyBkZWxpdmVyZWQgaW4gdGhlIGNvcnJlY3Qgb3JkZXIuIElmXG4gICAgICAvLyBlbnF1ZXVlIGhhcyBub3QgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIGl0IGlzIGltcG9ydGFudCB0b1xuICAgICAgLy8gY2FsbCBpbnZva2UgaW1tZWRpYXRlbHksIHdpdGhvdXQgd2FpdGluZyBvbiBhIGNhbGxiYWNrIHRvIGZpcmUsXG4gICAgICAvLyBzbyB0aGF0IHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gaGFzIHRoZSBvcHBvcnR1bml0eSB0byBkb1xuICAgICAgLy8gYW55IG5lY2Vzc2FyeSBzZXR1cCBpbiBhIHByZWRpY3RhYmxlIHdheS4gVGhpcyBwcmVkaWN0YWJpbGl0eVxuICAgICAgLy8gaXMgd2h5IHRoZSBQcm9taXNlIGNvbnN0cnVjdG9yIHN5bmNocm9ub3VzbHkgaW52b2tlcyBpdHNcbiAgICAgIC8vIGV4ZWN1dG9yIGNhbGxiYWNrLCBhbmQgd2h5IGFzeW5jIGZ1bmN0aW9ucyBzeW5jaHJvbm91c2x5XG4gICAgICAvLyBleGVjdXRlIGNvZGUgYmVmb3JlIHRoZSBmaXJzdCBhd2FpdC4gU2luY2Ugd2UgaW1wbGVtZW50IHNpbXBsZVxuICAgICAgLy8gYXN5bmMgZnVuY3Rpb25zIGluIHRlcm1zIG9mIGFzeW5jIGdlbmVyYXRvcnMsIGl0IGlzIGVzcGVjaWFsbHlcbiAgICAgIC8vIGltcG9ydGFudCB0byBnZXQgdGhpcyByaWdodCwgZXZlbiB0aG91Z2ggaXQgcmVxdWlyZXMgY2FyZS5cbiAgICAgIHByZXZpb3VzUHJvbWlzZSA/IHByZXZpb3VzUHJvbWlzZS50aGVuKGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnLFxuICAgICAgLy8gQXZvaWQgcHJvcGFnYXRpbmcgZmFpbHVyZXMgdG8gUHJvbWlzZXMgcmV0dXJuZWQgYnkgbGF0ZXJcbiAgICAgIC8vIGludm9jYXRpb25zIG9mIHRoZSBpdGVyYXRvci5cbiAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKSA6IGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCk7XG4gICAgfVxuXG4gICAgLy8gRGVmaW5lIHRoZSB1bmlmaWVkIGhlbHBlciBtZXRob2QgdGhhdCBpcyB1c2VkIHRvIGltcGxlbWVudCAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIChzZWUgZGVmaW5lSXRlcmF0b3JNZXRob2RzKS5cbiAgICB0aGlzLl9pbnZva2UgPSBlbnF1ZXVlO1xuICB9XG5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlKTtcblxuICAvLyBOb3RlIHRoYXQgc2ltcGxlIGFzeW5jIGZ1bmN0aW9ucyBhcmUgaW1wbGVtZW50ZWQgb24gdG9wIG9mXG4gIC8vIEFzeW5jSXRlcmF0b3Igb2JqZWN0czsgdGhleSBqdXN0IHJldHVybiBhIFByb21pc2UgZm9yIHRoZSB2YWx1ZSBvZlxuICAvLyB0aGUgZmluYWwgcmVzdWx0IHByb2R1Y2VkIGJ5IHRoZSBpdGVyYXRvci5cbiAgcnVudGltZS5hc3luYyA9IGZ1bmN0aW9uIChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIHZhciBpdGVyID0gbmV3IEFzeW5jSXRlcmF0b3Iod3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkpO1xuXG4gICAgcmV0dXJuIHJ1bnRpbWUuaXNHZW5lcmF0b3JGdW5jdGlvbihvdXRlckZuKSA/IGl0ZXIgLy8gSWYgb3V0ZXJGbiBpcyBhIGdlbmVyYXRvciwgcmV0dXJuIHRoZSBmdWxsIGl0ZXJhdG9yLlxuICAgIDogaXRlci5uZXh0KCkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICByZXR1cm4gcmVzdWx0LmRvbmUgPyByZXN1bHQudmFsdWUgOiBpdGVyLm5leHQoKTtcbiAgICB9KTtcbiAgfTtcblxuICBmdW5jdGlvbiBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpIHtcbiAgICB2YXIgc3RhdGUgPSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0O1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZykge1xuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUV4ZWN1dGluZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBydW5uaW5nXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlQ29tcGxldGVkKSB7XG4gICAgICAgIGlmIChtZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHRocm93IGFyZztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEJlIGZvcmdpdmluZywgcGVyIDI1LjMuMy4zLjMgb2YgdGhlIHNwZWM6XG4gICAgICAgIC8vIGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1nZW5lcmF0b3JyZXN1bWVcbiAgICAgICAgcmV0dXJuIGRvbmVSZXN1bHQoKTtcbiAgICAgIH1cblxuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgdmFyIGRlbGVnYXRlID0gY29udGV4dC5kZWxlZ2F0ZTtcbiAgICAgICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJyZXR1cm5cIiB8fCBtZXRob2QgPT09IFwidGhyb3dcIiAmJiBkZWxlZ2F0ZS5pdGVyYXRvclttZXRob2RdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIEEgcmV0dXJuIG9yIHRocm93ICh3aGVuIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgbm8gdGhyb3dcbiAgICAgICAgICAgIC8vIG1ldGhvZCkgYWx3YXlzIHRlcm1pbmF0ZXMgdGhlIHlpZWxkKiBsb29wLlxuICAgICAgICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgICAgICAgIC8vIElmIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgYSByZXR1cm4gbWV0aG9kLCBnaXZlIGl0IGFcbiAgICAgICAgICAgIC8vIGNoYW5jZSB0byBjbGVhbiB1cC5cbiAgICAgICAgICAgIHZhciByZXR1cm5NZXRob2QgPSBkZWxlZ2F0ZS5pdGVyYXRvcltcInJldHVyblwiXTtcbiAgICAgICAgICAgIGlmIChyZXR1cm5NZXRob2QpIHtcbiAgICAgICAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKHJldHVybk1ldGhvZCwgZGVsZWdhdGUuaXRlcmF0b3IsIGFyZyk7XG4gICAgICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIHJldHVybiBtZXRob2QgdGhyZXcgYW4gZXhjZXB0aW9uLCBsZXQgdGhhdFxuICAgICAgICAgICAgICAgIC8vIGV4Y2VwdGlvbiBwcmV2YWlsIG92ZXIgdGhlIG9yaWdpbmFsIHJldHVybiBvciB0aHJvdy5cbiAgICAgICAgICAgICAgICBtZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgICAgICAgYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobWV0aG9kID09PSBcInJldHVyblwiKSB7XG4gICAgICAgICAgICAgIC8vIENvbnRpbnVlIHdpdGggdGhlIG91dGVyIHJldHVybiwgbm93IHRoYXQgdGhlIGRlbGVnYXRlXG4gICAgICAgICAgICAgIC8vIGl0ZXJhdG9yIGhhcyBiZWVuIHRlcm1pbmF0ZWQuXG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChkZWxlZ2F0ZS5pdGVyYXRvclttZXRob2RdLCBkZWxlZ2F0ZS5pdGVyYXRvciwgYXJnKTtcblxuICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgICAgICAgLy8gTGlrZSByZXR1cm5pbmcgZ2VuZXJhdG9yLnRocm93KHVuY2F1Z2h0KSwgYnV0IHdpdGhvdXQgdGhlXG4gICAgICAgICAgICAvLyBvdmVyaGVhZCBvZiBhbiBleHRyYSBmdW5jdGlvbiBjYWxsLlxuICAgICAgICAgICAgbWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgICAgYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIERlbGVnYXRlIGdlbmVyYXRvciByYW4gYW5kIGhhbmRsZWQgaXRzIG93biBleGNlcHRpb25zIHNvXG4gICAgICAgICAgLy8gcmVnYXJkbGVzcyBvZiB3aGF0IHRoZSBtZXRob2Qgd2FzLCB3ZSBjb250aW51ZSBhcyBpZiBpdCBpc1xuICAgICAgICAgIC8vIFwibmV4dFwiIHdpdGggYW4gdW5kZWZpbmVkIGFyZy5cbiAgICAgICAgICBtZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgICBhcmcgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICB2YXIgaW5mbyA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgaWYgKGluZm8uZG9uZSkge1xuICAgICAgICAgICAgY29udGV4dFtkZWxlZ2F0ZS5yZXN1bHROYW1lXSA9IGluZm8udmFsdWU7XG4gICAgICAgICAgICBjb250ZXh0Lm5leHQgPSBkZWxlZ2F0ZS5uZXh0TG9jO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlU3VzcGVuZGVkWWllbGQ7XG4gICAgICAgICAgICByZXR1cm4gaW5mbztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkKSB7XG4gICAgICAgICAgICBjb250ZXh0LnNlbnQgPSBhcmc7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnRleHQuc2VudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAobWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQpIHtcbiAgICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgICB0aHJvdyBhcmc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oYXJnKSkge1xuICAgICAgICAgICAgLy8gSWYgdGhlIGRpc3BhdGNoZWQgZXhjZXB0aW9uIHdhcyBjYXVnaHQgYnkgYSBjYXRjaCBibG9jayxcbiAgICAgICAgICAgIC8vIHRoZW4gbGV0IHRoYXQgY2F0Y2ggYmxvY2sgaGFuZGxlIHRoZSBleGNlcHRpb24gbm9ybWFsbHkuXG4gICAgICAgICAgICBtZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgICAgIGFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAobWV0aG9kID09PSBcInJldHVyblwiKSB7XG4gICAgICAgICAgY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwgYXJnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRlID0gR2VuU3RhdGVFeGVjdXRpbmc7XG5cbiAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIpIHtcbiAgICAgICAgICAvLyBJZiBhbiBleGNlcHRpb24gaXMgdGhyb3duIGZyb20gaW5uZXJGbiwgd2UgbGVhdmUgc3RhdGUgPT09XG4gICAgICAgICAgLy8gR2VuU3RhdGVFeGVjdXRpbmcgYW5kIGxvb3AgYmFjayBmb3IgYW5vdGhlciBpbnZvY2F0aW9uLlxuICAgICAgICAgIHN0YXRlID0gY29udGV4dC5kb25lID8gR2VuU3RhdGVDb21wbGV0ZWQgOiBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkO1xuXG4gICAgICAgICAgdmFyIGluZm8gPSB7XG4gICAgICAgICAgICB2YWx1ZTogcmVjb3JkLmFyZyxcbiAgICAgICAgICAgIGRvbmU6IGNvbnRleHQuZG9uZVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBpZiAocmVjb3JkLmFyZyA9PT0gQ29udGludWVTZW50aW5lbCkge1xuICAgICAgICAgICAgaWYgKGNvbnRleHQuZGVsZWdhdGUgJiYgbWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAgICAgICAvLyBEZWxpYmVyYXRlbHkgZm9yZ2V0IHRoZSBsYXN0IHNlbnQgdmFsdWUgc28gdGhhdCB3ZSBkb24ndFxuICAgICAgICAgICAgICAvLyBhY2NpZGVudGFsbHkgcGFzcyBpdCBvbiB0byB0aGUgZGVsZWdhdGUuXG4gICAgICAgICAgICAgIGFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGluZm87XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgIC8vIERpc3BhdGNoIHRoZSBleGNlcHRpb24gYnkgbG9vcGluZyBiYWNrIGFyb3VuZCB0byB0aGVcbiAgICAgICAgICAvLyBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGFyZykgY2FsbCBhYm92ZS5cbiAgICAgICAgICBtZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyBEZWZpbmUgR2VuZXJhdG9yLnByb3RvdHlwZS57bmV4dCx0aHJvdyxyZXR1cm59IGluIHRlcm1zIG9mIHRoZVxuICAvLyB1bmlmaWVkIC5faW52b2tlIGhlbHBlciBtZXRob2QuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhHcCk7XG5cbiAgR3BbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEdwW3RvU3RyaW5nVGFnU3ltYm9sXSA9IFwiR2VuZXJhdG9yXCI7XG5cbiAgR3AudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIFwiW29iamVjdCBHZW5lcmF0b3JdXCI7XG4gIH07XG5cbiAgZnVuY3Rpb24gcHVzaFRyeUVudHJ5KGxvY3MpIHtcbiAgICB2YXIgZW50cnkgPSB7IHRyeUxvYzogbG9jc1swXSB9O1xuXG4gICAgaWYgKDEgaW4gbG9jcykge1xuICAgICAgZW50cnkuY2F0Y2hMb2MgPSBsb2NzWzFdO1xuICAgIH1cblxuICAgIGlmICgyIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmZpbmFsbHlMb2MgPSBsb2NzWzJdO1xuICAgICAgZW50cnkuYWZ0ZXJMb2MgPSBsb2NzWzNdO1xuICAgIH1cblxuICAgIHRoaXMudHJ5RW50cmllcy5wdXNoKGVudHJ5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0VHJ5RW50cnkoZW50cnkpIHtcbiAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbiB8fCB7fTtcbiAgICByZWNvcmQudHlwZSA9IFwibm9ybWFsXCI7XG4gICAgZGVsZXRlIHJlY29yZC5hcmc7XG4gICAgZW50cnkuY29tcGxldGlvbiA9IHJlY29yZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIENvbnRleHQodHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBUaGUgcm9vdCBlbnRyeSBvYmplY3QgKGVmZmVjdGl2ZWx5IGEgdHJ5IHN0YXRlbWVudCB3aXRob3V0IGEgY2F0Y2hcbiAgICAvLyBvciBhIGZpbmFsbHkgYmxvY2spIGdpdmVzIHVzIGEgcGxhY2UgdG8gc3RvcmUgdmFsdWVzIHRocm93biBmcm9tXG4gICAgLy8gbG9jYXRpb25zIHdoZXJlIHRoZXJlIGlzIG5vIGVuY2xvc2luZyB0cnkgc3RhdGVtZW50LlxuICAgIHRoaXMudHJ5RW50cmllcyA9IFt7IHRyeUxvYzogXCJyb290XCIgfV07XG4gICAgdHJ5TG9jc0xpc3QuZm9yRWFjaChwdXNoVHJ5RW50cnksIHRoaXMpO1xuICAgIHRoaXMucmVzZXQodHJ1ZSk7XG4gIH1cblxuICBydW50aW1lLmtleXMgPSBmdW5jdGlvbiAob2JqZWN0KSB7XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICB9XG4gICAga2V5cy5yZXZlcnNlKCk7XG5cbiAgICAvLyBSYXRoZXIgdGhhbiByZXR1cm5pbmcgYW4gb2JqZWN0IHdpdGggYSBuZXh0IG1ldGhvZCwgd2Uga2VlcFxuICAgIC8vIHRoaW5ncyBzaW1wbGUgYW5kIHJldHVybiB0aGUgbmV4dCBmdW5jdGlvbiBpdHNlbGYuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICB3aGlsZSAoa2V5cy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXMucG9wKCk7XG4gICAgICAgIGlmIChrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgbmV4dC52YWx1ZSA9IGtleTtcbiAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUbyBhdm9pZCBjcmVhdGluZyBhbiBhZGRpdGlvbmFsIG9iamVjdCwgd2UganVzdCBoYW5nIHRoZSAudmFsdWVcbiAgICAgIC8vIGFuZCAuZG9uZSBwcm9wZXJ0aWVzIG9mZiB0aGUgbmV4dCBmdW5jdGlvbiBvYmplY3QgaXRzZWxmLiBUaGlzXG4gICAgICAvLyBhbHNvIGVuc3VyZXMgdGhhdCB0aGUgbWluaWZpZXIgd2lsbCBub3QgYW5vbnltaXplIHRoZSBmdW5jdGlvbi5cbiAgICAgIG5leHQuZG9uZSA9IHRydWU7XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIHZhbHVlcyhpdGVyYWJsZSkge1xuICAgIGlmIChpdGVyYWJsZSkge1xuICAgICAgdmFyIGl0ZXJhdG9yTWV0aG9kID0gaXRlcmFibGVbaXRlcmF0b3JTeW1ib2xdO1xuICAgICAgaWYgKGl0ZXJhdG9yTWV0aG9kKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvck1ldGhvZC5jYWxsKGl0ZXJhYmxlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBpdGVyYWJsZS5uZXh0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhYmxlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzTmFOKGl0ZXJhYmxlLmxlbmd0aCkpIHtcbiAgICAgICAgdmFyIGkgPSAtMSxcbiAgICAgICAgICAgIG5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgIHdoaWxlICgrK2kgPCBpdGVyYWJsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd24uY2FsbChpdGVyYWJsZSwgaSkpIHtcbiAgICAgICAgICAgICAgbmV4dC52YWx1ZSA9IGl0ZXJhYmxlW2ldO1xuICAgICAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbmV4dC52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuXG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5leHQubmV4dCA9IG5leHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGFuIGl0ZXJhdG9yIHdpdGggbm8gdmFsdWVzLlxuICAgIHJldHVybiB7IG5leHQ6IGRvbmVSZXN1bHQgfTtcbiAgfVxuICBydW50aW1lLnZhbHVlcyA9IHZhbHVlcztcblxuICBmdW5jdGlvbiBkb25lUmVzdWx0KCkge1xuICAgIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgfVxuXG4gIENvbnRleHQucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LFxuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uIHJlc2V0KHNraXBUZW1wUmVzZXQpIHtcbiAgICAgIHRoaXMucHJldiA9IDA7XG4gICAgICB0aGlzLm5leHQgPSAwO1xuICAgICAgdGhpcy5zZW50ID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5kb25lID0gZmFsc2U7XG4gICAgICB0aGlzLmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgdGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSk7XG5cbiAgICAgIGlmICghc2tpcFRlbXBSZXNldCkge1xuICAgICAgICBmb3IgKHZhciBuYW1lIGluIHRoaXMpIHtcbiAgICAgICAgICAvLyBOb3Qgc3VyZSBhYm91dCB0aGUgb3B0aW1hbCBvcmRlciBvZiB0aGVzZSBjb25kaXRpb25zOlxuICAgICAgICAgIGlmIChuYW1lLmNoYXJBdCgwKSA9PT0gXCJ0XCIgJiYgaGFzT3duLmNhbGwodGhpcywgbmFtZSkgJiYgIWlzTmFOKCtuYW1lLnNsaWNlKDEpKSkge1xuICAgICAgICAgICAgdGhpc1tuYW1lXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RvcDogZnVuY3Rpb24gc3RvcCgpIHtcbiAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG5cbiAgICAgIHZhciByb290RW50cnkgPSB0aGlzLnRyeUVudHJpZXNbMF07XG4gICAgICB2YXIgcm9vdFJlY29yZCA9IHJvb3RFbnRyeS5jb21wbGV0aW9uO1xuICAgICAgaWYgKHJvb3RSZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJvb3RSZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5ydmFsO1xuICAgIH0sXG5cbiAgICBkaXNwYXRjaEV4Y2VwdGlvbjogZnVuY3Rpb24gZGlzcGF0Y2hFeGNlcHRpb24oZXhjZXB0aW9uKSB7XG4gICAgICBpZiAodGhpcy5kb25lKSB7XG4gICAgICAgIHRocm93IGV4Y2VwdGlvbjtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgIHJlY29yZC50eXBlID0gXCJ0aHJvd1wiO1xuICAgICAgICByZWNvcmQuYXJnID0gZXhjZXB0aW9uO1xuICAgICAgICBjb250ZXh0Lm5leHQgPSBsb2M7XG4gICAgICAgIHJldHVybiAhIWNhdWdodDtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IFwicm9vdFwiKSB7XG4gICAgICAgICAgLy8gRXhjZXB0aW9uIHRocm93biBvdXRzaWRlIG9mIGFueSB0cnkgYmxvY2sgdGhhdCBjb3VsZCBoYW5kbGVcbiAgICAgICAgICAvLyBpdCwgc28gc2V0IHRoZSBjb21wbGV0aW9uIHZhbHVlIG9mIHRoZSBlbnRpcmUgZnVuY3Rpb24gdG9cbiAgICAgICAgICAvLyB0aHJvdyB0aGUgZXhjZXB0aW9uLlxuICAgICAgICAgIHJldHVybiBoYW5kbGUoXCJlbmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldikge1xuICAgICAgICAgIHZhciBoYXNDYXRjaCA9IGhhc093bi5jYWxsKGVudHJ5LCBcImNhdGNoTG9jXCIpO1xuICAgICAgICAgIHZhciBoYXNGaW5hbGx5ID0gaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKTtcblxuICAgICAgICAgIGlmIChoYXNDYXRjaCAmJiBoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0NhdGNoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYWJydXB0OiBmdW5jdGlvbiBhYnJ1cHQodHlwZSwgYXJnKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYgJiYgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJiB0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgdmFyIGZpbmFsbHlFbnRyeSA9IGVudHJ5O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkgJiYgKHR5cGUgPT09IFwiYnJlYWtcIiB8fCB0eXBlID09PSBcImNvbnRpbnVlXCIpICYmIGZpbmFsbHlFbnRyeS50cnlMb2MgPD0gYXJnICYmIGFyZyA8PSBmaW5hbGx5RW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAvLyBJZ25vcmUgdGhlIGZpbmFsbHkgZW50cnkgaWYgY29udHJvbCBpcyBub3QganVtcGluZyB0byBhXG4gICAgICAgIC8vIGxvY2F0aW9uIG91dHNpZGUgdGhlIHRyeS9jYXRjaCBibG9jay5cbiAgICAgICAgZmluYWxseUVudHJ5ID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgdmFyIHJlY29yZCA9IGZpbmFsbHlFbnRyeSA/IGZpbmFsbHlFbnRyeS5jb21wbGV0aW9uIDoge307XG4gICAgICByZWNvcmQudHlwZSA9IHR5cGU7XG4gICAgICByZWNvcmQuYXJnID0gYXJnO1xuXG4gICAgICBpZiAoZmluYWxseUVudHJ5KSB7XG4gICAgICAgIHRoaXMubmV4dCA9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb21wbGV0ZShyZWNvcmQpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9LFxuXG4gICAgY29tcGxldGU6IGZ1bmN0aW9uIGNvbXBsZXRlKHJlY29yZCwgYWZ0ZXJMb2MpIHtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJicmVha1wiIHx8IHJlY29yZC50eXBlID09PSBcImNvbnRpbnVlXCIpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gcmVjb3JkLmFyZztcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgdGhpcy5ydmFsID0gcmVjb3JkLmFyZztcbiAgICAgICAgdGhpcy5uZXh0ID0gXCJlbmRcIjtcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIgJiYgYWZ0ZXJMb2MpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gYWZ0ZXJMb2M7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGZpbmlzaDogZnVuY3Rpb24gZmluaXNoKGZpbmFsbHlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkuZmluYWxseUxvYyA9PT0gZmluYWxseUxvYykge1xuICAgICAgICAgIHRoaXMuY29tcGxldGUoZW50cnkuY29tcGxldGlvbiwgZW50cnkuYWZ0ZXJMb2MpO1xuICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIFwiY2F0Y2hcIjogZnVuY3Rpb24gX2NhdGNoKHRyeUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykge1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICB2YXIgdGhyb3duID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhyb3duO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSBjb250ZXh0LmNhdGNoIG1ldGhvZCBtdXN0IG9ubHkgYmUgY2FsbGVkIHdpdGggYSBsb2NhdGlvblxuICAgICAgLy8gYXJndW1lbnQgdGhhdCBjb3JyZXNwb25kcyB0byBhIGtub3duIGNhdGNoIGJsb2NrLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCBjYXRjaCBhdHRlbXB0XCIpO1xuICAgIH0sXG5cbiAgICBkZWxlZ2F0ZVlpZWxkOiBmdW5jdGlvbiBkZWxlZ2F0ZVlpZWxkKGl0ZXJhYmxlLCByZXN1bHROYW1lLCBuZXh0TG9jKSB7XG4gICAgICB0aGlzLmRlbGVnYXRlID0ge1xuICAgICAgICBpdGVyYXRvcjogdmFsdWVzKGl0ZXJhYmxlKSxcbiAgICAgICAgcmVzdWx0TmFtZTogcmVzdWx0TmFtZSxcbiAgICAgICAgbmV4dExvYzogbmV4dExvY1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuICB9O1xufSkoXG4vLyBBbW9uZyB0aGUgdmFyaW91cyB0cmlja3MgZm9yIG9idGFpbmluZyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsXG4vLyBvYmplY3QsIHRoaXMgc2VlbXMgdG8gYmUgdGhlIG1vc3QgcmVsaWFibGUgdGVjaG5pcXVlIHRoYXQgZG9lcyBub3Rcbi8vIHVzZSBpbmRpcmVjdCBldmFsICh3aGljaCB2aW9sYXRlcyBDb250ZW50IFNlY3VyaXR5IFBvbGljeSkuXG50eXBlb2YgZ2xvYmFsID09PSBcIm9iamVjdFwiID8gZ2xvYmFsIDogdHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIiA/IHdpbmRvdyA6IHR5cGVvZiBzZWxmID09PSBcIm9iamVjdFwiID8gc2VsZiA6IHVuZGVmaW5lZCk7IiwicmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvcicpOyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24nKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy8kLmNvcmUnKS5PYmplY3QuYXNzaWduOyIsInZhciAkID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy8kJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNyZWF0ZShQLCBEKXtcbiAgcmV0dXJuICQuY3JlYXRlKFAsIEQpO1xufTsiLCJ2YXIgJCA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvJCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKFQsIEQpe1xuICByZXR1cm4gJC5zZXREZXNjcyhULCBEKTtcbn07IiwidmFyICQgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzLyQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYyl7XG4gIHJldHVybiAkLnNldERlc2MoaXQsIGtleSwgZGVzYyk7XG59OyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5rZXlzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvJC5jb3JlJykuT2JqZWN0LmtleXM7IiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LnNldC1wcm90b3R5cGUtb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy8kLmNvcmUnKS5PYmplY3Quc2V0UHJvdG90eXBlT2Y7IiwicmVxdWlyZSgnLi4vbW9kdWxlcy9lczYub2JqZWN0LnRvLXN0cmluZycpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnByb21pc2UnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vbW9kdWxlcy8kLmNvcmUnKS5Qcm9taXNlOyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LnN5bWJvbCcpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LnRvLXN0cmluZycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzLyQuY29yZScpLlN5bWJvbDsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYodHlwZW9mIGl0ICE9ICdmdW5jdGlvbicpdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYSBmdW5jdGlvbiEnKTtcbiAgcmV0dXJuIGl0O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCl7IC8qIGVtcHR5ICovIH07IiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi8kLmlzLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKCFpc09iamVjdChpdCkpdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYW4gb2JqZWN0IScpO1xuICByZXR1cm4gaXQ7XG59OyIsIi8vIGdldHRpbmcgdGFnIGZyb20gMTkuMS4zLjYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZygpXG52YXIgY29mID0gcmVxdWlyZSgnLi8kLmNvZicpXG4gICwgVEFHID0gcmVxdWlyZSgnLi8kLndrcycpKCd0b1N0cmluZ1RhZycpXG4gIC8vIEVTMyB3cm9uZyBoZXJlXG4gICwgQVJHID0gY29mKGZ1bmN0aW9uKCl7IHJldHVybiBhcmd1bWVudHM7IH0oKSkgPT0gJ0FyZ3VtZW50cyc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICB2YXIgTywgVCwgQjtcbiAgcmV0dXJuIGl0ID09PSB1bmRlZmluZWQgPyAnVW5kZWZpbmVkJyA6IGl0ID09PSBudWxsID8gJ051bGwnXG4gICAgLy8gQEB0b1N0cmluZ1RhZyBjYXNlXG4gICAgOiB0eXBlb2YgKFQgPSAoTyA9IE9iamVjdChpdCkpW1RBR10pID09ICdzdHJpbmcnID8gVFxuICAgIC8vIGJ1aWx0aW5UYWcgY2FzZVxuICAgIDogQVJHID8gY29mKE8pXG4gICAgLy8gRVMzIGFyZ3VtZW50cyBmYWxsYmFja1xuICAgIDogKEIgPSBjb2YoTykpID09ICdPYmplY3QnICYmIHR5cGVvZiBPLmNhbGxlZSA9PSAnZnVuY3Rpb24nID8gJ0FyZ3VtZW50cycgOiBCO1xufTsiLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XG59OyIsInZhciBjb3JlID0gbW9kdWxlLmV4cG9ydHMgPSB7dmVyc2lvbjogJzEuMi42J307XG5pZih0eXBlb2YgX19lID09ICdudW1iZXInKV9fZSA9IGNvcmU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWYiLCIvLyBvcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuLyQuYS1mdW5jdGlvbicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihmbiwgdGhhdCwgbGVuZ3RoKXtcbiAgYUZ1bmN0aW9uKGZuKTtcbiAgaWYodGhhdCA9PT0gdW5kZWZpbmVkKXJldHVybiBmbjtcbiAgc3dpdGNoKGxlbmd0aCl7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24oYSl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhKTtcbiAgICB9O1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uKGEsIGIpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbihhLCBiLCBjKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uKC8qIC4uLmFyZ3MgKi8pe1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufTsiLCIvLyA3LjIuMSBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKGl0ID09IHVuZGVmaW5lZCl0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07IiwiLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi8kLmZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7Z2V0OiBmdW5jdGlvbigpeyByZXR1cm4gNzsgfX0pLmEgIT0gNztcbn0pOyIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vJC5pcy1vYmplY3QnKVxuICAsIGRvY3VtZW50ID0gcmVxdWlyZSgnLi8kLmdsb2JhbCcpLmRvY3VtZW50XG4gIC8vIGluIG9sZCBJRSB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBpcyAnb2JqZWN0J1xuICAsIGlzID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpcyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXQpIDoge307XG59OyIsIi8vIGFsbCBlbnVtZXJhYmxlIG9iamVjdCBrZXlzLCBpbmNsdWRlcyBzeW1ib2xzXG52YXIgJCA9IHJlcXVpcmUoJy4vJCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHZhciBrZXlzICAgICAgID0gJC5nZXRLZXlzKGl0KVxuICAgICwgZ2V0U3ltYm9scyA9ICQuZ2V0U3ltYm9scztcbiAgaWYoZ2V0U3ltYm9scyl7XG4gICAgdmFyIHN5bWJvbHMgPSBnZXRTeW1ib2xzKGl0KVxuICAgICAgLCBpc0VudW0gID0gJC5pc0VudW1cbiAgICAgICwgaSAgICAgICA9IDBcbiAgICAgICwga2V5O1xuICAgIHdoaWxlKHN5bWJvbHMubGVuZ3RoID4gaSlpZihpc0VudW0uY2FsbChpdCwga2V5ID0gc3ltYm9sc1tpKytdKSlrZXlzLnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4ga2V5cztcbn07IiwidmFyIGdsb2JhbCAgICA9IHJlcXVpcmUoJy4vJC5nbG9iYWwnKVxuICAsIGNvcmUgICAgICA9IHJlcXVpcmUoJy4vJC5jb3JlJylcbiAgLCBjdHggICAgICAgPSByZXF1aXJlKCcuLyQuY3R4JylcbiAgLCBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxudmFyICRleHBvcnQgPSBmdW5jdGlvbih0eXBlLCBuYW1lLCBzb3VyY2Upe1xuICB2YXIgSVNfRk9SQ0VEID0gdHlwZSAmICRleHBvcnQuRlxuICAgICwgSVNfR0xPQkFMID0gdHlwZSAmICRleHBvcnQuR1xuICAgICwgSVNfU1RBVElDID0gdHlwZSAmICRleHBvcnQuU1xuICAgICwgSVNfUFJPVE8gID0gdHlwZSAmICRleHBvcnQuUFxuICAgICwgSVNfQklORCAgID0gdHlwZSAmICRleHBvcnQuQlxuICAgICwgSVNfV1JBUCAgID0gdHlwZSAmICRleHBvcnQuV1xuICAgICwgZXhwb3J0cyAgID0gSVNfR0xPQkFMID8gY29yZSA6IGNvcmVbbmFtZV0gfHwgKGNvcmVbbmFtZV0gPSB7fSlcbiAgICAsIHRhcmdldCAgICA9IElTX0dMT0JBTCA/IGdsb2JhbCA6IElTX1NUQVRJQyA/IGdsb2JhbFtuYW1lXSA6IChnbG9iYWxbbmFtZV0gfHwge30pW1BST1RPVFlQRV1cbiAgICAsIGtleSwgb3duLCBvdXQ7XG4gIGlmKElTX0dMT0JBTClzb3VyY2UgPSBuYW1lO1xuICBmb3Ioa2V5IGluIHNvdXJjZSl7XG4gICAgLy8gY29udGFpbnMgaW4gbmF0aXZlXG4gICAgb3duID0gIUlTX0ZPUkNFRCAmJiB0YXJnZXQgJiYga2V5IGluIHRhcmdldDtcbiAgICBpZihvd24gJiYga2V5IGluIGV4cG9ydHMpY29udGludWU7XG4gICAgLy8gZXhwb3J0IG5hdGl2ZSBvciBwYXNzZWRcbiAgICBvdXQgPSBvd24gPyB0YXJnZXRba2V5XSA6IHNvdXJjZVtrZXldO1xuICAgIC8vIHByZXZlbnQgZ2xvYmFsIHBvbGx1dGlvbiBmb3IgbmFtZXNwYWNlc1xuICAgIGV4cG9ydHNba2V5XSA9IElTX0dMT0JBTCAmJiB0eXBlb2YgdGFyZ2V0W2tleV0gIT0gJ2Z1bmN0aW9uJyA/IHNvdXJjZVtrZXldXG4gICAgLy8gYmluZCB0aW1lcnMgdG8gZ2xvYmFsIGZvciBjYWxsIGZyb20gZXhwb3J0IGNvbnRleHRcbiAgICA6IElTX0JJTkQgJiYgb3duID8gY3R4KG91dCwgZ2xvYmFsKVxuICAgIC8vIHdyYXAgZ2xvYmFsIGNvbnN0cnVjdG9ycyBmb3IgcHJldmVudCBjaGFuZ2UgdGhlbSBpbiBsaWJyYXJ5XG4gICAgOiBJU19XUkFQICYmIHRhcmdldFtrZXldID09IG91dCA/IChmdW5jdGlvbihDKXtcbiAgICAgIHZhciBGID0gZnVuY3Rpb24ocGFyYW0pe1xuICAgICAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIEMgPyBuZXcgQyhwYXJhbSkgOiBDKHBhcmFtKTtcbiAgICAgIH07XG4gICAgICBGW1BST1RPVFlQRV0gPSBDW1BST1RPVFlQRV07XG4gICAgICByZXR1cm4gRjtcbiAgICAvLyBtYWtlIHN0YXRpYyB2ZXJzaW9ucyBmb3IgcHJvdG90eXBlIG1ldGhvZHNcbiAgICB9KShvdXQpIDogSVNfUFJPVE8gJiYgdHlwZW9mIG91dCA9PSAnZnVuY3Rpb24nID8gY3R4KEZ1bmN0aW9uLmNhbGwsIG91dCkgOiBvdXQ7XG4gICAgaWYoSVNfUFJPVE8pKGV4cG9ydHNbUFJPVE9UWVBFXSB8fCAoZXhwb3J0c1tQUk9UT1RZUEVdID0ge30pKVtrZXldID0gb3V0O1xuICB9XG59O1xuLy8gdHlwZSBiaXRtYXBcbiRleHBvcnQuRiA9IDE7ICAvLyBmb3JjZWRcbiRleHBvcnQuRyA9IDI7ICAvLyBnbG9iYWxcbiRleHBvcnQuUyA9IDQ7ICAvLyBzdGF0aWNcbiRleHBvcnQuUCA9IDg7ICAvLyBwcm90b1xuJGV4cG9ydC5CID0gMTY7IC8vIGJpbmRcbiRleHBvcnQuVyA9IDMyOyAvLyB3cmFwXG5tb2R1bGUuZXhwb3J0cyA9ICRleHBvcnQ7IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihleGVjKXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFleGVjKCk7XG4gIH0gY2F0Y2goZSl7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07IiwidmFyIGN0eCAgICAgICAgID0gcmVxdWlyZSgnLi8kLmN0eCcpXG4gICwgY2FsbCAgICAgICAgPSByZXF1aXJlKCcuLyQuaXRlci1jYWxsJylcbiAgLCBpc0FycmF5SXRlciA9IHJlcXVpcmUoJy4vJC5pcy1hcnJheS1pdGVyJylcbiAgLCBhbk9iamVjdCAgICA9IHJlcXVpcmUoJy4vJC5hbi1vYmplY3QnKVxuICAsIHRvTGVuZ3RoICAgID0gcmVxdWlyZSgnLi8kLnRvLWxlbmd0aCcpXG4gICwgZ2V0SXRlckZuICAgPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdGVyYWJsZSwgZW50cmllcywgZm4sIHRoYXQpe1xuICB2YXIgaXRlckZuID0gZ2V0SXRlckZuKGl0ZXJhYmxlKVxuICAgICwgZiAgICAgID0gY3R4KGZuLCB0aGF0LCBlbnRyaWVzID8gMiA6IDEpXG4gICAgLCBpbmRleCAgPSAwXG4gICAgLCBsZW5ndGgsIHN0ZXAsIGl0ZXJhdG9yO1xuICBpZih0eXBlb2YgaXRlckZuICE9ICdmdW5jdGlvbicpdGhyb3cgVHlwZUVycm9yKGl0ZXJhYmxlICsgJyBpcyBub3QgaXRlcmFibGUhJyk7XG4gIC8vIGZhc3QgY2FzZSBmb3IgYXJyYXlzIHdpdGggZGVmYXVsdCBpdGVyYXRvclxuICBpZihpc0FycmF5SXRlcihpdGVyRm4pKWZvcihsZW5ndGggPSB0b0xlbmd0aChpdGVyYWJsZS5sZW5ndGgpOyBsZW5ndGggPiBpbmRleDsgaW5kZXgrKyl7XG4gICAgZW50cmllcyA/IGYoYW5PYmplY3Qoc3RlcCA9IGl0ZXJhYmxlW2luZGV4XSlbMF0sIHN0ZXBbMV0pIDogZihpdGVyYWJsZVtpbmRleF0pO1xuICB9IGVsc2UgZm9yKGl0ZXJhdG9yID0gaXRlckZuLmNhbGwoaXRlcmFibGUpOyAhKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmU7ICl7XG4gICAgY2FsbChpdGVyYXRvciwgZiwgc3RlcC52YWx1ZSwgZW50cmllcyk7XG4gIH1cbn07IiwiLy8gZmFsbGJhY2sgZm9yIElFMTEgYnVnZ3kgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgd2l0aCBpZnJhbWUgYW5kIHdpbmRvd1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vJC50by1pb2JqZWN0JylcbiAgLCBnZXROYW1lcyAgPSByZXF1aXJlKCcuLyQnKS5nZXROYW1lc1xuICAsIHRvU3RyaW5nICA9IHt9LnRvU3RyaW5nO1xuXG52YXIgd2luZG93TmFtZXMgPSB0eXBlb2Ygd2luZG93ID09ICdvYmplY3QnICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzXG4gID8gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMod2luZG93KSA6IFtdO1xuXG52YXIgZ2V0V2luZG93TmFtZXMgPSBmdW5jdGlvbihpdCl7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGdldE5hbWVzKGl0KTtcbiAgfSBjYXRjaChlKXtcbiAgICByZXR1cm4gd2luZG93TmFtZXMuc2xpY2UoKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMuZ2V0ID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhpdCl7XG4gIGlmKHdpbmRvd05hbWVzICYmIHRvU3RyaW5nLmNhbGwoaXQpID09ICdbb2JqZWN0IFdpbmRvd10nKXJldHVybiBnZXRXaW5kb3dOYW1lcyhpdCk7XG4gIHJldHVybiBnZXROYW1lcyh0b0lPYmplY3QoaXQpKTtcbn07IiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzg2I2lzc3VlY29tbWVudC0xMTU3NTkwMjhcbnZhciBnbG9iYWwgPSBtb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Lk1hdGggPT0gTWF0aFxuICA/IHdpbmRvdyA6IHR5cGVvZiBzZWxmICE9ICd1bmRlZmluZWQnICYmIHNlbGYuTWF0aCA9PSBNYXRoID8gc2VsZiA6IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5pZih0eXBlb2YgX19nID09ICdudW1iZXInKV9fZyA9IGdsb2JhbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZiIsInZhciBoYXNPd25Qcm9wZXJ0eSA9IHt9Lmhhc093blByb3BlcnR5O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwga2V5KXtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaXQsIGtleSk7XG59OyIsInZhciAkICAgICAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi8kLnByb3BlcnR5LWRlc2MnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi8kLmRlc2NyaXB0b3JzJykgPyBmdW5jdGlvbihvYmplY3QsIGtleSwgdmFsdWUpe1xuICByZXR1cm4gJC5zZXREZXNjKG9iamVjdCwga2V5LCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24ob2JqZWN0LCBrZXksIHZhbHVlKXtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLyQuZ2xvYmFsJykuZG9jdW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50OyIsIi8vIGZhc3QgYXBwbHksIGh0dHA6Ly9qc3BlcmYubG5raXQuY29tL2Zhc3QtYXBwbHkvNVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihmbiwgYXJncywgdGhhdCl7XG4gIHZhciB1biA9IHRoYXQgPT09IHVuZGVmaW5lZDtcbiAgc3dpdGNoKGFyZ3MubGVuZ3RoKXtcbiAgICBjYXNlIDA6IHJldHVybiB1biA/IGZuKClcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCk7XG4gICAgY2FzZSAxOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdKTtcbiAgICBjYXNlIDI6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgIGNhc2UgMzogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gICAgY2FzZSA0OiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdKTtcbiAgfSByZXR1cm4gICAgICAgICAgICAgIGZuLmFwcGx5KHRoYXQsIGFyZ3MpO1xufTsiLCIvLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xudmFyIGNvZiA9IHJlcXVpcmUoJy4vJC5jb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0KCd6JykucHJvcGVydHlJc0VudW1lcmFibGUoMCkgPyBPYmplY3QgOiBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBjb2YoaXQpID09ICdTdHJpbmcnID8gaXQuc3BsaXQoJycpIDogT2JqZWN0KGl0KTtcbn07IiwiLy8gY2hlY2sgb24gZGVmYXVsdCBBcnJheSBpdGVyYXRvclxudmFyIEl0ZXJhdG9ycyAgPSByZXF1aXJlKCcuLyQuaXRlcmF0b3JzJylcbiAgLCBJVEVSQVRPUiAgID0gcmVxdWlyZSgnLi8kLndrcycpKCdpdGVyYXRvcicpXG4gICwgQXJyYXlQcm90byA9IEFycmF5LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpdCAhPT0gdW5kZWZpbmVkICYmIChJdGVyYXRvcnMuQXJyYXkgPT09IGl0IHx8IEFycmF5UHJvdG9bSVRFUkFUT1JdID09PSBpdCk7XG59OyIsIi8vIDcuMi4yIElzQXJyYXkoYXJndW1lbnQpXG52YXIgY29mID0gcmVxdWlyZSgnLi8kLmNvZicpO1xubW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uKGFyZyl7XG4gIHJldHVybiBjb2YoYXJnKSA9PSAnQXJyYXknO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PT0gJ29iamVjdCcgPyBpdCAhPT0gbnVsbCA6IHR5cGVvZiBpdCA9PT0gJ2Z1bmN0aW9uJztcbn07IiwiLy8gY2FsbCBzb21ldGhpbmcgb24gaXRlcmF0b3Igc3RlcCB3aXRoIHNhZmUgY2xvc2luZyBvbiBlcnJvclxudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi8kLmFuLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdGVyYXRvciwgZm4sIHZhbHVlLCBlbnRyaWVzKXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZW50cmllcyA/IGZuKGFuT2JqZWN0KHZhbHVlKVswXSwgdmFsdWVbMV0pIDogZm4odmFsdWUpO1xuICAvLyA3LjQuNiBJdGVyYXRvckNsb3NlKGl0ZXJhdG9yLCBjb21wbGV0aW9uKVxuICB9IGNhdGNoKGUpe1xuICAgIHZhciByZXQgPSBpdGVyYXRvclsncmV0dXJuJ107XG4gICAgaWYocmV0ICE9PSB1bmRlZmluZWQpYW5PYmplY3QocmV0LmNhbGwoaXRlcmF0b3IpKTtcbiAgICB0aHJvdyBlO1xuICB9XG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciAkICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgZGVzY3JpcHRvciAgICAgPSByZXF1aXJlKCcuLyQucHJvcGVydHktZGVzYycpXG4gICwgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuLyQuc2V0LXRvLXN0cmluZy10YWcnKVxuICAsIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG5cbi8vIDI1LjEuMi4xLjEgJUl0ZXJhdG9yUHJvdG90eXBlJVtAQGl0ZXJhdG9yXSgpXG5yZXF1aXJlKCcuLyQuaGlkZScpKEl0ZXJhdG9yUHJvdG90eXBlLCByZXF1aXJlKCcuLyQud2tzJykoJ2l0ZXJhdG9yJyksIGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzOyB9KTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCl7XG4gIENvbnN0cnVjdG9yLnByb3RvdHlwZSA9ICQuY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlLCB7bmV4dDogZGVzY3JpcHRvcigxLCBuZXh0KX0pO1xuICBzZXRUb1N0cmluZ1RhZyhDb25zdHJ1Y3RvciwgTkFNRSArICcgSXRlcmF0b3InKTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xudmFyIExJQlJBUlkgICAgICAgID0gcmVxdWlyZSgnLi8kLmxpYnJhcnknKVxuICAsICRleHBvcnQgICAgICAgID0gcmVxdWlyZSgnLi8kLmV4cG9ydCcpXG4gICwgcmVkZWZpbmUgICAgICAgPSByZXF1aXJlKCcuLyQucmVkZWZpbmUnKVxuICAsIGhpZGUgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLmhpZGUnKVxuICAsIGhhcyAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLmhhcycpXG4gICwgSXRlcmF0b3JzICAgICAgPSByZXF1aXJlKCcuLyQuaXRlcmF0b3JzJylcbiAgLCAkaXRlckNyZWF0ZSAgICA9IHJlcXVpcmUoJy4vJC5pdGVyLWNyZWF0ZScpXG4gICwgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuLyQuc2V0LXRvLXN0cmluZy10YWcnKVxuICAsIGdldFByb3RvICAgICAgID0gcmVxdWlyZSgnLi8kJykuZ2V0UHJvdG9cbiAgLCBJVEVSQVRPUiAgICAgICA9IHJlcXVpcmUoJy4vJC53a3MnKSgnaXRlcmF0b3InKVxuICAsIEJVR0dZICAgICAgICAgID0gIShbXS5rZXlzICYmICduZXh0JyBpbiBbXS5rZXlzKCkpIC8vIFNhZmFyaSBoYXMgYnVnZ3kgaXRlcmF0b3JzIHcvbyBgbmV4dGBcbiAgLCBGRl9JVEVSQVRPUiAgICA9ICdAQGl0ZXJhdG9yJ1xuICAsIEtFWVMgICAgICAgICAgID0gJ2tleXMnXG4gICwgVkFMVUVTICAgICAgICAgPSAndmFsdWVzJztcblxudmFyIHJldHVyblRoaXMgPSBmdW5jdGlvbigpeyByZXR1cm4gdGhpczsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihCYXNlLCBOQU1FLCBDb25zdHJ1Y3RvciwgbmV4dCwgREVGQVVMVCwgSVNfU0VULCBGT1JDRUQpe1xuICAkaXRlckNyZWF0ZShDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCk7XG4gIHZhciBnZXRNZXRob2QgPSBmdW5jdGlvbihraW5kKXtcbiAgICBpZighQlVHR1kgJiYga2luZCBpbiBwcm90bylyZXR1cm4gcHJvdG9ba2luZF07XG4gICAgc3dpdGNoKGtpbmQpe1xuICAgICAgY2FzZSBLRVlTOiByZXR1cm4gZnVuY3Rpb24ga2V5cygpeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgICAgY2FzZSBWQUxVRVM6IHJldHVybiBmdW5jdGlvbiB2YWx1ZXMoKXsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICB9IHJldHVybiBmdW5jdGlvbiBlbnRyaWVzKCl7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gIH07XG4gIHZhciBUQUcgICAgICAgID0gTkFNRSArICcgSXRlcmF0b3InXG4gICAgLCBERUZfVkFMVUVTID0gREVGQVVMVCA9PSBWQUxVRVNcbiAgICAsIFZBTFVFU19CVUcgPSBmYWxzZVxuICAgICwgcHJvdG8gICAgICA9IEJhc2UucHJvdG90eXBlXG4gICAgLCAkbmF0aXZlICAgID0gcHJvdG9bSVRFUkFUT1JdIHx8IHByb3RvW0ZGX0lURVJBVE9SXSB8fCBERUZBVUxUICYmIHByb3RvW0RFRkFVTFRdXG4gICAgLCAkZGVmYXVsdCAgID0gJG5hdGl2ZSB8fCBnZXRNZXRob2QoREVGQVVMVClcbiAgICAsIG1ldGhvZHMsIGtleTtcbiAgLy8gRml4IG5hdGl2ZVxuICBpZigkbmF0aXZlKXtcbiAgICB2YXIgSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90bygkZGVmYXVsdC5jYWxsKG5ldyBCYXNlKSk7XG4gICAgLy8gU2V0IEBAdG9TdHJpbmdUYWcgdG8gbmF0aXZlIGl0ZXJhdG9yc1xuICAgIHNldFRvU3RyaW5nVGFnKEl0ZXJhdG9yUHJvdG90eXBlLCBUQUcsIHRydWUpO1xuICAgIC8vIEZGIGZpeFxuICAgIGlmKCFMSUJSQVJZICYmIGhhcyhwcm90bywgRkZfSVRFUkFUT1IpKWhpZGUoSXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SLCByZXR1cm5UaGlzKTtcbiAgICAvLyBmaXggQXJyYXkje3ZhbHVlcywgQEBpdGVyYXRvcn0ubmFtZSBpbiBWOCAvIEZGXG4gICAgaWYoREVGX1ZBTFVFUyAmJiAkbmF0aXZlLm5hbWUgIT09IFZBTFVFUyl7XG4gICAgICBWQUxVRVNfQlVHID0gdHJ1ZTtcbiAgICAgICRkZWZhdWx0ID0gZnVuY3Rpb24gdmFsdWVzKCl7IHJldHVybiAkbmF0aXZlLmNhbGwodGhpcyk7IH07XG4gICAgfVxuICB9XG4gIC8vIERlZmluZSBpdGVyYXRvclxuICBpZigoIUxJQlJBUlkgfHwgRk9SQ0VEKSAmJiAoQlVHR1kgfHwgVkFMVUVTX0JVRyB8fCAhcHJvdG9bSVRFUkFUT1JdKSl7XG4gICAgaGlkZShwcm90bywgSVRFUkFUT1IsICRkZWZhdWx0KTtcbiAgfVxuICAvLyBQbHVnIGZvciBsaWJyYXJ5XG4gIEl0ZXJhdG9yc1tOQU1FXSA9ICRkZWZhdWx0O1xuICBJdGVyYXRvcnNbVEFHXSAgPSByZXR1cm5UaGlzO1xuICBpZihERUZBVUxUKXtcbiAgICBtZXRob2RzID0ge1xuICAgICAgdmFsdWVzOiAgREVGX1ZBTFVFUyAgPyAkZGVmYXVsdCA6IGdldE1ldGhvZChWQUxVRVMpLFxuICAgICAga2V5czogICAgSVNfU0VUICAgICAgPyAkZGVmYXVsdCA6IGdldE1ldGhvZChLRVlTKSxcbiAgICAgIGVudHJpZXM6ICFERUZfVkFMVUVTID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoJ2VudHJpZXMnKVxuICAgIH07XG4gICAgaWYoRk9SQ0VEKWZvcihrZXkgaW4gbWV0aG9kcyl7XG4gICAgICBpZighKGtleSBpbiBwcm90bykpcmVkZWZpbmUocHJvdG8sIGtleSwgbWV0aG9kc1trZXldKTtcbiAgICB9IGVsc2UgJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAoQlVHR1kgfHwgVkFMVUVTX0JVRyksIE5BTUUsIG1ldGhvZHMpO1xuICB9XG4gIHJldHVybiBtZXRob2RzO1xufTsiLCJ2YXIgSVRFUkFUT1IgICAgID0gcmVxdWlyZSgnLi8kLndrcycpKCdpdGVyYXRvcicpXG4gICwgU0FGRV9DTE9TSU5HID0gZmFsc2U7XG5cbnRyeSB7XG4gIHZhciByaXRlciA9IFs3XVtJVEVSQVRPUl0oKTtcbiAgcml0ZXJbJ3JldHVybiddID0gZnVuY3Rpb24oKXsgU0FGRV9DTE9TSU5HID0gdHJ1ZTsgfTtcbiAgQXJyYXkuZnJvbShyaXRlciwgZnVuY3Rpb24oKXsgdGhyb3cgMjsgfSk7XG59IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZXhlYywgc2tpcENsb3Npbmcpe1xuICBpZighc2tpcENsb3NpbmcgJiYgIVNBRkVfQ0xPU0lORylyZXR1cm4gZmFsc2U7XG4gIHZhciBzYWZlID0gZmFsc2U7XG4gIHRyeSB7XG4gICAgdmFyIGFyciAgPSBbN11cbiAgICAgICwgaXRlciA9IGFycltJVEVSQVRPUl0oKTtcbiAgICBpdGVyLm5leHQgPSBmdW5jdGlvbigpeyBzYWZlID0gdHJ1ZTsgfTtcbiAgICBhcnJbSVRFUkFUT1JdID0gZnVuY3Rpb24oKXsgcmV0dXJuIGl0ZXI7IH07XG4gICAgZXhlYyhhcnIpO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG4gIHJldHVybiBzYWZlO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGRvbmUsIHZhbHVlKXtcbiAgcmV0dXJuIHt2YWx1ZTogdmFsdWUsIGRvbmU6ICEhZG9uZX07XG59OyIsIm1vZHVsZS5leHBvcnRzID0ge307IiwidmFyICRPYmplY3QgPSBPYmplY3Q7XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY3JlYXRlOiAgICAgJE9iamVjdC5jcmVhdGUsXG4gIGdldFByb3RvOiAgICRPYmplY3QuZ2V0UHJvdG90eXBlT2YsXG4gIGlzRW51bTogICAgIHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlLFxuICBnZXREZXNjOiAgICAkT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcixcbiAgc2V0RGVzYzogICAgJE9iamVjdC5kZWZpbmVQcm9wZXJ0eSxcbiAgc2V0RGVzY3M6ICAgJE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzLFxuICBnZXRLZXlzOiAgICAkT2JqZWN0LmtleXMsXG4gIGdldE5hbWVzOiAgICRPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyxcbiAgZ2V0U3ltYm9sczogJE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMsXG4gIGVhY2g6ICAgICAgIFtdLmZvckVhY2hcbn07IiwidmFyICQgICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi8kLnRvLWlvYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqZWN0LCBlbCl7XG4gIHZhciBPICAgICAgPSB0b0lPYmplY3Qob2JqZWN0KVxuICAgICwga2V5cyAgID0gJC5nZXRLZXlzKE8pXG4gICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICwgaW5kZXggID0gMFxuICAgICwga2V5O1xuICB3aGlsZShsZW5ndGggPiBpbmRleClpZihPW2tleSA9IGtleXNbaW5kZXgrK11dID09PSBlbClyZXR1cm4ga2V5O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IHRydWU7IiwidmFyIGdsb2JhbCAgICA9IHJlcXVpcmUoJy4vJC5nbG9iYWwnKVxuICAsIG1hY3JvdGFzayA9IHJlcXVpcmUoJy4vJC50YXNrJykuc2V0XG4gICwgT2JzZXJ2ZXIgID0gZ2xvYmFsLk11dGF0aW9uT2JzZXJ2ZXIgfHwgZ2xvYmFsLldlYktpdE11dGF0aW9uT2JzZXJ2ZXJcbiAgLCBwcm9jZXNzICAgPSBnbG9iYWwucHJvY2Vzc1xuICAsIFByb21pc2UgICA9IGdsb2JhbC5Qcm9taXNlXG4gICwgaXNOb2RlICAgID0gcmVxdWlyZSgnLi8kLmNvZicpKHByb2Nlc3MpID09ICdwcm9jZXNzJ1xuICAsIGhlYWQsIGxhc3QsIG5vdGlmeTtcblxudmFyIGZsdXNoID0gZnVuY3Rpb24oKXtcbiAgdmFyIHBhcmVudCwgZG9tYWluLCBmbjtcbiAgaWYoaXNOb2RlICYmIChwYXJlbnQgPSBwcm9jZXNzLmRvbWFpbikpe1xuICAgIHByb2Nlc3MuZG9tYWluID0gbnVsbDtcbiAgICBwYXJlbnQuZXhpdCgpO1xuICB9XG4gIHdoaWxlKGhlYWQpe1xuICAgIGRvbWFpbiA9IGhlYWQuZG9tYWluO1xuICAgIGZuICAgICA9IGhlYWQuZm47XG4gICAgaWYoZG9tYWluKWRvbWFpbi5lbnRlcigpO1xuICAgIGZuKCk7IC8vIDwtIGN1cnJlbnRseSB3ZSB1c2UgaXQgb25seSBmb3IgUHJvbWlzZSAtIHRyeSAvIGNhdGNoIG5vdCByZXF1aXJlZFxuICAgIGlmKGRvbWFpbilkb21haW4uZXhpdCgpO1xuICAgIGhlYWQgPSBoZWFkLm5leHQ7XG4gIH0gbGFzdCA9IHVuZGVmaW5lZDtcbiAgaWYocGFyZW50KXBhcmVudC5lbnRlcigpO1xufTtcblxuLy8gTm9kZS5qc1xuaWYoaXNOb2RlKXtcbiAgbm90aWZ5ID0gZnVuY3Rpb24oKXtcbiAgICBwcm9jZXNzLm5leHRUaWNrKGZsdXNoKTtcbiAgfTtcbi8vIGJyb3dzZXJzIHdpdGggTXV0YXRpb25PYnNlcnZlclxufSBlbHNlIGlmKE9ic2VydmVyKXtcbiAgdmFyIHRvZ2dsZSA9IDFcbiAgICAsIG5vZGUgICA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKTtcbiAgbmV3IE9ic2VydmVyKGZsdXNoKS5vYnNlcnZlKG5vZGUsIHtjaGFyYWN0ZXJEYXRhOiB0cnVlfSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3XG4gIG5vdGlmeSA9IGZ1bmN0aW9uKCl7XG4gICAgbm9kZS5kYXRhID0gdG9nZ2xlID0gLXRvZ2dsZTtcbiAgfTtcbi8vIGVudmlyb25tZW50cyB3aXRoIG1heWJlIG5vbi1jb21wbGV0ZWx5IGNvcnJlY3QsIGJ1dCBleGlzdGVudCBQcm9taXNlXG59IGVsc2UgaWYoUHJvbWlzZSAmJiBQcm9taXNlLnJlc29sdmUpe1xuICBub3RpZnkgPSBmdW5jdGlvbigpe1xuICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oZmx1c2gpO1xuICB9O1xuLy8gZm9yIG90aGVyIGVudmlyb25tZW50cyAtIG1hY3JvdGFzayBiYXNlZCBvbjpcbi8vIC0gc2V0SW1tZWRpYXRlXG4vLyAtIE1lc3NhZ2VDaGFubmVsXG4vLyAtIHdpbmRvdy5wb3N0TWVzc2FnXG4vLyAtIG9ucmVhZHlzdGF0ZWNoYW5nZVxuLy8gLSBzZXRUaW1lb3V0XG59IGVsc2Uge1xuICBub3RpZnkgPSBmdW5jdGlvbigpe1xuICAgIC8vIHN0cmFuZ2UgSUUgKyB3ZWJwYWNrIGRldiBzZXJ2ZXIgYnVnIC0gdXNlIC5jYWxsKGdsb2JhbClcbiAgICBtYWNyb3Rhc2suY2FsbChnbG9iYWwsIGZsdXNoKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhc2FwKGZuKXtcbiAgdmFyIHRhc2sgPSB7Zm46IGZuLCBuZXh0OiB1bmRlZmluZWQsIGRvbWFpbjogaXNOb2RlICYmIHByb2Nlc3MuZG9tYWlufTtcbiAgaWYobGFzdClsYXN0Lm5leHQgPSB0YXNrO1xuICBpZighaGVhZCl7XG4gICAgaGVhZCA9IHRhc2s7XG4gICAgbm90aWZ5KCk7XG4gIH0gbGFzdCA9IHRhc2s7XG59OyIsIi8vIDE5LjEuMi4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UsIC4uLilcbnZhciAkICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgdG9PYmplY3QgPSByZXF1aXJlKCcuLyQudG8tb2JqZWN0JylcbiAgLCBJT2JqZWN0ICA9IHJlcXVpcmUoJy4vJC5pb2JqZWN0Jyk7XG5cbi8vIHNob3VsZCB3b3JrIHdpdGggc3ltYm9scyBhbmQgc2hvdWxkIGhhdmUgZGV0ZXJtaW5pc3RpYyBwcm9wZXJ0eSBvcmRlciAoVjggYnVnKVxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLyQuZmFpbHMnKShmdW5jdGlvbigpe1xuICB2YXIgYSA9IE9iamVjdC5hc3NpZ25cbiAgICAsIEEgPSB7fVxuICAgICwgQiA9IHt9XG4gICAgLCBTID0gU3ltYm9sKClcbiAgICAsIEsgPSAnYWJjZGVmZ2hpamtsbW5vcHFyc3QnO1xuICBBW1NdID0gNztcbiAgSy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbihrKXsgQltrXSA9IGs7IH0pO1xuICByZXR1cm4gYSh7fSwgQSlbU10gIT0gNyB8fCBPYmplY3Qua2V5cyhhKHt9LCBCKSkuam9pbignJykgIT0gSztcbn0pID8gZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlKXsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICB2YXIgVCAgICAgPSB0b09iamVjdCh0YXJnZXQpXG4gICAgLCAkJCAgICA9IGFyZ3VtZW50c1xuICAgICwgJCRsZW4gPSAkJC5sZW5ndGhcbiAgICAsIGluZGV4ID0gMVxuICAgICwgZ2V0S2V5cyAgICA9ICQuZ2V0S2V5c1xuICAgICwgZ2V0U3ltYm9scyA9ICQuZ2V0U3ltYm9sc1xuICAgICwgaXNFbnVtICAgICA9ICQuaXNFbnVtO1xuICB3aGlsZSgkJGxlbiA+IGluZGV4KXtcbiAgICB2YXIgUyAgICAgID0gSU9iamVjdCgkJFtpbmRleCsrXSlcbiAgICAgICwga2V5cyAgID0gZ2V0U3ltYm9scyA/IGdldEtleXMoUykuY29uY2F0KGdldFN5bWJvbHMoUykpIDogZ2V0S2V5cyhTKVxuICAgICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICAgLCBqICAgICAgPSAwXG4gICAgICAsIGtleTtcbiAgICB3aGlsZShsZW5ndGggPiBqKWlmKGlzRW51bS5jYWxsKFMsIGtleSA9IGtleXNbaisrXSkpVFtrZXldID0gU1trZXldO1xuICB9XG4gIHJldHVybiBUO1xufSA6IE9iamVjdC5hc3NpZ247IiwiLy8gbW9zdCBPYmplY3QgbWV0aG9kcyBieSBFUzYgc2hvdWxkIGFjY2VwdCBwcmltaXRpdmVzXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vJC5leHBvcnQnKVxuICAsIGNvcmUgICAgPSByZXF1aXJlKCcuLyQuY29yZScpXG4gICwgZmFpbHMgICA9IHJlcXVpcmUoJy4vJC5mYWlscycpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihLRVksIGV4ZWMpe1xuICB2YXIgZm4gID0gKGNvcmUuT2JqZWN0IHx8IHt9KVtLRVldIHx8IE9iamVjdFtLRVldXG4gICAgLCBleHAgPSB7fTtcbiAgZXhwW0tFWV0gPSBleGVjKGZuKTtcbiAgJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiBmYWlscyhmdW5jdGlvbigpeyBmbigxKTsgfSksICdPYmplY3QnLCBleHApO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGJpdG1hcCwgdmFsdWUpe1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGUgIDogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGUgICAgOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlICAgICAgIDogdmFsdWVcbiAgfTtcbn07IiwidmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi8kLnJlZGVmaW5lJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHRhcmdldCwgc3JjKXtcbiAgZm9yKHZhciBrZXkgaW4gc3JjKXJlZGVmaW5lKHRhcmdldCwga2V5LCBzcmNba2V5XSk7XG4gIHJldHVybiB0YXJnZXQ7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi8kLmhpZGUnKTsiLCIvLyA3LjIuOSBTYW1lVmFsdWUoeCwgeSlcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmlzIHx8IGZ1bmN0aW9uIGlzKHgsIHkpe1xuICByZXR1cm4geCA9PT0geSA/IHggIT09IDAgfHwgMSAvIHggPT09IDEgLyB5IDogeCAhPSB4ICYmIHkgIT0geTtcbn07IiwiLy8gV29ya3Mgd2l0aCBfX3Byb3RvX18gb25seS4gT2xkIHY4IGNhbid0IHdvcmsgd2l0aCBudWxsIHByb3RvIG9iamVjdHMuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wcm90byAqL1xudmFyIGdldERlc2MgID0gcmVxdWlyZSgnLi8kJykuZ2V0RGVzY1xuICAsIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi8kLmlzLW9iamVjdCcpXG4gICwgYW5PYmplY3QgPSByZXF1aXJlKCcuLyQuYW4tb2JqZWN0Jyk7XG52YXIgY2hlY2sgPSBmdW5jdGlvbihPLCBwcm90byl7XG4gIGFuT2JqZWN0KE8pO1xuICBpZighaXNPYmplY3QocHJvdG8pICYmIHByb3RvICE9PSBudWxsKXRocm93IFR5cGVFcnJvcihwcm90byArIFwiOiBjYW4ndCBzZXQgYXMgcHJvdG90eXBlIVwiKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2V0OiBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgKCdfX3Byb3RvX18nIGluIHt9ID8gLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIGZ1bmN0aW9uKHRlc3QsIGJ1Z2d5LCBzZXQpe1xuICAgICAgdHJ5IHtcbiAgICAgICAgc2V0ID0gcmVxdWlyZSgnLi8kLmN0eCcpKEZ1bmN0aW9uLmNhbGwsIGdldERlc2MoT2JqZWN0LnByb3RvdHlwZSwgJ19fcHJvdG9fXycpLnNldCwgMik7XG4gICAgICAgIHNldCh0ZXN0LCBbXSk7XG4gICAgICAgIGJ1Z2d5ID0gISh0ZXN0IGluc3RhbmNlb2YgQXJyYXkpO1xuICAgICAgfSBjYXRjaChlKXsgYnVnZ3kgPSB0cnVlOyB9XG4gICAgICByZXR1cm4gZnVuY3Rpb24gc2V0UHJvdG90eXBlT2YoTywgcHJvdG8pe1xuICAgICAgICBjaGVjayhPLCBwcm90byk7XG4gICAgICAgIGlmKGJ1Z2d5KU8uX19wcm90b19fID0gcHJvdG87XG4gICAgICAgIGVsc2Ugc2V0KE8sIHByb3RvKTtcbiAgICAgICAgcmV0dXJuIE87XG4gICAgICB9O1xuICAgIH0oe30sIGZhbHNlKSA6IHVuZGVmaW5lZCksXG4gIGNoZWNrOiBjaGVja1xufTsiLCIndXNlIHN0cmljdCc7XG52YXIgY29yZSAgICAgICAgPSByZXF1aXJlKCcuLyQuY29yZScpXG4gICwgJCAgICAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi8kLmRlc2NyaXB0b3JzJylcbiAgLCBTUEVDSUVTICAgICA9IHJlcXVpcmUoJy4vJC53a3MnKSgnc3BlY2llcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEtFWSl7XG4gIHZhciBDID0gY29yZVtLRVldO1xuICBpZihERVNDUklQVE9SUyAmJiBDICYmICFDW1NQRUNJRVNdKSQuc2V0RGVzYyhDLCBTUEVDSUVTLCB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXM7IH1cbiAgfSk7XG59OyIsInZhciBkZWYgPSByZXF1aXJlKCcuLyQnKS5zZXREZXNjXG4gICwgaGFzID0gcmVxdWlyZSgnLi8kLmhhcycpXG4gICwgVEFHID0gcmVxdWlyZSgnLi8kLndrcycpKCd0b1N0cmluZ1RhZycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCB0YWcsIHN0YXQpe1xuICBpZihpdCAmJiAhaGFzKGl0ID0gc3RhdCA/IGl0IDogaXQucHJvdG90eXBlLCBUQUcpKWRlZihpdCwgVEFHLCB7Y29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogdGFnfSk7XG59OyIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLyQuZ2xvYmFsJylcbiAgLCBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJ1xuICAsIHN0b3JlICA9IGdsb2JhbFtTSEFSRURdIHx8IChnbG9iYWxbU0hBUkVEXSA9IHt9KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB7fSk7XG59OyIsIi8vIDcuMy4yMCBTcGVjaWVzQ29uc3RydWN0b3IoTywgZGVmYXVsdENvbnN0cnVjdG9yKVxudmFyIGFuT2JqZWN0ICA9IHJlcXVpcmUoJy4vJC5hbi1vYmplY3QnKVxuICAsIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vJC5hLWZ1bmN0aW9uJylcbiAgLCBTUEVDSUVTICAgPSByZXF1aXJlKCcuLyQud2tzJykoJ3NwZWNpZXMnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oTywgRCl7XG4gIHZhciBDID0gYW5PYmplY3QoTykuY29uc3RydWN0b3IsIFM7XG4gIHJldHVybiBDID09PSB1bmRlZmluZWQgfHwgKFMgPSBhbk9iamVjdChDKVtTUEVDSUVTXSkgPT0gdW5kZWZpbmVkID8gRCA6IGFGdW5jdGlvbihTKTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgQ29uc3RydWN0b3IsIG5hbWUpe1xuICBpZighKGl0IGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKXRocm93IFR5cGVFcnJvcihuYW1lICsgXCI6IHVzZSB0aGUgJ25ldycgb3BlcmF0b3IhXCIpO1xuICByZXR1cm4gaXQ7XG59OyIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuLyQudG8taW50ZWdlcicpXG4gICwgZGVmaW5lZCAgID0gcmVxdWlyZSgnLi8kLmRlZmluZWQnKTtcbi8vIHRydWUgIC0+IFN0cmluZyNhdFxuLy8gZmFsc2UgLT4gU3RyaW5nI2NvZGVQb2ludEF0XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFRPX1NUUklORyl7XG4gIHJldHVybiBmdW5jdGlvbih0aGF0LCBwb3Mpe1xuICAgIHZhciBzID0gU3RyaW5nKGRlZmluZWQodGhhdCkpXG4gICAgICAsIGkgPSB0b0ludGVnZXIocG9zKVxuICAgICAgLCBsID0gcy5sZW5ndGhcbiAgICAgICwgYSwgYjtcbiAgICBpZihpIDwgMCB8fCBpID49IGwpcmV0dXJuIFRPX1NUUklORyA/ICcnIDogdW5kZWZpbmVkO1xuICAgIGEgPSBzLmNoYXJDb2RlQXQoaSk7XG4gICAgcmV0dXJuIGEgPCAweGQ4MDAgfHwgYSA+IDB4ZGJmZiB8fCBpICsgMSA9PT0gbCB8fCAoYiA9IHMuY2hhckNvZGVBdChpICsgMSkpIDwgMHhkYzAwIHx8IGIgPiAweGRmZmZcbiAgICAgID8gVE9fU1RSSU5HID8gcy5jaGFyQXQoaSkgOiBhXG4gICAgICA6IFRPX1NUUklORyA/IHMuc2xpY2UoaSwgaSArIDIpIDogKGEgLSAweGQ4MDAgPDwgMTApICsgKGIgLSAweGRjMDApICsgMHgxMDAwMDtcbiAgfTtcbn07IiwidmFyIGN0eCAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5jdHgnKVxuICAsIGludm9rZSAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5pbnZva2UnKVxuICAsIGh0bWwgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5odG1sJylcbiAgLCBjZWwgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuZG9tLWNyZWF0ZScpXG4gICwgZ2xvYmFsICAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLmdsb2JhbCcpXG4gICwgcHJvY2VzcyAgICAgICAgICAgID0gZ2xvYmFsLnByb2Nlc3NcbiAgLCBzZXRUYXNrICAgICAgICAgICAgPSBnbG9iYWwuc2V0SW1tZWRpYXRlXG4gICwgY2xlYXJUYXNrICAgICAgICAgID0gZ2xvYmFsLmNsZWFySW1tZWRpYXRlXG4gICwgTWVzc2FnZUNoYW5uZWwgICAgID0gZ2xvYmFsLk1lc3NhZ2VDaGFubmVsXG4gICwgY291bnRlciAgICAgICAgICAgID0gMFxuICAsIHF1ZXVlICAgICAgICAgICAgICA9IHt9XG4gICwgT05SRUFEWVNUQVRFQ0hBTkdFID0gJ29ucmVhZHlzdGF0ZWNoYW5nZSdcbiAgLCBkZWZlciwgY2hhbm5lbCwgcG9ydDtcbnZhciBydW4gPSBmdW5jdGlvbigpe1xuICB2YXIgaWQgPSArdGhpcztcbiAgaWYocXVldWUuaGFzT3duUHJvcGVydHkoaWQpKXtcbiAgICB2YXIgZm4gPSBxdWV1ZVtpZF07XG4gICAgZGVsZXRlIHF1ZXVlW2lkXTtcbiAgICBmbigpO1xuICB9XG59O1xudmFyIGxpc3RuZXIgPSBmdW5jdGlvbihldmVudCl7XG4gIHJ1bi5jYWxsKGV2ZW50LmRhdGEpO1xufTtcbi8vIE5vZGUuanMgMC45KyAmIElFMTArIGhhcyBzZXRJbW1lZGlhdGUsIG90aGVyd2lzZTpcbmlmKCFzZXRUYXNrIHx8ICFjbGVhclRhc2spe1xuICBzZXRUYXNrID0gZnVuY3Rpb24gc2V0SW1tZWRpYXRlKGZuKXtcbiAgICB2YXIgYXJncyA9IFtdLCBpID0gMTtcbiAgICB3aGlsZShhcmd1bWVudHMubGVuZ3RoID4gaSlhcmdzLnB1c2goYXJndW1lbnRzW2krK10pO1xuICAgIHF1ZXVlWysrY291bnRlcl0gPSBmdW5jdGlvbigpe1xuICAgICAgaW52b2tlKHR5cGVvZiBmbiA9PSAnZnVuY3Rpb24nID8gZm4gOiBGdW5jdGlvbihmbiksIGFyZ3MpO1xuICAgIH07XG4gICAgZGVmZXIoY291bnRlcik7XG4gICAgcmV0dXJuIGNvdW50ZXI7XG4gIH07XG4gIGNsZWFyVGFzayA9IGZ1bmN0aW9uIGNsZWFySW1tZWRpYXRlKGlkKXtcbiAgICBkZWxldGUgcXVldWVbaWRdO1xuICB9O1xuICAvLyBOb2RlLmpzIDAuOC1cbiAgaWYocmVxdWlyZSgnLi8kLmNvZicpKHByb2Nlc3MpID09ICdwcm9jZXNzJyl7XG4gICAgZGVmZXIgPSBmdW5jdGlvbihpZCl7XG4gICAgICBwcm9jZXNzLm5leHRUaWNrKGN0eChydW4sIGlkLCAxKSk7XG4gICAgfTtcbiAgLy8gQnJvd3NlcnMgd2l0aCBNZXNzYWdlQ2hhbm5lbCwgaW5jbHVkZXMgV2ViV29ya2Vyc1xuICB9IGVsc2UgaWYoTWVzc2FnZUNoYW5uZWwpe1xuICAgIGNoYW5uZWwgPSBuZXcgTWVzc2FnZUNoYW5uZWw7XG4gICAgcG9ydCAgICA9IGNoYW5uZWwucG9ydDI7XG4gICAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBsaXN0bmVyO1xuICAgIGRlZmVyID0gY3R4KHBvcnQucG9zdE1lc3NhZ2UsIHBvcnQsIDEpO1xuICAvLyBCcm93c2VycyB3aXRoIHBvc3RNZXNzYWdlLCBza2lwIFdlYldvcmtlcnNcbiAgLy8gSUU4IGhhcyBwb3N0TWVzc2FnZSwgYnV0IGl0J3Mgc3luYyAmIHR5cGVvZiBpdHMgcG9zdE1lc3NhZ2UgaXMgJ29iamVjdCdcbiAgfSBlbHNlIGlmKGdsb2JhbC5hZGRFdmVudExpc3RlbmVyICYmIHR5cGVvZiBwb3N0TWVzc2FnZSA9PSAnZnVuY3Rpb24nICYmICFnbG9iYWwuaW1wb3J0U2NyaXB0cyl7XG4gICAgZGVmZXIgPSBmdW5jdGlvbihpZCl7XG4gICAgICBnbG9iYWwucG9zdE1lc3NhZ2UoaWQgKyAnJywgJyonKTtcbiAgICB9O1xuICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgbGlzdG5lciwgZmFsc2UpO1xuICAvLyBJRTgtXG4gIH0gZWxzZSBpZihPTlJFQURZU1RBVEVDSEFOR0UgaW4gY2VsKCdzY3JpcHQnKSl7XG4gICAgZGVmZXIgPSBmdW5jdGlvbihpZCl7XG4gICAgICBodG1sLmFwcGVuZENoaWxkKGNlbCgnc2NyaXB0JykpW09OUkVBRFlTVEFURUNIQU5HRV0gPSBmdW5jdGlvbigpe1xuICAgICAgICBodG1sLnJlbW92ZUNoaWxkKHRoaXMpO1xuICAgICAgICBydW4uY2FsbChpZCk7XG4gICAgICB9O1xuICAgIH07XG4gIC8vIFJlc3Qgb2xkIGJyb3dzZXJzXG4gIH0gZWxzZSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbihpZCl7XG4gICAgICBzZXRUaW1lb3V0KGN0eChydW4sIGlkLCAxKSwgMCk7XG4gICAgfTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogICBzZXRUYXNrLFxuICBjbGVhcjogY2xlYXJUYXNrXG59OyIsIi8vIDcuMS40IFRvSW50ZWdlclxudmFyIGNlaWwgID0gTWF0aC5jZWlsXG4gICwgZmxvb3IgPSBNYXRoLmZsb29yO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpc05hTihpdCA9ICtpdCkgPyAwIDogKGl0ID4gMCA/IGZsb29yIDogY2VpbCkoaXQpO1xufTsiLCIvLyB0byBpbmRleGVkIG9iamVjdCwgdG9PYmplY3Qgd2l0aCBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi8kLmlvYmplY3QnKVxuICAsIGRlZmluZWQgPSByZXF1aXJlKCcuLyQuZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBJT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07IiwiLy8gNy4xLjE1IFRvTGVuZ3RoXG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi8kLnRvLWludGVnZXInKVxuICAsIG1pbiAgICAgICA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpdCA+IDAgPyBtaW4odG9JbnRlZ2VyKGl0KSwgMHgxZmZmZmZmZmZmZmZmZikgOiAwOyAvLyBwb3coMiwgNTMpIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxXG59OyIsIi8vIDcuMS4xMyBUb09iamVjdChhcmd1bWVudClcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi8kLmRlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07IiwidmFyIGlkID0gMFxuICAsIHB4ID0gTWF0aC5yYW5kb20oKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcbiAgcmV0dXJuICdTeW1ib2woJy5jb25jYXQoa2V5ID09PSB1bmRlZmluZWQgPyAnJyA6IGtleSwgJylfJywgKCsraWQgKyBweCkudG9TdHJpbmcoMzYpKTtcbn07IiwidmFyIHN0b3JlICA9IHJlcXVpcmUoJy4vJC5zaGFyZWQnKSgnd2tzJylcbiAgLCB1aWQgICAgPSByZXF1aXJlKCcuLyQudWlkJylcbiAgLCBTeW1ib2wgPSByZXF1aXJlKCcuLyQuZ2xvYmFsJykuU3ltYm9sO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihuYW1lKXtcbiAgcmV0dXJuIHN0b3JlW25hbWVdIHx8IChzdG9yZVtuYW1lXSA9XG4gICAgU3ltYm9sICYmIFN5bWJvbFtuYW1lXSB8fCAoU3ltYm9sIHx8IHVpZCkoJ1N5bWJvbC4nICsgbmFtZSkpO1xufTsiLCJ2YXIgY2xhc3NvZiAgID0gcmVxdWlyZSgnLi8kLmNsYXNzb2YnKVxuICAsIElURVJBVE9SICA9IHJlcXVpcmUoJy4vJC53a3MnKSgnaXRlcmF0b3InKVxuICAsIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vJC5pdGVyYXRvcnMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi8kLmNvcmUnKS5nZXRJdGVyYXRvck1ldGhvZCA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoaXQgIT0gdW5kZWZpbmVkKXJldHVybiBpdFtJVEVSQVRPUl1cbiAgICB8fCBpdFsnQEBpdGVyYXRvciddXG4gICAgfHwgSXRlcmF0b3JzW2NsYXNzb2YoaXQpXTtcbn07IiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi8kLmFuLW9iamVjdCcpXG4gICwgZ2V0ICAgICAgPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLyQuY29yZScpLmdldEl0ZXJhdG9yID0gZnVuY3Rpb24oaXQpe1xuICB2YXIgaXRlckZuID0gZ2V0KGl0KTtcbiAgaWYodHlwZW9mIGl0ZXJGbiAhPSAnZnVuY3Rpb24nKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGl0ZXJhYmxlIScpO1xuICByZXR1cm4gYW5PYmplY3QoaXRlckZuLmNhbGwoaXQpKTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFkZFRvVW5zY29wYWJsZXMgPSByZXF1aXJlKCcuLyQuYWRkLXRvLXVuc2NvcGFibGVzJylcbiAgLCBzdGVwICAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLml0ZXItc3RlcCcpXG4gICwgSXRlcmF0b3JzICAgICAgICA9IHJlcXVpcmUoJy4vJC5pdGVyYXRvcnMnKVxuICAsIHRvSU9iamVjdCAgICAgICAgPSByZXF1aXJlKCcuLyQudG8taW9iamVjdCcpO1xuXG4vLyAyMi4xLjMuNCBBcnJheS5wcm90b3R5cGUuZW50cmllcygpXG4vLyAyMi4xLjMuMTMgQXJyYXkucHJvdG90eXBlLmtleXMoKVxuLy8gMjIuMS4zLjI5IEFycmF5LnByb3RvdHlwZS52YWx1ZXMoKVxuLy8gMjIuMS4zLjMwIEFycmF5LnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vJC5pdGVyLWRlZmluZScpKEFycmF5LCAnQXJyYXknLCBmdW5jdGlvbihpdGVyYXRlZCwga2luZCl7XG4gIHRoaXMuX3QgPSB0b0lPYmplY3QoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbiAgdGhpcy5fayA9IGtpbmQ7ICAgICAgICAgICAgICAgIC8vIGtpbmRcbi8vIDIyLjEuNS4yLjEgJUFycmF5SXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxufSwgZnVuY3Rpb24oKXtcbiAgdmFyIE8gICAgID0gdGhpcy5fdFxuICAgICwga2luZCAgPSB0aGlzLl9rXG4gICAgLCBpbmRleCA9IHRoaXMuX2krKztcbiAgaWYoIU8gfHwgaW5kZXggPj0gTy5sZW5ndGgpe1xuICAgIHRoaXMuX3QgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHN0ZXAoMSk7XG4gIH1cbiAgaWYoa2luZCA9PSAna2V5cycgIClyZXR1cm4gc3RlcCgwLCBpbmRleCk7XG4gIGlmKGtpbmQgPT0gJ3ZhbHVlcycpcmV0dXJuIHN0ZXAoMCwgT1tpbmRleF0pO1xuICByZXR1cm4gc3RlcCgwLCBbaW5kZXgsIE9baW5kZXhdXSk7XG59LCAndmFsdWVzJyk7XG5cbi8vIGFyZ3VtZW50c0xpc3RbQEBpdGVyYXRvcl0gaXMgJUFycmF5UHJvdG9fdmFsdWVzJSAoOS40LjQuNiwgOS40LjQuNylcbkl0ZXJhdG9ycy5Bcmd1bWVudHMgPSBJdGVyYXRvcnMuQXJyYXk7XG5cbmFkZFRvVW5zY29wYWJsZXMoJ2tleXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ3ZhbHVlcycpO1xuYWRkVG9VbnNjb3BhYmxlcygnZW50cmllcycpOyIsIi8vIDE5LjEuMy4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vJC5leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYsICdPYmplY3QnLCB7YXNzaWduOiByZXF1aXJlKCcuLyQub2JqZWN0LWFzc2lnbicpfSk7IiwiLy8gMTkuMS4yLjE0IE9iamVjdC5rZXlzKE8pXG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLyQudG8tb2JqZWN0Jyk7XG5cbnJlcXVpcmUoJy4vJC5vYmplY3Qtc2FwJykoJ2tleXMnLCBmdW5jdGlvbigka2V5cyl7XG4gIHJldHVybiBmdW5jdGlvbiBrZXlzKGl0KXtcbiAgICByZXR1cm4gJGtleXModG9PYmplY3QoaXQpKTtcbiAgfTtcbn0pOyIsIi8vIDE5LjEuMy4xOSBPYmplY3Quc2V0UHJvdG90eXBlT2YoTywgcHJvdG8pXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vJC5leHBvcnQnKTtcbiRleHBvcnQoJGV4cG9ydC5TLCAnT2JqZWN0Jywge3NldFByb3RvdHlwZU9mOiByZXF1aXJlKCcuLyQuc2V0LXByb3RvJykuc2V0fSk7IixudWxsLCIndXNlIHN0cmljdCc7XG52YXIgJCAgICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgTElCUkFSWSAgICA9IHJlcXVpcmUoJy4vJC5saWJyYXJ5JylcbiAgLCBnbG9iYWwgICAgID0gcmVxdWlyZSgnLi8kLmdsb2JhbCcpXG4gICwgY3R4ICAgICAgICA9IHJlcXVpcmUoJy4vJC5jdHgnKVxuICAsIGNsYXNzb2YgICAgPSByZXF1aXJlKCcuLyQuY2xhc3NvZicpXG4gICwgJGV4cG9ydCAgICA9IHJlcXVpcmUoJy4vJC5leHBvcnQnKVxuICAsIGlzT2JqZWN0ICAgPSByZXF1aXJlKCcuLyQuaXMtb2JqZWN0JylcbiAgLCBhbk9iamVjdCAgID0gcmVxdWlyZSgnLi8kLmFuLW9iamVjdCcpXG4gICwgYUZ1bmN0aW9uICA9IHJlcXVpcmUoJy4vJC5hLWZ1bmN0aW9uJylcbiAgLCBzdHJpY3ROZXcgID0gcmVxdWlyZSgnLi8kLnN0cmljdC1uZXcnKVxuICAsIGZvck9mICAgICAgPSByZXF1aXJlKCcuLyQuZm9yLW9mJylcbiAgLCBzZXRQcm90byAgID0gcmVxdWlyZSgnLi8kLnNldC1wcm90bycpLnNldFxuICAsIHNhbWUgICAgICAgPSByZXF1aXJlKCcuLyQuc2FtZS12YWx1ZScpXG4gICwgU1BFQ0lFUyAgICA9IHJlcXVpcmUoJy4vJC53a3MnKSgnc3BlY2llcycpXG4gICwgc3BlY2llc0NvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi8kLnNwZWNpZXMtY29uc3RydWN0b3InKVxuICAsIGFzYXAgICAgICAgPSByZXF1aXJlKCcuLyQubWljcm90YXNrJylcbiAgLCBQUk9NSVNFICAgID0gJ1Byb21pc2UnXG4gICwgcHJvY2VzcyAgICA9IGdsb2JhbC5wcm9jZXNzXG4gICwgaXNOb2RlICAgICA9IGNsYXNzb2YocHJvY2VzcykgPT0gJ3Byb2Nlc3MnXG4gICwgUCAgICAgICAgICA9IGdsb2JhbFtQUk9NSVNFXVxuICAsIFdyYXBwZXI7XG5cbnZhciB0ZXN0UmVzb2x2ZSA9IGZ1bmN0aW9uKHN1Yil7XG4gIHZhciB0ZXN0ID0gbmV3IFAoZnVuY3Rpb24oKXt9KTtcbiAgaWYoc3ViKXRlc3QuY29uc3RydWN0b3IgPSBPYmplY3Q7XG4gIHJldHVybiBQLnJlc29sdmUodGVzdCkgPT09IHRlc3Q7XG59O1xuXG52YXIgVVNFX05BVElWRSA9IGZ1bmN0aW9uKCl7XG4gIHZhciB3b3JrcyA9IGZhbHNlO1xuICBmdW5jdGlvbiBQMih4KXtcbiAgICB2YXIgc2VsZiA9IG5ldyBQKHgpO1xuICAgIHNldFByb3RvKHNlbGYsIFAyLnByb3RvdHlwZSk7XG4gICAgcmV0dXJuIHNlbGY7XG4gIH1cbiAgdHJ5IHtcbiAgICB3b3JrcyA9IFAgJiYgUC5yZXNvbHZlICYmIHRlc3RSZXNvbHZlKCk7XG4gICAgc2V0UHJvdG8oUDIsIFApO1xuICAgIFAyLnByb3RvdHlwZSA9ICQuY3JlYXRlKFAucHJvdG90eXBlLCB7Y29uc3RydWN0b3I6IHt2YWx1ZTogUDJ9fSk7XG4gICAgLy8gYWN0dWFsIEZpcmVmb3ggaGFzIGJyb2tlbiBzdWJjbGFzcyBzdXBwb3J0LCB0ZXN0IHRoYXRcbiAgICBpZighKFAyLnJlc29sdmUoNSkudGhlbihmdW5jdGlvbigpe30pIGluc3RhbmNlb2YgUDIpKXtcbiAgICAgIHdvcmtzID0gZmFsc2U7XG4gICAgfVxuICAgIC8vIGFjdHVhbCBWOCBidWcsIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD00MTYyXG4gICAgaWYod29ya3MgJiYgcmVxdWlyZSgnLi8kLmRlc2NyaXB0b3JzJykpe1xuICAgICAgdmFyIHRoZW5hYmxlVGhlbkdvdHRlbiA9IGZhbHNlO1xuICAgICAgUC5yZXNvbHZlKCQuc2V0RGVzYyh7fSwgJ3RoZW4nLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24oKXsgdGhlbmFibGVUaGVuR290dGVuID0gdHJ1ZTsgfVxuICAgICAgfSkpO1xuICAgICAgd29ya3MgPSB0aGVuYWJsZVRoZW5Hb3R0ZW47XG4gICAgfVxuICB9IGNhdGNoKGUpeyB3b3JrcyA9IGZhbHNlOyB9XG4gIHJldHVybiB3b3Jrcztcbn0oKTtcblxuLy8gaGVscGVyc1xudmFyIHNhbWVDb25zdHJ1Y3RvciA9IGZ1bmN0aW9uKGEsIGIpe1xuICAvLyBsaWJyYXJ5IHdyYXBwZXIgc3BlY2lhbCBjYXNlXG4gIGlmKExJQlJBUlkgJiYgYSA9PT0gUCAmJiBiID09PSBXcmFwcGVyKXJldHVybiB0cnVlO1xuICByZXR1cm4gc2FtZShhLCBiKTtcbn07XG52YXIgZ2V0Q29uc3RydWN0b3IgPSBmdW5jdGlvbihDKXtcbiAgdmFyIFMgPSBhbk9iamVjdChDKVtTUEVDSUVTXTtcbiAgcmV0dXJuIFMgIT0gdW5kZWZpbmVkID8gUyA6IEM7XG59O1xudmFyIGlzVGhlbmFibGUgPSBmdW5jdGlvbihpdCl7XG4gIHZhciB0aGVuO1xuICByZXR1cm4gaXNPYmplY3QoaXQpICYmIHR5cGVvZiAodGhlbiA9IGl0LnRoZW4pID09ICdmdW5jdGlvbicgPyB0aGVuIDogZmFsc2U7XG59O1xudmFyIFByb21pc2VDYXBhYmlsaXR5ID0gZnVuY3Rpb24oQyl7XG4gIHZhciByZXNvbHZlLCByZWplY3Q7XG4gIHRoaXMucHJvbWlzZSA9IG5ldyBDKGZ1bmN0aW9uKCQkcmVzb2x2ZSwgJCRyZWplY3Qpe1xuICAgIGlmKHJlc29sdmUgIT09IHVuZGVmaW5lZCB8fCByZWplY3QgIT09IHVuZGVmaW5lZCl0aHJvdyBUeXBlRXJyb3IoJ0JhZCBQcm9taXNlIGNvbnN0cnVjdG9yJyk7XG4gICAgcmVzb2x2ZSA9ICQkcmVzb2x2ZTtcbiAgICByZWplY3QgID0gJCRyZWplY3Q7XG4gIH0pO1xuICB0aGlzLnJlc29sdmUgPSBhRnVuY3Rpb24ocmVzb2x2ZSksXG4gIHRoaXMucmVqZWN0ICA9IGFGdW5jdGlvbihyZWplY3QpXG59O1xudmFyIHBlcmZvcm0gPSBmdW5jdGlvbihleGVjKXtcbiAgdHJ5IHtcbiAgICBleGVjKCk7XG4gIH0gY2F0Y2goZSl7XG4gICAgcmV0dXJuIHtlcnJvcjogZX07XG4gIH1cbn07XG52YXIgbm90aWZ5ID0gZnVuY3Rpb24ocmVjb3JkLCBpc1JlamVjdCl7XG4gIGlmKHJlY29yZC5uKXJldHVybjtcbiAgcmVjb3JkLm4gPSB0cnVlO1xuICB2YXIgY2hhaW4gPSByZWNvcmQuYztcbiAgYXNhcChmdW5jdGlvbigpe1xuICAgIHZhciB2YWx1ZSA9IHJlY29yZC52XG4gICAgICAsIG9rICAgID0gcmVjb3JkLnMgPT0gMVxuICAgICAgLCBpICAgICA9IDA7XG4gICAgdmFyIHJ1biA9IGZ1bmN0aW9uKHJlYWN0aW9uKXtcbiAgICAgIHZhciBoYW5kbGVyID0gb2sgPyByZWFjdGlvbi5vayA6IHJlYWN0aW9uLmZhaWxcbiAgICAgICAgLCByZXNvbHZlID0gcmVhY3Rpb24ucmVzb2x2ZVxuICAgICAgICAsIHJlamVjdCAgPSByZWFjdGlvbi5yZWplY3RcbiAgICAgICAgLCByZXN1bHQsIHRoZW47XG4gICAgICB0cnkge1xuICAgICAgICBpZihoYW5kbGVyKXtcbiAgICAgICAgICBpZighb2spcmVjb3JkLmggPSB0cnVlO1xuICAgICAgICAgIHJlc3VsdCA9IGhhbmRsZXIgPT09IHRydWUgPyB2YWx1ZSA6IGhhbmRsZXIodmFsdWUpO1xuICAgICAgICAgIGlmKHJlc3VsdCA9PT0gcmVhY3Rpb24ucHJvbWlzZSl7XG4gICAgICAgICAgICByZWplY3QoVHlwZUVycm9yKCdQcm9taXNlLWNoYWluIGN5Y2xlJykpO1xuICAgICAgICAgIH0gZWxzZSBpZih0aGVuID0gaXNUaGVuYWJsZShyZXN1bHQpKXtcbiAgICAgICAgICAgIHRoZW4uY2FsbChyZXN1bHQsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSBlbHNlIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSBlbHNlIHJlamVjdCh2YWx1ZSk7XG4gICAgICB9IGNhdGNoKGUpe1xuICAgICAgICByZWplY3QoZSk7XG4gICAgICB9XG4gICAgfTtcbiAgICB3aGlsZShjaGFpbi5sZW5ndGggPiBpKXJ1bihjaGFpbltpKytdKTsgLy8gdmFyaWFibGUgbGVuZ3RoIC0gY2FuJ3QgdXNlIGZvckVhY2hcbiAgICBjaGFpbi5sZW5ndGggPSAwO1xuICAgIHJlY29yZC5uID0gZmFsc2U7XG4gICAgaWYoaXNSZWplY3Qpc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgdmFyIHByb21pc2UgPSByZWNvcmQucFxuICAgICAgICAsIGhhbmRsZXIsIGNvbnNvbGU7XG4gICAgICBpZihpc1VuaGFuZGxlZChwcm9taXNlKSl7XG4gICAgICAgIGlmKGlzTm9kZSl7XG4gICAgICAgICAgcHJvY2Vzcy5lbWl0KCd1bmhhbmRsZWRSZWplY3Rpb24nLCB2YWx1ZSwgcHJvbWlzZSk7XG4gICAgICAgIH0gZWxzZSBpZihoYW5kbGVyID0gZ2xvYmFsLm9udW5oYW5kbGVkcmVqZWN0aW9uKXtcbiAgICAgICAgICBoYW5kbGVyKHtwcm9taXNlOiBwcm9taXNlLCByZWFzb246IHZhbHVlfSk7XG4gICAgICAgIH0gZWxzZSBpZigoY29uc29sZSA9IGdsb2JhbC5jb25zb2xlKSAmJiBjb25zb2xlLmVycm9yKXtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdVbmhhbmRsZWQgcHJvbWlzZSByZWplY3Rpb24nLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0gcmVjb3JkLmEgPSB1bmRlZmluZWQ7XG4gICAgfSwgMSk7XG4gIH0pO1xufTtcbnZhciBpc1VuaGFuZGxlZCA9IGZ1bmN0aW9uKHByb21pc2Upe1xuICB2YXIgcmVjb3JkID0gcHJvbWlzZS5fZFxuICAgICwgY2hhaW4gID0gcmVjb3JkLmEgfHwgcmVjb3JkLmNcbiAgICAsIGkgICAgICA9IDBcbiAgICAsIHJlYWN0aW9uO1xuICBpZihyZWNvcmQuaClyZXR1cm4gZmFsc2U7XG4gIHdoaWxlKGNoYWluLmxlbmd0aCA+IGkpe1xuICAgIHJlYWN0aW9uID0gY2hhaW5baSsrXTtcbiAgICBpZihyZWFjdGlvbi5mYWlsIHx8ICFpc1VuaGFuZGxlZChyZWFjdGlvbi5wcm9taXNlKSlyZXR1cm4gZmFsc2U7XG4gIH0gcmV0dXJuIHRydWU7XG59O1xudmFyICRyZWplY3QgPSBmdW5jdGlvbih2YWx1ZSl7XG4gIHZhciByZWNvcmQgPSB0aGlzO1xuICBpZihyZWNvcmQuZClyZXR1cm47XG4gIHJlY29yZC5kID0gdHJ1ZTtcbiAgcmVjb3JkID0gcmVjb3JkLnIgfHwgcmVjb3JkOyAvLyB1bndyYXBcbiAgcmVjb3JkLnYgPSB2YWx1ZTtcbiAgcmVjb3JkLnMgPSAyO1xuICByZWNvcmQuYSA9IHJlY29yZC5jLnNsaWNlKCk7XG4gIG5vdGlmeShyZWNvcmQsIHRydWUpO1xufTtcbnZhciAkcmVzb2x2ZSA9IGZ1bmN0aW9uKHZhbHVlKXtcbiAgdmFyIHJlY29yZCA9IHRoaXNcbiAgICAsIHRoZW47XG4gIGlmKHJlY29yZC5kKXJldHVybjtcbiAgcmVjb3JkLmQgPSB0cnVlO1xuICByZWNvcmQgPSByZWNvcmQuciB8fCByZWNvcmQ7IC8vIHVud3JhcFxuICB0cnkge1xuICAgIGlmKHJlY29yZC5wID09PSB2YWx1ZSl0aHJvdyBUeXBlRXJyb3IoXCJQcm9taXNlIGNhbid0IGJlIHJlc29sdmVkIGl0c2VsZlwiKTtcbiAgICBpZih0aGVuID0gaXNUaGVuYWJsZSh2YWx1ZSkpe1xuICAgICAgYXNhcChmdW5jdGlvbigpe1xuICAgICAgICB2YXIgd3JhcHBlciA9IHtyOiByZWNvcmQsIGQ6IGZhbHNlfTsgLy8gd3JhcFxuICAgICAgICB0cnkge1xuICAgICAgICAgIHRoZW4uY2FsbCh2YWx1ZSwgY3R4KCRyZXNvbHZlLCB3cmFwcGVyLCAxKSwgY3R4KCRyZWplY3QsIHdyYXBwZXIsIDEpKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAkcmVqZWN0LmNhbGwod3JhcHBlciwgZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZWNvcmQudiA9IHZhbHVlO1xuICAgICAgcmVjb3JkLnMgPSAxO1xuICAgICAgbm90aWZ5KHJlY29yZCwgZmFsc2UpO1xuICAgIH1cbiAgfSBjYXRjaChlKXtcbiAgICAkcmVqZWN0LmNhbGwoe3I6IHJlY29yZCwgZDogZmFsc2V9LCBlKTsgLy8gd3JhcFxuICB9XG59O1xuXG4vLyBjb25zdHJ1Y3RvciBwb2x5ZmlsbFxuaWYoIVVTRV9OQVRJVkUpe1xuICAvLyAyNS40LjMuMSBQcm9taXNlKGV4ZWN1dG9yKVxuICBQID0gZnVuY3Rpb24gUHJvbWlzZShleGVjdXRvcil7XG4gICAgYUZ1bmN0aW9uKGV4ZWN1dG9yKTtcbiAgICB2YXIgcmVjb3JkID0gdGhpcy5fZCA9IHtcbiAgICAgIHA6IHN0cmljdE5ldyh0aGlzLCBQLCBQUk9NSVNFKSwgICAgICAgICAvLyA8LSBwcm9taXNlXG4gICAgICBjOiBbXSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gYXdhaXRpbmcgcmVhY3Rpb25zXG4gICAgICBhOiB1bmRlZmluZWQsICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gY2hlY2tlZCBpbiBpc1VuaGFuZGxlZCByZWFjdGlvbnNcbiAgICAgIHM6IDAsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA8LSBzdGF0ZVxuICAgICAgZDogZmFsc2UsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIGRvbmVcbiAgICAgIHY6IHVuZGVmaW5lZCwgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA8LSB2YWx1ZVxuICAgICAgaDogZmFsc2UsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIGhhbmRsZWQgcmVqZWN0aW9uXG4gICAgICBuOiBmYWxzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gbm90aWZ5XG4gICAgfTtcbiAgICB0cnkge1xuICAgICAgZXhlY3V0b3IoY3R4KCRyZXNvbHZlLCByZWNvcmQsIDEpLCBjdHgoJHJlamVjdCwgcmVjb3JkLCAxKSk7XG4gICAgfSBjYXRjaChlcnIpe1xuICAgICAgJHJlamVjdC5jYWxsKHJlY29yZCwgZXJyKTtcbiAgICB9XG4gIH07XG4gIHJlcXVpcmUoJy4vJC5yZWRlZmluZS1hbGwnKShQLnByb3RvdHlwZSwge1xuICAgIC8vIDI1LjQuNS4zIFByb21pc2UucHJvdG90eXBlLnRoZW4ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpXG4gICAgdGhlbjogZnVuY3Rpb24gdGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCl7XG4gICAgICB2YXIgcmVhY3Rpb24gPSBuZXcgUHJvbWlzZUNhcGFiaWxpdHkoc3BlY2llc0NvbnN0cnVjdG9yKHRoaXMsIFApKVxuICAgICAgICAsIHByb21pc2UgID0gcmVhY3Rpb24ucHJvbWlzZVxuICAgICAgICAsIHJlY29yZCAgID0gdGhpcy5fZDtcbiAgICAgIHJlYWN0aW9uLm9rICAgPSB0eXBlb2Ygb25GdWxmaWxsZWQgPT0gJ2Z1bmN0aW9uJyA/IG9uRnVsZmlsbGVkIDogdHJ1ZTtcbiAgICAgIHJlYWN0aW9uLmZhaWwgPSB0eXBlb2Ygb25SZWplY3RlZCA9PSAnZnVuY3Rpb24nICYmIG9uUmVqZWN0ZWQ7XG4gICAgICByZWNvcmQuYy5wdXNoKHJlYWN0aW9uKTtcbiAgICAgIGlmKHJlY29yZC5hKXJlY29yZC5hLnB1c2gocmVhY3Rpb24pO1xuICAgICAgaWYocmVjb3JkLnMpbm90aWZ5KHJlY29yZCwgZmFsc2UpO1xuICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfSxcbiAgICAvLyAyNS40LjUuMSBQcm9taXNlLnByb3RvdHlwZS5jYXRjaChvblJlamVjdGVkKVxuICAgICdjYXRjaCc6IGZ1bmN0aW9uKG9uUmVqZWN0ZWQpe1xuICAgICAgcmV0dXJuIHRoaXMudGhlbih1bmRlZmluZWQsIG9uUmVqZWN0ZWQpO1xuICAgIH1cbiAgfSk7XG59XG5cbiRleHBvcnQoJGV4cG9ydC5HICsgJGV4cG9ydC5XICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsIHtQcm9taXNlOiBQfSk7XG5yZXF1aXJlKCcuLyQuc2V0LXRvLXN0cmluZy10YWcnKShQLCBQUk9NSVNFKTtcbnJlcXVpcmUoJy4vJC5zZXQtc3BlY2llcycpKFBST01JU0UpO1xuV3JhcHBlciA9IHJlcXVpcmUoJy4vJC5jb3JlJylbUFJPTUlTRV07XG5cbi8vIHN0YXRpY3NcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsIFBST01JU0UsIHtcbiAgLy8gMjUuNC40LjUgUHJvbWlzZS5yZWplY3QocilcbiAgcmVqZWN0OiBmdW5jdGlvbiByZWplY3Qocil7XG4gICAgdmFyIGNhcGFiaWxpdHkgPSBuZXcgUHJvbWlzZUNhcGFiaWxpdHkodGhpcylcbiAgICAgICwgJCRyZWplY3QgICA9IGNhcGFiaWxpdHkucmVqZWN0O1xuICAgICQkcmVqZWN0KHIpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH1cbn0pO1xuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAoIVVTRV9OQVRJVkUgfHwgdGVzdFJlc29sdmUodHJ1ZSkpLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC42IFByb21pc2UucmVzb2x2ZSh4KVxuICByZXNvbHZlOiBmdW5jdGlvbiByZXNvbHZlKHgpe1xuICAgIC8vIGluc3RhbmNlb2YgaW5zdGVhZCBvZiBpbnRlcm5hbCBzbG90IGNoZWNrIGJlY2F1c2Ugd2Ugc2hvdWxkIGZpeCBpdCB3aXRob3V0IHJlcGxhY2VtZW50IG5hdGl2ZSBQcm9taXNlIGNvcmVcbiAgICBpZih4IGluc3RhbmNlb2YgUCAmJiBzYW1lQ29uc3RydWN0b3IoeC5jb25zdHJ1Y3RvciwgdGhpcykpcmV0dXJuIHg7XG4gICAgdmFyIGNhcGFiaWxpdHkgPSBuZXcgUHJvbWlzZUNhcGFiaWxpdHkodGhpcylcbiAgICAgICwgJCRyZXNvbHZlICA9IGNhcGFiaWxpdHkucmVzb2x2ZTtcbiAgICAkJHJlc29sdmUoeCk7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfVxufSk7XG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICEoVVNFX05BVElWRSAmJiByZXF1aXJlKCcuLyQuaXRlci1kZXRlY3QnKShmdW5jdGlvbihpdGVyKXtcbiAgUC5hbGwoaXRlcilbJ2NhdGNoJ10oZnVuY3Rpb24oKXt9KTtcbn0pKSwgUFJPTUlTRSwge1xuICAvLyAyNS40LjQuMSBQcm9taXNlLmFsbChpdGVyYWJsZSlcbiAgYWxsOiBmdW5jdGlvbiBhbGwoaXRlcmFibGUpe1xuICAgIHZhciBDICAgICAgICAgID0gZ2V0Q29uc3RydWN0b3IodGhpcylcbiAgICAgICwgY2FwYWJpbGl0eSA9IG5ldyBQcm9taXNlQ2FwYWJpbGl0eShDKVxuICAgICAgLCByZXNvbHZlICAgID0gY2FwYWJpbGl0eS5yZXNvbHZlXG4gICAgICAsIHJlamVjdCAgICAgPSBjYXBhYmlsaXR5LnJlamVjdFxuICAgICAgLCB2YWx1ZXMgICAgID0gW107XG4gICAgdmFyIGFicnVwdCA9IHBlcmZvcm0oZnVuY3Rpb24oKXtcbiAgICAgIGZvck9mKGl0ZXJhYmxlLCBmYWxzZSwgdmFsdWVzLnB1c2gsIHZhbHVlcyk7XG4gICAgICB2YXIgcmVtYWluaW5nID0gdmFsdWVzLmxlbmd0aFxuICAgICAgICAsIHJlc3VsdHMgICA9IEFycmF5KHJlbWFpbmluZyk7XG4gICAgICBpZihyZW1haW5pbmcpJC5lYWNoLmNhbGwodmFsdWVzLCBmdW5jdGlvbihwcm9taXNlLCBpbmRleCl7XG4gICAgICAgIHZhciBhbHJlYWR5Q2FsbGVkID0gZmFsc2U7XG4gICAgICAgIEMucmVzb2x2ZShwcm9taXNlKS50aGVuKGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgICAgICBpZihhbHJlYWR5Q2FsbGVkKXJldHVybjtcbiAgICAgICAgICBhbHJlYWR5Q2FsbGVkID0gdHJ1ZTtcbiAgICAgICAgICByZXN1bHRzW2luZGV4XSA9IHZhbHVlO1xuICAgICAgICAgIC0tcmVtYWluaW5nIHx8IHJlc29sdmUocmVzdWx0cyk7XG4gICAgICAgIH0sIHJlamVjdCk7XG4gICAgICB9KTtcbiAgICAgIGVsc2UgcmVzb2x2ZShyZXN1bHRzKTtcbiAgICB9KTtcbiAgICBpZihhYnJ1cHQpcmVqZWN0KGFicnVwdC5lcnJvcik7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfSxcbiAgLy8gMjUuNC40LjQgUHJvbWlzZS5yYWNlKGl0ZXJhYmxlKVxuICByYWNlOiBmdW5jdGlvbiByYWNlKGl0ZXJhYmxlKXtcbiAgICB2YXIgQyAgICAgICAgICA9IGdldENvbnN0cnVjdG9yKHRoaXMpXG4gICAgICAsIGNhcGFiaWxpdHkgPSBuZXcgUHJvbWlzZUNhcGFiaWxpdHkoQylcbiAgICAgICwgcmVqZWN0ICAgICA9IGNhcGFiaWxpdHkucmVqZWN0O1xuICAgIHZhciBhYnJ1cHQgPSBwZXJmb3JtKGZ1bmN0aW9uKCl7XG4gICAgICBmb3JPZihpdGVyYWJsZSwgZmFsc2UsIGZ1bmN0aW9uKHByb21pc2Upe1xuICAgICAgICBDLnJlc29sdmUocHJvbWlzZSkudGhlbihjYXBhYmlsaXR5LnJlc29sdmUsIHJlamVjdCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBpZihhYnJ1cHQpcmVqZWN0KGFicnVwdC5lcnJvcik7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xudmFyICRhdCAgPSByZXF1aXJlKCcuLyQuc3RyaW5nLWF0JykodHJ1ZSk7XG5cbi8vIDIxLjEuMy4yNyBTdHJpbmcucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vJC5pdGVyLWRlZmluZScpKFN0cmluZywgJ1N0cmluZycsIGZ1bmN0aW9uKGl0ZXJhdGVkKXtcbiAgdGhpcy5fdCA9IFN0cmluZyhpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuLy8gMjEuMS41LjIuMSAlU3RyaW5nSXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxufSwgZnVuY3Rpb24oKXtcbiAgdmFyIE8gICAgID0gdGhpcy5fdFxuICAgICwgaW5kZXggPSB0aGlzLl9pXG4gICAgLCBwb2ludDtcbiAgaWYoaW5kZXggPj0gTy5sZW5ndGgpcmV0dXJuIHt2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlfTtcbiAgcG9pbnQgPSAkYXQoTywgaW5kZXgpO1xuICB0aGlzLl9pICs9IHBvaW50Lmxlbmd0aDtcbiAgcmV0dXJuIHt2YWx1ZTogcG9pbnQsIGRvbmU6IGZhbHNlfTtcbn0pOyIsIid1c2Ugc3RyaWN0Jztcbi8vIEVDTUFTY3JpcHQgNiBzeW1ib2xzIHNoaW1cbnZhciAkICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgZ2xvYmFsICAgICAgICAgPSByZXF1aXJlKCcuLyQuZ2xvYmFsJylcbiAgLCBoYXMgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5oYXMnKVxuICAsIERFU0NSSVBUT1JTICAgID0gcmVxdWlyZSgnLi8kLmRlc2NyaXB0b3JzJylcbiAgLCAkZXhwb3J0ICAgICAgICA9IHJlcXVpcmUoJy4vJC5leHBvcnQnKVxuICAsIHJlZGVmaW5lICAgICAgID0gcmVxdWlyZSgnLi8kLnJlZGVmaW5lJylcbiAgLCAkZmFpbHMgICAgICAgICA9IHJlcXVpcmUoJy4vJC5mYWlscycpXG4gICwgc2hhcmVkICAgICAgICAgPSByZXF1aXJlKCcuLyQuc2hhcmVkJylcbiAgLCBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vJC5zZXQtdG8tc3RyaW5nLXRhZycpXG4gICwgdWlkICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQudWlkJylcbiAgLCB3a3MgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC53a3MnKVxuICAsIGtleU9mICAgICAgICAgID0gcmVxdWlyZSgnLi8kLmtleW9mJylcbiAgLCAkbmFtZXMgICAgICAgICA9IHJlcXVpcmUoJy4vJC5nZXQtbmFtZXMnKVxuICAsIGVudW1LZXlzICAgICAgID0gcmVxdWlyZSgnLi8kLmVudW0ta2V5cycpXG4gICwgaXNBcnJheSAgICAgICAgPSByZXF1aXJlKCcuLyQuaXMtYXJyYXknKVxuICAsIGFuT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi8kLmFuLW9iamVjdCcpXG4gICwgdG9JT2JqZWN0ICAgICAgPSByZXF1aXJlKCcuLyQudG8taW9iamVjdCcpXG4gICwgY3JlYXRlRGVzYyAgICAgPSByZXF1aXJlKCcuLyQucHJvcGVydHktZGVzYycpXG4gICwgZ2V0RGVzYyAgICAgICAgPSAkLmdldERlc2NcbiAgLCBzZXREZXNjICAgICAgICA9ICQuc2V0RGVzY1xuICAsIF9jcmVhdGUgICAgICAgID0gJC5jcmVhdGVcbiAgLCBnZXROYW1lcyAgICAgICA9ICRuYW1lcy5nZXRcbiAgLCAkU3ltYm9sICAgICAgICA9IGdsb2JhbC5TeW1ib2xcbiAgLCAkSlNPTiAgICAgICAgICA9IGdsb2JhbC5KU09OXG4gICwgX3N0cmluZ2lmeSAgICAgPSAkSlNPTiAmJiAkSlNPTi5zdHJpbmdpZnlcbiAgLCBzZXR0ZXIgICAgICAgICA9IGZhbHNlXG4gICwgSElEREVOICAgICAgICAgPSB3a3MoJ19oaWRkZW4nKVxuICAsIGlzRW51bSAgICAgICAgID0gJC5pc0VudW1cbiAgLCBTeW1ib2xSZWdpc3RyeSA9IHNoYXJlZCgnc3ltYm9sLXJlZ2lzdHJ5JylcbiAgLCBBbGxTeW1ib2xzICAgICA9IHNoYXJlZCgnc3ltYm9scycpXG4gICwgdXNlTmF0aXZlICAgICAgPSB0eXBlb2YgJFN5bWJvbCA9PSAnZnVuY3Rpb24nXG4gICwgT2JqZWN0UHJvdG8gICAgPSBPYmplY3QucHJvdG90eXBlO1xuXG4vLyBmYWxsYmFjayBmb3Igb2xkIEFuZHJvaWQsIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD02ODdcbnZhciBzZXRTeW1ib2xEZXNjID0gREVTQ1JJUFRPUlMgJiYgJGZhaWxzKGZ1bmN0aW9uKCl7XG4gIHJldHVybiBfY3JlYXRlKHNldERlc2Moe30sICdhJywge1xuICAgIGdldDogZnVuY3Rpb24oKXsgcmV0dXJuIHNldERlc2ModGhpcywgJ2EnLCB7dmFsdWU6IDd9KS5hOyB9XG4gIH0pKS5hICE9IDc7XG59KSA/IGZ1bmN0aW9uKGl0LCBrZXksIEQpe1xuICB2YXIgcHJvdG9EZXNjID0gZ2V0RGVzYyhPYmplY3RQcm90bywga2V5KTtcbiAgaWYocHJvdG9EZXNjKWRlbGV0ZSBPYmplY3RQcm90b1trZXldO1xuICBzZXREZXNjKGl0LCBrZXksIEQpO1xuICBpZihwcm90b0Rlc2MgJiYgaXQgIT09IE9iamVjdFByb3RvKXNldERlc2MoT2JqZWN0UHJvdG8sIGtleSwgcHJvdG9EZXNjKTtcbn0gOiBzZXREZXNjO1xuXG52YXIgd3JhcCA9IGZ1bmN0aW9uKHRhZyl7XG4gIHZhciBzeW0gPSBBbGxTeW1ib2xzW3RhZ10gPSBfY3JlYXRlKCRTeW1ib2wucHJvdG90eXBlKTtcbiAgc3ltLl9rID0gdGFnO1xuICBERVNDUklQVE9SUyAmJiBzZXR0ZXIgJiYgc2V0U3ltYm9sRGVzYyhPYmplY3RQcm90bywgdGFnLCB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIHNldDogZnVuY3Rpb24odmFsdWUpe1xuICAgICAgaWYoaGFzKHRoaXMsIEhJRERFTikgJiYgaGFzKHRoaXNbSElEREVOXSwgdGFnKSl0aGlzW0hJRERFTl1bdGFnXSA9IGZhbHNlO1xuICAgICAgc2V0U3ltYm9sRGVzYyh0aGlzLCB0YWcsIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gc3ltO1xufTtcblxudmFyIGlzU3ltYm9sID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdHlwZW9mIGl0ID09ICdzeW1ib2wnO1xufTtcblxudmFyICRkZWZpbmVQcm9wZXJ0eSA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGl0LCBrZXksIEQpe1xuICBpZihEICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpKXtcbiAgICBpZighRC5lbnVtZXJhYmxlKXtcbiAgICAgIGlmKCFoYXMoaXQsIEhJRERFTikpc2V0RGVzYyhpdCwgSElEREVOLCBjcmVhdGVEZXNjKDEsIHt9KSk7XG4gICAgICBpdFtISURERU5dW2tleV0gPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZihoYXMoaXQsIEhJRERFTikgJiYgaXRbSElEREVOXVtrZXldKWl0W0hJRERFTl1ba2V5XSA9IGZhbHNlO1xuICAgICAgRCA9IF9jcmVhdGUoRCwge2VudW1lcmFibGU6IGNyZWF0ZURlc2MoMCwgZmFsc2UpfSk7XG4gICAgfSByZXR1cm4gc2V0U3ltYm9sRGVzYyhpdCwga2V5LCBEKTtcbiAgfSByZXR1cm4gc2V0RGVzYyhpdCwga2V5LCBEKTtcbn07XG52YXIgJGRlZmluZVByb3BlcnRpZXMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKGl0LCBQKXtcbiAgYW5PYmplY3QoaXQpO1xuICB2YXIga2V5cyA9IGVudW1LZXlzKFAgPSB0b0lPYmplY3QoUCkpXG4gICAgLCBpICAgID0gMFxuICAgICwgbCA9IGtleXMubGVuZ3RoXG4gICAgLCBrZXk7XG4gIHdoaWxlKGwgPiBpKSRkZWZpbmVQcm9wZXJ0eShpdCwga2V5ID0ga2V5c1tpKytdLCBQW2tleV0pO1xuICByZXR1cm4gaXQ7XG59O1xudmFyICRjcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoaXQsIFApe1xuICByZXR1cm4gUCA9PT0gdW5kZWZpbmVkID8gX2NyZWF0ZShpdCkgOiAkZGVmaW5lUHJvcGVydGllcyhfY3JlYXRlKGl0KSwgUCk7XG59O1xudmFyICRwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IGZ1bmN0aW9uIHByb3BlcnR5SXNFbnVtZXJhYmxlKGtleSl7XG4gIHZhciBFID0gaXNFbnVtLmNhbGwodGhpcywga2V5KTtcbiAgcmV0dXJuIEUgfHwgIWhhcyh0aGlzLCBrZXkpIHx8ICFoYXMoQWxsU3ltYm9scywga2V5KSB8fCBoYXModGhpcywgSElEREVOKSAmJiB0aGlzW0hJRERFTl1ba2V5XVxuICAgID8gRSA6IHRydWU7XG59O1xudmFyICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoaXQsIGtleSl7XG4gIHZhciBEID0gZ2V0RGVzYyhpdCA9IHRvSU9iamVjdChpdCksIGtleSk7XG4gIGlmKEQgJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIShoYXMoaXQsIEhJRERFTikgJiYgaXRbSElEREVOXVtrZXldKSlELmVudW1lcmFibGUgPSB0cnVlO1xuICByZXR1cm4gRDtcbn07XG52YXIgJGdldE93blByb3BlcnR5TmFtZXMgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKGl0KXtcbiAgdmFyIG5hbWVzICA9IGdldE5hbWVzKHRvSU9iamVjdChpdCkpXG4gICAgLCByZXN1bHQgPSBbXVxuICAgICwgaSAgICAgID0gMFxuICAgICwga2V5O1xuICB3aGlsZShuYW1lcy5sZW5ndGggPiBpKWlmKCFoYXMoQWxsU3ltYm9scywga2V5ID0gbmFtZXNbaSsrXSkgJiYga2V5ICE9IEhJRERFTilyZXN1bHQucHVzaChrZXkpO1xuICByZXR1cm4gcmVzdWx0O1xufTtcbnZhciAkZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlTeW1ib2xzKGl0KXtcbiAgdmFyIG5hbWVzICA9IGdldE5hbWVzKHRvSU9iamVjdChpdCkpXG4gICAgLCByZXN1bHQgPSBbXVxuICAgICwgaSAgICAgID0gMFxuICAgICwga2V5O1xuICB3aGlsZShuYW1lcy5sZW5ndGggPiBpKWlmKGhhcyhBbGxTeW1ib2xzLCBrZXkgPSBuYW1lc1tpKytdKSlyZXN1bHQucHVzaChBbGxTeW1ib2xzW2tleV0pO1xuICByZXR1cm4gcmVzdWx0O1xufTtcbnZhciAkc3RyaW5naWZ5ID0gZnVuY3Rpb24gc3RyaW5naWZ5KGl0KXtcbiAgaWYoaXQgPT09IHVuZGVmaW5lZCB8fCBpc1N5bWJvbChpdCkpcmV0dXJuOyAvLyBJRTggcmV0dXJucyBzdHJpbmcgb24gdW5kZWZpbmVkXG4gIHZhciBhcmdzID0gW2l0XVxuICAgICwgaSAgICA9IDFcbiAgICAsICQkICAgPSBhcmd1bWVudHNcbiAgICAsIHJlcGxhY2VyLCAkcmVwbGFjZXI7XG4gIHdoaWxlKCQkLmxlbmd0aCA+IGkpYXJncy5wdXNoKCQkW2krK10pO1xuICByZXBsYWNlciA9IGFyZ3NbMV07XG4gIGlmKHR5cGVvZiByZXBsYWNlciA9PSAnZnVuY3Rpb24nKSRyZXBsYWNlciA9IHJlcGxhY2VyO1xuICBpZigkcmVwbGFjZXIgfHwgIWlzQXJyYXkocmVwbGFjZXIpKXJlcGxhY2VyID0gZnVuY3Rpb24oa2V5LCB2YWx1ZSl7XG4gICAgaWYoJHJlcGxhY2VyKXZhbHVlID0gJHJlcGxhY2VyLmNhbGwodGhpcywga2V5LCB2YWx1ZSk7XG4gICAgaWYoIWlzU3ltYm9sKHZhbHVlKSlyZXR1cm4gdmFsdWU7XG4gIH07XG4gIGFyZ3NbMV0gPSByZXBsYWNlcjtcbiAgcmV0dXJuIF9zdHJpbmdpZnkuYXBwbHkoJEpTT04sIGFyZ3MpO1xufTtcbnZhciBidWdneUpTT04gPSAkZmFpbHMoZnVuY3Rpb24oKXtcbiAgdmFyIFMgPSAkU3ltYm9sKCk7XG4gIC8vIE1TIEVkZ2UgY29udmVydHMgc3ltYm9sIHZhbHVlcyB0byBKU09OIGFzIHt9XG4gIC8vIFdlYktpdCBjb252ZXJ0cyBzeW1ib2wgdmFsdWVzIHRvIEpTT04gYXMgbnVsbFxuICAvLyBWOCB0aHJvd3Mgb24gYm94ZWQgc3ltYm9sc1xuICByZXR1cm4gX3N0cmluZ2lmeShbU10pICE9ICdbbnVsbF0nIHx8IF9zdHJpbmdpZnkoe2E6IFN9KSAhPSAne30nIHx8IF9zdHJpbmdpZnkoT2JqZWN0KFMpKSAhPSAne30nO1xufSk7XG5cbi8vIDE5LjQuMS4xIFN5bWJvbChbZGVzY3JpcHRpb25dKVxuaWYoIXVzZU5hdGl2ZSl7XG4gICRTeW1ib2wgPSBmdW5jdGlvbiBTeW1ib2woKXtcbiAgICBpZihpc1N5bWJvbCh0aGlzKSl0aHJvdyBUeXBlRXJyb3IoJ1N5bWJvbCBpcyBub3QgYSBjb25zdHJ1Y3RvcicpO1xuICAgIHJldHVybiB3cmFwKHVpZChhcmd1bWVudHMubGVuZ3RoID4gMCA/IGFyZ3VtZW50c1swXSA6IHVuZGVmaW5lZCkpO1xuICB9O1xuICByZWRlZmluZSgkU3ltYm9sLnByb3RvdHlwZSwgJ3RvU3RyaW5nJywgZnVuY3Rpb24gdG9TdHJpbmcoKXtcbiAgICByZXR1cm4gdGhpcy5faztcbiAgfSk7XG5cbiAgaXNTeW1ib2wgPSBmdW5jdGlvbihpdCl7XG4gICAgcmV0dXJuIGl0IGluc3RhbmNlb2YgJFN5bWJvbDtcbiAgfTtcblxuICAkLmNyZWF0ZSAgICAgPSAkY3JlYXRlO1xuICAkLmlzRW51bSAgICAgPSAkcHJvcGVydHlJc0VudW1lcmFibGU7XG4gICQuZ2V0RGVzYyAgICA9ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG4gICQuc2V0RGVzYyAgICA9ICRkZWZpbmVQcm9wZXJ0eTtcbiAgJC5zZXREZXNjcyAgID0gJGRlZmluZVByb3BlcnRpZXM7XG4gICQuZ2V0TmFtZXMgICA9ICRuYW1lcy5nZXQgPSAkZ2V0T3duUHJvcGVydHlOYW1lcztcbiAgJC5nZXRTeW1ib2xzID0gJGdldE93blByb3BlcnR5U3ltYm9scztcblxuICBpZihERVNDUklQVE9SUyAmJiAhcmVxdWlyZSgnLi8kLmxpYnJhcnknKSl7XG4gICAgcmVkZWZpbmUoT2JqZWN0UHJvdG8sICdwcm9wZXJ0eUlzRW51bWVyYWJsZScsICRwcm9wZXJ0eUlzRW51bWVyYWJsZSwgdHJ1ZSk7XG4gIH1cbn1cblxudmFyIHN5bWJvbFN0YXRpY3MgPSB7XG4gIC8vIDE5LjQuMi4xIFN5bWJvbC5mb3Ioa2V5KVxuICAnZm9yJzogZnVuY3Rpb24oa2V5KXtcbiAgICByZXR1cm4gaGFzKFN5bWJvbFJlZ2lzdHJ5LCBrZXkgKz0gJycpXG4gICAgICA/IFN5bWJvbFJlZ2lzdHJ5W2tleV1cbiAgICAgIDogU3ltYm9sUmVnaXN0cnlba2V5XSA9ICRTeW1ib2woa2V5KTtcbiAgfSxcbiAgLy8gMTkuNC4yLjUgU3ltYm9sLmtleUZvcihzeW0pXG4gIGtleUZvcjogZnVuY3Rpb24ga2V5Rm9yKGtleSl7XG4gICAgcmV0dXJuIGtleU9mKFN5bWJvbFJlZ2lzdHJ5LCBrZXkpO1xuICB9LFxuICB1c2VTZXR0ZXI6IGZ1bmN0aW9uKCl7IHNldHRlciA9IHRydWU7IH0sXG4gIHVzZVNpbXBsZTogZnVuY3Rpb24oKXsgc2V0dGVyID0gZmFsc2U7IH1cbn07XG4vLyAxOS40LjIuMiBTeW1ib2wuaGFzSW5zdGFuY2Vcbi8vIDE5LjQuMi4zIFN5bWJvbC5pc0NvbmNhdFNwcmVhZGFibGVcbi8vIDE5LjQuMi40IFN5bWJvbC5pdGVyYXRvclxuLy8gMTkuNC4yLjYgU3ltYm9sLm1hdGNoXG4vLyAxOS40LjIuOCBTeW1ib2wucmVwbGFjZVxuLy8gMTkuNC4yLjkgU3ltYm9sLnNlYXJjaFxuLy8gMTkuNC4yLjEwIFN5bWJvbC5zcGVjaWVzXG4vLyAxOS40LjIuMTEgU3ltYm9sLnNwbGl0XG4vLyAxOS40LjIuMTIgU3ltYm9sLnRvUHJpbWl0aXZlXG4vLyAxOS40LjIuMTMgU3ltYm9sLnRvU3RyaW5nVGFnXG4vLyAxOS40LjIuMTQgU3ltYm9sLnVuc2NvcGFibGVzXG4kLmVhY2guY2FsbCgoXG4gICdoYXNJbnN0YW5jZSxpc0NvbmNhdFNwcmVhZGFibGUsaXRlcmF0b3IsbWF0Y2gscmVwbGFjZSxzZWFyY2gsJyArXG4gICdzcGVjaWVzLHNwbGl0LHRvUHJpbWl0aXZlLHRvU3RyaW5nVGFnLHVuc2NvcGFibGVzJ1xuKS5zcGxpdCgnLCcpLCBmdW5jdGlvbihpdCl7XG4gIHZhciBzeW0gPSB3a3MoaXQpO1xuICBzeW1ib2xTdGF0aWNzW2l0XSA9IHVzZU5hdGl2ZSA/IHN5bSA6IHdyYXAoc3ltKTtcbn0pO1xuXG5zZXR0ZXIgPSB0cnVlO1xuXG4kZXhwb3J0KCRleHBvcnQuRyArICRleHBvcnQuVywge1N5bWJvbDogJFN5bWJvbH0pO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ1N5bWJvbCcsIHN5bWJvbFN0YXRpY3MpO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICF1c2VOYXRpdmUsICdPYmplY3QnLCB7XG4gIC8vIDE5LjEuMi4yIE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcbiAgY3JlYXRlOiAkY3JlYXRlLFxuICAvLyAxOS4xLjIuNCBPYmplY3QuZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcylcbiAgZGVmaW5lUHJvcGVydHk6ICRkZWZpbmVQcm9wZXJ0eSxcbiAgLy8gMTkuMS4yLjMgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcylcbiAgZGVmaW5lUHJvcGVydGllczogJGRlZmluZVByb3BlcnRpZXMsXG4gIC8vIDE5LjEuMi42IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUClcbiAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yOiAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yLFxuICAvLyAxOS4xLjIuNyBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhPKVxuICBnZXRPd25Qcm9wZXJ0eU5hbWVzOiAkZ2V0T3duUHJvcGVydHlOYW1lcyxcbiAgLy8gMTkuMS4yLjggT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhPKVxuICBnZXRPd25Qcm9wZXJ0eVN5bWJvbHM6ICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHNcbn0pO1xuXG4vLyAyNC4zLjIgSlNPTi5zdHJpbmdpZnkodmFsdWUgWywgcmVwbGFjZXIgWywgc3BhY2VdXSlcbiRKU09OICYmICRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogKCF1c2VOYXRpdmUgfHwgYnVnZ3lKU09OKSwgJ0pTT04nLCB7c3RyaW5naWZ5OiAkc3RyaW5naWZ5fSk7XG5cbi8vIDE5LjQuMy41IFN5bWJvbC5wcm90b3R5cGVbQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKCRTeW1ib2wsICdTeW1ib2wnKTtcbi8vIDIwLjIuMS45IE1hdGhbQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKE1hdGgsICdNYXRoJywgdHJ1ZSk7XG4vLyAyNC4zLjMgSlNPTltAQHRvU3RyaW5nVGFnXVxuc2V0VG9TdHJpbmdUYWcoZ2xvYmFsLkpTT04sICdKU09OJywgdHJ1ZSk7IiwicmVxdWlyZSgnLi9lczYuYXJyYXkuaXRlcmF0b3InKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuLyQuaXRlcmF0b3JzJyk7XG5JdGVyYXRvcnMuTm9kZUxpc3QgPSBJdGVyYXRvcnMuSFRNTENvbGxlY3Rpb24gPSBJdGVyYXRvcnMuQXJyYXk7IiwiZXhwb3J0IGRlZmF1bHQgKHtjaGlsZHJlbiwgc3R5bGUgPSB7fSwgY2xhc3NOYW1lLCBmaWxsID0gZmFsc2V9KSA9PiB7XHJcbiAgICBpZiAoZmlsbCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIHN0eWxlLndpZHRoID0gJzEwMCUnO1xyXG4gICAgICAgIHN0eWxlLmhlaWdodCA9ICcxMDAlJztcclxuICAgIH1cclxuICAgIHJldHVybiA8ZGl2IHN0eWxlPXtzdHlsZX0gY2xhc3NOYW1lPXtjbGFzc05hbWV9PntjaGlsZHJlbn08L2Rpdj47XHJcbn07XHJcbiIsImNsYXNzIFN1YnNjcmliYWJsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuX190b2tlbnMgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJMaXN0ZW4gPSAoZXZ0VHlwZSwgbGlzdGVuZXIpID0+IHtcclxuICAgICAgICB0aGlzLl9fdG9rZW5zLnB1c2goUHViU3ViLnN1YnNjcmliZShldnRUeXBlLCBsaXN0ZW5lcikpO1xyXG4gICAgfVxyXG4gICAgY2xlYXJTdWJzID0gKCkgPT4ge1xyXG4gICAgICAgIGZvciAoY29uc3QgdG9rZW4gb2YgdGhpcy5fX3Rva2Vucykge1xyXG4gICAgICAgICAgICBQdWJTdWIudW5zdWJzY3JpYmUodG9rZW4pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9fdG9rZW5zID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQgPSAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5jbGVhclN1YnMoKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3Vic2NyaWJhYmxlO1xyXG4iLCJjb25zdCBNYWluU2VydmVyID0gQVBJLmNyZWF0ZShcIlNFUlZFUl9VUkxcIik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbn07XHJcbiIsImxldCBjdXJyZW50U3RhdGU7XHJcbmxldCBjdXJyZW50TGV2ZWw7XHJcblxyXG5jdXJyZW50U3RhdGUgPSB7XHJcbiAgICBnYW1lOiB7XHJcbiAgICAgICAgbGV2ZWw6IDFcclxuICAgIH1cclxufTtcclxuXHJcblB1YlN1Yi5zdWJzY3JpYmUoXCJjYW1wZGlzY28uZ2FtZS5hbnN3ZXJcIiwgKHQsIGFuc3dlcikgPT4gY3VycmVudExldmVsLnByb2Nlc3NBbnN3ZXIoYW5zd2VyKSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBnZXQgY3VycmVudCgpIHtcclxuICAgICAgICByZXR1cm4gY3VycmVudFN0YXRlO1xyXG4gICAgfSxcclxuICAgIGdldCBjdXJyZW50TGV2ZWwoKSB7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRMZXZlbDtcclxuICAgIH0sXHJcbiAgICBpbml0TGV2ZWwoKSB7XHJcbiAgICAgICAgbGV0IGxldmVsID0gMTtcclxuICAgICAgICBjdXJyZW50TGV2ZWwgPSB7XHJcbiAgICAgICAgICAgIHByb2Nlc3NBbnN3ZXIoYW5zd2VyKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYW5zd2VyID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV2ZWwgKz0gMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZ2V0IGZpbmlzaGVkKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxldmVsID49IDQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBQdWJTdWIucHVibGlzaChcImNhbXBkaXNjby5nYW1lLm5leHRnYW1lXCIsIG51bGwpO1xyXG4gICAgfVxyXG59O1xyXG4iLCIvKiFcclxuICogIGhvd2xlci5qcyB2MS4xLjI5XHJcbiAqICBob3dsZXJqcy5jb21cclxuICpcclxuICogIChjKSAyMDEzLTIwMTYsIEphbWVzIFNpbXBzb24gb2YgR29sZEZpcmUgU3R1ZGlvc1xyXG4gKiAgZ29sZGZpcmVzdHVkaW9zLmNvbVxyXG4gKlxyXG4gKiAgTUlUIExpY2Vuc2VcclxuICovXHJcbiFmdW5jdGlvbigpe3ZhciBlPXt9LG89bnVsbCxuPSEwLHI9ITE7dHJ5e1widW5kZWZpbmVkXCIhPXR5cGVvZiBBdWRpb0NvbnRleHQ/bz1uZXcgQXVkaW9Db250ZXh0OlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3ZWJraXRBdWRpb0NvbnRleHQ/bz1uZXcgd2Via2l0QXVkaW9Db250ZXh0Om49ITF9Y2F0Y2godCl7bj0hMX1pZighbilpZihcInVuZGVmaW5lZFwiIT10eXBlb2YgQXVkaW8pdHJ5e25ldyBBdWRpb31jYXRjaCh0KXtyPSEwfWVsc2Ugcj0hMDtpZihuKXt2YXIgYT1cInVuZGVmaW5lZFwiPT10eXBlb2Ygby5jcmVhdGVHYWluP28uY3JlYXRlR2Fpbk5vZGUoKTpvLmNyZWF0ZUdhaW4oKTthLmdhaW4udmFsdWU9MSxhLmNvbm5lY3Qoby5kZXN0aW5hdGlvbil9dmFyIGk9ZnVuY3Rpb24oZSl7dGhpcy5fdm9sdW1lPTEsdGhpcy5fbXV0ZWQ9ITEsdGhpcy51c2luZ1dlYkF1ZGlvPW4sdGhpcy5jdHg9byx0aGlzLm5vQXVkaW89cix0aGlzLl9ob3dscz1bXSx0aGlzLl9jb2RlY3M9ZSx0aGlzLmlPU0F1dG9FbmFibGU9ITB9O2kucHJvdG90eXBlPXt2b2x1bWU6ZnVuY3Rpb24oZSl7dmFyIG89dGhpcztpZihlPXBhcnNlRmxvYXQoZSksZT49MCYmMT49ZSl7by5fdm9sdW1lPWUsbiYmKGEuZ2Fpbi52YWx1ZT1lKTtmb3IodmFyIHIgaW4gby5faG93bHMpaWYoby5faG93bHMuaGFzT3duUHJvcGVydHkocikmJm8uX2hvd2xzW3JdLl93ZWJBdWRpbz09PSExKWZvcih2YXIgdD0wO3Q8by5faG93bHNbcl0uX2F1ZGlvTm9kZS5sZW5ndGg7dCsrKW8uX2hvd2xzW3JdLl9hdWRpb05vZGVbdF0udm9sdW1lPW8uX2hvd2xzW3JdLl92b2x1bWUqby5fdm9sdW1lO3JldHVybiBvfXJldHVybiBuP2EuZ2Fpbi52YWx1ZTpvLl92b2x1bWV9LG11dGU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fc2V0TXV0ZWQoITApLHRoaXN9LHVubXV0ZTpmdW5jdGlvbigpe3JldHVybiB0aGlzLl9zZXRNdXRlZCghMSksdGhpc30sX3NldE11dGVkOmZ1bmN0aW9uKGUpe3ZhciBvPXRoaXM7by5fbXV0ZWQ9ZSxuJiYoYS5nYWluLnZhbHVlPWU/MDpvLl92b2x1bWUpO2Zvcih2YXIgciBpbiBvLl9ob3dscylpZihvLl9ob3dscy5oYXNPd25Qcm9wZXJ0eShyKSYmby5faG93bHNbcl0uX3dlYkF1ZGlvPT09ITEpZm9yKHZhciB0PTA7dDxvLl9ob3dsc1tyXS5fYXVkaW9Ob2RlLmxlbmd0aDt0Kyspby5faG93bHNbcl0uX2F1ZGlvTm9kZVt0XS5tdXRlZD1lfSxjb2RlY3M6ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMuX2NvZGVjc1tlXX0sX2VuYWJsZWlPU0F1ZGlvOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcztpZighb3x8IWUuX2lPU0VuYWJsZWQmJi9pUGhvbmV8aVBhZHxpUG9kL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSl7ZS5faU9TRW5hYmxlZD0hMTt2YXIgbj1mdW5jdGlvbigpe3ZhciByPW8uY3JlYXRlQnVmZmVyKDEsMSwyMjA1MCksdD1vLmNyZWF0ZUJ1ZmZlclNvdXJjZSgpO3QuYnVmZmVyPXIsdC5jb25uZWN0KG8uZGVzdGluYXRpb24pLFwidW5kZWZpbmVkXCI9PXR5cGVvZiB0LnN0YXJ0P3Qubm90ZU9uKDApOnQuc3RhcnQoMCksc2V0VGltZW91dChmdW5jdGlvbigpeyh0LnBsYXliYWNrU3RhdGU9PT10LlBMQVlJTkdfU1RBVEV8fHQucGxheWJhY2tTdGF0ZT09PXQuRklOSVNIRURfU1RBVEUpJiYoZS5faU9TRW5hYmxlZD0hMCxlLmlPU0F1dG9FbmFibGU9ITEsd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLG4sITEpKX0sMCl9O3JldHVybiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsbiwhMSksZX19fTt2YXIgdT1udWxsLGQ9e307cnx8KHU9bmV3IEF1ZGlvLGQ9e21wMzohIXUuY2FuUGxheVR5cGUoXCJhdWRpby9tcGVnO1wiKS5yZXBsYWNlKC9ebm8kLyxcIlwiKSxvcHVzOiEhdS5jYW5QbGF5VHlwZSgnYXVkaW8vb2dnOyBjb2RlY3M9XCJvcHVzXCInKS5yZXBsYWNlKC9ebm8kLyxcIlwiKSxvZ2c6ISF1LmNhblBsYXlUeXBlKCdhdWRpby9vZ2c7IGNvZGVjcz1cInZvcmJpc1wiJykucmVwbGFjZSgvXm5vJC8sXCJcIiksd2F2OiEhdS5jYW5QbGF5VHlwZSgnYXVkaW8vd2F2OyBjb2RlY3M9XCIxXCInKS5yZXBsYWNlKC9ebm8kLyxcIlwiKSxhYWM6ISF1LmNhblBsYXlUeXBlKFwiYXVkaW8vYWFjO1wiKS5yZXBsYWNlKC9ebm8kLyxcIlwiKSxtNGE6ISEodS5jYW5QbGF5VHlwZShcImF1ZGlvL3gtbTRhO1wiKXx8dS5jYW5QbGF5VHlwZShcImF1ZGlvL200YTtcIil8fHUuY2FuUGxheVR5cGUoXCJhdWRpby9hYWM7XCIpKS5yZXBsYWNlKC9ebm8kLyxcIlwiKSxtcDQ6ISEodS5jYW5QbGF5VHlwZShcImF1ZGlvL3gtbXA0O1wiKXx8dS5jYW5QbGF5VHlwZShcImF1ZGlvL21wNDtcIil8fHUuY2FuUGxheVR5cGUoXCJhdWRpby9hYWM7XCIpKS5yZXBsYWNlKC9ebm8kLyxcIlwiKSx3ZWJhOiEhdS5jYW5QbGF5VHlwZSgnYXVkaW8vd2VibTsgY29kZWNzPVwidm9yYmlzXCInKS5yZXBsYWNlKC9ebm8kLyxcIlwiKX0pO3ZhciBsPW5ldyBpKGQpLGY9ZnVuY3Rpb24oZSl7dmFyIHI9dGhpcztyLl9hdXRvcGxheT1lLmF1dG9wbGF5fHwhMSxyLl9idWZmZXI9ZS5idWZmZXJ8fCExLHIuX2R1cmF0aW9uPWUuZHVyYXRpb258fDAsci5fZm9ybWF0PWUuZm9ybWF0fHxudWxsLHIuX2xvb3A9ZS5sb29wfHwhMSxyLl9sb2FkZWQ9ITEsci5fc3ByaXRlPWUuc3ByaXRlfHx7fSxyLl9zcmM9ZS5zcmN8fFwiXCIsci5fcG9zM2Q9ZS5wb3MzZHx8WzAsMCwtLjVdLHIuX3ZvbHVtZT12b2lkIDAhPT1lLnZvbHVtZT9lLnZvbHVtZToxLHIuX3VybHM9ZS51cmxzfHxbXSxyLl9yYXRlPWUucmF0ZXx8MSxyLl9tb2RlbD1lLm1vZGVsfHxudWxsLHIuX29ubG9hZD1bZS5vbmxvYWR8fGZ1bmN0aW9uKCl7fV0sci5fb25sb2FkZXJyb3I9W2Uub25sb2FkZXJyb3J8fGZ1bmN0aW9uKCl7fV0sci5fb25lbmQ9W2Uub25lbmR8fGZ1bmN0aW9uKCl7fV0sci5fb25wYXVzZT1bZS5vbnBhdXNlfHxmdW5jdGlvbigpe31dLHIuX29ucGxheT1bZS5vbnBsYXl8fGZ1bmN0aW9uKCl7fV0sci5fb25lbmRUaW1lcj1bXSxyLl93ZWJBdWRpbz1uJiYhci5fYnVmZmVyLHIuX2F1ZGlvTm9kZT1bXSxyLl93ZWJBdWRpbyYmci5fc2V0dXBBdWRpb05vZGUoKSxcInVuZGVmaW5lZFwiIT10eXBlb2YgbyYmbyYmbC5pT1NBdXRvRW5hYmxlJiZsLl9lbmFibGVpT1NBdWRpbygpLGwuX2hvd2xzLnB1c2gociksci5sb2FkKCl9O2lmKGYucHJvdG90eXBlPXtsb2FkOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcyxvPW51bGw7aWYocilyZXR1cm4gdm9pZCBlLm9uKFwibG9hZGVycm9yXCIsbmV3IEVycm9yKFwiTm8gYXVkaW8gc3VwcG9ydC5cIikpO2Zvcih2YXIgbj0wO248ZS5fdXJscy5sZW5ndGg7bisrKXt2YXIgdCxhO2lmKGUuX2Zvcm1hdCl0PWUuX2Zvcm1hdDtlbHNle2lmKGE9ZS5fdXJsc1tuXSx0PS9eZGF0YTphdWRpb1xcLyhbXjssXSspOy9pLmV4ZWMoYSksdHx8KHQ9L1xcLihbXi5dKykkLy5leGVjKGEuc3BsaXQoXCI/XCIsMSlbMF0pKSwhdClyZXR1cm4gdm9pZCBlLm9uKFwibG9hZGVycm9yXCIsbmV3IEVycm9yKFwiQ291bGQgbm90IGV4dHJhY3QgZm9ybWF0IGZyb20gcGFzc2VkIFVSTHMsIHBsZWFzZSBhZGQgZm9ybWF0IHBhcmFtZXRlci5cIikpO3Q9dFsxXS50b0xvd2VyQ2FzZSgpfWlmKGRbdF0pe289ZS5fdXJsc1tuXTticmVha319aWYoIW8pcmV0dXJuIHZvaWQgZS5vbihcImxvYWRlcnJvclwiLG5ldyBFcnJvcihcIk5vIGNvZGVjIHN1cHBvcnQgZm9yIHNlbGVjdGVkIGF1ZGlvIHNvdXJjZXMuXCIpKTtpZihlLl9zcmM9byxlLl93ZWJBdWRpbylzKGUsbyk7ZWxzZXt2YXIgdT1uZXcgQXVkaW87dS5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIixmdW5jdGlvbigpe3UuZXJyb3ImJjQ9PT11LmVycm9yLmNvZGUmJihpLm5vQXVkaW89ITApLGUub24oXCJsb2FkZXJyb3JcIix7dHlwZTp1LmVycm9yP3UuZXJyb3IuY29kZTowfSl9LCExKSxlLl9hdWRpb05vZGUucHVzaCh1KSx1LnNyYz1vLHUuX3Bvcz0wLHUucHJlbG9hZD1cImF1dG9cIix1LnZvbHVtZT1sLl9tdXRlZD8wOmUuX3ZvbHVtZSpsLnZvbHVtZSgpO3ZhciBmPWZ1bmN0aW9uKCl7ZS5fZHVyYXRpb249TWF0aC5jZWlsKDEwKnUuZHVyYXRpb24pLzEwLDA9PT1PYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhlLl9zcHJpdGUpLmxlbmd0aCYmKGUuX3Nwcml0ZT17X2RlZmF1bHQ6WzAsMWUzKmUuX2R1cmF0aW9uXX0pLGUuX2xvYWRlZHx8KGUuX2xvYWRlZD0hMCxlLm9uKFwibG9hZFwiKSksZS5fYXV0b3BsYXkmJmUucGxheSgpLHUucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNhbnBsYXl0aHJvdWdoXCIsZiwhMSl9O3UuYWRkRXZlbnRMaXN0ZW5lcihcImNhbnBsYXl0aHJvdWdoXCIsZiwhMSksdS5sb2FkKCl9cmV0dXJuIGV9LHVybHM6ZnVuY3Rpb24oZSl7dmFyIG89dGhpcztyZXR1cm4gZT8oby5zdG9wKCksby5fdXJscz1cInN0cmluZ1wiPT10eXBlb2YgZT9bZV06ZSxvLl9sb2FkZWQ9ITEsby5sb2FkKCksbyk6by5fdXJsc30scGxheTpmdW5jdGlvbihlLG4pe3ZhciByPXRoaXM7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2YgZSYmKG49ZSksZSYmXCJmdW5jdGlvblwiIT10eXBlb2YgZXx8KGU9XCJfZGVmYXVsdFwiKSxyLl9sb2FkZWQ/ci5fc3ByaXRlW2VdPyhyLl9pbmFjdGl2ZU5vZGUoZnVuY3Rpb24odCl7dC5fc3ByaXRlPWU7dmFyIGE9dC5fcG9zPjA/dC5fcG9zOnIuX3Nwcml0ZVtlXVswXS8xZTMsaT0wO3IuX3dlYkF1ZGlvPyhpPXIuX3Nwcml0ZVtlXVsxXS8xZTMtdC5fcG9zLHQuX3Bvcz4wJiYoYT1yLl9zcHJpdGVbZV1bMF0vMWUzK2EpKTppPXIuX3Nwcml0ZVtlXVsxXS8xZTMtKGEtci5fc3ByaXRlW2VdWzBdLzFlMyk7dmFyIHUsZD0hKCFyLl9sb29wJiYhci5fc3ByaXRlW2VdWzJdKSxmPVwic3RyaW5nXCI9PXR5cGVvZiBuP246TWF0aC5yb3VuZChEYXRlLm5vdygpKk1hdGgucmFuZG9tKCkpK1wiXCI7aWYoZnVuY3Rpb24oKXt2YXIgbz17aWQ6ZixzcHJpdGU6ZSxsb29wOmR9O3U9c2V0VGltZW91dChmdW5jdGlvbigpeyFyLl93ZWJBdWRpbyYmZCYmci5zdG9wKG8uaWQpLnBsYXkoZSxvLmlkKSxyLl93ZWJBdWRpbyYmIWQmJihyLl9ub2RlQnlJZChvLmlkKS5wYXVzZWQ9ITAsci5fbm9kZUJ5SWQoby5pZCkuX3Bvcz0wLHIuX2NsZWFyRW5kVGltZXIoby5pZCkpLHIuX3dlYkF1ZGlvfHxkfHxyLnN0b3Aoby5pZCksci5vbihcImVuZFwiLGYpfSxpL3IuX3JhdGUqMWUzKSxyLl9vbmVuZFRpbWVyLnB1c2goe3RpbWVyOnUsaWQ6by5pZH0pfSgpLHIuX3dlYkF1ZGlvKXt2YXIgcz1yLl9zcHJpdGVbZV1bMF0vMWUzLF89ci5fc3ByaXRlW2VdWzFdLzFlMzt0LmlkPWYsdC5wYXVzZWQ9ITEscChyLFtkLHMsX10sZiksci5fcGxheVN0YXJ0PW8uY3VycmVudFRpbWUsdC5nYWluLnZhbHVlPXIuX3ZvbHVtZSxcInVuZGVmaW5lZFwiPT10eXBlb2YgdC5idWZmZXJTb3VyY2Uuc3RhcnQ/ZD90LmJ1ZmZlclNvdXJjZS5ub3RlR3JhaW5PbigwLGEsODY0MDApOnQuYnVmZmVyU291cmNlLm5vdGVHcmFpbk9uKDAsYSxpKTpkP3QuYnVmZmVyU291cmNlLnN0YXJ0KDAsYSw4NjQwMCk6dC5idWZmZXJTb3VyY2Uuc3RhcnQoMCxhLGkpfWVsc2V7aWYoNCE9PXQucmVhZHlTdGF0ZSYmKHQucmVhZHlTdGF0ZXx8IW5hdmlnYXRvci5pc0NvY29vbkpTKSlyZXR1cm4gci5fY2xlYXJFbmRUaW1lcihmKSxmdW5jdGlvbigpe3ZhciBvPXIsYT1lLGk9bix1PXQsZD1mdW5jdGlvbigpe28ucGxheShhLGkpLHUucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNhbnBsYXl0aHJvdWdoXCIsZCwhMSl9O3UuYWRkRXZlbnRMaXN0ZW5lcihcImNhbnBsYXl0aHJvdWdoXCIsZCwhMSl9KCkscjt0LnJlYWR5U3RhdGU9NCx0LmlkPWYsdC5jdXJyZW50VGltZT1hLHQubXV0ZWQ9bC5fbXV0ZWR8fHQubXV0ZWQsdC52b2x1bWU9ci5fdm9sdW1lKmwudm9sdW1lKCksc2V0VGltZW91dChmdW5jdGlvbigpe3QucGxheSgpfSwwKX1yZXR1cm4gci5vbihcInBsYXlcIiksXCJmdW5jdGlvblwiPT10eXBlb2YgbiYmbihmKSxyfSkscik6KFwiZnVuY3Rpb25cIj09dHlwZW9mIG4mJm4oKSxyKTooci5vbihcImxvYWRcIixmdW5jdGlvbigpe3IucGxheShlLG4pfSkscil9LHBhdXNlOmZ1bmN0aW9uKGUpe3ZhciBvPXRoaXM7aWYoIW8uX2xvYWRlZClyZXR1cm4gby5vbihcInBsYXlcIixmdW5jdGlvbigpe28ucGF1c2UoZSl9KSxvO28uX2NsZWFyRW5kVGltZXIoZSk7dmFyIG49ZT9vLl9ub2RlQnlJZChlKTpvLl9hY3RpdmVOb2RlKCk7aWYobilpZihuLl9wb3M9by5wb3MobnVsbCxlKSxvLl93ZWJBdWRpbyl7aWYoIW4uYnVmZmVyU291cmNlfHxuLnBhdXNlZClyZXR1cm4gbztuLnBhdXNlZD0hMCxcInVuZGVmaW5lZFwiPT10eXBlb2Ygbi5idWZmZXJTb3VyY2Uuc3RvcD9uLmJ1ZmZlclNvdXJjZS5ub3RlT2ZmKDApOm4uYnVmZmVyU291cmNlLnN0b3AoMCl9ZWxzZSBuLnBhdXNlKCk7cmV0dXJuIG8ub24oXCJwYXVzZVwiKSxvfSxzdG9wOmZ1bmN0aW9uKGUpe3ZhciBvPXRoaXM7aWYoIW8uX2xvYWRlZClyZXR1cm4gby5vbihcInBsYXlcIixmdW5jdGlvbigpe28uc3RvcChlKX0pLG87by5fY2xlYXJFbmRUaW1lcihlKTt2YXIgbj1lP28uX25vZGVCeUlkKGUpOm8uX2FjdGl2ZU5vZGUoKTtpZihuKWlmKG4uX3Bvcz0wLG8uX3dlYkF1ZGlvKXtpZighbi5idWZmZXJTb3VyY2V8fG4ucGF1c2VkKXJldHVybiBvO24ucGF1c2VkPSEwLFwidW5kZWZpbmVkXCI9PXR5cGVvZiBuLmJ1ZmZlclNvdXJjZS5zdG9wP24uYnVmZmVyU291cmNlLm5vdGVPZmYoMCk6bi5idWZmZXJTb3VyY2Uuc3RvcCgwKX1lbHNlIGlzTmFOKG4uZHVyYXRpb24pfHwobi5wYXVzZSgpLG4uY3VycmVudFRpbWU9MCk7cmV0dXJuIG99LG11dGU6ZnVuY3Rpb24oZSl7dmFyIG89dGhpcztpZighby5fbG9hZGVkKXJldHVybiBvLm9uKFwicGxheVwiLGZ1bmN0aW9uKCl7by5tdXRlKGUpfSksbzt2YXIgbj1lP28uX25vZGVCeUlkKGUpOm8uX2FjdGl2ZU5vZGUoKTtyZXR1cm4gbiYmKG8uX3dlYkF1ZGlvP24uZ2Fpbi52YWx1ZT0wOm4ubXV0ZWQ9ITApLG99LHVubXV0ZTpmdW5jdGlvbihlKXt2YXIgbz10aGlzO2lmKCFvLl9sb2FkZWQpcmV0dXJuIG8ub24oXCJwbGF5XCIsZnVuY3Rpb24oKXtvLnVubXV0ZShlKX0pLG87dmFyIG49ZT9vLl9ub2RlQnlJZChlKTpvLl9hY3RpdmVOb2RlKCk7cmV0dXJuIG4mJihvLl93ZWJBdWRpbz9uLmdhaW4udmFsdWU9by5fdm9sdW1lOm4ubXV0ZWQ9ITEpLG99LHZvbHVtZTpmdW5jdGlvbihlLG8pe3ZhciBuPXRoaXM7aWYoZT1wYXJzZUZsb2F0KGUpLGU+PTAmJjE+PWUpe2lmKG4uX3ZvbHVtZT1lLCFuLl9sb2FkZWQpcmV0dXJuIG4ub24oXCJwbGF5XCIsZnVuY3Rpb24oKXtuLnZvbHVtZShlLG8pfSksbjt2YXIgcj1vP24uX25vZGVCeUlkKG8pOm4uX2FjdGl2ZU5vZGUoKTtyZXR1cm4gciYmKG4uX3dlYkF1ZGlvP3IuZ2Fpbi52YWx1ZT1lOnIudm9sdW1lPWUqbC52b2x1bWUoKSksbn1yZXR1cm4gbi5fdm9sdW1lfSxsb29wOmZ1bmN0aW9uKGUpe3ZhciBvPXRoaXM7cmV0dXJuXCJib29sZWFuXCI9PXR5cGVvZiBlPyhvLl9sb29wPWUsbyk6by5fbG9vcH0sc3ByaXRlOmZ1bmN0aW9uKGUpe3ZhciBvPXRoaXM7cmV0dXJuXCJvYmplY3RcIj09dHlwZW9mIGU/KG8uX3Nwcml0ZT1lLG8pOm8uX3Nwcml0ZX0scG9zOmZ1bmN0aW9uKGUsbil7dmFyIHI9dGhpcztpZighci5fbG9hZGVkKXJldHVybiByLm9uKFwibG9hZFwiLGZ1bmN0aW9uKCl7ci5wb3MoZSl9KSxcIm51bWJlclwiPT10eXBlb2YgZT9yOnIuX3Bvc3x8MDtlPXBhcnNlRmxvYXQoZSk7dmFyIHQ9bj9yLl9ub2RlQnlJZChuKTpyLl9hY3RpdmVOb2RlKCk7aWYodClyZXR1cm4gZT49MD8oci5wYXVzZShuKSx0Ll9wb3M9ZSxyLnBsYXkodC5fc3ByaXRlLG4pLHIpOnIuX3dlYkF1ZGlvP3QuX3Bvcysoby5jdXJyZW50VGltZS1yLl9wbGF5U3RhcnQpOnQuY3VycmVudFRpbWU7aWYoZT49MClyZXR1cm4gcjtmb3IodmFyIGE9MDthPHIuX2F1ZGlvTm9kZS5sZW5ndGg7YSsrKWlmKHIuX2F1ZGlvTm9kZVthXS5wYXVzZWQmJjQ9PT1yLl9hdWRpb05vZGVbYV0ucmVhZHlTdGF0ZSlyZXR1cm4gci5fd2ViQXVkaW8/ci5fYXVkaW9Ob2RlW2FdLl9wb3M6ci5fYXVkaW9Ob2RlW2FdLmN1cnJlbnRUaW1lfSxwb3MzZDpmdW5jdGlvbihlLG8sbixyKXt2YXIgdD10aGlzO2lmKG89XCJ1bmRlZmluZWRcIiE9dHlwZW9mIG8mJm8/bzowLG49XCJ1bmRlZmluZWRcIiE9dHlwZW9mIG4mJm4/bjotLjUsIXQuX2xvYWRlZClyZXR1cm4gdC5vbihcInBsYXlcIixmdW5jdGlvbigpe3QucG9zM2QoZSxvLG4scil9KSx0O2lmKCEoZT49MHx8MD5lKSlyZXR1cm4gdC5fcG9zM2Q7aWYodC5fd2ViQXVkaW8pe3ZhciBhPXI/dC5fbm9kZUJ5SWQocik6dC5fYWN0aXZlTm9kZSgpO2EmJih0Ll9wb3MzZD1bZSxvLG5dLGEucGFubmVyLnNldFBvc2l0aW9uKGUsbyxuKSxhLnBhbm5lci5wYW5uaW5nTW9kZWw9dC5fbW9kZWx8fFwiSFJURlwiKX1yZXR1cm4gdH0sZmFkZTpmdW5jdGlvbihlLG8sbixyLHQpe3ZhciBhPXRoaXMsaT1NYXRoLmFicyhlLW8pLHU9ZT5vP1wiZG93blwiOlwidXBcIixkPWkvLjAxLGw9bi9kO2lmKCFhLl9sb2FkZWQpcmV0dXJuIGEub24oXCJsb2FkXCIsZnVuY3Rpb24oKXthLmZhZGUoZSxvLG4scix0KX0pLGE7YS52b2x1bWUoZSx0KTtmb3IodmFyIGY9MTtkPj1mO2YrKykhZnVuY3Rpb24oKXt2YXIgZT1hLl92b2x1bWUrKFwidXBcIj09PXU/LjAxOi0uMDEpKmYsbj1NYXRoLnJvdW5kKDFlMyplKS8xZTMsaT1vO3NldFRpbWVvdXQoZnVuY3Rpb24oKXthLnZvbHVtZShuLHQpLG49PT1pJiZyJiZyKCl9LGwqZil9KCl9LGZhZGVJbjpmdW5jdGlvbihlLG8sbil7cmV0dXJuIHRoaXMudm9sdW1lKDApLnBsYXkoKS5mYWRlKDAsZSxvLG4pfSxmYWRlT3V0OmZ1bmN0aW9uKGUsbyxuLHIpe3ZhciB0PXRoaXM7cmV0dXJuIHQuZmFkZSh0Ll92b2x1bWUsZSxvLGZ1bmN0aW9uKCl7biYmbigpLHQucGF1c2UociksdC5vbihcImVuZFwiKX0scil9LF9ub2RlQnlJZDpmdW5jdGlvbihlKXtmb3IodmFyIG89dGhpcyxuPW8uX2F1ZGlvTm9kZVswXSxyPTA7cjxvLl9hdWRpb05vZGUubGVuZ3RoO3IrKylpZihvLl9hdWRpb05vZGVbcl0uaWQ9PT1lKXtuPW8uX2F1ZGlvTm9kZVtyXTticmVha31yZXR1cm4gbn0sX2FjdGl2ZU5vZGU6ZnVuY3Rpb24oKXtmb3IodmFyIGU9dGhpcyxvPW51bGwsbj0wO248ZS5fYXVkaW9Ob2RlLmxlbmd0aDtuKyspaWYoIWUuX2F1ZGlvTm9kZVtuXS5wYXVzZWQpe289ZS5fYXVkaW9Ob2RlW25dO2JyZWFrfXJldHVybiBlLl9kcmFpblBvb2woKSxvfSxfaW5hY3RpdmVOb2RlOmZ1bmN0aW9uKGUpe2Zvcih2YXIgbz10aGlzLG49bnVsbCxyPTA7cjxvLl9hdWRpb05vZGUubGVuZ3RoO3IrKylpZihvLl9hdWRpb05vZGVbcl0ucGF1c2VkJiY0PT09by5fYXVkaW9Ob2RlW3JdLnJlYWR5U3RhdGUpe2Uoby5fYXVkaW9Ob2RlW3JdKSxuPSEwO2JyZWFrfWlmKG8uX2RyYWluUG9vbCgpLCFuKXt2YXIgdDtpZihvLl93ZWJBdWRpbyl0PW8uX3NldHVwQXVkaW9Ob2RlKCksZSh0KTtlbHNle28ubG9hZCgpLHQ9by5fYXVkaW9Ob2RlW28uX2F1ZGlvTm9kZS5sZW5ndGgtMV07dmFyIGE9bmF2aWdhdG9yLmlzQ29jb29uSlM/XCJjYW5wbGF5dGhyb3VnaFwiOlwibG9hZGVkbWV0YWRhdGFcIixpPWZ1bmN0aW9uKCl7dC5yZW1vdmVFdmVudExpc3RlbmVyKGEsaSwhMSksZSh0KX07dC5hZGRFdmVudExpc3RlbmVyKGEsaSwhMSl9fX0sX2RyYWluUG9vbDpmdW5jdGlvbigpe3ZhciBlLG89dGhpcyxuPTA7Zm9yKGU9MDtlPG8uX2F1ZGlvTm9kZS5sZW5ndGg7ZSsrKW8uX2F1ZGlvTm9kZVtlXS5wYXVzZWQmJm4rKztmb3IoZT1vLl9hdWRpb05vZGUubGVuZ3RoLTE7ZT49MCYmISg1Pj1uKTtlLS0pby5fYXVkaW9Ob2RlW2VdLnBhdXNlZCYmKG8uX3dlYkF1ZGlvJiZvLl9hdWRpb05vZGVbZV0uZGlzY29ubmVjdCgwKSxuLS0sby5fYXVkaW9Ob2RlLnNwbGljZShlLDEpKX0sX2NsZWFyRW5kVGltZXI6ZnVuY3Rpb24oZSl7Zm9yKHZhciBvPXRoaXMsbj0tMSxyPTA7cjxvLl9vbmVuZFRpbWVyLmxlbmd0aDtyKyspaWYoby5fb25lbmRUaW1lcltyXS5pZD09PWUpe249cjticmVha312YXIgdD1vLl9vbmVuZFRpbWVyW25dO3QmJihjbGVhclRpbWVvdXQodC50aW1lciksby5fb25lbmRUaW1lci5zcGxpY2UobiwxKSl9LF9zZXR1cEF1ZGlvTm9kZTpmdW5jdGlvbigpe3ZhciBlPXRoaXMsbj1lLl9hdWRpb05vZGUscj1lLl9hdWRpb05vZGUubGVuZ3RoO3JldHVybiBuW3JdPVwidW5kZWZpbmVkXCI9PXR5cGVvZiBvLmNyZWF0ZUdhaW4/by5jcmVhdGVHYWluTm9kZSgpOm8uY3JlYXRlR2FpbigpLG5bcl0uZ2Fpbi52YWx1ZT1lLl92b2x1bWUsbltyXS5wYXVzZWQ9ITAsbltyXS5fcG9zPTAsbltyXS5yZWFkeVN0YXRlPTQsbltyXS5jb25uZWN0KGEpLG5bcl0ucGFubmVyPW8uY3JlYXRlUGFubmVyKCksbltyXS5wYW5uZXIucGFubmluZ01vZGVsPWUuX21vZGVsfHxcImVxdWFscG93ZXJcIixuW3JdLnBhbm5lci5zZXRQb3NpdGlvbihlLl9wb3MzZFswXSxlLl9wb3MzZFsxXSxlLl9wb3MzZFsyXSksbltyXS5wYW5uZXIuY29ubmVjdChuW3JdKSxuW3JdfSxvbjpmdW5jdGlvbihlLG8pe3ZhciBuPXRoaXMscj1uW1wiX29uXCIrZV07aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgbylyLnB1c2gobyk7ZWxzZSBmb3IodmFyIHQ9MDt0PHIubGVuZ3RoO3QrKylvP3JbdF0uY2FsbChuLG8pOnJbdF0uY2FsbChuKTtyZXR1cm4gbn0sb2ZmOmZ1bmN0aW9uKGUsbyl7dmFyIG49dGhpcyxyPW5bXCJfb25cIitlXTtpZihvKXtmb3IodmFyIHQ9MDt0PHIubGVuZ3RoO3QrKylpZihvPT09clt0XSl7ci5zcGxpY2UodCwxKTticmVha319ZWxzZSBuW1wiX29uXCIrZV09W107cmV0dXJuIG59LHVubG9hZDpmdW5jdGlvbigpe2Zvcih2YXIgbz10aGlzLG49by5fYXVkaW9Ob2RlLHI9MDtyPG8uX2F1ZGlvTm9kZS5sZW5ndGg7cisrKW5bcl0ucGF1c2VkfHwoby5zdG9wKG5bcl0uaWQpLG8ub24oXCJlbmRcIixuW3JdLmlkKSksby5fd2ViQXVkaW8/bltyXS5kaXNjb25uZWN0KDApOm5bcl0uc3JjPVwiXCI7Zm9yKHI9MDtyPG8uX29uZW5kVGltZXIubGVuZ3RoO3IrKyljbGVhclRpbWVvdXQoby5fb25lbmRUaW1lcltyXS50aW1lcik7dmFyIHQ9bC5faG93bHMuaW5kZXhPZihvKTtudWxsIT09dCYmdD49MCYmbC5faG93bHMuc3BsaWNlKHQsMSksZGVsZXRlIGVbby5fc3JjXSxvPW51bGx9fSxuKXZhciBzPWZ1bmN0aW9uKG8sbil7aWYobiBpbiBlKXJldHVybiBvLl9kdXJhdGlvbj1lW25dLmR1cmF0aW9uLHZvaWQgYyhvKTtpZigvXmRhdGE6W147XSs7YmFzZTY0LC8udGVzdChuKSl7Zm9yKHZhciByPWF0b2Iobi5zcGxpdChcIixcIilbMV0pLHQ9bmV3IFVpbnQ4QXJyYXkoci5sZW5ndGgpLGE9MDthPHIubGVuZ3RoOysrYSl0W2FdPXIuY2hhckNvZGVBdChhKTtfKHQuYnVmZmVyLG8sbil9ZWxzZXt2YXIgaT1uZXcgWE1MSHR0cFJlcXVlc3Q7aS5vcGVuKFwiR0VUXCIsbiwhMCksaS5yZXNwb25zZVR5cGU9XCJhcnJheWJ1ZmZlclwiLGkub25sb2FkPWZ1bmN0aW9uKCl7XyhpLnJlc3BvbnNlLG8sbil9LGkub25lcnJvcj1mdW5jdGlvbigpe28uX3dlYkF1ZGlvJiYoby5fYnVmZmVyPSEwLG8uX3dlYkF1ZGlvPSExLG8uX2F1ZGlvTm9kZT1bXSxkZWxldGUgby5fZ2Fpbk5vZGUsZGVsZXRlIGVbbl0sby5sb2FkKCkpfTt0cnl7aS5zZW5kKCl9Y2F0Y2godSl7aS5vbmVycm9yKCl9fX0sXz1mdW5jdGlvbihuLHIsdCl7by5kZWNvZGVBdWRpb0RhdGEobixmdW5jdGlvbihvKXtvJiYoZVt0XT1vLGMocixvKSl9LGZ1bmN0aW9uKGUpe3Iub24oXCJsb2FkZXJyb3JcIixlKX0pfSxjPWZ1bmN0aW9uKGUsbyl7ZS5fZHVyYXRpb249bz9vLmR1cmF0aW9uOmUuX2R1cmF0aW9uLDA9PT1PYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhlLl9zcHJpdGUpLmxlbmd0aCYmKGUuX3Nwcml0ZT17X2RlZmF1bHQ6WzAsMWUzKmUuX2R1cmF0aW9uXX0pLGUuX2xvYWRlZHx8KGUuX2xvYWRlZD0hMCxlLm9uKFwibG9hZFwiKSksZS5fYXV0b3BsYXkmJmUucGxheSgpfSxwPWZ1bmN0aW9uKG4scix0KXt2YXIgYT1uLl9ub2RlQnlJZCh0KTthLmJ1ZmZlclNvdXJjZT1vLmNyZWF0ZUJ1ZmZlclNvdXJjZSgpLGEuYnVmZmVyU291cmNlLmJ1ZmZlcj1lW24uX3NyY10sYS5idWZmZXJTb3VyY2UuY29ubmVjdChhLnBhbm5lciksYS5idWZmZXJTb3VyY2UubG9vcD1yWzBdLHJbMF0mJihhLmJ1ZmZlclNvdXJjZS5sb29wU3RhcnQ9clsxXSxhLmJ1ZmZlclNvdXJjZS5sb29wRW5kPXJbMV0rclsyXSksYS5idWZmZXJTb3VyY2UucGxheWJhY2tSYXRlLnZhbHVlPW4uX3JhdGV9O1wiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZCYmZGVmaW5lKGZ1bmN0aW9uKCl7cmV0dXJue0hvd2xlcjpsLEhvd2w6Zn19KSxcInVuZGVmaW5lZFwiIT10eXBlb2YgZXhwb3J0cyYmKGV4cG9ydHMuSG93bGVyPWwsZXhwb3J0cy5Ib3dsPWYpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3cmJih3aW5kb3cuSG93bGVyPWwsd2luZG93Lkhvd2w9Zil9KCk7XHJcbiIsImltcG9ydCBcInRoZW1lL2RlZmF1bHRcIjtcclxuaW1wb3J0IFwibGliL2hvd2xlci5taW5cIjtcclxuaW1wb3J0IHtTZXR0aW5ncywgR2xvYmFsU2V0dGluZ3N9IGZyb20gXCJzZXR0aW5nc1wiO1xyXG5pbXBvcnQgRGF0YUNlbnRlciBmcm9tIFwiZGF0YWNlbnRlclwiO1xyXG5cclxuaW1wb3J0IE1haW5TY3JlZW4gZnJvbSAnc2NyZWVuL21haW5zY3JlZW4nO1xyXG5pbXBvcnQgR2FtZVNjcmVlbiBmcm9tICdzY3JlZW4vZ2FtZXNjcmVlbic7XHJcblxyXG5jb25zdCB7Um91dGV9ID0gUmVhY3RSb3V0ZXI7XHJcblxyXG5pZiAoU2V0dGluZ3MuaGFzKFwidmVyc2lvblwiKSA9PT0gZmFsc2UpIHtcclxuICAgIFNldHRpbmdzLndyaXRlKFwidmVyc2lvblwiLCAwKTtcclxuICAgIFNldHRpbmdzLndyaXRlKFwidGltZXJEdXJhdGlvblwiLCA1MDAwKTtcclxufVxyXG5TZXR0aW5ncy53cml0ZShcInRpbWVyRHVyYXRpb25cIiwgNDAwMCk7XHJcblxyXG5BcHAuc3RhcnQoXHJcbiAgICA8Um91dGU+XHJcbiAgICAgICAgPFJvdXRlIHBhdGg9XCIvXCIgY29tcG9uZW50PXtNYWluU2NyZWVufSAvPlxyXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiL2dhbWVcIiBjb21wb25lbnQ9e0dhbWVTY3JlZW59IC8+XHJcbiAgICA8L1JvdXRlPixcclxuICAgIHtcclxuICAgICAgICBpbml0aWFsUGF0aDogJy9nYW1lJ1xyXG4gICAgfVxyXG4pO1xyXG4iLCJpbXBvcnQgR2FtZVN0YXRlIGZyb20gJ2dhbWVzdGF0ZSc7XHJcbmltcG9ydCBDb250YWluZXIgZnJvbSAnY29tcG9uZW50L2NvbnRhaW5lcic7XHJcbmltcG9ydCBTdWJzY3JpYmFibGUgZnJvbSAnY29tcG9uZW50L3N1YnNjcmliYWJsZSc7XHJcbmltcG9ydCB7U2V0dGluZ3N9IGZyb20gJ3NldHRpbmdzJztcclxuXHJcbmNvbnN0IGFuaW1hdGlvblRpbWUgPSAyNTA7XHJcblxyXG5TdHlsZS5jcmVhdGUoXHJcbiAgICAnZ2FtZScsXHJcbiAgICB7XHJcbiAgICAgICAgXCIuY2FyZFwiOiB7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG4gICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCgtNTAlLCAtNTAlLCAwKScsXHJcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3doaXRlJyxcclxuICAgICAgICAgICAgYm9yZGVyV2lkdGg6IDMsXHJcbiAgICAgICAgICAgIGJvcmRlclN0eWxlOiAnc29saWQnLFxyXG4gICAgICAgICAgICBib3JkZXJDb2xvcjogJ3RyYW5zcGFyZW50JyxcclxuICAgICAgICAgICAgYm94U2hhZG93OiAnMXB4IDFweCAxcHggcmdiYSgwLCAwLCAwLCAwLjM1KScsXHJcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogNSxcclxuICAgICAgICAgICAgXCI6IGJlZm9yZVwiOiB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50OiAnXCJcIicsXHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnYmxvY2snLFxyXG4gICAgICAgICAgICAgICAgcGFkZGluZ1RvcDogJzEwMCUnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiLmNhcmRJbm5lclwiOiB7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG4gICAgICAgICAgICB0b3A6IDAsXHJcbiAgICAgICAgICAgIGxlZnQ6IDAsXHJcbiAgICAgICAgICAgIHJpZ2h0OiAwLFxyXG4gICAgICAgICAgICBib3R0b206IDAsXHJcbiAgICAgICAgICAgIHBhZGRpbmc6IDJcclxuICAgICAgICB9XHJcbiAgICB9XHJcbik7XHJcblxyXG5jb25zdCBjb2xsaXNpb24gPSAoYSwgYikgPT4gKGEubGVmdCA8IGIubGVmdCArIGIud2lkdGggJiZcclxuICAgIGEubGVmdCArIGEud2lkdGggPiBiLmxlZnQgJiZcclxuICAgIGEudG9wIDwgYi50b3AgKyBiLmhlaWdodCAmJlxyXG4gICAgYS5oZWlnaHQgKyBhLnRvcCA+IGIudG9wKTtcclxuY2xhc3MgQ0RDYXJkIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHg6IHRoaXMucHJvcHMueDAsXHJcbiAgICAgICAgICAgIHk6IHRoaXMucHJvcHMueTAsXHJcbiAgICAgICAgICAgIGFuaW1hdGluZzogZmFsc2UsXHJcbiAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgZmlsbDogMCxcclxuICAgICAgICAgICAgYWN0aXZlOiBmYWxzZVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy50b3VjaElEID0gbnVsbDtcclxuICAgICAgICB0aGlzLmZpbGxUb2tlbiA9IG51bGw7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMubW92YWJsZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmFuc3dlclRva2VuID0gUHViU3ViLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgIFwiY2FtcGRpc2NvLmdhbWUuZm9yY2VBbnN3ZXJcIixcclxuICAgICAgICAgICAgICAgICh0LCBkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codCwgc2VuZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maW5pc2goZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5hbnN3ZXJUb2tlbiA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlY3QgPSAoKSA9PiB0aGlzLnJlZnMud3JhcHBlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxyXG5cclxuICAgIHNpZ25hbCA9IChzZWxlY3RlZCwgZmlsbGVyKSA9PiB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coYWN0aXZlLCBmaWxsZXIpO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3NlbGVjdGVkLCBmaWxsOiAwfSk7XHJcbiAgICAgICAgaWYgKGZpbGxlciA9PT0gdHJ1ZSAmJiBzZWxlY3RlZCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmZpbGxUb2tlbiA9IFB1YlN1Yi5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgICAnc3lzdGVtLmZyYW1lZHJhdycsXHJcbiAgICAgICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHtmaWxsfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsbCArPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2ZpbGx9KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsbCA9PT0gNjApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgUHViU3ViLnVuc3Vic2NyaWJlKHRoaXMuZmlsbFRva2VuKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maWxsVG9rZW4gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBQdWJTdWIucHVibGlzaChcImNhbXBkaXNjby5nYW1lLmZvcmNlQW5zd2VyXCIsIFtudWxsLCBudWxsXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZpbGxUb2tlbiAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgUHViU3ViLnVuc3Vic2NyaWJlKHRoaXMuZmlsbFRva2VuKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlsbFRva2VuID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXR1cE1vdmUgPSAoZXZ0KSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMudG91Y2hJRCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHt0YXJnZXR9ID0gZXZ0O1xyXG4gICAgICAgIGNvbnN0IFt0b3VjaF0gPSBldnQuY2hhbmdlZFRvdWNoZXM7XHJcbiAgICAgICAgY29uc3Qge2NsaWVudFg6IHgsIGNsaWVudFk6IHl9ID0gdG91Y2g7XHJcbiAgICAgICAgY29uc3QgcmVjdCA9IHRoaXMucmVjdCgpO1xyXG5cclxuICAgICAgICB0aGlzLnRvdWNoSUQgPSB0b3VjaC5pZGVudGlmaWVyO1xyXG4gICAgICAgIHRoaXMub2Zmc2V0ID0ge3g6IHggLSAocmVjdC5sZWZ0ICsgcmVjdC53aWR0aCAvIDIpLCB5OiB5IC0gKHJlY3QudG9wICsgcmVjdC5oZWlnaHQgLyAyKX07XHJcbiAgICAgICAgdGhpcy5wcmV2Q29sbGlzaW9uID0gdGhpcy5wcm9wcy5vdGhlcnMubWFwKCgpID0+IGZhbHNlKTtcclxuICAgICAgICB0aGlzLnByZXZGaWxsID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5wcmV2Q291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2FjdGl2ZTogdHJ1ZX0pO1xyXG4gICAgfVxyXG4gICAgb25Ub3VjaE1vdmUgPSAoZXZ0KSA9PiB7XHJcbiAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuYWN0aXZlID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBjb25zdCBbdG91Y2hdID0gZXZ0LmNoYW5nZWRUb3VjaGVzO1xyXG4gICAgICAgIGNvbnN0IHRvdWNoID0gQXJyYXkucHJvdG90eXBlLmZpbmQuY2FsbChldnQuY2hhbmdlZFRvdWNoZXMsIHRvdWNoID0+IHRvdWNoLmlkZW50aWZpZXIgPT09IHRoaXMudG91Y2hJRCk7XHJcbiAgICAgICAgaWYgKHRvdWNoID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQge2NsaWVudFg6IHgsIGNsaWVudFk6IHl9ID0gdG91Y2g7XHJcblxyXG4gICAgICAgIHggLT0gdGhpcy5vZmZzZXQueDtcclxuICAgICAgICB5IC09IHRoaXMub2Zmc2V0Lnk7XHJcblxyXG4gICAgICAgIHggPSAoeCAvIEFwcC52aWV3cG9ydC53aWR0aCkgKiAxMDA7XHJcbiAgICAgICAgeSA9ICh5IC8gQXBwLnZpZXdwb3J0LmhlaWdodCkgKiAxMDA7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3gsIHl9KTtcclxuICAgIH1cclxuICAgIGZpbmlzaCA9IChbZXZ0LCBmb3JjZWQgPSBudWxsXSkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmFjdGl2ZSA9PT0gZmFsc2UgJiYgZm9yY2VkID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGV2dCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBjb25zdCB0b3VjaCA9IEFycmF5LnByb3RvdHlwZS5maW5kLmNhbGwoZXZ0LmNoYW5nZWRUb3VjaGVzLCB0b3VjaCA9PiB0b3VjaC5pZGVudGlmaWVyID09PSB0aGlzLnRvdWNoSUQpO1xyXG4gICAgICAgICAgICBpZiAodG91Y2ggPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYW5zd2VyID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IG5ld1BvcyA9IHt9O1xyXG5cclxuICAgICAgICBpZiAodGhpcy5wcmV2Q291bnQgPT09IDEpIHtcclxuICAgICAgICAgICAgYW5zd2VyID0gdGhpcy5wcm9wcy5vdGhlcnNbdGhpcy5wcmV2Q29sbGlzaW9uLmluZGV4T2YodHJ1ZSldLnByb3BzLmNvcnJlY3Q7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChmb3JjZWQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgYW5zd2VyID0gZm9yY2VkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgUHViU3ViLnB1Ymxpc2goXCJjYW1wZGlzY28uZ2FtZS5hbnN3ZXJcIiwgYW5zd2VyKTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIHg6IHRoaXMucHJvcHMueDAsXHJcbiAgICAgICAgICAgIHk6IHRoaXMucHJvcHMueTAsXHJcbiAgICAgICAgICAgIGFuaW1hdGluZzogdHJ1ZSxcclxuICAgICAgICAgICAgYWN0aXZlOiBmYWxzZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMudG91Y2hJRCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5wcmV2RmlsbCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucHJldkNvdW50ID0gMDtcclxuICAgICAgICB0aGlzLnByZXZDb2xsaXNpb24gPSB0aGlzLnByb3BzLm90aGVycy5tYXAoKCkgPT4gZmFsc2UpO1xyXG4gICAgICAgIGZvciAoY29uc3Qgb3RoZXIgb2YgdGhpcy5wcm9wcy5vdGhlcnMpIHtcclxuICAgICAgICAgICAgb3RoZXIuc2lnbmFsKGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNocm9uby50cmlnZ2VyKFxyXG4gICAgICAgICAgICBhbmltYXRpb25UaW1lLFxyXG4gICAgICAgICAgICAoKSA9PiB0aGlzLnNldFN0YXRlKHthbmltYXRpbmc6IGZhbHNlfSlcclxuICAgICAgICApO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdkb25lIScpO1xyXG4gICAgfVxyXG4gICAgdG91Y2hFbmQgPSAoZXZ0KSA9PiBQdWJTdWIucHVibGlzaFN5bmMoXCJjYW1wZGlzY28uZ2FtZS5mb3JjZUFuc3dlclwiLCBbZXZ0LCBudWxsXSlcclxuXHJcbiAgICBjb21wb25lbnREaWRVcGRhdGUgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMubW92YWJsZSA9PT0gZmFsc2UgfHwgdGhpcy5zdGF0ZS5hbmltYXRpbmcgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qge3ByZXZGaWxsLCBwcmV2Q291bnQsIHByZXZDb2xsaXNpb259ID0gdGhpcztcclxuICAgICAgICBjb25zdCByZWN0ID0gdGhpcy5yZWN0KCk7XHJcbiAgICAgICAgY29uc3QgbmV3Q29sbGlzaW9ucyA9IHRoaXMucHJvcHMub3RoZXJzLm1hcChvdGhlciA9PiBjb2xsaXNpb24ocmVjdCwgb3RoZXIucmVjdCgpKSk7XHJcbiAgICAgICAgY29uc3QgbmV3Q291bnQgPSBuZXdDb2xsaXNpb25zLmZpbHRlcihpID0+IGkgPT09IHRydWUpLmxlbmd0aDtcclxuICAgICAgICBjb25zdCBzaG91bGRGaWxsID0gbmV3Q291bnQgPT09IDE7XHJcblxyXG4gICAgICAgIG5ld0NvbGxpc2lvbnMuZm9yRWFjaChcclxuICAgICAgICAgICAgKGN1cnJlbnQsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwcmV2ID0gcHJldkNvbGxpc2lvbltpbmRleF07XHJcbiAgICAgICAgICAgICAgICBpZiAocHJldkZpbGwgIT09IHNob3VsZEZpbGwgfHwgbmV3Q291bnQgIT09IHByZXZDb3VudCB8fCBjdXJyZW50ICE9PSBwcmV2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5vdGhlcnNbaW5kZXhdLnNpZ25hbChjdXJyZW50LCBzaG91bGRGaWxsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5wcmV2Q29sbGlzaW9uID0gbmV3Q29sbGlzaW9ucztcclxuICAgICAgICB0aGlzLnByZXZGaWxsID0gc2hvdWxkRmlsbDtcclxuICAgICAgICB0aGlzLnByZXZDb3VudCA9IG5ld0NvdW50O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50ID0gKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmFuc3dlclRva2VuICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIFB1YlN1Yi51bnN1YnNjcmliZSh0aGlzLmFuc3dlclRva2VuKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuZmlsbFRva2VuICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIFB1YlN1Yi51bnN1YnNjcmliZSh0aGlzLmZpbGxUb2tlbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlciA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCB7Y2hpbGRyZW4sIHN0eWxlLCB3aWR0aCwgb25EcmFnLCBvbkRyYWdTdGFydCwgb25EcmFnRW5kLCB0b3AsIG1vdmFibGUsIHNpemV9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCB7eCwgeSwgYW5pbWF0aW5nLCBmaWxsfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgY29uc3QgY2FyZFN0eWxlID0ge1xyXG4gICAgICAgICAgICB3aWR0aDogYCR7d2lkdGggKiBzaXplfXZoYCxcclxuICAgICAgICAgICAgdG9wOiBgJHt5fSVgLFxyXG4gICAgICAgICAgICBsZWZ0OiBgJHt4fSVgLFxyXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiBhbmltYXRpbmcgPT09IHRydWUgPyBgdG9wICR7YW5pbWF0aW9uVGltZX1tcyBsaW5lYXIsIGxlZnQgJHthbmltYXRpb25UaW1lfW1zIGxpbmVhciwgd2lkdGggJHthbmltYXRpb25UaW1lfW1zIGxpbmVhcmAgOiBudWxsLFxyXG4gICAgICAgICAgICB6SW5kZXg6IHRvcCA9PT0gdHJ1ZSA/ICcrMTAwJyA6IG51bGxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IGxpc3RlbmVycyA9IG1vdmFibGUgPT09IHRydWUgP1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBvblRvdWNoU3RhcnQ6IHRoaXMuc2V0dXBNb3ZlLFxyXG4gICAgICAgICAgICAgICAgb25Ub3VjaE1vdmU6IHRoaXMub25Ub3VjaE1vdmUsXHJcbiAgICAgICAgICAgICAgICBvblRvdWNoRW5kOiB0aGlzLnRvdWNoRW5kLFxyXG4gICAgICAgICAgICAgICAgb25Ub3VjaENhbmNlbDogdGhpcy50b3VjaEVuZFxyXG4gICAgICAgICAgICB9IDpcclxuICAgICAgICAgICAge307XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnNlbGVjdGVkID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGNhcmRTdHlsZS5ib3JkZXJDb2xvciA9ICdjeWFuJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtTdHlsZS5nZXRDbGFzc05hbWUoJ2dhbWU6Y2FyZCcpfSBzdHlsZT17Y2FyZFN0eWxlfSB7Li4ubGlzdGVuZXJzfSByZWY9XCJ3cmFwcGVyXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7cG9zaXRpb246ICdhYnNvbHV0ZScsIGJvdHRvbTogMCwgbGVmdDogMCwgcmlnaHQ6IDAsIGhlaWdodDogYCR7ZmlsbCAqIDEuNjY2NjZ9JWAsIGJhY2tncm91bmRDb2xvcjogJ2N5YW4nfX0gLz5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtTdHlsZS5nZXRDbGFzc05hbWUoXCJnYW1lOmNhcmRJbm5lclwiKX0gc3R5bGU9e3N0eWxlfT5cclxuICAgICAgICAgICAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBjb3JyZWN0ID0gW1xyXG4gICAgXCJhbWF6ZWVuLm1wM1wiLFxyXG4gICAgXCJhd2Vzb21lLm1wM1wiLFxyXG4gICAgXCJleGNlbGxlbnQubXAzXCIsXHJcbiAgICBcImZhbnRhc3RpYy5tcDNcIixcclxuICAgIFwiZmlsZXMudHh0XCIsXHJcbiAgICBcIkdvb2QgSm9iLm1wM1wiLFxyXG4gICAgXCJHb29kIFdvcmsubXAzXCIsXHJcbiAgICBcIkdyZWF0Lm1wM1wiLFxyXG4gICAgXCJwZXJmZWN0Lm1wM1wiLFxyXG4gICAgXCJXYXkgdG8gR28ubXAzXCIsXHJcbiAgICBcIndvbmRlcmZ1bC5tcDNcIixcclxuICAgIFwiV29vaG9vLm1wM1wiLFxyXG4gICAgXCJZaXBwZWUubXAzXCIsXHJcbiAgICBcIllvdSBEaWQgSXQubXAzXCJcclxuXTtcclxuY29uc3Qgd3JvbmcgPSBbXHJcbiAgICBcIm5vLm1wM1wiLFxyXG4gICAgXCJub3BlLm1wM1wiLFxyXG4gICAgXCJOb3QgcXVpdGUubXAzXCIsXHJcbiAgICBcIlRoYXRzIE5vdCBpdC5tcDNcIixcclxuICAgIFwiVHJ5IEFnYWluLm1wM1wiXHJcbl07XHJcbmNsYXNzIEdhbWVTY3JlZW4gZXh0ZW5kcyBTdWJzY3JpYmFibGUge1xyXG4gICAgc3RhdGljIGdldCBzdGFydGluZ1BvcygpIHtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICB7eDA6IDIwLCB5MDogMjUsIGNvcnJlY3Q6IGZhbHNlLCBzaXplOiAxfSxcclxuICAgICAgICAgICAge3gwOiA1MCwgeTA6IDI1LCBjb3JyZWN0OiBmYWxzZSwgc2l6ZTogMS4xNX0sXHJcbiAgICAgICAgICAgIHt4MDogODAsIHkwOiAyNSwgY29ycmVjdDogdHJ1ZSwgc2l6ZTogMS4zfSxcclxuICAgICAgICAgICAgLy8ge3gwOiA1MCwgeTA6IDgwLCBmaWxsOiAwfVxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgLy8gY29uc3QgdXJsID0gXCJodHRwczovL3Jlcy5jbG91ZGluYXJ5LmNvbS9kc2ppd2JlMHEvaW1hZ2UvdXBsb2FkL3YxNDY2Mjk1MDg1L2Y3ZTU3YjdjY2M3ZmNiMzI5N2M0NWQ2YTFhZjk3ODdiX3NoMnNwYS5wbmdcIjtcclxuICAgICAgICBjb25zdCB1cmwgPSBcImh0dHBzOi8vcmVzLmNsb3VkaW5hcnkuY29tL2Rzaml3YmUwcS9pbWFnZS91cGxvYWQvdjE0NjYzNjU0ODYvOGJpdF9tZWdhX21hbl8xXzIwMjc2XzY0OTZfdGh1bWJfOTgxMl94cHU4d2kucG5nXCI7XHJcbiAgICAgICAgdGhpcy5pbmRleCA9IC0xO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHBhdXNlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIHNjYWxlOiAxXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmNob2ljZXMgPSBHYW1lU2NyZWVuLnN0YXJ0aW5nUG9zLm1hcChcclxuICAgICAgICAgICAgKHBvcywga2V5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9wcyA9IHtcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzAsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVmOiBgdGFyZ2V0JHtrZXl9YCxcclxuICAgICAgICAgICAgICAgICAgICBtb3ZhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBrZXksXHJcbiAgICAgICAgICAgICAgICAgICAgLi4ucG9zXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDxDRENhcmQgey4uLnByb3BzfT48VUkuSW1hZ2Ugc291cmNlPXt1cmx9IHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIiAvPjwvQ0RDYXJkPjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgYWxsVGhpbmdzID0gT2JqZWN0LmtleXModGhpcy5yZWZzKS5maWx0ZXIoa2V5ID0+IGtleS5zdGFydHNXaXRoKCd0YXJnZXQnKSkubWFwKGtleSA9PiB0aGlzLnJlZnNba2V5XSk7XHJcbiAgICAgICAgdGhpcy5tb3ZhYmxlID0gPENEQ2FyZCB3aWR0aD17MzB9IHNpemU9ezF9IHgwPXs1MH0geTA9ezc1fSBzaXplPXsxLjN9IG90aGVycz17YWxsVGhpbmdzfSBtb3ZhYmxlIC8+O1xyXG4gICAgICAgIC8vIHRoaXMudG9rZW4gPSBQdWJTdWIuc3Vic2NyaWJlKFxyXG4gICAgICAgIHRoaXMucHViTGlzdGVuKFxyXG4gICAgICAgICAgICAnY2FtcGRpc2NvLmdhbWUuYW5zd2VyJyxcclxuICAgICAgICAgICAgYXN5bmMgKGV2dCwgYW5zd2VyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhhbnN3ZXIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2NhbGU6IDB9KTtcclxuICAgICAgICAgICAgICAgIGF3YWl0IGNocm9uby53YWl0KDMxMCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYW5zd2VyID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2F1ZGlvID0gY29ycmVjdFtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjb3JyZWN0Lmxlbmd0aCldO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBIb3dsKHt1cmxzOiBbYGF1ZGlvL2NvcnJlY3QvJHtjYXVkaW99YF0sIG9uZW5kOiAoKSA9PiBQdWJTdWIucHVibGlzaCgnY2FtcGRpc2NvLnJlc3BvbnNlLmZpbmlzaGVkJyl9KS5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBIb3dsKHt1cmxzOiBbYGF1ZGlvL3dyb25nLyR7d3JvbmdbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogd3JvbmcubGVuZ3RoKV19YF0sIG9uZW5kOiAoKSA9PiBQdWJTdWIucHVibGlzaCgnY2FtcGRpc2NvLnJlc3BvbnNlLmZpbmlzaGVkJyl9KS5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbm9wZS5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5yZWZzLnRpbWVyLnJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMucHViTGlzdGVuKFxyXG4gICAgICAgICAgICAnY2FtcGRpc2NvLnJlc3BvbnNlLmZpbmlzaGVkJyxcclxuICAgICAgICAgICAgKCkgPT4gdGhpcy5yZWZzLnRpbWVyLnJlc2V0KClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICB0aGlzLmZvcmNlVXBkYXRlKCk7XHJcbiAgICB9XHJcbiAgICAvLyBjb21wb25lbnRXaWxsVW5tb3VudCA9ICgpID0+IHtcclxuICAgIC8vICAgICBQdWJTdWIudW5zdWJzY3JpYmUodGhpcy50b2tlbik7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgcmVuZGVyID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHtzY2FsZX0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGNvbnN0IHtjaG9pY2VzLCBtb3ZhYmxlfSA9IHRoaXM7XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxDb250YWluZXIgZmlsbCBzdHlsZT17e2JhY2tncm91bmRDb2xvcjogJ2N5YW4nfX0+XHJcbiAgICAgICAgICAgICAgICA8VUkuUGluYm9hcmQgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3tiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDAsIDAsIDAsIDAuMzUpJywgd2lkdGg6ICcxMDAlJywgaGVpZ2h0OiAnMTAwJScsIGRpc3BsYXk6IHRoaXMuc3RhdGUucGF1c2VkID09PSB0cnVlID8gJycgOiAnbm9uZScsIHpJbmRleDogJysxMDAwJywgcG9zaXRpb246ICdhYnNvbHV0ZSd9fSBwaW5JbmZvPXt7d2lkdGg6ICcxMDAlJywgaGVpZ2h0OiAnMTAwJSd9fSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxVSS5JY29uQnV0dG9uIHBpbkluZm89e3tib3R0b206IDUsIGxlZnQ6IDUsIHdpZHRoOiA0MCwgaGVpZ2h0OiA0MH19IGljb249XCJpb24tcGF1c2VcIiBmbHVzaCBmaWxsIGNvcm5lclJhZGl1cz17MjB9IHJhaXNlZCBpY29uU2l6ZT17MjB9IG9uVGFwPXsoKSA9PiB0aGlzLnNldFN0YXRlKHtwYXVzZWQ6IHRydWV9KX0gLz5cclxuICAgICAgICAgICAgICAgICAgICA8VGltZXIgcGluSW5mbz17e2JvdHRvbTogNSwgcmlnaHQ6IDUsIHpJbmRleDogJysxMDAnfX0gcmVmPVwidGltZXJcIiAvPlxyXG4gICAgICAgICAgICAgICAgPC9VSS5QaW5ib2FyZD5cclxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3t0cmFuc2l0aW9uOiAndHJhbnNmb3JtIDMwMG1zIGVhc2UtaW4nLCB0cmFuc2Zvcm06IGBzY2FsZSgke3NjYWxlfSwgJHtzY2FsZX0pYCwgcG9zaXRpb246ICdhYnNvbHV0ZScsIHdpZHRoOiAnMTAwJScsIGhlaWdodDogJzEwMCUnLCB0b3A6IDB9fT5cclxuICAgICAgICAgICAgICAgICAgICB7Y2hvaWNlc31cclxuICAgICAgICAgICAgICAgICAgICB7bW92YWJsZX1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L0NvbnRhaW5lcj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBBcmMgPSAoe2N4LCBjeSwgcmFkaXVzLCBzdGFydCwgZW5kfSkgPT4ge1xyXG4gICAgY29uc3QgY2lyYyA9IE1hdGguUEkgKiAyICogcmFkaXVzO1xyXG4gICAgY29uc3QgZmlyc3QgPSBzdGFydCAvIDM2MDtcclxuICAgIGNvbnN0IHNlY29uZCA9IGVuZCAvIDM2MCAtIGZpcnN0O1xyXG5cclxuICAgIHJldHVybiA8Y2lyY2xlIGN4PXtjeH0gY3k9e2N5fSByPXtyYWRpdXN9IHN0cm9rZVdpZHRoPXszfSBzdHJva2VEYXNoYXJyYXk9e2AwICR7Zmlyc3QgKiBjaXJjfSAke3NlY29uZCAqIGNpcmN9ICR7Y2lyY31gfSBzdHJva2U9XCJibGFja1wiIGZpbGw9XCJ0cmFuc3BhcmVudFwiIHRyYW5zZm9ybT17YHJvdGF0ZSgtOTAgJHtjeH0gJHtjeX0pYH0gLz47XHJcbn07XHJcbmNsYXNzIFRpbWVyIGV4dGVuZHMgU3Vic2NyaWJhYmxlIHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50ID0gKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucmVzZXQoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXNldCA9ICgpID0+IHtcclxuICAgICAgICB0aGlzLm1heCA9IFNldHRpbmdzLnJlYWQoXCJ0aW1lckR1cmF0aW9uXCIpO1xyXG4gICAgICAgIHRoaXMubGVmdCA9IHRoaXMubWF4O1xyXG4gICAgICAgIHRoaXMucHViTGlzdGVuKFxyXG4gICAgICAgICAgICAnY2FtcGRpc2NvLmdhbWUuZm9yY2VBbnN3ZXInLFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyU3VicygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgICAgIHRoaXMucHViTGlzdGVuKFxyXG4gICAgICAgICAgICBcInN5c3RlbS5mcmFtZWRyYXdcIixcclxuICAgICAgICAgICAgKHQsIHRpbWUpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGVmdCAtPSB0aW1lO1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5sZWZ0KTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxlZnQgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGVmdCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhclN1YnMoKTtcclxuICAgICAgICAgICAgICAgICAgICBQdWJTdWIucHVibGlzaChcImNhbXBkaXNjby5nYW1lLmZvcmNlQW5zd2VyXCIsIFtudWxsLCBmYWxzZV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5mb3JjZVVwZGF0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcyA9IDUwO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxzdmcgd2lkdGg9e3N9IGhlaWdodD17c30+XHJcbiAgICAgICAgICAgICAgICA8QXJjIGN4PXtzIC8gMn0gY3k9e3MgLyAyfSByYWRpdXM9e3MgLyAyIC0gM30gc3RhcnQ9ezB9IGVuZD17MzYwICogKHRoaXMubGVmdCAvIHRoaXMubWF4KX0gLz5cclxuICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgUmVhbFNjcmVlbiBleHRlbmRzIFN1YnNjcmliYWJsZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7Y3VycmVudDogbnVsbH07XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQgPSAoKSA9PiB7XHJcbiAgICAgICAgLy8gdGhpcy50b2tlbiA9IFB1YlN1Yi5zdWJzY3JpYmUoXHJcbiAgICAgICAgLy8gd2luZG93Lm5vcGUgPSBuZXcgSG93bCh7dXJsczogWydhdWRpby9Ob3QgcXVpdGUubXAzJ10sIG9uZW5kOiAoKSA9PiBQdWJTdWIucHVibGlzaCgnY2FtcGRpc2NvLnJlc3BvbnNlLmZpbmlzaGVkJyl9KTtcclxuICAgICAgICB0aGlzLnB1Ykxpc3RlbihcclxuICAgICAgICAgICAgXCJjYW1wZGlzY28ucmVzcG9uc2UuZmluaXNoZWRcIixcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocHJldkFuc3dlcik7XHJcbiAgICAgICAgICAgICAgICBpZiAoR2FtZVN0YXRlLmN1cnJlbnRMZXZlbC5maW5pc2hlZCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIEFwcC5uYXZpZ2F0aW9uLnJlcGxhY2UoXCIvXCIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudDogRGF0ZS5ub3coKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgICAgICBHYW1lU3RhdGUuaW5pdExldmVsKCk7XHJcbiAgICB9XHJcbiAgICAvLyBjb21wb25lbnRXaWxsVW5tb3VudCA9ICgpID0+IHtcclxuICAgIC8vICAgICBQdWJTdWIudW5zdWJzY3JpYmUodGhpcy50b2tlbik7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgcmVuZGVyID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHtjdXJyZW50fSA9IHRoaXMuc3RhdGU7XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxVSS5TY3JlZW4+XHJcbiAgICAgICAgICAgICAgICA8R2FtZVNjcmVlbiBrZXk9e2N1cnJlbnR9IC8+XHJcbiAgICAgICAgICAgIDwvVUkuU2NyZWVuPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJlYWxTY3JlZW47XHJcbiIsImNsYXNzIE1haW5TY3JlZW4gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxVSS5TY3JlZW4gdGl0bGU9XCJDYW1wIERpc2NvIFYzP1wiPlxyXG4gICAgICAgICAgICAgICAgPFVJLkJ1dHRvbiBibG9jayByYWlzZWQgdGV4dD1cIlBsYXkgR2FtZVwiIG9uVGFwPXsoKSA9PiBBcHAubmF2aWdhdGlvbi5wdXNoKCcvZ2FtZScpfSAvPlxyXG4gICAgICAgICAgICA8L1VJLlNjcmVlbj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNYWluU2NyZWVuO1xyXG4iLCJjb25zdCBhcHBLZXkgPSBcIkNIQU5HRV9USElTXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBTZXNzaW9uOiBBcHAuY3JlYXRlU2Vzc2lvbihhcHBLZXkpLFxyXG4gICAgU2V0dGluZ3M6IEFwcC5jcmVhdGVTZXR0aW5ncyhhcHBLZXkpLFxyXG4gICAgR2xvYmFsU2V0dGluZ3M6IEFwcC5jcmVhdGVTZXR0aW5ncyhcIlwiKSxcclxuICAgIGFwcEtleVxyXG59O1xyXG4iLCJjb25zdCBjb29sQmx1ZSA9IFwiIzJGQjFERlwiO1xyXG5cclxuVGhlbWUuZGVmaW5lKHtcclxuICAgIGFwcDoge1xyXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3doaXRlJyxcclxuICAgICAgICB0ZXh0Q29sb3I6ICcjMTExJ1xyXG4gICAgfSxcclxuICAgIGJ1dHRvbjoge1xyXG4gICAgICAgIGhvdmVyQ29sb3I6ICdyZ2JhKDAsIDAsIDAsIDAuMTEpJyxcclxuICAgICAgICBhY3RpdmVDb2xvcjogJ3JnYmEoMCwgMCwgMCwgMC4yKScsXHJcbiAgICAgICAgcmFpc2VkOiB7XHJcbiAgICAgICAgICAgIGNvbG9yOiBjb29sQmx1ZSxcclxuICAgICAgICAgICAgdGV4dENvbG9yOiAnd2hpdGUnXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNhcmQ6IHtcclxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd3aGl0ZSdcclxuICAgIH0sXHJcbiAgICBwcm9ncmVzc2Jhcjoge1xyXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNCM0NFRUQnLFxyXG4gICAgICAgIGNvbG9yOiAnIzNCOEFGMydcclxuICAgIH0sXHJcbiAgICByYWRpbzoge1xyXG4gICAgICAgIGdyaWQ6IHtcclxuICAgICAgICAgICAgc2VsZWN0ZWRDb2xvcjogY29vbEJsdWVcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcmFuZ2VJbnB1dDoge1xyXG4gICAgICAgIHRyYWNrOiB7XHJcbiAgICAgICAgICAgIGNvbG9yOiBjb29sQmx1ZVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzd2l0Y2g6IHtcclxuICAgICAgICB0cmFjazoge1xyXG4gICAgICAgICAgICBjb2xvcjogY29vbEJsdWVcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgdGl0bGU6IHtcclxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGNvb2xCbHVlLFxyXG4gICAgICAgIHRleHRDb2xvcjogJ3doaXRlJ1xyXG4gICAgfSxcclxuICAgIHVzZXJJbnB1dDoge1xyXG4gICAgICAgIGFjdGl2ZUNvbG9yOiAnIzJGQjFERicsXHJcbiAgICAgICAgdGV4dENvbG9yOiAnYmxhY2snXHJcbiAgICB9XHJcbn0pO1xyXG4iXX0=

console.log('Build Time: ', 'Tue Jun 21 2016 08:32:32 GMT-0700 (Pacific Daylight Time)');