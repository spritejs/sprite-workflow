<template>
  <div class="page">
    <aside>
      <nav>
        <ul>
          <li v-for="(demo, i) in demos" :key="i">
            <router-link :to="'/home/' + demo.path">{{ demo.title }}</router-link>
          </li>
        </ul>
      </nav>
    </aside>
    <div class="container">
      <router-view class="markdown-body"></router-view>
    </div>
  </div>
</template>
<script>
import demos from "./routes.js";

export default {
  data() {
    return {
      demos
    };
  }
};
</script>
<style lang="scss" scoped>
.page {
  position: relative;
  padding-left: 200px;

  aside {
    position: absolute;
    left: 0;
    top: 0;
    width: 200px;
    height: 100%;
    overflow: auto;
    border-right: 1px solid #e9e9e9;
    background-color: #f8fafe;

    nav {
      color: rgba(0, 0, 0, 0.65);
    }
  }

  nav li a {
    display: inline-block;
    width: 100%;
    padding: 10px 20px;
  }

  nav li a.router-link-exact-active {
    color: #3a8ee6;
    border-right: 2px solid #3a8ee6;
    background-color: rgba(58, 142, 230, 0.2);
  }

  .container {
    width: 100%;
    padding: 1rem 48px 48px 60px;
    overflow: auto;
  }
}
</style>
