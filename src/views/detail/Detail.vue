<template>
  <div id="detailPage">

    <DetailNavBar> </DetailNavBar>
    <Scroll class="detailScroll" ref="scroll">
      <DetailSwiper :topimages="topimages"></DetailSwiper>
      <DetailBaseInfo :goods="goods"> </DetailBaseInfo>
      <DetailShopInfo :shop = "shop"></DetailShopInfo>
      <DetailGoodsInfo :detail-info = 'detailinfo' @imageLoad ="imageLoad"></DetailGoodsInfo>
      <DetailParamInfo :param-info='paramInfo'></DetailParamInfo>
    </Scroll>

  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'

import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/detailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'


import {getDetailData, Goods, Shops, GoodsParam} from 'network/detail.js'

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
  },
  data() {
    return {
      iid: null,
      topimages: [],
      goods: {},
      shop:{},
      detailinfo:{},
      paramInfo:{}
    };
  },
  created() {
    // 1.保存每个详情页的iid
    this.iid = this.$route.params.iid;
    // 2.请求详情页数据
    getDetailData(this.iid).then((res)=>{
      console.log(res);
      const data = res.data.result
      this.topimages = data.itemInfo.topImages
      // 3.请求详情页的商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      // 4.请求商品的数据
      this.shop = new Shops(data.shopInfo)
      // 5.请求商品详情数据
      this.detailinfo = data.detailInfo
      // 6.请求商品参数数据
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      
    
    })
    
  },
  methods: {
    imageLoad(){
      this.$refs.scroll.refresh()
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
  height: calc(100% - 44px);
}
</style>