/*
 * @Descripttion:
 * @Author:
 * @Date: 2020-06-16 14:25:58
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-06-16 14:26:33
 */
function uuid () {
  var temp_url = URL.createObjectURL(new Blob());
  var uuid = temp_url.toString(); // blob:https://xxx.com/b250d159-e1b6-4a87-9002-885d90033be3
  URL.revokeObjectURL(temp_url);
  return uuid.substr(uuid.lastIndexOf("/") + 1);
}

for (let i = 0; i < 10; i++) {
  console.log(uuid())
}