<template>
  <div v-show="isShow" class="toast">{{ message }}</div>
</template>

<script>
export default {
  name: 'vue-Toast',
  /* props: {
    message: {
      type: String,
      default: ''
    },
    isShow: {
      type: Boolean,
      default: false
    }
  } */
  data() {
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    show(message, duration = 1500) {
      this.isShow = true
      this.message = message

      setTimeout(() => {
        this.isShow = false
        this.message = ''
      }, duration)
    }
  }
}
</script>

<style scoped>
.toast {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;

  padding: 8px 10px;
  border-radius: 10px;

  color: #fff;
  background-color: rgba(0, 0, 0, 0.7);
}
</style>
