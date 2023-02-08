<template>
  <main>
    <!-- heading -->
    <header>
      <img src="@/assets/pinia-logo.svg"
        alt="Main Logo">
      <h1>Pinia Tasks</h1>
    </header>
    <!-- new task -->
    <div class="new-task-form">
      <task-form />
    </div>
    <!-- filter -->
    <nav class="filter">
      <button @click="filter = 'all'">All tasks</button>
      <button @click="filter = 'favs'">Favs tasks</button>
    </nav>
    <!-- task list  -->
    <div class="task-list"
      v-if="filter === 'all'">
      <p>You have {{ taskStore.totalCounts }} tasks left to do</p>
      <div v-for="(task, i) in taskStore.tasks"
        :key="i">
        <task-details :task="task" />
      </div>
    </div>
    <!-- fav tasks list  -->
    <div class="task-list"
      v-if="filter === 'favs'">
      <p>You have {{ taskStore.favCounts }} favs left to do</p>
      <div v-for="(task, i) in taskStore.favs"
        :key="i">
        <task-details :task="task" />
      </div>
    </div>
  </main>
</template>

<script>
import TaskDetails from '@/components/TaskDetails.vue';
import TaskForm from '@/components/TaskForm.vue';
import { useTaskStore } from '@/stores/TaskStore.js';
import { ref } from 'vue';
export default {
  components: {
    TaskDetails,
    TaskForm
  },
  setup() {
    const taskStore = useTaskStore();
    const filter = ref('all');

    return { taskStore, filter }
  }

}
</script>