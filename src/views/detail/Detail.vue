<template>
  <div id="detailPage">
    <DetailNavBar @titleClick = 'titleClick' ref="navbar"> </DetailNavBar>
    <Scroll class="detailScroll" ref="scroll" :probe-type="3"  @scroll = "contentscroll">
      <DetailSwiper :topimages="topimages"></DetailSwiper>
      <DetailBaseInfo :goods="goods"> </DetailBaseInfo>
      <DetailShopInfo :shop = "shop"></DetailShopInfo>
      <DetailGoodsInfo :detail-info = 'detailinfo' @imageLoad ="imageLoad"></DetailGoodsInfo>
      <DetailParamInfo :param-info='paramInfo' ref="paramInfo"></DetailParamInfo>
      <DetailCommontInfo :commont-info="commontInfo" ref="commontInfo"></DetailCommontInfo>
      <GoodsList :goods ='recommend' ref="goodsList"></GoodsList>
    </Scroll>
    <DetailBottombBar @addToCart ='addToCart'></DetailBottombBar>
    <BackTop @click.native="backtopclick" v-show="isbacktopshow"  />
    <Toast :message="message" :show="show" class="detail-toast"></Toast>
  </div>

</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import { debounce } from "common/utils.js";

import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/detailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommontInfo from './childComps/DetailCommontInfo'
import DetailBottombBar from './childComps/DetailBottombBar'

import GoodsList from "components/content/goods/GoodsList";
import {backToMixin} from 'common/mixin.js'
import Toast from 'components/common/toast/Toast.vue'
// import BackTop from "components/content/backtop/BackTop";


import {getDetailData, Goods, Shops, GoodsParam ,getRecommend} from 'network/detail.js'

import { mapActions } from 'vuex'

export default {
  name:'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommontInfo,
    DetailBottombBar,
    GoodsList,
    Toast,
    // BackTop,
  },
  data() {
    return {
      iid: null,
      topimages: [],
      goods: {},
      shop:{},
      detailinfo:{},
      paramInfo:{},
      commontInfo: {},
      recommend:[],
      themTopYs:[],
      currentIndex: 0,
      // isbacktopshow: false,
      message:'',
      show:false,
    };
  },
  mixins: [backToMixin],
  created() {
    // 1.保存每个详情页的iid
    this.iid = this.$route.params.iid;
    // 2.请求详情页数据
    getDetailData(this.iid).then((res)=>{
      console.log(res);
      const data = res.data.result
      this.topimages = data.itemInfo.topImages
      // 1.请求详情页的商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      // 3.请求商品的数据
      this.shop = new Shops(data.shopInfo)
      // 4.请求商品详情数据
      this.detailinfo = data.detailInfo
      // 5.请求商品参数数据
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      // 6.请求评论信息
      if(data.rate.cRate !== 0){
        this.commontInfo = data.rate.list[0]
      }

    })
    // 3.请求详情页推荐数据
    getRecommend().then((res)=>{
      // console.log(res);
      this.recommend = res.data.data.list
    })
    
  },
  mounted() {
    /** 
     * 图片加载的事件监听
    */
    // 放抖动函数使用
    const refresh = debounce(this.$refs.scroll && this.$refs.scroll.refresh, 100);
    //解决滚动区域bug 使用事件总线
    this.$bus.$on("detailitemimgload", () => {
      // console.log("sss");
      refresh();
    });
    

  },
  methods: {
    ...mapActions(['addCart']),
    imageLoad(){
      this.$refs.scroll.refresh()
        this.themTopYs=[]
        this.themTopYs.push(0)
        this.themTopYs.push(this.$refs.paramInfo.$el.offsetTop -44 )
        this.themTopYs.push(this.$refs.commontInfo.$el.offsetTop -44 )
        this.themTopYs.push(this.$refs.goodsList.$el.offsetTop - 44 )
        this.themTopYs.push(Number.MAX_VALUE)
        // console.log(this.themTopYs);
    },
    // 导航栏的点击事件
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themTopYs[index], 1000)
    },
    // // backtop 点击事件
    // backtopclick() {
    //   this.$refs.scroll.scrollTo(0, 0, 500);
    // },
    contentscroll(position){
      // 为backTop 监听页面滚动的位置。用来判断 是否显示, 使用miXin
      this.detailbacktop(position)

      // 监听滚动的Y值
      const positionY = -position.y
      // console.log(positionY);
      const length = this.themTopYs.length
      
      // 普通写法
      for(let i = 0 ;i<length-1;i++){
        if((this.currentIndex !== i) &&( positionY >=this.themTopYs[i] &&  positionY < this.themTopYs[i+1]) ){
          this.currentIndex = i
          this.$refs.navbar.currentOption = this.currentIndex
        }
      }

      // hack做法
      // for(let i = 0 ;i<length;i++){
      //   if((this.currentIndex !== i) &&((i<length-1 && positionY >=this.themTopYs[i] &&  positionY < this.themTopYs[i+1])||(i== length-1  && positionY >= this.themTopYs[i])) ){
      //     this.currentIndex = i
      //     this.$refs.navbar.currentOption = this.currentIndex
      //   }
      // }
      
    },

    // 添加购物车
    addToCart(){
      // 1.获取购物车需要展示的信息
      const product = {};

      product.image = this.topimages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.iid = this.iid;
      product.lowPrice = this.goods.lowPrice;


      // 2、将商品添加到购物车当中去

      // 使用组件分发ACTION
      this.addCart(product).then((res)=>{
        
        // 使用插件封装
        this.$toast.show(res)

        //传统做法
        // this.show = true
        // this.message = res

        // setInterval(()=>{
        //   this.show = false
        //   this.message = ''
        // },1500)
      })
      // 使用常规的调用ACTION
      // this.$store.dispatch('addCart',product).then((res)=>{
      //   console.log(res);
      // })
      

    }

  }
};
</script>

<style>
#detailPage{
  background-color: #ffffff;
  position: relative;
  z-index: 9 ;
  height: 100vh;
}
.detailScroll{
  height: calc(100% - 104px);
  background-color: #ffffff ;
  overflow: hidden;
  
}

</style>