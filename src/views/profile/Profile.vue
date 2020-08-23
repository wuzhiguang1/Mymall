<template>
  <div class="profile">
    <NavBar class="nav-bar">
      <div slot="center">我的信息</div>
    </NavBar>
    <UserInfo></UserInfo>
    <AccountInfo></AccountInfo>
    <NormalListView :list-data="orderList" />
    <NormalListView :list-data="serviceList" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import UserInfo from "./childComps/UserInfo";
import AccountInfo from "./childComps/AccountInfo";
import NormalListView from "./childComps/NormalListView";
export default {
  name: "Profile",
  components: {
    NavBar,
    UserInfo,
    AccountInfo,
    NormalListView,
  },
  data() {
    return {
      orderList: [
        { icon: "message.svg", info: "我的消息" },
        { icon: "pointer.svg", info: "积分商城" },
        { icon: "vip.svg", info: "会员卡" },
        
      ],
      serviceList: [
        { icon: "cart.svg", info: "我的购物车" },
        { icon: "shopping.svg", info: "下载购物APP" },
      ],
    };
  },
};
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: #ffffff;
}
</style>
