<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
// import { eventBus } from '@/common/eventBus'

export default {
  name: 'vue-scroll',
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })
    // 监听滚动事件
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on('scroll', (position) => {
      // console.log(position)
        this.$emit('scrollContent', position)
      })
    }
    // 监听滚动到底部
    if (this.pullUpLoad === true) {
      this.scroll.on('pullingUp', () => {
        // console.log('监听滚动到底部')
        this.$emit('pullUp')
      })
    }

    // 触发回到顶部事件
    /* eventBus.$on('backTop', () => {
      this.scroll.scrollTo(0, 0, 500)
    }) */
  },
  methods: {
    scrollTo(x, y, time = 500) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    // 完成上拉加载
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style scoped>
</style>
