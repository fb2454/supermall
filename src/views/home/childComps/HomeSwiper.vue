<template>
  <Swiper>
    <SwiperItem v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imgLoad" />
      </a>
    </SwiperItem>
  </Swiper>
</template>

<script>
import { Swiper, SwiperItem } from '@/components/common/swiper'

export default {
  name: 'HomeSwiper',
  data() {
    return {
      isLoad: true
    }
  },
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    imgLoad() {
      if (this.isLoad) {
        this.$emit('swiperImgLoad')
        this.isLoad = false
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
}
</script>

<style></style>
