/*
 * @Descripttion: 实现let
 * @Author: 
 * @Date: 2020-04-07 16:22:23
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-04-07 16:24:22
 */
// 源代码
for (let i = 0; i < 5; i++) {
  console.log(i)
}
// babel编译
for (let _i = 0; _i < 5; _i++) {
  console.log(_i)
}
// js实现
(function () {
  for (var i = 0; i < 5; i++) {
    console.log(i)  // 0 1 2 3 4
  }
})();

console.log(i)      // Uncaught ReferenceError: i is not defined
