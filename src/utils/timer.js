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
   */
  constructor(callback) {
    /** @param {dayjs.Dayjs} now */
    const tick = (now) => {
      callback(now)

      if (closeToZero(now.millisecond(), 'millisecond', 100) && closeToZero(now.second(), 'second', 1)) {
        this.minuteTimer.start();
      } else {
        const remainingMs = now.endOf('minute').diff(now, 'millisecond')
        setTimeout(ticker, remainingMs);
        this.minuteTimer.stop();
      }
    }

    const ticker = () => tick(dayjs());
    this.minuteTimer = new SwitchableTimer(ticker, 60000);
    ticker();
  }

  dispose() {
    this.minuteTimer.stop();
  }
}
