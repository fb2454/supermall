<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="(item, index) in swiperImages" :key="index">
      <img :src="item" alt="" @load="detailImgLoaded" />
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from '@/components/common/swiper'

export default {
  name: 'DetailSwiper',
  props: {
    swiperImages: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    detailImgLoaded() {
      this.$bus.$emit('detailScrollRefresh')
    }
  }
}
</script>

<style scoped>
.detail-swiper {
  height: 300px;
}
</style>
