<template>
  <div>
    <ul class="demo-menu demo-menu--horizantal">
      <li v-for="(route, i) in routes" :key="i">
        <router-link :to="'/demo/pie/' + route.path">{{ route.title }}</router-link>
      </li>
    </ul>

    <router-view></router-view>
  </div>
</template>

<script>
import routes from './routes.js'

export default {
  data() {
    return {
      routes
    }
  }
}
</script>

<style lang="scss" scoped>
.demo-menu {
  display: flex;
  border-bottom: 2px solid #f5f5f5;
  list-style: none;
  padding: 0;

  a {
    display: block;
    padding: 0.5em 1em;
    margin-bottom: -2px;
  }

  a.router-link-exact-active {
    border-bottom: 2px solid #3273dc;
  }

  li + li {
    margin-left: 1rem;
  }
}
</style>

