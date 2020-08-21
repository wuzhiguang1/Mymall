<template>
  <dir class="cart-list-item">
    <div class="item-selector" @click="checkbutton">
      <CheckButton :is-check = "cartListItem.checked"></CheckButton>
    </div>

    <div class="item-img">
      <img :src="cartListItem.image" alt="商品信息" />
    </div>
    <div class="item-info">
      <div class="item-title">{{cartListItem.title}}</div>
      <div class="item-desc">{{cartListItem.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">￥{{cartListItem.lowPrice}}</div>
        <div class="item-count right">x{{cartListItem.count}}</div>
      </div>
    </div>
  </dir>
</template>

<script>
import CheckButton from "./CheckButton";
export default {
  data () {
    return {
      
    }
  },
  components: {
    CheckButton
  },
  
  props: {
    cartListItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    checkbutton(){
      this.cartListItem.checked = !this.cartListItem.checked
    }
  }

};
</script>

<style scoped>
.cart-list-item {
  /* height: 100px; */
  width: 100%;
  display: flex;
  font-size: 0;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}
.item-selector {
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
.item-title,
.item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.item-img {
  padding: 5px;
}
.item-img img {
  width: 80px;
  height: 100px;
  display: block;
  border-radius: 5px;
}
.item-info {
  font-size: 17px;
  color: #333;
  padding: 10px 10px;
  position: relative;
  overflow: hidden;
}

.item-info .item-desc {
  font-size: 14px;
  color: #666;
  margin-top: 15px;
}
.info-bottom {
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}
.info-bottom .item-price {
  color: orangered;
}
.item-count {
  margin-right: -25px;
}
</style>