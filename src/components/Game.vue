<script setup>
import { defineProps } from 'vue';

defineProps({
  game: Object,
});
</script>

<template>
  <li>
    <a :href="game.url">
      <span class="game-item">
        <span
          class="lang-code"
        >
          {{ game.lang }}
        </span>
        <span class="game-title">{{ game.name }}</span>
      </span>
    </a>
  </li>
</template>

<style scoped>
.game-item {
  display: inline-flex;
  align-items: center;
  gap: 1em;
  padding: 0.5em;
  font-size: 1.2em;
}

.lang-code {
  display: inline-block;
  font-size: 1.6em;
  width: 1.7em;
  text-align: center;
}

.game-title {
  flex: 1;
}
</style>
