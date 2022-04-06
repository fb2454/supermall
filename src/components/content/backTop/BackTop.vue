<template>
  <!-- <div class="back-top" @click="backTopClick"> -->
  <div class="back-top">
    <img src="@/assets/img/common/top.png" alt="" />
  </div>
</template>

<script>
// import { eventBus } from '@/common/eventBus.js'

export default {
  name: 'BackTop'
  /* methods: {
    backTopClick() {
      // eventBus.$emit('backTop')
    }
  } */
}
</script>

<style scoped>
.back-top {
  position: fixed;
  right: 8px;
  bottom: 55px;
}

.back-top img {
  width: 43px;
  height: 43px;
}
</style>
