/*
 * @Descripttion:手写apply
 * @Author:
 * @Date: 2020-04-07 16:45:05
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-04-07 16:48:27
 */
// apply()和call()类似，
// 区别在于call()接收参数列表，
// 而apply()接收一个参数数组，
// 所以我们在call()的实现上简单改一下入参形式即可
/**
 * @descripttion: 
 * @param {type} args为数组
 * @return: 
 */
Function.prototype._apply = function (thr, args = []) {
  if (typeof this !== 'function') {
    throw new TypeError('error')
  }
  thr = thr || window
  thr.fn = this // this指向调用call的对象,即我们要改变this指向的函数
  const result = thr.fn(...args);
  delete thr.fn  //删除添加方法
  return result  // 执行函数并return其执行结果
}
function foo () {
  console.log(this.name)
}
const obj = {
  name: '测试名称'
}
foo._apply(obj)