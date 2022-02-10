<script setup>
import { useStore } from '../store';
import Game from './Game.vue';

const store = useStore();
const games = store.games;
</script>

<template>
  <ul>
    <Game
      v-for="game of games"
      :key="game.url"
      :game="game"
    />
  </ul>
</template>


<style scoped>
:deep(a:link) {
  text-decoration: none;
}
</style>
