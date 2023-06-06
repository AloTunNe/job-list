<template>
  <jobList></jobList>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import jobList from './components/jobList.vue';
export default defineComponent({
  name: 'App',
  components: {
    jobList
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
