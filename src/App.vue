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
    <!-- loading -->
    <div class="loading"
      v-if="loading">Loading tasks ...</div>
    <!-- task list  -->
    <div class="task-list"
      v-if="filter === 'all'">
      <p>You have {{ totalCounts }} tasks left to do</p>
      <div v-for="(task, i) in tasks"
        :key="i">
        <task-details :task="task" />
      </div>
    </div>
    <!-- fav tasks list  -->
    <div class="task-list"
      v-if="filter === 'favs'">
      <p>You have {{ favCounts }} favs left to do</p>
      <div v-for="(task, i) in favs"
        :key="i">
        <task-details :task="task" />
      </div>
    </div>
  </main>
</template>

<script>
import { storeToRefs } from 'pinia';
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
    const { tasks, loading, favs, totalCounts, favCounts } = storeToRefs(taskStore);

    const filter = ref('all');

    taskStore.getInitialTasks();

    return { taskStore, filter, tasks, loading, favs, totalCounts, favCounts }
  }

}
</script>