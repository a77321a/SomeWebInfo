/*
 * @Descripttion: 手写bind
 * @Author:
 * @Date: 2020-04-07 16:59:33
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-04-07 18:00:19
 */
// bind() 方法创建一个新的函数，
// 在 bind() 被调用时，
// 这个新函数的 this 被指定为 bind() 的第一个参数，
// 而其余参数将作为新函数的参数，供调用时使用。
// 语法: function.bind(thisArg, arg1, arg2, ...)
Function.prototype._bind = function (thr, ...args) {
  if (typeof this !== "function") {
    throw TypeError("Error")
  }
  let self = this
  // bind()除了this还接收其他参数，bind()返回的函数也接收参数，这两部分的参数都要传给返回的函数
  // 如果bind绑定后的函数被new了，那么此时this指向就发生改变。此时的this就是当前函数的实例
  let _bindFn = function () {
    self.apply(this instanceof self ? this : thr, args.concat(Array.prototype.slice.call(arguments)))
  }
  // 保留原函数在原型链上的属性和方法
  _bindFn.prototype = Object.create(self.prototype)
  return _bindFn
}