<template>
  <div class="goods-detail">
    <detail-nav-bar @titleClick="titleClick" ref="detailNavBar" />
    <scroll class="content1" ref="scroll" :probe-type="3" @scrollContent="scrollContent">
      <detail-swiper :swiper-images="topImages" />
      <detail-base-info :goods-info="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @detailImageLoad="detailImageLoad" />
      <detail-param-info ref="param" :param-info="goodsParam" />
      <detail-comments ref="comment" :comments-info="userComments" />
      <goods-list class="recommend" ref="recommend" :goods="goodsList" />
    </scroll>
    <back-top @click.native="backTopClick" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addCart="addToCart" />
    <!-- <toast message="哈哈哈" :isShow="isShow"></toast> -->
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailComments from './childComps/DetailComments.vue'
import DetailBottomBar from './childComps/DetailBottomBar.vue'

import Scroll from '@/components/common/scroll/scroll.vue'
import GoodsList from '@/components/content/goods/GoodsList.vue'
// import Toast from '@/components/common/toast/Toast.vue'

import { getDetail, Goods, Shop, GoodsParam, getRecommend } from '@/network/detail'
import { debounce } from '@/common/utils'
import { backTopMixin } from '@/common/mixin.js'

export default {
  name: 'GoodsDetail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailComments,
    GoodsList,
    DetailBottomBar
    // Toast
  },
  mixins: [backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      goodsParam: {},
      userComments: {},
      goodsList: [],
      themeTopYs: [],
      getThemeTopY: null,
      imageLoad: null,
      currentIndex: 0
      /* message: '',
      isShow: false */
    }
  },
  created() {
    // 保存传入的id
    this.iid = this.$route.query.id
    // console.log(this.iid)

    // 根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      // console.log(res)
      if (res.status.code === 1001) {
        // 获取顶部轮播图图片
        const data = res.result
        this.topImages = res.result.itemInfo.topImages

        // 获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        // console.log(this.goods)

        // 创建商铺信息对象
        this.shop = new Shop(data.shopInfo)

        // 商品的详情数据
        this.detailInfo = data.detailInfo

        // 获取参数信息
        this.goodsParam = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        // 获取评论数据
        this.userComments = data.rate

        /* this.$nextTick(() => {
          this.$refs.scroll.refresh()
          console.log(this.$refs.param.$el.offsetTop)
          this.themeTopYs.push(0)
          this.themeTopYs.push(this.$refs.param.$el.offsetTop - 44)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44)
        }) */
      }
    })
    // 3.请求推荐请求
    this._getRecommend()

    // 获取 offsetTop 值
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.param.$el.offsetTop - 44)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44)
      this.themeTopYs.push(Number.MAX_VALUE)
      // console.log(this.themeTopYs)
    }, 500)
  },
  methods: {
    _getRecommend() {
      getRecommend().then((res) => {
        // console.log(res)
        this.goodsList = res.data.list
      })
    },
    titleClick(index) {
      // console.log(index)
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index])
    },
    detailImageLoad() {
      this.imageLoad()
      this.getThemeTopY()
    },
    scrollContent(position) {
      this.listenShowBackTop(position)

      const length = this.themeTopYs.length
      for (let i = 0; i < length - 1; i++) {
        if (this.currentIndex !== i && i < length - 1 && -position.y >= this.themeTopYs[i] && -position.y < this.themeTopYs[i + 1]) {
          this.currentIndex = i
          this.$refs.detailNavBar.currentIndex = this.currentIndex
        }
      }

      /* for (let i = 0; i < length; i++) {
        if (this.currentIndex !== i && ((i < length - 1 && -position.y >= this.themeTopYs[i] && -position.y < this.themeTopYs[i + 1]) || (i === length - 1 && -position.y >= this.themeTopYs[i]))) {
          this.currentIndex = i
          this.$refs.detailNavBar.currentIndex = this.currentIndex
        }
      } */
    },
    addToCart() {
      // 获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid
      // console.log(product)

      // 将商品添加到购物车里
      // this.$store.commit('addCart', product)
      this.$store.dispatch('addCart', product).then((res) => {
        /* this.isShow = true
        this.message = res
        setTimeout(() => {
          this.isShow = false
        }, 1500) */

        this.$toast.show(res, 1500)
      })
    }
  },
  mounted() {
    // 图片记载完成的事件监听
    // 利用refresh解决插件的滚动高度问题
    const refresh = debounce(this.$refs.scroll.refresh, 500)
    this.imageLoad = () => {
      refresh()
    }
    this.$bus.$on('detailScrollRefresh', this.imageLoad)
  },
  destroyed() {
    this.$off('detailScrollRefresh')
  }
}
</script>

<style scoped>
.goods-detail {
  position: relative;
  z-index: 10;
  background-color: #fff;
  height: 100vh;
}

.content1 {
  height: calc(100% - 93px);
  overflow: hidden;
}

.recommend {
  padding-top: 10px;
}
</style>
