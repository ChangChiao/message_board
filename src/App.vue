<script setup>
import { ref, provide } from 'vue';
import Loading from './components/Loading.vue';
const showLoading = ref(false);
const controlLoading = (boolean) => {
  showLoading.value = boolean;
};
provide('controlLoading', controlLoading);
</script>
<template>
  <router-view />
  <Loading v-if='showLoading' />
</template>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
