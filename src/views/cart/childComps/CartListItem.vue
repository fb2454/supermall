<template>
  <div id="shop-item">
    <div class="item-selector">
      <check-button :is-checked="itemInfo.checked" @click.native="checkClick"></check-button>
    </div>
    <div class="item-img">
      <img :src="itemInfo.image" alt="商品图片" />
    </div>
    <div class="item-info">
      <div class="item-title">{{ itemInfo.title }}</div>
      <div class="item-desc">{{ itemInfo.desc }}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{ itemInfo.price }}</div>
        <div class="item-count right">
          <div class="count">
            <button class="sub" :disabled="disabled" @click="subCount">-</button>
            <input type="text" v-model="count" />
            <button class="add" @click="addCount">+</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from '@/components/content/checkButton/CheckButton.vue'

export default {
  name: 'CartListItem',
  components: {
    CheckButton
  },
  data() {
    return {
      count: 1,
      disabled: true
    }
  },
  // data() {
  //   return {
  //     changeInfo: {
  //       iid: '',
  //       checked: false
  //     }
  //   }
  // },
  props: {
    itemInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  activated() {
    this.count = this.itemInfo.count
    // console.log(this.itemInfo.count)
  },
  methods: {
    checkClick() {
      // this.changeInfo.iid = this.itemInfo.iid
      // this.changeInfo.checked = !this.itemInfo.checked

      // this.$emit('changeChecked', this.itemInfo.iid)
      this.$store.commit('changeChecked', this.itemInfo.iid)
    },
    addCount() {
      this.count += 1
      this.disabled = false
      this.$store.commit('countChange', [this.itemInfo.iid, this.count])
    },
    subCount() {
      this.count -= 1
      this.$store.commit('countChange', [this.itemInfo.iid, this.count])
      if (this.count === 1) {
        this.disabled = true
      }
    }
  }
}
</script>

<style scoped>
#shop-item {
  width: 100%;
  display: flex;
  font-size: 0;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}

.item-selector {
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.item-title,
.item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.item-img {
  padding: 5px;
  /*border: 1px solid #ccc;*/
}

.item-img img {
  width: 80px;
  height: 100px;
  display: block;
  border-radius: 5px;
}

.item-info {
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  position: relative;
  overflow: hidden;
}

.item-info .item-desc {
  font-size: 14px;
  color: #666;
  margin-top: 15px;
}

.info-bottom {
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}

.info-bottom .item-price {
  color: orangered;
}

.count {
  position: relative;
  top: 8px;
  display: flex;
  width: 75px;
  height: 25px;
}

.count button {
  border: 1px solid rgb(169, 153, 153);
  background-color: #fff;
  width: 20px;
}

.count .sub {
  border-radius: 6px 0 0 6px;
}

.count .add {
  border-radius: 0 6px 6px 0;
}

.count input {
  width: 35px;
  border: 1px solid rgb(169, 153, 153);
  border-left: 0;
  border-right: 0;
  text-align: center;
  font-size: 16px;
}
</style>
