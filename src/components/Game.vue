<script setup>
import { computed, defineEmits, defineProps, reactive } from 'vue';
import { useStore } from '../store';
import countdown from 'countdown';
import DotsIcon from 'vue-material-design-icons/DotsHorizontal.vue';
import GameOptionsMenu from './GameOptionsMenu.vue';

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

const cssVar = (name) => getComputedStyle(document.documentElement).getPropertyValue(name);

const modal = reactive({ open: false });
function openModal() {
  modal.open = true;
}

</script>

<template>
  <li class="game-container">
    <div class="game-main">
      <a class="game-name-link" :href="game.url">
        <div class="game-name">
          <span
            class="lang-code"
          >
            {{ game.lang }}
          </span>
          <span class="game-title">{{ game.name }}</span>
        </div>
      </a>
      <span class="game-actions-main">
        <span v-if="game.done">
          ✅
        </span>
        <button
          v-if="!game.done && !game.infinitePlay"
          @click="markDone"
        >
          {{ $t("game.done_for_today") }}
        </button>
      </span>
    </div>
    <div class="game-status">
      <template v-if="game.done">
        {{ $t("game.next_game_in", { timeLeft }) }}
      </template>
      <template v-else-if="!game.infinitePlay">
        {{ $t("game.time_left", { timeLeft }) }}
      </template>
      <template v-if="game.infinitePlay">
        {{ $t("game.infinite_play") }}
      </template>

      <button class="icon-button more-options" @click="openModal">
        <DotsIcon :title="$t('game.more_options_button')" />
      </button>
    </div>

    <GameOptionsMenu :game="game" :modal="modal" />
  </li>
</template>

<style scoped>
.game-container {
  margin-bottom: 0.5em;
  background-color: var(--bg-darker);
}

.game-main {
  display: flex;
  flex-wrap: wrap;
}

.game-name-link {
  flex: 1;
}

.game-name {
  display: flex;
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
  line-height: 1.5;
}

.game-actions-main {
  flex: 0;
  padding: 1em;
}

.game-status {
  flex: 1 0;
  padding: 1em;
  font-size: 0.9em;
  color: hsl(210, 16%, 75%);
  text-align: right;
}

.more-options {
  margin-left: 0.75em;
}
</style>
