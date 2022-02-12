<script setup>
import { defineEmits, defineProps } from 'vue';
import { useTimer } from '../utils/timer';

const props = defineProps({
  game: Object,
});

const emit = defineEmits(['markDone']);
const markDone = () => emit('markDone');

const timeLeft = useTimer(props.game.nextReset);
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
    <template v-if="game.done">
      ✅
    </template>
    <template v-else>
      <button @click="markDone">{{ $t("game.done_for_today") }}</button>
    </template>
    {{ $t("game.time_left", { timeLeft }) }}
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
