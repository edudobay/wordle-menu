<script setup>
import Modal from './Modal.vue';
import { ref } from 'vue';
import { useStore } from '../store';
import ModalActionButtons from './ModalActionButtons.vue';

/** @type {{modal: {open: boolean}, game: GameData}} */
const props = defineProps(['modal', 'game']);
const { modal, game } = props;

const store = useStore();

const hideThisLanguage = ref(store.isLanguageHidden(game.lang));

function commit() {
  store.setLanguageHidden(game.lang, hideThisLanguage.value);
}
</script>

<template>
  <Modal
    v-if="modal.open"
    :commit="commit"
    :auto-commit-on-close="true"
    @close="modal.open = false"
  >
    <template #title>{{ $t('game.more_options') }}</template>

    <section>
      <p>
        <label>
          <input type="checkbox" v-model="hideThisLanguage"/>
          {{ $t('game.hide_this_language_pref', { language: game.lang.toUpperCase() }) }}
        </label>
      </p>
    </section>

    <template #footer>
      <ModalActionButtons/>
    </template>
  </Modal>
</template>

<style scoped>

</style>
