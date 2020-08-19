<template>
  <div v-if="Object.keys(commontInfo).length !== 0" class="comont-info">
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">
        更多
        <i class="arrow-right"></i>
      </div>
    </div>

    <div class="info-user">
      <img :src="commontInfo.user.avatar" >
      <span>{{commontInfo.user.uname}}</span>
    </div>
    <div class="info-detail">
      <p>{{commontInfo.content}}</p>
      <div class="info-other">
        <span class="date">{{commontInfo.created |showDate}}</span>
        <span class="info-other-style">{{commontInfo.style}}</span>
      </div>
      <div class="info-imgs">
        <img :src="item" v-for="(item, index) in commontInfo.images" :key="index">
      </div>

    </div>

  </div>
</template>

<script>
import {formatDate} from 'common/utils.js'
export default {
  props: {
    commontInfo:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  filters: {
    showDate(value){
      const date = new Date(value*1000)
      return formatDate(date, 'yyyy-MM-dd')
    }
  }
}
</script >

<style scoped> 
.comont-info{
  padding: 5px 12px;
  color: #333;
  border-bottom: 5px solid #f2f5f8;
}
.info-header{
  display: flex;
  justify-content: space-between;
  height: 45px;
  line-height: 45px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0 5px;
}
.header-title{
  font-size: 15px;
}
.header-more{
  font-size: 13px;
}
.info-user{
  padding: 10px 0;
}
.info-user img {
  width: 42px;
  height: 42px;
  border-radius: 50%;
}
.info-user span {
  position: relative;
  top: -13px;
  left: 10px;
  font-size: 15px;
}
.info-detail{
  padding: 0 5px 15px;
}
.info-detail p{
  font-size: 12px;
  color: #8D8B8D;
}
.info-detail .info-other {
  color: #B2B0B2;
  margin-top:10px;
}
.info-other data{
  margin-right: 8px;
}
.info-other{
  font-size: 10px;
}
.info-other-style{
  font-size: 11px;
  margin-left: 5px;
}
.info-imgs img{
  width: 70px;
  height: 70px;
  margin-right: 5px;
  margin-top: 12px;
}

</style>