import { defineStore } from 'pinia';
import { games } from './games';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone'; // dependent on utc plugin
import { markRaw } from 'vue';
import { fastTicker, Timer } from './utils/timer';

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

function timerOptions() {
  const options = {};

  if (! import.meta.env.DEV) {
    return options;
  }

  const params = new URLSearchParams(window.location.search);

  options.timerInterval = params.get('tickInterval');
  const tickAmount = params.get('tickAmount');
  if (tickAmount) {
    options.ticker = fastTicker(tickAmount);
  }

  return options;
}

class GameStatusStorage {
  constructor() {
    this.storage = window.localStorage;
  }

  hiddenLanguages() {
    return new Set(JSON.parse(this.storage.getItem('hiddenLanguages') || '[]'));
  }

  /**
   * @param {Set<string>} languages
   */
  saveHiddenLanguages(languages) {
    this.storage.setItem('hiddenLanguages', JSON.stringify([...languages]));
  }

  getStatusForGame(id) {
    const status = JSON.parse(this.storage.getItem(`gameStatus:${id}`) || '{}');
    if (status.doneExpires) {
      status.doneExpires = dayjs(status.doneExpires);
    }
    return status;
  }

  saveStatus(id, status) {
    this.storage.setItem(`gameStatus:${id}`, JSON.stringify(status));
  }
}

const storage = new GameStatusStorage();

export const useStore = defineStore('main', {
  state: () => ({
    gameStatus: Object.fromEntries(gameIds.map(
      (id) => [id, storage.getStatusForGame(id)]
    )),
    hiddenLanguages: storage.hiddenLanguages(),
    now: dayjs(),
  }),
  getters: {
    games: (state) => games
      .filter((game) => !state.hiddenLanguages.has(game.lang))
      .map((game) => {
      const gameStatus = state.gameStatus[game.url];
      const nextReset = calculateNextReset(game, state.now);
      const doneExpires = gameStatus.doneExpires;
      const done = (
        gameStatus.done
        && ! game.infinitePlay
        && doneExpires != null
        && ! doneExpires.isBefore(nextReset)
      );

      return {
        ...game,
        ...gameStatus,
        nextReset,
        done,
      };
    }),
    isLanguageHidden: (state) => (language) => state.hiddenLanguages.has(language),
  },
  actions: {
    startTimer() {
      return markRaw(new Timer(
        (now) => this.updateTime(now),
        timerOptions(),
      ));
    },
    markDone(game) {
      if (game.infinitePlay) return;
      this.setGameStatus(game.url, {
        done: true,
        doneExpires: game.nextReset,
      });
    },
    setLanguageHidden(language, hidden) {
      hidden ? this.hideLanguage(language) : this.unhideLanguage(language);
    },
    hideLanguage(language) {
      this.hiddenLanguages.add(language);
      storage.saveHiddenLanguages(this.hiddenLanguages);
    },
    unhideLanguage(language) {
      this.hiddenLanguages.delete(language);
      storage.saveHiddenLanguages(this.hiddenLanguages);
    },
    setGameStatus(id, status) {
      status = Object.assign(this.gameStatus[id], status);
      storage.saveStatus(id, status);
    },
    updateTime(now) {
      this.now = now;
    }
  },
})
