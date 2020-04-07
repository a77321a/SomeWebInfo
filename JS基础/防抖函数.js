/*
 * @Descripttion: 防抖函数
 * @Author:
 * @Date: 2020-04-07 19:21:50
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-04-07 19:25:29
 */
// 短时间内大量触发同一事件，只会执行一次函数
// 原理为设置一个定时器，约定在xx毫秒后再触发事件处理，
// 每次触发事件都会重新设置计时器，直到xx毫秒内无第二次操作

Function.prototype._debounce = (func, sec) => {
  let timer = null
  return () => {
    let args = arguments
    if (timer) {
      // 如果定时器存在 清除定时器
      clearTimeout(timer)
    }
    // sec秒后执行函数
    timer = setTimeout(() => {
      func.apply(this, args)
    }, sec)
  }
}