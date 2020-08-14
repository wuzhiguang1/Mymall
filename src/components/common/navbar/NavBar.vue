<template>
  <div class="nar-bar">
    <div class="left"><slot name="left"> </slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"> </slot></div>
  </div>
</template>

<script>
export default {
  props: {
    isColor:{
      type:String,
      default(){
        return "#FFFFFF"
      }
    }
  }

}
</script>

<style>
.nar-bar{
  display: flex;
  line-height: 44px;
  height: 44px;
  text-align: center;
  box-shadow: 0px 1px 2px rgba(100, 100, 100, 0.1);
}
.left,.right {
  width: 55px;
  /* background-color: #bfa; */
}
.center{
  flex: 1;
  /* background-color: pink; */
}

</style>