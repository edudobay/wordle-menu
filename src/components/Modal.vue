<script setup>
import MicroModal from 'micromodal';
import { onMounted, onUnmounted, provide, ref } from 'vue';

const props = defineProps({
  commit: {
    default: null,
    validator: (value) => typeof value === 'function',
  },
  autoCommitOnClose: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['close']);
const isOpen = ref(false);

function doCommit() {
  if (typeof props.commit === 'function') {
    props.commit();
  }
}

let explicitlyClosed = false;

function close({ commit = null } = {}) {
  explicitlyClosed = true;
  if (commit ?? props.autoCommitOnClose) doCommit();
  MicroModal.close('modal-1');
}

function commitAndClose() {
  close({ commit: true });
}

onMounted(() => {
  isOpen.value = true;
  MicroModal.show('modal-1', {
    onClose() {
      if (!explicitlyClosed && props.autoCommitOnClose) {
        doCommit();
      }
      explicitlyClosed = false;
      isOpen.value = false;
      emit('close');
    },
  });
  onUnmounted(() => {
    MicroModal.close('modal-1');
  });
});

const exposed = {
  commitAndClose,
  close() {
    close();
  },
};

defineExpose(exposed);
provide('modal', exposed);
</script>

<template>
  <Teleport to="#modal-1 .modal__container">
    <template v-if="isOpen">
      <header class="modal__header">
        <h2 class="modal__title" id="modal-1-title">
          <slot name="title"></slot>
        </h2>
        <button class="modal__close" aria-label="Close modal" data-micromodal-close></button>
      </header>
      <main class="modal__content" id="modal-1-content">
        <slot></slot>
      </main>
      <footer class="modal__footer">
        <slot name="footer">
        </slot>
      </footer>
    </template>
  </Teleport>
</template>

<style scoped>
</style>
