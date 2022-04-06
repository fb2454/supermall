<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles" :key="index" class="tab-control-item" :class="{ active: index === currentIndex }" @click="itemClick(index)">
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  data() {
    return {
      currentIndex: 0
    }
  },
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      this.$emit('tabClick', index)
    }
  }
}
</script>

<style scoped>
.tab-control {
  display: flex;
  height: 40px;
  z-index: 1;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}

.tab-control-item {
  flex: 1;
  background-color: #fff;
}

.active {
  color: var(--color-high-text);
}

.active span {
  padding: 5px;
  border-bottom: 2px solid var(--color-tint);
}
</style>
