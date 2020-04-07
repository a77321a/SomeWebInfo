/*
 * @Descripttion: 手写const
 * @Author: 
 * @Date: 2020-04-07 16:24:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-04-07 16:25:15
 */
function _const (key, value) {

  const desc = {
    value,
    writable: false
  }
  // 给writable不可修改
  Object.defineProperty(window, key, desc)
}

_const('obj', { a: 1 })   //定义obj
obj.b = 2               //可以正常给obj的属性赋值
obj = {}                //抛出错误，提示对象read-only
