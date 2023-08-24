
// function MyPromise(fn){
//   this.fns = []
//   this.state = 'pending'
//   this.value = null

//   fn(this._resolve.bind(this), this._reject.bind(this))
// }
// MyPromise.prototype = {
//   constructor: MyPromise,

//   then: function(onFulfilled, onRejected) {
//       return new MyPromise ((resolve, reject) => {

//           this._handle({
//               onFulfilled: onFulfilled,
//               onRejected: onRejected,
//               resolve: resolve,
//               reject: reject
//           })

//       })
//   },

//   catch: function(err) {
//       return this.then(null, err)
//   },

//   _handle: function(callback) {

//       if (this.state == 'pending') {
//           this.fns.push(callback)
//           return
//       }

//       let cb = this.state == 'fulfilled' ? callback.onFulfilled : callback.onRejected

//       if (!cb) {
//           cb = this.state == 'fulfilled' ? callback.resolve : callback.reject
//           cb(this.value)
//           return
//       }

//       let res
//       try{
//           res = cb(this.value)
//           cb = this.state == 'fulfilled' ? callback.resolve : callback.reject
//       } catch(err) {
//           res = err
//           cb = callback.reject
//       } finally {
//           cb(res)
//       }


//   },

//   _resolve: function(value) {
//       if(value && (typeof value === 'object' && value instanceof MyPromise)) {
//           if (typeof value.then === 'function') {
//               value.then.call(value, this._resolve.bind(this), this._reject.bind(this))
//               return
//           }
//       }

//       this.state = 'fulfilled'
//       this.value = value
//       this.fns.forEach(v => this._handle(v))
//   },

//   _reject: function(err) {

//       this.state = 'rejected'
//       this.value = err
//       this.fns.forEach(v => this._handle(v))

//   }
// }


function MyPromise(fn){
  this.fns = []

  fn(this._resolve.bind(this), this._reject.bind(this))
}
MyPromise.prototype = {
  constructor: MyPromise,

  then: function(thenfn) {
      this.fns.push(thenfn)
  },

  _resolve: function() {
    debugger
      this.fns.forEach(v => v())
  },

  _reject: function() {

  }
}

let a = new MyPromise((resolve, reject) => {
  console.log(1)
  resolve()
  setTimeout(() => {
      console.log(2)
     
  }, 2000)
})
a.then(() => {
  console.log(3)
})
a.then(() => {
  console.log(4)
})