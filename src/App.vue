<template>
  <div id="app">
    <keep-alive exclude="GoodsDetail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from '@/components/content/mainTabbar/MainTabBar.vue'

export default {
  name: 'app',
  components: {
    MainTabBar
  }
}
</script>

<style lang="less">
@import '@/assets/css/base.css';
* {
  margin: 0;
  padding: 0;
}
</style>
