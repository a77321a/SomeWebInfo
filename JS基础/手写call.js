/*
 * @Descripttion: 手写call
 * @Author: 
 * @Date: 2020-04-07 16:25:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-04-07 16:41:45
 */
// 测试
const obj = {
  name: '测试名称'
}
//变更函数调用者示例
function foo () {
  console.log(this.name)
}
Function.prototype._call = function (thr, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('error')
  }
  thr = thr || window
  thr.fn = this // this指向调用call的对象,即我们要改变this指向的函数
  const result = thr.fn(...args);
  delete thr.fn  //删除添加方法
  return result  // 执行函数并return其执行结果
}
var name = 'ces'
foo._call(obj)

// call本质 
const obj = {
  name: '测试名称'
}
// call之后 foo._call(obj)
const obj = {
  name: '测试名称',
  foo: function () {
    console.log(this.name)
  }
}
// 在执行foo的时候实际上执行的是obj.foo，所以this.name是obj的完成this的转换