<template>
  <div class="cart">
    <!-- 购物车导航 -->
    <NavBar class="cartNavBar">
      <div slot="center">购物车({{cartNumber}})</div>
    </NavBar>
    <!-- 购物车商品列表 -->
    <Scroll class="cart-scroll" ref="cartscroll">
      <CartList></CartList>
    </Scroll>
    <!-- 购物车底部导航 -->
    <CartBottomBar></CartBottomBar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";


import CartList from './childcomponents/CartList'
import CartBottomBar from './childcomponents/CartBottomBar'

import { mapGetters } from 'vuex'
  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      Scroll,
      CartBottomBar,
    },
    computed: {
      ...mapGetters([
        'cartNumber'
      ])
    },
    activated () {
      this.$refs.cartscroll.refresh()
    }

  }
</script>

<style scoped>
.cart{
  height: 100vh;
}
.cartNavBar{
  background-color: var(--color-tint);
  color: #ffffff;
}
.cart-scroll{
  height: calc(100% - 128px );
  background-color: #ffffff ;
  overflow: hidden;
}
</style>
