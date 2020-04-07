/*
 * @Descripttion: 节流函数
 * @Author:
 * @Date: 2020-04-07 19:25:38
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-04-07 19:28:15
 */
// 节流是间隔执行  每隔一段时间就执行一次
// 原理为设置一个定时器，约定xx毫秒后执行事件，如果时间到了，那么执行函数并重置定时器

Function.prototype._throttle = (func, sec) => {
  let timer = null
  return () => {
    let args = arguments
    if (!timer) {
      timer = setInterval(() => {
        func.apply(this, args)
      }, sec)
    }
  }
}