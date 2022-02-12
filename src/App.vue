<script setup>
import 'reset-css';
import { onMounted, onUnmounted } from 'vue';
import { useStore } from './store';
import GameList from './components/GameList.vue';
import LocaleSwitcher from './components/LocaleSwitcher.vue';

const store = useStore();
onMounted(() => {
  const timer = store.startTimer();
  onUnmounted(() => {
    timer.dispose();
  });
});
</script>

<template>
  <div>
    <GameList />
    <div>
      <LocaleSwitcher />
    </div>
  </div>
</template>

<style src="./styles/main.css"></style>
