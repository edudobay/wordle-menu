<script setup>
import { ref, inject } from 'vue';
import { locales as availableLocales } from '../translations';
import { useI18n } from 'vue-i18n';

const i18n = useI18n({ useScope: 'global' });
const locale = ref(i18n.locale)
const setLanguage = inject('setLanguage');

</script>

<template>
  <select :value="locale" @input="setLanguage($event.target.value)">
    <option
      v-for="(name, locale) in availableLocales"
      :key="locale"
      :value="locale"
    >
      {{ name }}
    </option>
  </select>
</template>
