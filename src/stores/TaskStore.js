import { defineStore } from "pinia";

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [
      {id: 1, title: "buy some milk", isFav: false},
      {id: 2, title: "play Gloomhaven", isFav: true},
    ],
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
    addTask(newTask) {
      this.tasks.push(newTask);
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter(el => el.id !== id);
    },
    toggleFav(id) {
      const taskToToggle = this.tasks.find(el => el.id === id);
      taskToToggle.isFav = !taskToToggle.isFav;
    },
  },
});