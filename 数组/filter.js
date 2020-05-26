/*
 * @Descripttion: 
 * @Author: 
 * @Date: 2020-05-26 11:14:16
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-05-26 11:16:16
 */
let data = [{ name: '张三' }, { name: '张er' }, { name: '1三' }, { name: '2三' },]
data = data.filter((item) => {
  return item.name == '张三'
}
)
console.log(data)