<template>
  <form @submit.prevent="handleSubmit">
    <input type="text"
      placeholder="I need to ..."
      v-model="newTask">
    <button>Add task</button>
  </form>
</template>

<script>
import { ref } from 'vue';
import { useTaskStore } from '@/stores/TaskStore.js';

export default {
  setup() {
    const newTask = ref('');
    const taskStore = useTaskStore();

    const handleSubmit = () => {
      if (!newTask.value.length) return;

      const currentTask = {
        id: Math.floor(Math.random() * 100000),
        title: newTask.value,
        isFav: false,
      }
      taskStore.addTask(currentTask);
      newTask.value = '';
    }
    return { newTask, taskStore, handleSubmit }
  }

}
</script>