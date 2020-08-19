<template>
  <div class="cart-list">
    <CartListItem v-for="(item,index) in cartlist" :key="index" :cart-list-item="item"> </CartListItem>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import CartListItem from './CartListItem'

export default {
  computed: {
    ...mapGetters(["cartlist"]),
  },
  components: {
    CartListItem
  }
};
</script>

<style>
</style>