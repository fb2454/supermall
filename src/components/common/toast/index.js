import Toast from './Toast.vue'

const obj = {}

obj.install = function(Vue) {
  // console.log('执行了obj.install', Vue)
  // 创建组件构造器
  const ToastContructor = Vue.extend(Toast)

  // 根据组件构造器，创建出来一个组件对象
  const toast = new ToastContructor()

  // 将组件对象，手动挂载到某个元素上
  toast.$mount(document.createElement('div'))

  // toast.$el 对应的就是 div
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast
}

export default obj
