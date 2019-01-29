<template>
  <div id="app">
    <Header/>
    <router-view></router-view>
  </div>
</template>
<script>
import Header from "./components/Header.vue";
export default {
  name: "app",
  components: {
    Header
  }
};
</script>

<style lang="scss">
@import "./styles/index.scss";
</style>
