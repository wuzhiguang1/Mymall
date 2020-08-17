<template>
  <div id="home">
    <nav-bar class="home-nav">
      <span slot="center">购物街</span>
    </nav-bar>
    <TabControl :titles="['流行','新款','经典']" 
        class="tab-control" 
        @tabControlClick="tabcontrolclick"
        ref="tabControl1"
        v-show="istabFixed"
      ></TabControl>

    <Scroll
      class="contents"
      ref="scroll"
      :probe-type="3"
      @scroll = "contentscroll"
      :pull-up-load = "true"
      @pullingUp = "loadMore"
    >
      <home-swiper :banners="banners" @imageloadswiper='imageloadswiper'></home-swiper>
      <recommends :recommends="recommends"></recommends>
      <featurn-view></featurn-view>
      <TabControl :titles="['流行','新款','经典']" 
        class="tab-control" 
        @tabControlClick="tabcontrolclick"
        ref="tabControl2"
      ></TabControl>
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
import { debounce } from "../../common/utils";

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
      tabControlOffsetTop: 0,
      istabFixed: false,
      saveY: 0,
      
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
  activated () {
    // console.log(this.saveY);
    this.$refs.scroll.scrollTo(0 ,this.saveY, 500)
    this.$refs.scroll.refresh()
  },
  deactivated () {
    this.saveY = this.$refs.scroll.getscrollY()
    // console.log(this.saveY);
  },

  mounted() {
    /** 
     * 图片加载的事件监听
    */
    // 放抖动函数使用
    const refresh = debounce(this.$refs.scroll && this.$refs.scroll.refresh, 400);
    //解决滚动区域bug 使用事件总线
    this.$bus.$on("itemimgload", () => {
      refresh();
    });
    
  },
  methods: {
    /**
     * 事件方法
     */
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
      this.$refs.tabControl2.courrentIndex = index
      this.$refs.tabControl1.courrentIndex = index
    },
    backtopclick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    contentscroll(position) {
       // 为backTop 监听页面滚动的位置。
      this.isbacktopshow = -position.y > 800;
      
      // 监听tabcontrol 的吸顶
      this.istabFixed = (-position.y) > this.tabControlOffsetTop

    },

    /** 
     * 获取tabContral 的offsetTop 
    */

    imageloadswiper(){
    // 所有的组件都有一个属性 $el: 用于获取该组件的元素
    this.tabControlOffsetTop = this.$refs.tabControl2.$el.offsetTop ;
    },

    // 请求加载更多事件
    loadMore(){
      // console.log("333");
      this.getHomeGoods1(this.currentType)  
    },

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
        this.$refs.scroll.finishPullUp()
      });
    },
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
  background-color: #ffffff;
}
.home-nav {
  background-color: var(--color-tint);
  color: #ffffff;

  /* 原生滚动 为了让navbar 实现吸顶 */
  /* position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 10; */
}

.contents {
  position: absolute;
  overflow: hidden;
  left: 0;
  top: 44px;
  bottom: 49px;
}
.tab-control{
  position: relative;
  z-index: 10;
}
</style>
