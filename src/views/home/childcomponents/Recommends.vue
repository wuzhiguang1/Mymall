<template>
  <div class="recommends">
    <div v-for="item in recommends" :key="item.title" class="recommends-item">
      <img :src="item.image" alt="">
      <span>{{item.title}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    recommends:{
      type:Array,
      default(){
        return []
      }
    }
  }

}
</script>



<style scoped>
.recommends{
  display: flex;
  font-size: 12px;
  text-align: center;
  padding: 10px 0px 15px 0px;
  border-bottom: 8px solid #eeeeee ;

}
.recommends-item{
  flex: 1;
  
  
}
.recommends-item img{
  width: 70px;
  height: 70px;
  margin-bottom: 3px;
}
.recommends-item span{
  
  display:block;
  
}
</style>