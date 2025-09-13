<template>
  <div class="task-list-container">
    <!-- Estados de carga y error -->
    <div v-if="store.loading" class="loading">Cargando tareas...</div>
    <div v-else-if="store.error" class="error">
      Error: {{ store.error }}
      <button @click="store.fetchTasks()" class="retry-btn">Reintentar</button>
    </div>
    
    <!-- Lista de tareas -->
    <div v-else>
      <div class="task-list">
        <span class="column-task">Título</span>
        <span class="column-task">Categoría</span>
        <span class="column-task">Acciones</span>
      </div>
      <ul>
        <li v-if="store.tasks.length === 0" class="no-tasks">No hay tareas</li>
        <li class="task-item" v-for="task in store.tasks" :key="task.id">
          <span class="task-title">{{ task.title }}</span>
          <span class="task-category">{{ task.category }}</span>
          <div class="task-actions">
            <button @click="deleteTask(task.id)" class="delete-btn" :disabled="store.loading">
              {{ store.loading ? 'Eliminando...' : 'Eliminar' }}
            </button>
            <button @click="editTask(task)" class="edit-btn" :disabled="store.loading">Editar</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useTaskStore } from '../stores/tasks';
import { onMounted } from 'vue';

const store = useTaskStore();
const emits = defineEmits(['open-modal']);

const editTask = (task) => {
  store.setEditingTask(task);
  emits('open-modal');
};

const deleteTask = async (id) => {
  if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
    try {
      await store.deleteTask(id);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  }
};

onMounted(() => {
  store.fetchTasks();
});
</script>

<style scoped>

.task-list-container {
  margin-top: 20px;
  width: 100%;
  overflow-x: hidden;
  box-sizing: border-box;
}

.loading, .error {
  text-align: center;
  padding: 20px;
  border-radius: var(--border-radius);
  margin-bottom: 20px;
}

.loading {
  background-color: var(--background-color);
  color: var(--text-color);
  border: 1px solid var(--border-color);
}

.error {
  background-color: #fee;
  color: var(--danger-color);
  border: 1px solid var(--danger-color);
}

.retry-btn {
  margin-left: 10px;
  background-color: var(--primary-color);
  color: var(--text-color-secondary);
  border: none;
  padding: 5px 10px;
  border-radius: var(--border-radius);
  cursor: pointer;
}

.no-tasks {
  text-align: center;
  padding: 20px;
  color: var(--secondary-color);
  font-style: italic;
}

ul {
  list-style-type: none;
  padding: 0;
}

.task-list {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 5px;
  border: 1px solid var(--border-color);
  border-radius: 5px;
  padding: 10px;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
}

.task-title {
  color: var(--text-color);
  background-color: var(--background-color);
  padding: 5px;
  border-radius: 5px;
  letter-spacing: 1px;
  font-family: 'Arial', sans-serif;
  font-size: 0.8em;
  transition: all 0.3s ease;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  min-width: 0;
}

.task-title:hover {
  background-color: var(--primary-color);
  color: var(--text-color-secondary);
}

.task-category {
  margin-right: 10px;
  color: var(--text-color);
  font-size: 0.8em;
  background-color: var(--background-color);
  padding: 5px;
  border-radius: 5px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: 'Arial', sans-serif;
  font-size: 0.8em;
  word-wrap: break-word;
  overflow-wrap: break-word;
  min-width: 0;
}

.task-actions {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5px;
  min-width: 0;
  flex-wrap: wrap;
}

.task-item {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border: 1px solid var(--border-color);
  border-radius: 5px;
  padding: 10px;
  text-align: center;
  margin-bottom: 10px;
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
}

button {

  &.delete-btn {
    background-color: var(--danger-color);
    color: var(--text-color-secondary);
  }

  &.edit-btn {
    background-color: var(--success-color);
    color: var(--text-color-secondary);
  }
}

@media (max-width: 768px) {
  .task-list, .task-item {
    grid-template-columns: 1fr;
    gap: 10px;
    text-align: center;
  }
  
  .task-actions {
    justify-content: center;
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .task-actions button {
    flex: 1;
    min-width: 80px;
    max-width: 120px;
    font-size: 0.8em;
    padding: 8px 12px;
  }
}

@media (max-width: 390px) {
  .task-list-container {
    margin-top: 8px;
    padding: 0 5px;
  }
  
  .task-item {
    padding: 8px;
    width: 100%;
    gap: 8px;
  }
  
  .task-title, .task-category {
    font-size: 0.75em;
    padding: 4px;
  }
  
  .task-actions {
    gap: 5px;
  }
  
  .task-actions button {
    font-size: 0.7em;
    padding: 6px 10px;
    min-width: 70px;
  }
}

@media (max-width: 320px) {
  .task-list-container {
    margin-top: 5px;
    padding: 0 2px;
  }
  
  .task-item {
    padding: 6px;
    gap: 6px;
  }
  
  .task-title, .task-category {
    font-size: 0.7em;
    padding: 3px;
  }
  
  .task-actions button {
    font-size: 0.65em;
    padding: 5px 8px;
    min-width: 60px;
  }
}
</style>