/*
 * @Descripttion: 实现new
 * @Author:
 * @Date: 2020-04-09 09:24:04
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-04-10 18:05:42
 */
// 我们要知道new做了什么
// 创建一个新对象，并继承其构造函数的prototype，这一步是为了继承构造函数原型上的属性和方法
// 执行构造函数，方法内的this被指定为该新实例，这一步是为了执行构造函数内的赋值操作
// 返回新实例（规范规定，如果构造方法返回了一个对象，那么返回该对象，否则返回第一步创建的新对象）
function _new (fn, ...args) {
  // 创建新对象,并继承构造方法的prototype属性,
  // 这一步是为了把obj挂原型链上, 相当于obj.__proto__ = Foo.prototype
  let _ob = Object.create(fn.prototype)
  // 执行构造方法, 并为其绑定新this, 
  // 这一步是为了让构造方法能进行this.name = name之类的操作,
  // args是构造方法的入参, 因为这里用_new模拟, 所以入参从_new传入
  let res = fn.apply(_ob, args)
  // 如果构造方法已经return了一个对象, 那么就返回该对象, 
  // 一般情况下，构造方法不会返回新实例，但使用者可以选择返回新实例来覆盖new创建的对象 否则返回myNew创建的新对象
  return typeof res === 'object' && res !== null ? res : _ob
}