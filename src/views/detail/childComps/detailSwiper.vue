<template>
  
    <Swiper class="detailswiper">
      <SwiperItem v-for="(item,index) in topimages" :key="index">
        <img :src="item" alt="">
      </SwiperItem>
    </Swiper>

</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index.js"
export default {
  components: {
    Swiper, 
    SwiperItem,
  },
  props: {
    topimages:{
      type: Array,
      default(){
        return []
      }
    }
  }

}
</script>

<style>
.detailswiper{
  height: 300px;
  overflow: hidden;
}
</style>