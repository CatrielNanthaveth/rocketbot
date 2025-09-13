<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <h1>{{ modalTitle }}</h1>
      <button class="close-btn" @click="close">&times;</button>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>

import { computed } from 'vue';
import { useTaskStore } from '../stores/tasks';

const store = useTaskStore();

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const modalTitle = computed(() => {
  return store.editingTask ? 'Edición de Tarea' : 'Creación de Tarea';
});

const emits = defineEmits(['close']);

const close = () => {
  emits('close');
};

</script>

<style scoped>

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: var(--background-color-secondary);
  padding: 20px;
  color: var(--text-color);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  position: relative;
  max-width: 90%;
  max-height: 80%;
  width: 100%;
  justify-content: center;  
  align-items: center;
  display: flex;
  height: auto;
  min-height: 200px;
  overflow-y: auto;
  flex-direction: column;
  box-sizing: border-box;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  color: var(--text-color);
  border: none;
  background: var(--background-color);
  cursor: pointer;
  font-size: 1.5em;
  box-shadow: var(--box-shadow);
  border-radius: var(--border-radius);
}

@media (max-width: 768px) {
  .modal-content {
    width: 95%;
    max-width: 100%;
    padding: 15px;
    margin: 10px;
    max-height: 85%;
  }
  
  .close-btn {
    top: 5px;
    right: 5px;
    font-size: 1.3em;
  }
}

@media (max-width: 390px) {
  .modal-content {
    width: 98%;
    padding: 12px;
    margin: 5px;
    max-height: 90%;
  }
  
  .close-btn {
    font-size: 1.2em;
    top: 3px;
    right: 3px;
  }
}

@media (max-width: 320px) {
  .modal-content {
    width: 100%;
    padding: 10px;
    margin: 0;
    border-radius: 0;
  }
  
  .close-btn {
    font-size: 1.1em;
  }
}
</style>