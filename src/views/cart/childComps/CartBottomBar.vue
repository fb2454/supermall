<template>
  <div class="cart-bottom-bar">
    <div @click="toggelCheckAll">
      <check-button class="checkbox" :isChecked="checkedAll" />
      <span>全选</span>
    </div>

    <div class="total-price">
      合计：<span>￥{{ totalPrice }}</span>
    </div>

    <div class="calculate" @click="toCaculate(checkedLength)">去结算({{ checkedLength }})</div>
  </div>
</template>

<script>
import CheckButton from '@/components/content/checkButton/CheckButton.vue'

export default {
  name: 'CartBottomBar',
  components: {
    CheckButton
  },
  data() {
    return {
      checkedAll: false
    }
  },
  computed: {
    totalPrice() {
      return this.$store.state.cartList
        .filter((item) => {
          return item.checked
        })
        .reduce((total, item) => {
          return total + item.price * item.count
        }, 0)
        .toFixed(2)
    },
    checkedLength() {
      return this.$store.state.cartList.filter((item) => item.checked).length
    }
  },
  methods: {
    toggelCheckAll() {
      this.checkedAll = !this.checkedAll
      this.$store.commit('isCheckedAll', this.checkedAll)
    },
    toCaculate(checkedLength) {
      if (!checkedLength) {
        this.$toast.show('请选择要购买的商品')
      }
    }
  },
  updated() {
    this.checkedAll = this.$store.state.cartList.every((item) => {
      return item.checked === true
    })
  }
}
</script>

<style scoped>
.cart-bottom-bar {
  display: flex;
  padding: 0 5px;

  height: 40px;
  line-height: 40px;
  border-top: 2px solid #eee;

  background-color: #fff;
}

.checkbox {
  vertical-align: middle;
  margin-right: 5px;
  /* background-color: #fff; */
}

.total-price {
  margin-left: 20px;
}

.total-price span {
  color: red;
}

.calculate {
  width: 100px;
  text-align: center;
  margin-left: auto;
  margin-right: 10px;
  border-radius: 20px;
  color: #fff;
  background-color: red;
}
</style>
