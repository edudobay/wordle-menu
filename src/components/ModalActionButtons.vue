<script setup>
import { inject, onMounted } from 'vue';

const {
  modal: modalFromProps,
  showCancel,
  showConfirm,
} = defineProps({
  modal: {
    default: null,
  },
  showCancel: {
    type: Boolean,
    default: false,
  },
  showConfirm: {
    type: Boolean,
    default: true,
  },
});
const injectedModal = inject('modal');

const modal = modalFromProps || injectedModal;

onMounted(() => {
  if (modal == null) {
    console.error('Modal must be injected or provided via props');
  }
});

const commitAndClose = () => modal.commitAndClose();
</script>

<template>
  <section class="action-buttons">
    <button
      v-if="showCancel"
      class="modal__btn"
      data-micromodal-close
      :aria-label="$t('default_actions.cancel_aria_label')"
    >
      {{ $t('default_actions.cancel') }}
    </button>
    <button
      v-if="showConfirm"
      class="modal__btn modal__btn-primary"
      @click="commitAndClose"
    >
      {{ $t('default_actions.confirm') }}
    </button>
  </section>
</template>

<style scoped>
.action-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 1em;
}
</style>
