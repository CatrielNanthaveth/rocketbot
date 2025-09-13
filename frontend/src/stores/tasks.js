import { defineStore } from 'pinia';

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: [],
    editingTask: null,
    loading: false,
    error: null,
  }),

  actions: {
    async setEditingTask(task) {
      this.editingTask = task;
    },

    async handleApiCall(apiCall) {
      this.loading = true;
      this.error = null;
      try {
        return await apiCall();
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async fetchTasks() {
      const response = await this.handleApiCall(async () => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`);
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error response:", errorText);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      });

      this.tasks = await response;
    },

    async createTask(task) {
      const response = await this.handleApiCall(async () => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(task),
        });
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error response:", errorText);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      });

      this.tasks.push(response);
    },

    async updateTask(id, updatedTask) {
      const response = await this.handleApiCall(async () => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedTask),
        });
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error response:", errorText);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      });

      const data = await response;

      const index = this.tasks.findIndex(task => task.id === id);

      if (index !== -1) {
        this.tasks[index] = data;
      }

      this.editingTask = null;
    },

    async deleteTask(id) {
      const response = await this.handleApiCall(async () => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error response:", errorText);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      });

      const index = this.tasks.findIndex(task => task.id === id);
      if (index !== -1) {
        this.tasks.splice(index, 1);
      }
    }
  },
});