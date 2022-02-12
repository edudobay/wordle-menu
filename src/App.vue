<script setup>
import 'reset-css';
import GameList from './components/GameList.vue';
import LocaleSwitcher from './components/LocaleSwitcher.vue';
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
