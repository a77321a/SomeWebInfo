/*
 * @Descripttion: 数组扁平化
 * @Author:
 * @Date: 2020-04-07 19:29:05
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-04-07 19:31:39
 */
// 对于[1, [1,2], [1,2,3]]这样多层嵌套的数组，
// 我们如何将其扁平化为[1, 1, 2, 1, 2, 3]这样的一维数组呢：

// ES6实现
const arr = [1, [1, 2], [1, 2, 3]]
arr.flat(Infinity)  // [1, 1, 2, 1, 2, 3]   Infinity 排成一维 传入任意数字则任意深度

//序列化后使用正则
const arr = [1, [1, 2], [1, 2, 3]]
const str = `[${JSON.stringify(arr).replace(/(\[|\])/g, '')}]`
JSON.parse(str)   // [1, 1, 2, 1, 2, 3]

//递归
const arr = [1, [1, 2], [1, 2, 3]]
function _flat (arr) {
  let result = []
  for (const item of arr) {
    item instanceof Array ? result = result.concat(flat(item)) : result.push(item)
  }
  return result
}
// reduce 递归
const arr = [1, [1, 2], [1, 2, 3]]
function _flat (arr) {
  return arr.reduce((prev, cur) => {
    return prev.concat(cur instanceof Array ? flat(cur) : cur)
  }, [])
}
