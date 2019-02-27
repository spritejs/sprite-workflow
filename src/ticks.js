const _tickId = Symbol('tickId');

let requestAnimationFrame = null;
let cancelAnimationFrame = null;

if (!Date.now) { Date.now = function () { return new Date().getTime(); }; }
(function () {
  let vendors = [ 'webkit', 'moz' ];
  for (let i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
    let vp = vendors[ i ];
    window.requestAnimationFrame = window[ vp + 'RequestAnimationFrame' ];
    window.cancelAnimationFrame = (window[ vp + 'CancelAnimationFrame' ] ||
      window[ vp + 'CancelRequestAnimationFrame' ]);
  }
  if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || // iOS6 is buggy
    !window.requestAnimationFrame || !window.cancelAnimationFrame) {
    let lastTime = 0;
    window.requestAnimationFrame = function (callback) {
      let now = Date.now();
      let nextTime = Math.max(lastTime + 16, now);
      return setTimeout(function () { callback(lastTime = nextTime); },
        nextTime - now);
    };
    window.cancelAnimationFrame = clearTimeout;
  }
  requestAnimationFrame = window.requestAnimationFrame;
  cancelAnimationFrame = window.cancelAnimationFrame;
}());

class Ticks {
  constructor() {
    this.tasks = [];
  }
  add(func) {
    if (this.tasks.indexOf(func) === -1) {
      this.tasks.push(func);
    }
    loop(func)
  }
  remove(func) {
    let curFunc = func;
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[ i ] === func) {
        curFunc = this.tasks[ i ];
        this.tasks.splice(i, 1);
        break;
      }
    }
    this.stop(curFunc);
  }
  stop(func) {
    if (func !== undefined) {
      cancelAnimationFrame(func[ _tickId ])
    } else {
      this.tasks.forEach(task => { this.stop(task) })
    }
  }
  start(func) {
    if (func !== undefined) {
      this.add(func)
    } else {
      this.tasks.forEach(task => { loop(task) })
    }
  }
  clear() {
    this.stop();
    this.tasks = [];
  }
}
function loop(func) {
  func();
  let resId = requestAnimationFrame(() => { loop(func) });
  func[ _tickId ] = resId;
  return resId;
}

export { Ticks }
