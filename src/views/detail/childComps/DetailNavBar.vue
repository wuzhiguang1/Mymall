<template>
<div>
  <NavBar class="detailNavBar">
    <div slot="left" class="backImg" @click="backClick">
      <img src="~assets/imgs/common/back.svg" alt="">
    </div>

    <div slot="center" class="navCenter">
      <div v-for="(item,index) in titles" 
          :key="index" class="navCenterItem" 
          @click="navCenterItemClick(index)" 
          :class="{isactive:index === currentOption}">
          {{item}}
      </div>
    </div>
  </NavBar>
</div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  components: {
    NavBar
  },
  data () {
    return {
      titles:['商品', '参数', '评论', '推荐'],
      currentOption: 0,
    }
  },
  methods: {
    navCenterItemClick(index){
      this.currentOption = index
    },
    backClick(){
      this.$router.back()
    }
  }
}
</script>

<style>
.detailNavBar{
  background-color: #ffffff;
  position: relative;
  z-index: 9;
}
.navCenter{
  display: flex;
}
.navCenterItem{
  flex: 1;
  font-size: 13px;
}
.isactive{
  color: var(--color-high-text);
}
.backImg img{
  margin-top: 12px;
}
</style>