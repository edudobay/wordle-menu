import dayjs from 'dayjs';

class SwitchableTimer {
  constructor(callback, interval) {
    this.interval = interval;
    this.callback = callback;
    this.timer = null;
  }

  start() {
    if (this.timer != null) return;
    this.timer = setInterval(this.callback, this.interval);
  }

  stop() {
    if (this.timer == null) return;
    clearInterval(this.timer);
    this.timer = null;
  }
}

/**
 * @param {number} value
 * @param {"minute"|"second"|"millisecond"} unit
 * @param {number} threshold
 * @return {boolean}
 */
function closeToZero(value, unit, threshold) {
  const max = {
    minute: 60,
    second: 60,
    millisecond: 1000,
  }[unit];

  const half = Math.ceil(max / 2);
  return Math.abs((value + half) % max - half) < threshold;
}

export class Timer {
  /**
   * @param {function(dayjs.Dayjs)} callback
   * @param {{
   *     ticker?: function():dayjs.Dayjs,
   *     timerInterval?: number,
   * }} options
   */
  constructor(callback, options = {}) {
    /** @param {dayjs.Dayjs} now */
    const tick = (now) => {
      callback(now)

      if (closeToZero(now.millisecond(), 'millisecond', 100) && closeToZero(now.second(), 'second', 1)) {
        this.timer.start();
      } else {
        const remainingMs = now.endOf('minute').diff(now, 'millisecond')
        setTimeout(ticker, remainingMs);
        this.timer.stop();
      }
    }

    const ticker = () => tick((options.ticker || dayjs)());
    const interval = options.timerInterval || 60000; // 1 minute (overridable for testing/development)

    this.timer = new SwitchableTimer(ticker, interval);
    ticker();
  }

  dispose() {
    this.timer.stop();
  }
}

// For development.
export function fastTicker(minutes, start = null) {
  let time = start || dayjs();
  return () => {
    time = time.add(minutes, 'minute').startOf('minute');
    return time;
  }
}
