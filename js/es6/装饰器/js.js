/*
 * @Descripttion: 
 * @author: zhoujianxiang
 * @Date: 2022-08-03 11:55:48
 * @LastEditors: zhoujianxiang
 * @LastEditTime: 2022-08-03 14:14:17
 * @Copyright: 2020 cheworld.com Inc. All rights reserved. 版权所有
 * 深圳市万普合信科技有限公司（91440300MA5FUB0P88） 注意：仅限于公司内部传阅，禁止外泄以及用于其他的商业目的
 */

class Model1 {
  getData() {
    // 此处省略获取数据的逻辑
    return [{
      id: 1,
      name: 'Niko'
    }, {
      id: 2,
      name: 'Bellic'
    }]
  }
}

function wrap(decorator) {
  return function (Model, key) {
    // 抽离公共的部分
    let target = Model.prototype
    let descriptor = Object.getOwnPropertyDescriptor(target, key)

    decorator(target, key, descriptor)
  }
}

let log = function (target, key, descriptor) {
  // 将修改后的函数重新定义到原型链上
  Object.defineProperty(target, key, {
    ...descriptor,
    value: function (...arg) {
      let start = new Date().valueOf()
      try {
        return descriptor.value.apply(this, arg) // 调用之前的函数
      } finally {
        let end = new Date().valueOf()
        console.log(`start: ${start} end: ${end} consume: ${end - start}`)
      }
    }
  })
}

let seal = function (target, key, descriptor) {
  Object.defineProperty(target, key, {
    ...descriptor,
    writable: false
  })
}

// 参数的转换处理

log = wrap(log)

seal = wrap(seal);


// 添加耗时统计
log(Model1, 'getData')
//log(Model2, 'getData')
console.log(Model1)

// 设置属性不可被修改
seal(Model1, 'getData');
console.log(Model1)

new Model1().getData()