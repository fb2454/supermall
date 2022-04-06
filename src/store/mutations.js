import { ADD_COUNTER, ADD_TO_CART } from './mutation-type'

export default {
  [ADD_COUNTER](state, payload) {
    payload.count += 1
  },
  [ADD_TO_CART](state, payload) {
    payload.checked = false
    payload.count = 1
    state.cartList.push(payload)
  },
  /* changeChecked(state, payload) {
    console.log(state)
    console.log(payload)
    const index = state.cartList.findIndex((item) => item.iid === payload.iid)
    if (index + 1) {
      state.cartList[index].checked = payload.checked
    }
  } */

  // 单选
  changeChecked(state, payload) {
    const index = state.cartList.findIndex((item) => item.iid === payload)
    if (index + 1) {
      state.cartList[index].checked = !state.cartList[index].checked
    }
  },

  // 全选
  isCheckedAll(state, payload) {
    state.cartList.forEach((element) => {
      element.checked = payload
    })
  },

  // 数量改变
  countChange(state, [iid, count]) {
    const index = state.cartList.findIndex((item) => item.iid === iid)
    if (index + 1) {
      state.cartList[index].count = count
    }
  }
}
