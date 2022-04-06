import BackTop from '@/components/content/backTop/BackTop.vue'
import { BACK_POSITION } from './const.js'

export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false
    }
  },
  components: {
    BackTop
  },
  methods: {
    // 回到顶部事件
    backTopClick() {
      // console.log(this.$refs.scroll)
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    listenShowBackTop(position) {
      // 判断 backTop 是否显示
      this.isShowBackTop = -position.y > BACK_POSITION
    }
  }
}
