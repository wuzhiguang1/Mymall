<template>
  <div class="check-buttom" :class="{isActive:isCheck}">
    <img src="~assets/imgs/cart/tick.svg">
  </div>
</template>

<script>
export default {
  props: {
    isCheck:{
      type:Boolean,
      default(){
        return true
      }
    }
  }
}
</script>

<style scoped>
.check-buttom{
  border-radius: 50%;
  border: 2px solid #D5E1E1;
}
.isActive{
  border-color: orangered;
  background-color: orangered;
}

</style>