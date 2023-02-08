import { defineStore } from "pinia";

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [],
    loading: false,
  }),
  getters: {
    favs(){
      return this.tasks.filter(t => t.isFav);
    },
    favCounts() {
      return this.tasks.reduce((acc, el) => {
        return el.isFav ? acc + 1 : acc;
      }, 0);
    },
    totalCounts: (state) => {
      return state.tasks.length;
    }
  },
  actions: {
    async getInitialTasks() {
      this.loading = true;

      const req = await fetch('http://localhost:3000/tasks');
      const data = await req.json();

      this.tasks = data;
      this.loading = false;
    },
    async addTask(newTask) {
      this.tasks.push(newTask);

      const req = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        body: JSON.stringify(newTask),
        headers: {'Content-type': 'application/json'},
      });
      if (req.error) {
        console.log(req.error);
      }
    },
    async deleteTask(id) {
      this.tasks = this.tasks.filter(el => el.id !== id);

      const req = await fetch('http://localhost:3000/tasks/' + id, {
        method: 'DELETE',
      });
      if (req.error) {
        console.log(req.error);
      }
    },
    async toggleFav(id) {
      const taskToToggle = this.tasks.find(el => el.id === id);
      taskToToggle.isFav = !taskToToggle.isFav;

      const req = await fetch('http://localhost:3000/tasks/' + id, {
        method: 'PATCH',
        body: JSON.stringify({isFav: taskToToggle.isFav}),
        headers: {'Content-type': 'application/json'},
      });
      if (req.error) {
        console.log(req.error);
      }
    },
  },
});