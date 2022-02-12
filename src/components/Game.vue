<script setup>
import { computed, defineEmits, defineProps } from 'vue';
import { useStore } from '../store';
import countdown from 'countdown';

const store = useStore()
const props = defineProps({
  game: Object,
});

const emit = defineEmits(['markDone']);
const markDone = () => emit('markDone');

const timeLeft = computed(() => countdown(
  store.now,
  props.game.nextReset,
  countdown.HOURS | countdown.MINUTES,
  1
).toString());
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
      ✅ {{ $t("game.next_game_in", { timeLeft }) }}
    </template>
    <template v-else>
      <button @click="markDone">{{ $t("game.done_for_today") }}</button>
      {{ $t("game.time_left", { timeLeft }) }}
    </template>
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
