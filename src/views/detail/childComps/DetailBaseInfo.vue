<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="n-price">{{goods.price}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span v-if="goods.discountDesc" class="discountDesc" :style="{'background-color':goods.discountBgColor}">{{goods.discountDesc}}</span>
    </div>
    <div class="info-other">
      <span>{{ goods.columns[0] }}</span>
      <span>{{ goods.columns[1] }}</span>
      <span>{{ goods.services[goods.services.length-1].name }}</span>
    </div>
    <div class="info-service">
      <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index-1].icon" >
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>

  </div>
</template>     

<script>
export default {

  props: {
    goods:{
      type: Object,
      default(){
        return {}
      }
    }
  }

}
</script>

<style>
.base-info{
  background-color: #fff;
}
.info-title{
  font-size: 16px;
  margin: 10px 8px;
}
.info-price{
  margin: 10px 8px;

}
.n-price{
  color: var(--color-tint);
  font-size: 18px;
  font-weight: 700;
  margin-right: 5px;
}
.o-price{
  font-size: 12px;
  font-weight: 700;
  color: #B5B4B5;
  text-decoration:line-through;
  margin-right: 5px;
}
.discountDesc{
  color: #fff;
  font-size: 12px;
  padding: 3px;
  border-radius: 8px;
  
  position: relative;
  top: -8px;
}
.info-other{
  margin: 20px 0px;
  line-height: 30px;
  padding: 0px 5px;
  display: flex;
  font-size: 13px;
  border-bottom: 2px solid rgba(100, 100, 100, 0.1);
  justify-content: space-between;
  color: #B5B4B5;
}
.info-other span{
  margin-bottom: 6px;
}
.info-service{
  line-height: 25px;
  font-size: 14px;
  display: flex;
  padding: 0px 5px;
  justify-content: space-between;
  padding-bottom: 15px ;
  border-bottom: 4px solid rgba(100, 100, 100, 0.1);
}
.info-service-item img{
  width: 12px;
  height: 12px;
  margin-right: 3px;
}
</style>