<template>
  <div id="home">
    <nav-bar class="home-nav">
      <span slot="center">购物街</span>
    </nav-bar>

    <Scroll class="contents" ref="scroll" :probe-type="3" @scroll="contentscroll" 
    :pull-up-load='true'
    
    >
      <home-swiper :banners="banners"></home-swiper>
      <recommends :recommends="recommends"></recommends>
      <featurn-view></featurn-view>
      <TabControl :titles="['流行','新款','经典']" class="tab-control" @tabControlClick="tabcontrolclick"></TabControl>
      <GoodsList :goods="goods[currentType].list"></GoodsList>
    </Scroll>

    <BackTop @click.native="backtopclick" v-show="isbacktopshow" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backtop/BackTop";

import HomeSwiper from "./childcomponents/HomeSwiper";
import Recommends from "./childcomponents/Recommends";
import FeaturnView from "./childcomponents/FeatureView";

import { getHomeMultidata, getHomeGoods } from "network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
    // Swiper,
    // SwiperItem
    HomeSwiper,
    Recommends,
    FeaturnView,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isbacktopshow: false,
    };
  },

  //生命周期函数， 当一创建该组件的时候 就去请求数据
  created() {
    // 请求数据
    this.getHomeMultidata();
    this.getHomeGoods1("pop");
    this.getHomeGoods1("new");
    this.getHomeGoods1("sell");
  
  },
  mounted() {   
    // 放抖动函数使用
    const refresh = this.debounce(this.$refs.scroll && this.$refs.scroll.refresh, 500)
    //解决滚动区域bug 使用事件总线 
    this.$bus.$on('itemimgload',()=>{
    refresh()
    })
  },
  methods: {
    /**
     * 事件方法
     */
    // 放抖动函数
    debounce(func, delay){
      let timer = null
      return function(...args){
        if(timer) clearTimeout(timer)
        timer = setTimeout(()=>{
          func.apply(this,args)
        },delay)
      }
    },

    tabcontrolclick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    backtopclick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    contentscroll(position) {
      this.isbacktopshow = -position.y > 800;
    },

    // loadMore(){
    //   this.getHomeGoods1(this.currentType)
    // },

    /**
     * 网络请求相关的方法
     */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
        // console.log(res.data.data);
      });
    },

    getHomeGoods1(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res.data.data.list[1].show.img);
        this.goods[type].list.push(...res.data.data.list);
        this.goods[type].page += 1;
        // 调用scroll中的finishPullUp() 方法 可以多次进行上拉加载
        // this.$refs.scroll.finishPullUp()
      });
      
    },
  },
};
</script>

<style scoped>
#home {
  padding-top: 44px;
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #ffffff;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 10;
}
.tab-control {
  position: sticky;
  top: 44px;
  z-index: 10;
}
.contents {
  position: absolute;
  overflow: hidden;
  left: 0;
  top: 44px;
  bottom: 49px;
}
</style>
