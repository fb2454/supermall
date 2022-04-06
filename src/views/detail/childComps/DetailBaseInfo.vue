<template>
  <div class="goodsInfo" v-if="Object.keys(goodsInfo).length !== 0">
    <div class="goods-title">{{ goodsInfo.title }}</div>
    <div class="goods-price">
      <span>{{ goodsInfo.newPrice }}</span>
      <span>{{ goodsInfo.oldPrice }}</span>
      <span v-if="goodsInfo.discount">{{ goodsInfo.discount }}</span>
    </div>
    <div class="goods-hot">
      <span>{{ goodsInfo.columns[0] }}</span>
      <span>{{ goodsInfo.columns[1] }}</span>
      <span>{{ goodsInfo.services[goodsInfo.services.length - 1].name }}</span>
    </div>
    <div class="goods-trans">
      <span v-for="(item, index) in goodsInfo.services.length - 1" :key="index">
        <img v-if="goodsInfo.services[index].icon" :src="goodsInfo.services[index].icon" alt="" />
        {{ goodsInfo.services[index].name }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailBaseInfo',
  props: {
    goodsInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  components: {}
}
</script>

<style scoped>
.goodsInfo {
  margin-top: 15px;
  padding: 0 8px;
  color: #999;
  border-bottom: 5px solid #f2f5f8;
}

.goods-title {
  font-size: 17px;
  width: 100%;
  margin-bottom: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  color: #222;
}

.goods-price {
  height: 40px;
}

.goods-price :nth-child(1) {
  color: var(--color-high-text);
  font-size: 24px;
  margin-right: 5px;
}

.goods-price :nth-child(2) {
  font-size: 13px;
  margin-right: 3px;
  text-decoration-line: line-through;
}

.goods-price :nth-child(3) {
  display: inline-block;
  padding: 0 3px;
  transform: translateY(-8px);
  background-color: var(--color-high-text);
  border-radius: 8px;
  color: #fff;
  font-size: 12px;
}

.goods-hot {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  margin-bottom: 5px;
  color: grey;
}

.goods-trans {
  display: flex;
  justify-content: space-between;
  height: 60px;
  line-height: 60px;
  border-top: 2px solid rgba(100, 100, 100, 0.1);
  /* border-bottom: 3px solid #eee; */
  text-align: center;
  font-size: 13px;
  color: #333;
}

.goods-trans img {
  height: 16px;
  width: 16px;
  transform: translateY(3px);
}
</style>
