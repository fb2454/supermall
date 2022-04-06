// 封装防抖函数
export function debounce(func, delay) {
  let timer = null
  return function(...arg) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      // func()
      // 使函数内部的this能够指向外部
      func.apply(this, arg)
      // console.log(arg)
      // console.log('---')
    })
  }
}

// 日期转换
export function formatDate(strtime) {
  const date = new Date(strtime)
  const Y = date.getFullYear() + '-'
  const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  const D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
  // console.log(Y + M + D)
  return Y + M + D
}
