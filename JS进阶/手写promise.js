/*
 * @Descripttion: 手写promise
 * @Author:
 * @Date: 2020-04-08 10:13:22
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-04-15 13:43:12
 */
// Promise的构造方法接收一个executor()，在new Promise()时就立刻执行这个executor回调
// executor()内部的异步任务被放入宏/微任务队列，等待执行
// then()被执行，收集成功/失败回调，放入成功/失败队列
// executor()的异步任务被执行，触发resolve/reject，从成功/失败队列中取出回调依次执行

// Promise本质是一个状态机
// 且状态只能为以下三种：Pending（等待态）、Fulfilled（执行态）、Rejected（拒绝态）
// 状态的变更是单向的，只能从Pending -> Fulfilled 或 Pending -> Rejected，状态变更不可逆
// then方法接收两个可选参数，分别对应状态改变时触发的回调。
// then方法返回一个promise。
// then 方法可以被同一个 promise 调用多次。

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function _promise (executor) {
  let _status = PENDING  // Promise状态
  let _resolveStack = [] // 成功队列, resolve时触发
  let _value = undefined
  let _rejectStack = []  // 失败队列, reject时触发
  // 由于resolve/reject是在executor内部被调用, 
  // 因此需要使用箭头函数固定this指向, 否则找不到this._resolveStack
  // 使用self存储this也可以
  let _resolve = (val) => {
    //把resolve执行回调的操作封装成一个函数,放进setTimeout里,以兼容executor是同步代码的情况
    const run = () => {
      if (_status !== PENDING) return   // 对应规范中的"状态只能由pending到fulfilled或rejected"
      _status = FULFILLED              // 变更状态
      _value = val                     // 储存当前value

      // 这里之所以使用一个队列来储存回调,是为了实现规范要求的 "then 方法可以被同一个 promise 调用多次"
      // 如果使用一个变量而非队列来储存回调,那么即使多次p1.then()也只会执行一次回调
      while (_resolveStack.length) {
        const callback = _resolveStack.shift()
        callback(val)
      }
    }
    setTimeout(run)
  }
  let _reject = (val) => {
    const run = () => {
      if (_status !== PENDING) return   // 对应规范中的"状态只能由pending到fulfilled或rejected"
      _status = REJECTED               // 变更状态
      _value = val                     // 储存当前value
      while (_rejectStack.length) {
        const callback = _rejectStack.shift()
        callback(val)
      }
    }
    setTimeout(run)
  }
  // then方法,接收一个成功的回调和一个失败的回调

  executor(_resolve, _reject)
}
_promise.prototype.then = function (resolveFn, rejectFn) {
  // 判断接收的是不是函数
  typeof resolveFn !== 'function' ? resolveFn = value => value : null
  typeof rejectFn !== 'function' ? rejectFn = reason => {
    throw new Error('error msg')
  } : null
  return new _promise((resolve, reject) => {
    const fulfilledFn = value => {
      try {
        let temp = resolveFn(value)
        temp instanceof _promise ? temp.then(resolve, reject) : resolve(temp)
      } catch (error) {
        reject(error)
      }
    }
    // reject同理
    const rejectedFn = error => {
      try {
        let x = rejectFn(error)
        x instanceof _promise ? x.then(resolve, reject) : resolve(x)
      } catch (error) {
        reject(error)
      }
    }
    // console.log(this instanceof p1)
    switch (this._status) {
      case PENDING:
        this._resolveStack.push(fulfilledFn)
        this._rejectStack.push(rejectedFn)
        break;
      case FULFILLED:
        fulfilledFn(this._value)    // this._value是上一个then回调return的值
        break;
      case REJECTED:
        rejectedFn(this._value)
        break;
    }
  })

}
// 实现catch
// catch ()方法返回一个Promise，并且处理拒绝的情况。
// 它的行为与调用Promise.prototype.then(undefined, onRejected) 相同。
_promise.prototype.catch = (rejectFn) => {
  return this.then(undefined, rejectFn)
}

//实现finally
// finally()方法返回一个Promise。在promise结束时，无论结果是fulfilled或者是rejected，
// 都会执行指定的回调函数。在finally之后，还可以继续then。并且会将值原封不动的传递给后面的then
_promise.prototype.finally = (callback) => {
  return this.then(
    value => _promise.resolve(callback()).then(() => value),             // _promise.resolve执行回调,并在then中return结果传递给后面的Promise
    reason => _promise.resolve(callback()).then(() => { throw reason })  // reject同理
  )
}
//静态的resolve方法
_promise.prototype.resolve = (value) => {
  if (value instanceof _promise) return value // 根据规范, 如果参数是Promise实例, 直接return这个实例
  return new _promise(resolve => resolve(value))
}
//静态的reject方法 ..
_promise.prototype.reject = (reason) => {
  return new _promise((resolve, reject) => reject(reason))
}
_promise.prototype.all = (arr) => {
  let index = 0
  let result = []
  return new _promise((resolve, reject) => {
    arr.forEach((v, i) => {
      //Promise.resolve(v)用于处理传入值不为Promise的情况
      _promise.resolve(v).then((val => {
        index++
        result[i] = val
        //所有then执行后, resolve结果
        if (index === arr.length) {
          resolve(result)
        }
      }, err => {
        //有一个Promise被reject时，_promise的状态变为reject
        reject(err)
      }))
    })
  })
}




// const p1 = Object.create()
const p1 = new _promise((resolve, reject) => {
  console.log(1)
  resolve(1)
})
p1.then((res) => {
  console.log(res)
  return 2
}).then().then((res) => {
  console.log(res)
})


