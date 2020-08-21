<template>
  <div class="cart-bottom-bar">
    <div class="check—button-wrapper" @click="allselect">
      <CheckButton class="check—button" :is-check="checkActive" ></CheckButton>
    </div>
    <span>全选</span>
    <div class="total">总计￥:{{titleprice | price}}</div>
    <div class="check-out" @click="tocheckout ">去结账({{toCheckOut}})</div>
  </div>
</template>

<script>
import CheckButton from "./CheckButton";

export default {
  components: {
    CheckButton,
  },
  computed: {
    // 总价格
    titleprice() {
      return this.$store.state.cartList
        .filter((item) => {
          return item.checked;
        })
        .reduce((preValue, item) => {
          return preValue + item.lowPrice * item.count;
        }, 0);
    },
    // 去结算的总数量
    toCheckOut() {
      return this.$store.state.cartList
        .filter((item) => {
          return item.checked;
        })
        .reduce((preValue, item) => {
          return preValue + item.count;
        }, 0);
    },
    // 判断购物车是否全部选中
    checkActive() {
      // 性能不好，需要过滤全部的数据。
      // if(this.$store.state.cartList.length === 0) return false
      // return !( this.$store.state.cartList.filter(item => !item.checked).length)

      // 只要我们过滤到一个不选中就可以得到我们想要的结果了
      if (this.$store.state.cartList.length === 0) return false;
      return !this.$store.state.cartList.find((item) => !item.checked);
    },
  },
  methods: {
    allselect() {
      if(this.checkActive){
        this.$store.state.cartList.forEach(item=> item.checked=false)
      }else{
        this.$store.state.cartList.forEach(item=> item.checked=true)
      }
    },
    tocheckout(){
      if(!this.checkActive){
        this.$toast.show("请购选您的商品")
      }else{
        this.$toast.show("抱歉，结账功能还未开发")
      }
      
    }
  },
  filters: {
    price(vlaue) {
      return vlaue.toFixed(2);
    },
  },
};
</script>

<style scoped>
.cart-bottom-bar {
  height: 35px;
  background-color: #f2f2f2;
  position: relative;
  display: flex;
  line-height: 35px;

  box-shadow: 0 -1px 2px rgba(100, 100, 100, 0.3);
}
.check—button {
  display: inline;
}
.check—button-wrapper {
  width: 20px;

  margin-left: 10px;
}

.cart-bottom-bar span {
  position: relative;
  left: 10px;
  top: 0px;
  font-size: 14px;
  color: #a88c9a;
}
.total {
  font-size: 15px;
  margin-left: 40px;
  flex: 1;
}
.check-out {
  width: 90px;
  background-color: #ff8198;
  color: #ffffff;
  text-align: center;
  font-size: 15px;
}
</style>