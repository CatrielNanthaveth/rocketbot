<template>
  <main>
    <h1>Aplicación de Tareas</h1>
    <button @click="openCreateModal">Nueva Tarea</button>
    <TaskList @open-modal="showModal = true" />

    <Modal :isOpen="showModal" @close="closeModal">
      <TaskForm />
    </Modal>
  </main>
</template>

<script setup>

import { ref, watch } from 'vue';
import { useTaskStore } from './stores/tasks';
import Modal from './components/Modal.vue';
import TaskList from './components/TaskList.vue';
import TaskForm from './components/TaskForm.vue';

const store = useTaskStore();
const showModal = ref(false);

const openCreateModal = () => {
  store.setEditingTask(null);
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  store.setEditingTask(null);
};

watch(() => store.editingTask, (newTask) => {
  if (newTask === null && showModal.value) {
    showModal.value = false;
  }
});

watch(() => store.tasks.length, () => {
  if (showModal.value) {
    showModal.value = false;
  }
});

</script>

<style scoped>

main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 100vw;
  box-sizing: border-box;
}

@media (max-width: 768px) {
  main {
    max-width: 100%;
    width: 100%;
    padding: 10px;
    margin: 0;
  }
  
  h1 {
    font-size: 1.5em;
    text-align: center;
    margin-bottom: 15px;
    word-wrap: break-word;
  }
  
  button {
    width: 100%;
    max-width: 300px;
    padding: 12px;
    font-size: 16px;
  }
}

@media (max-width: 390px) {
  main {
    padding: 8px;
    margin: 0;
  }
  
  h1 {
    font-size: 1.3em;
    margin-bottom: 12px;
  }
  
  button {
    padding: 10px;
    font-size: 14px;
  }
}

@media (max-width: 320px) {
  main {
    padding: 5px;
  }
  
  h1 {
    font-size: 1.2em;
  }
  
  button {
    padding: 8px;
    font-size: 13px;
  }
}
</style>