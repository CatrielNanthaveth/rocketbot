<template>
  <form @submit.prevent="handleSubmit" role="form" aria-label="Formulario de tarea">
    <div class="form-group">
      <label for="title">Título</label>
      <input 
        id="title"
        v-model="formState.title" 
        @input="handleInput('title', $event.target.value)"
        placeholder="Título" 
        required 
        :aria-invalid="!!errors.title"
        :aria-describedby="errors.title ? 'title-error' : undefined"
        :disabled="store.loading"
        maxlength="100"
      />
      <div class="field-info">
        <span v-if="errors.title" id="title-error" class="error">{{ errors.title }}</span>
        <span class="char-count">{{ formState.title.length }}/100</span>
      </div>
    </div>
    
    <div class="form-group">
      <label for="category">Categoría</label>
      <input 
        id="category"
        v-model="formState.category" 
        @input="handleInput('category', $event.target.value)"
        placeholder="Categoría" 
        required 
        :aria-invalid="!!errors.category"
        :aria-describedby="errors.category ? 'category-error' : undefined"
        :disabled="store.loading"
        maxlength="50"
      />
      <div class="field-info">
        <span v-if="errors.category" id="category-error" class="error">{{ errors.category }}</span>
        <span class="char-count">{{ formState.category.length }}/50</span>
      </div>
    </div>
    
    <div v-if="store.error" class="form-error">
      Error: {{ store.error }}
    </div>
    
    <button type="submit" :disabled="store.loading || !isFormValid">
      {{ store.loading ? 'Guardando...' : buttonText }}
    </button>
  </form>
</template>

<script setup>
import { reactive, watch, computed } from 'vue';
import { useTaskStore } from '../stores/tasks';
import { validateForm, validateOnInput, VALIDATION_RULES } from '../utils/validation';

const store = useTaskStore();

const formState = reactive({
  title: '',
  category: '',
});

const errors = reactive({
  title: '',
  category: '',
});

const sanitizedData = reactive({
  title: '',
  category: '',
});

const handleInput = (field, value) => {
  const validation = validateOnInput(value, field, VALIDATION_RULES[field]);
  errors[field] = validation.error;
  
  formState[field] = value;
  
  sanitizedData[field] = validation.sanitizedValue;
};

const validateFormData = () => {
  const validation = validateForm(formState);
  
  Object.assign(errors, validation.errors);
  
  Object.assign(sanitizedData, validation.sanitizedData);
  
  return validation.isValid;
};

const isFormValid = computed(() => {
  return formState.title.trim() && 
         formState.category.trim() && 
         !errors.title && 
         !errors.category;
});

watch(() => store.editingTask, (newTask) => {
  if (newTask) {
    formState.title = newTask.title;
    formState.category = newTask.category;

    handleInput('title', newTask.title);
    handleInput('category', newTask.category);
  } else {
    formState.title = '';
    formState.category = '';
    sanitizedData.title = '';
    sanitizedData.category = '';
  }

  errors.title = '';
  errors.category = '';
}, { immediate: true });

const buttonText = computed(() => {
  return store.editingTask ? 'Guardar Cambios' : 'Agregar Tarea';
});

const handleSubmit = async () => {
  if (!validateFormData()) return;
  
  try {
    const taskData = {
      title: sanitizedData.title,
      category: sanitizedData.category
    };
    
    if (store.editingTask) {
      await store.updateTask(store.editingTask.id, taskData);
    } else {
      await store.createTask(taskData);
    }
    
    formState.title = '';
    formState.category = '';
    errors.title = '';
    errors.category = '';
    sanitizedData.title = '';
    sanitizedData.category = '';
    
    store.setEditingTask(null);
  } catch (error) {
    console.error('Error saving task:', error);
  }
};
</script>

<style scoped>

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 100%;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  background: var(--background-color-secondary);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  justify-content: center;
  box-sizing: border-box;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

label {
  font-weight: bold;
  color: var(--text-color);
  font-size: 0.9em;
}

input {
  padding: 10px;
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
  background: var(--background-color);
  color: var(--text-color);
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &[aria-invalid="true"] {
    border-color: var(--danger-color);
  }
}

.field-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2px;
  min-height: 20px;
}

.error {
  color: var(--danger-color);
  font-size: 0.8em;
  flex: 1;
}

.char-count {
  color: var(--secondary-color);
  font-size: 0.75em;
  font-weight: normal;
  margin-left: 10px;
}

.form-error {
  background-color: #fee;
  color: var(--danger-color);
  padding: 10px;
  border-radius: var(--border-radius);
  border: 1px solid var(--danger-color);
  text-align: center;
}

button {
  padding: 10px;
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
  background: var(--background-color);
  color: var(--text-color);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background: var(--primary-color);
    color: var(--text-color-secondary);
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

@media (max-width: 768px) {
  form {
    max-width: 100%;
    padding: 15px;
    gap: 12px;
  }
  
  .form-group {
    gap: 8px;
  }
  
  label {
    font-size: 0.85em;
  }
  
  input {
    padding: 12px;
    font-size: 16px; 
  }
  
  button {
    padding: 12px;
    font-size: 16px;
  }
}

@media (max-width: 390px) {
  form {
    padding: 12px;
    gap: 10px;
  }
  
  input, button {
    padding: 10px;
    font-size: 14px;
  }
  
  label {
    font-size: 0.8em;
  }
}

@media (max-width: 320px) {
  form {
    padding: 10px;
    gap: 8px;
  }
  
  input, button {
    padding: 8px;
    font-size: 13px;
  }
}
</style>