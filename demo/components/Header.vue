<template>
  <header>
    <div class="logo">
      <router-link to="/">
        <h2>
          <span>sprite-workflow</span>
        </h2>
      </router-link>
    </div>

    <nav>
      <ul>
        <!-- <li>
          <router-link to="/">首页</router-link>
        </li>
        <li>
          <router-link to="/api/plot">API 文档</router-link>
        </li>
        <li>
          <router-link to="/demo/pie">图表示例</router-link>
        </li>-->
        <!-- <li>
          <router-link to="/json-editor">JSON Editor</router-link>
        </li>-->
        <!-- <li>
          <router-link to="/">如何使用</router-link>
        </li>-->
      </ul>
    </nav>
  </header>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
header {
  position: relative;
  z-index: 100;
  padding: 0 40px;
  height: 60px;
  line-height: 1.5;
  // background: #fdfdfd;
  box-shadow: 0 2px 8px rgba(229, 229, 229, 0.5);

  display: flex;
  justify-content: space-between;
  align-items: center;

  // color: #fff;

  .logo,
  nav {
    display: inline-flex;
  }

  ul {
    display: inline-flex;
    list-style: none;
    padding: 0;
  }

  li {
    display: inline-flex;

    + li {
      margin-left: 1rem;
    }
  }
}
</style>
