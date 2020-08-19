<template>
  <dir class="cart-list-item">
    {{cartListItem}}
  </dir>
</template>

<script>

export default {

props: {
  cartListItem:{
    type:Object,
    default(){
      return {}
    }
  }
}
}
</script>

<style>

</style>