import { defineStore } from 'pinia';
import { games } from './games';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone'; // dependent on utc plugin
dayjs.extend(utc)
dayjs.extend(timezone)

const gameIds = games.map((game) => game.url);

/** @param {GameData} game */
function calculateNextReset(game) {
  const now = dayjs();

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
  }),
  getters: {
    games: (state) => games.map((game) => ({
      ...game,
      ...state.gameStatus[game.url],
      nextReset: calculateNextReset(game),
    })),
  },
  actions: {
    markDone(game) {
      // TODO: Should reset automatically at game reset time
      // TODO: Persist in local storage
      this.gameStatus[game.url].done = true;
    },
  },
})
