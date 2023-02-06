<template>
  <main>
    <!-- heading -->
    <header>
      <img src="@/assets/pinia-logo.svg"
        alt="Main Logo">
      <h1>Pinia Tasks</h1>
    </header>
    <!-- task list  -->
    <div class="task-list">
      <div v-for="(task, i) in taskStore.tasks"
        :key="i">
        <task-details :task="task" />
      </div>
    </div>
  </main>
</template>

<script>
import TaskDetails from '@/components/TaskDetails.vue';
import { useTaskStore } from '@/stores/TaskStore.js';
export default {
  components: {
    TaskDetails,
  },
  setup() {
    const taskStore = useTaskStore();

    return { taskStore }
  }

}
</script>