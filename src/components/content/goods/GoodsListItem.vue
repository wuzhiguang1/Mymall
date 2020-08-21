<template>
  <div class="goods-list-item" @click="detailPageclick">
    <img v-lazy="showimages" alt @load="imgload" />
    <div class="goods-info">
      <p>{{goodsitem.title}}</p>
      <span class="price">￥{{goodsitem.price}}</span>
      <span class="coolect">{{goodsitem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goodsitem: {
      type: Object,
      default() {
        return [];
      },
    },
  },
  computed: {
    showimages(){
      return this.goodsitem.image || this.goodsitem.show.img 
    }
  },
  methods: {
    // 滚动区域bug
    imgload() {
      if(this.$route.path.indexOf ('/home') === 0 ){
        this.$bus.$emit("itemimgload");
      }else if(this.$route.path.indexOf ('/detail') ===0){
        this.$bus.$emit("detailitemimgload");
      }
    },
    // 详情页
    detailPageclick() {
      this.$router.push("/detail/"+this.goodsitem.iid)
    },
  },
};
</script>

<style scoped>
.goods-list-item {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}
.goods-list-item img {
  width: 100%;
  border-radius: 5px;
}
.goods-info {
  font-size: 12px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 5px;
  overflow: hidden;
  text-align: center;
}
.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 4px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}
.goods-info .coolect {
  position: relative;
}
.goods-info .coolect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -0.5px;
  width: 14px;
  height: 14px;
  background: url("~assets/imgs/common/collect.svg") 0/14px;
}
</style>