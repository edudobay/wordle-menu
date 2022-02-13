<script setup>
import 'reset-css';
import { onMounted, onUnmounted, reactive } from 'vue';
import { useStore } from './store';
import MicroModal from 'micromodal';
import GameList from './components/GameList.vue';
import LocaleSwitcher from './components/LocaleSwitcher.vue';
import ModalPlaceholder from './components/ModalPlaceholder.vue';
import GlobalOptionsMenu from './components/GlobalOptionsMenu.vue';
import CogIcon from 'vue-material-design-icons/Cog.vue';
import 'vue-material-design-icons/styles.css';

const store = useStore();
onMounted(() => {
  const timer = store.startTimer();
  onUnmounted(() => {
    timer.dispose();
  });

  MicroModal.init();
});

const optionsMenu = reactive({ open: false });

</script>

<template>
  <div>
    <div class="settings">
      <button
        @click="optionsMenu.open = true"
        class="icon-button options-menu-button"
      >
        <CogIcon />
        {{ $t('app.settings') }}
      </button>
      <div class="settings-spacer"></div>
      <LocaleSwitcher
        class="settings-item--end"
      />
    </div>
    <GameList />
  </div>
  <GlobalOptionsMenu v-if="optionsMenu.open" :modal="optionsMenu" />
  <ModalPlaceholder />
</template>

<style src="./styles/main.css"></style>

<style scoped>
.settings {
  display: flex;
}

.settings-spacer {
  flex: 1;
}

.options-menu-button {
  padding: 0.75em;
}
</style>
