<template>
  <div id="app">
    <!-- 排除详情页 -->
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    
    <MainTabBar></MainTabBar>

  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabbar/MainTabBar.vue'
export default {
  components: {
    MainTabBar
  }
}
</script>
<style>

@import url("assets/css/base.css");
</style>
