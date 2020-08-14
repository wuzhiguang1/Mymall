<template>
   <swiper>
      <swiper-item v-for="item in banners" :key="item.title">
        <a :href="item.link">
          <img :src="item.image" alt="">
        </a>
      </swiper-item>
    </swiper>

    <!-- vant 轮播图 -->
    <!-- <van-swipe class="my-swipe" :autoplay="3000">
      <van-swipe-item v-for="item in banners" :key="item.title">
        <a :href="item.link">
          <img :src="item.image" alt />
        </a>
      </van-swipe-item>
    </van-swipe> -->

</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper'
export default {
  components: {
    Swiper,
    SwiperItem
  },
  props:{
    banners:{
      type:Array,
      default(){
        return []
      }
    }
  }

}
</script>

<style scoped>
 /* .my-swipe .van-swipe-item img {
  width: 100%;
  
} */
</style>