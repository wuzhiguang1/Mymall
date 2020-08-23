import BackTop from "components/content/backtop/BackTop";

export const backToMixin = {
  components: {
    BackTop,
  },
  data() {
    return {
      isbacktopshow: false,
    };
  },
  methods: {
    // backtop 点击事件
    backtopclick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    detailbacktop(position) {
      // 为backTop 监听页面滚动的位置。用来判断 是否显示
      this.isbacktopshow = -position.y > 800;
    },
  }
}

export const tabControlMixin = {
  data: function() {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      console.log(this.currentType);
    }
  }
}