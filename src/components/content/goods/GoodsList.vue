<template>
  <div class="goods">

    <GoodListItem v-for="(item,index) in goods" :key='goods[index].iid' :goodsitem="item"></GoodListItem>

    <!-- <span>{{goods}}</span> -->
  </div>
</template>

<script>
import GoodListItem from './GoodsListItem'
export default {
  components: {
    GoodListItem,
  },
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  }

}
</script>

<style scoped>
.goods{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 4px;
}
</style>