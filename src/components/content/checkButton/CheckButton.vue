<template>
  <div class="check-button" :class="{ checked: isChecked }">
    <img src="@/assets/img/cart/tick.svg" alt="" />
  </div>
</template>

<script>
export default {
  name: 'CheckButton',
  props: {
    isChecked: {
      Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.check-button {
  position: relative;
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #aaa;
}

.check-button img {
  position: absolute;
  top: 4px;
  left: 3px;
  width: 10px;
  height: 10px;
}

.checked {
  background-color: red;
  border: 2px solid red;
}
</style>
