import { defineStore } from 'pinia';
import { games } from './games';

export const useStore = defineStore('main', {
  state: () => {
    return {
      games,
    }
  },
})
