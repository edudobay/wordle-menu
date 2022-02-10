<script setup>
import { useStore } from '../store';
import Game from './Game.vue';
import { storeToRefs } from 'pinia';

const store = useStore();
const { games } = storeToRefs(store);
const markDone = store.markDone;

</script>

<template>
  <ul>
    <Game
      v-for="game of games"
      :key="game.url"
      :game="game"
      @markDone="markDone(game)"
    />
  </ul>
</template>


<style scoped>
:deep(a:link) {
  text-decoration: none;
}
</style>
