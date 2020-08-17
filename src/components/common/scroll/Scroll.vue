<template>
  <div ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  props: {
    probeType: {
      type: Number,
      default() {
        return 0;
      },
    },
    pullUpLoad: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  // 组件创建完后调用。
  mounted() {
    // 创建scroll 实例
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad:this.pullUpLoad,
    });

    // 监听页面滚动的位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", (position) => {
        this.$emit("scroll", position);
      });
    }

    // 监听上拉加载更多 
    if(this.pullUpLoad === true){
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp");
      });
    }
  },

  methods: {
    scrollTo(x, y, time) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    refresh() {
      // console.log("sss");
      this.scroll && this.scroll.refresh();
    },
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()
    },
    getscrollY(){
      return this.scroll ? this.scroll.y : 0
    }
  },
};
</script>

<style>
</style>