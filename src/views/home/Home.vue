<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control class="tab-control1" :titles="['流行', '新款', '精选']" @tabClick="getTabClick" ref="tabControl1" v-show="isTabFixed"></tab-control>
    <scroll class="content" ref="scroll" :probe-type="3" @scrollContent="getPosition" :pull-up-load="true" @pullUp="loadMore">
      <home-swiper :banners="banners" @swiperImgLoad="getTabPosition"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行', '新款', '精选']" @tabClick="getTabClick" ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <!-- native修饰符：在组件标签上监听原生事件 -->
    <back-top @click.native="backTopClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper.vue'
import RecommendView from './childComps/RecommendView.vue'
import FeatureView from './childComps/FeatureView.vue'
import GoodsList from '@/components/content/goods/GoodsList.vue'

import NavBar from '@/components/common/navBar/NavBar.vue'
import TabControl from '@/components/content/tabControl/TabControl.vue'
import Scroll from '@/components/common/scroll/scroll.vue'

import { getHomeMultidata, getHomeGoods } from '@/network/home.js'
import { debounce } from '@/common/utils'
import { backTopMixin } from '@/common/mixin.js'
// import { eventBus } from '@/common/eventBus'

export default {
  name: 'vue-Home',
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    Scroll,
    GoodsList
  },
  mixins: [backTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      images: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: 'pop',
      tabOffSetTop: 500,
      isTabFixed: false,
      saveY: 0
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  created() {
    // 请求多个数据
    this.getHomeMultidata()

    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {
    // 图片记载完成的事件监听
    // 利用refresh解决插件的滚动高度问题
    const refresh = debounce(this.$refs.scroll.refresh, 500)
    // eventBus.$on('scrollRefresh', () => {
    this.$bus.$on('homeScrollRefresh', () => {
      refresh()
    })
  },
  activated() {
    // console.log('激活了')
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY()
    this.$off('homeScrollRefresh')
  },
  methods: {
    /* 网络请求相关的方法 */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res.data)
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then((res) => {
        // console.log(res)
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
      })
    },

    /* 事件监听相关方法 */
    // tab栏点击事件
    getTabClick(index) {
      // console.log(index)
      this.currentType = Object.keys(this.goods)[index]
      // console.log(this.currentType)
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    // 滚动事件
    getPosition(position) {
      // console.log(position.y)
      this.listenShowBackTop(position)

      // 决定 tabControl 是否吸顶
      this.isTabFixed = -position.y + 40 > this.tabOffSetTop
    },
    // 上拉加载更多事件
    loadMore() {
      // console.log('上拉加载更多')
      this.getHomeGoods(this.currentType)
      this.$refs.scroll.finishPullUp()
    },
    // tabControl 吸顶效果
    getTabPosition() {
      // 获取 tabControl 函数的 offsetTop
      // console.log(this.$refs.tabControl2.$el.offsetTop)
      this.tabOffSetTop = this.$refs.tabControl2.$el.offsetTop
    }
  }
}
</script>

<style lang="less" scoped>
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  font-size: 16px;
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1; */
  height: 44px;
}

#home {
  // position: relative;
  height: 100vh;
  // padding-top: 44px;
  padding-bottom: 49px;
}

.tab-control1 {
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
  z-index: 9;
}

// 由于使用了 better-scroll 插件，一下方式实现吸顶效果失效
/* .tab-control {
  position: sticky;
  top: 44px;
} */

/* .content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
} */

.content {
  height: calc(100% - 49px);
  overflow: hidden;
  // margin-bottom: 49px;
}
</style>
