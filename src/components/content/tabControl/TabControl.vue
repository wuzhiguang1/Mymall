<template>
  <div class="tabControl">
    <div
      v-for="(item, index) in titles"
      :key="item"
      class="tab-control-item"
      :class="{active: index===courrentIndex}"
      @click="itemclick(index)"
    >
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      courrentIndex: 0,
    };
  },
  methods: {
    itemclick(index) {
      this.courrentIndex = index;
      this.$emit("tabControlClick", index);
    },
  },
};
</script>


<style scoped>
.tabControl {
  display: flex;
  font-size: 15px;
  height: 40px;
  line-height: 40px;
  background-color: #ffffff;
}
.tab-control-item {
  flex: 1;
  text-align: center;
}

.active {
  color: var(--color-high-text);
}

.active span {
  border-bottom: 2px solid var(--color-tint);
  padding: 5px;
}
</style>