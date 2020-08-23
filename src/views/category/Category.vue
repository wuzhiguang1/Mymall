<template>
  <div class="category">
    <NavBar class="category-nav-bar">
      <span slot="center">商品分类</span>
    </NavBar>
    <div class="content ignore">
      <TabMenu :categories="categories" @selectItem="selectItem"></TabMenu>
      <scroll id="tab-content" :data="[categoryData]" ref="scroll">
        <div>
          <TabContentCategory :subcategories="showSubcategory" />
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";

import TabMenu from "./childComps/TabMenu";
import TabContentCategory from "./childComps/TabContentCategory";

import {
  getCategory,
  getSubcategory,
  getCategoryDetail,
} from "network/category";
import { POP, NEW, SELL } from "common/const.js";
import { tabControlMixin } from "../../common/mixin";

export default {
  name: "Category",
  data() {
    return {
      categories: [],
      categoryData: {},
      currentIndex: -1,
    };
  },
  // mixins: [tabControlMixin],
  components: {
    NavBar,
    TabMenu,
    TabContentCategory,
    Scroll,
  },
  created() {
    // 1.请求分类数据
    this._getCategory();
    // 2.监听图片加载完成
    this.$bus.$on("imgLoad", () => {
      this.$refs.scroll&&this.$refs.scroll.refresh();
    });
  },
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) return {};
      return this.categoryData[this.currentIndex].subcategories;
    },
  },
  methods: {
    _getCategory() {
      getCategory().then((res) => {
        // 1.获取分类数据
        console.log(res);
        this.categories = res.data.data.category.list;
        // // 2.初始化每个类别的子数据
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              pop: [],
              new: [],
              sell: [],
            },
          };
        }
        // 3.请求第一个分类的数据
        this._getSubcategories(0);
      });
    },
    _getSubcategories(index) {
      this.currentIndex = index;
      const mailKey = this.categories[index].maitKey;
      getSubcategory(mailKey).then((res) => {
        console.log(res.data.data);
        this.categoryData[index].subcategories = res.data.data;
        this.categoryData = { ...this.categoryData };
        this._getCategoryDetail(POP);
        this._getCategoryDetail(SELL);
        this._getCategoryDetail(NEW);
      });
    },
    _getCategoryDetail(type) {
      // 1.获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      // 2.发送请求,传入miniWallkey和type
      getCategoryDetail(miniWallkey, type).then((res) => {
        // 3.将获取的数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type] = res;
        this.categoryData = { ...this.categoryData };
      });
    },
    /**
     * 事件响应相关的方法
     */
    selectItem(index) {
      this._getSubcategories(index);
    },
  },
};
</script scoped>

<style scoped>
.category {
  height: 100vh;
}
.category-nav-bar {
  background-color: var(--color-tint);
  color: #ffffff;
  font-weight: 700;
}
.content,
.ignore {
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
  display: flex;
  overflow: hidden;
}
#tab-content {
  height: 100%;
  flex: 1;
}
</style>
