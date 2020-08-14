<template>
  <tab-bar>
    <tab-bar-item path="/home" >
      <img slot="item-icon" src="~assets/imgs/tabbar/home.svg" alt="">
      <img slot="item-icon-active" src="~assets/imgs/tabbar/home_active.svg" alt="">
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category" >
      <img slot="item-icon" src="~assets/imgs/tabbar/category.svg" alt="">
      <img slot="item-icon-active" src="~assets/imgs/tabbar/category_active.svg" alt="">
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart" >
      <img slot="item-icon" src="~assets/imgs/tabbar/shopcart.svg" alt="">
      <img slot="item-icon-active" src="~assets/imgs/tabbar/shopcart_active.svg" alt="">
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile" activeColor="deepPink">
      <img slot="item-icon" src="~assets/imgs/tabbar//profile.svg" alt="">
      <img slot="item-icon-active" src="~assets/imgs/tabbar/profile_active.svg" alt="">
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
  import TabBar from 'components/common/tabbar/TabBar'
  import TabBarItem from 'components/common/tabbar/TabBarItem.vue'

  export default {
    name: "MainTabBar",
    components: {
      TabBar,
      TabBarItem
    }
  }
</script>

<style scoped>

</style>
