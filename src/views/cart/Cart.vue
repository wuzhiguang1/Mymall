<template>
  <div class="cart">
    <NavBar class="cartNavBar">
      <div slot="center">购物车({{cartNumber}})</div>
    </NavBar>

    <Scroll class="cart-scroll">
      <CartList></CartList>
    </Scroll>
    
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";


import CartList from './childcomponents/CartList'

import { mapGetters } from 'vuex'
  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      Scroll,
    },
    computed: {
      ...mapGetters([
        'cartNumber'
      ])
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
  height: calc(100% - 93px );
  background-color: #ffffff ;
  overflow: hidden;
}
</style>
