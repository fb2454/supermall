<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="@/assets/img/common/back.svg" alt="" />
      </div>
      <div slot="center" class="center">
        <div v-for="(item, index) in titles" :key="index" :class="{ active: index === currentIndex }" @click="titleClick(index)">{{ item }}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from '@/components/common/navBar/NavBar.vue'

export default {
  name: 'DetailNavBar',
  data() {
    return {
      titles: ['商品', '参数', '评论', '详情'],
      currentIndex: 0
    }
  },
  components: {
    NavBar
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index
      this.$emit('titleClick', index)
    },
    backClick() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.center {
  display: flex;
  justify-content: space-evenly;
  font-size: 13px;
}

.active {
  color: var(--color-high-text);
}

.back {
  transform: translateY(5px);
}
</style>
