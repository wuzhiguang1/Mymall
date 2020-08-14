<template>
  <div ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  props: {
    probeType:{
      type: Number,
      default(){
        return 0
      }
    },
    pullUpLoad:{
      type:Boolean,
      default(){
        return false
      }
    },
  },
  data () {
    return {
      scroll: null
    }
  },
  // 组件创建完后调用。
  mounted () {
    // 创建scroll 实例
    this.scroll = new BScroll(this.$refs.wrapper,{
      click:true,
      probeType: this.probeType,
      // pullUpLoad:this.pullUpLoad,
    })
    
    this.scroll.on("scroll", position=>{
    
      this.$emit('scroll', position)
    })
    this.scroll.on('pullingUp',()=>{
    
      this.$emit('pullingUp')
    })
    // console.log(this.scroll);
  },

  methods: {
    scrollTo(x, y, time){
    this.scroll && this.scroll.scrollTo(x, y, time)
    },
    refresh(){
      console.log("sss");
    this.scroll && this.scroll.refresh()
    },
    // finishPullUp(){
    //   this.scroll.finishPullUp()
    // }
    
  }

}
</script>

<style>

</style>