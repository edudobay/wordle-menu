import { defineStore } from 'pinia';
import { games } from './games';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone'; // dependent on utc plugin
import { markRaw } from 'vue';
import { Timer } from './utils/timer';

dayjs.extend(utc)
dayjs.extend(timezone)

const gameIds = games.map((game) => game.url);

/**
 * @param {GameData} game
 * @param {dayjs.Dayjs&module:dayjs.Dayjs} now
 */
function calculateNextReset(game, now) {
  const resetTime = game.resetTime || {};
  const resetLocalTime = resetTime.localTime || 0; // in minutes from midnight (positive or negative)
  const resetTimeZone = resetTime.timeZone || undefined;

  now = now.tz(resetTimeZone); // Convert zone

  // Need to set TZ again after startOf(). Is this a dayjs bug?
  let reset = now.startOf('day').add(resetLocalTime, 'minutes').tz(resetTimeZone);
  if (! reset.isAfter(now)) {
    reset = reset.add(1, 'day');
  }

  return reset.tz(); // Back to local time
}

export const useStore = defineStore('main', {
  state: () => ({
    gameStatus: Object.fromEntries(gameIds.map((id) => [id, {}])),
    now: dayjs(),
  }),
  getters: {
    games: (state) => games.map((game) => {
      const gameStatus = state.gameStatus[game.url];
      const nextReset = calculateNextReset(game, state.now);
      const doneExpires = gameStatus.doneExpires;
      const done = gameStatus.done && doneExpires != null && ! doneExpires.isBefore(nextReset);

      return {
        ...game,
        ...gameStatus,
        nextReset,
        done,
      };
    }),
  },
  actions: {
    startTimer() {
      return markRaw(new Timer((now) => this.updateTime(now)));
    },
    markDone(game) {
      // TODO: Persist in local storage
      this.gameStatus[game.url].done = true;
      this.gameStatus[game.url].doneExpires = game.nextReset;
    },
    updateTime(now) {
      this.now = now;
    }
  },
})
