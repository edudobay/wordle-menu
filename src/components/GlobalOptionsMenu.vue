<script setup>
import Modal from './Modal.vue';
import { ref } from 'vue';
import { useStore } from '../store';
import ModalActionButtons from './ModalActionButtons.vue';

const store = useStore();

/** @type {{modal: {open: boolean}} */
const props = defineProps(['modal']);
const { modal } = props;

const hiddenLanguages = ref([...store.hiddenLanguages].map(
  (code) => ({ code, hidden: true }),
));

function commit() {
  for (const lang of hiddenLanguages.value) {
    store.setLanguageHidden(lang.code, lang.hidden);
  }
}
</script>

<template>
  <Modal
    v-if="modal.open"
    :commit="commit"
    :auto-commit-on-close="true"
    @close="modal.open = false"
  >
    <template #title>{{ $t('app.settings') }}</template>

    <section v-if="hiddenLanguages.length > 0">
      <h3>{{ $t('app.settings_hidden_languages') }}</h3>
      <ul>
        <li
          v-for="lang of hiddenLanguages"
        >
          <label>
            <input type="checkbox" v-model="lang.hidden"/>
            {{ lang.code.toUpperCase() }}
          </label>
        </li>
      </ul>
    </section>

    <template #footer>
      <ModalActionButtons/>
    </template>
  </Modal>
</template>

<style scoped>

</style>
