


class MyPromise{
  // 1、Promise三种状态
    static PENDING = 'PENDING';
    static FULFILED = 'FULFILED';
    static REJECTED = 'REJECTED';
    static isPromiseLike = (promise) => { 
        return  typeof promise === 'object' &&  promise !== null && promise.then
    }
    static createMicroTask(fn) {
        setTimeout(() => {
            fn()
        }, 0);
     }

    
  constructor(callback){
      // 2、容错处理
      if(typeof callback !== 'function'){
          throw new TypeError('Promise resolver undefined is not a function')
      }

      //3、初始状态
      this.promiseStatus = MyPromise.PENDING;

      //4、定义初始值
      this.value;
      this.handler = [];
      this._catchCb = () => { }; 

      //5、调用callback函数
      try {
        callback(this._resolve.bind(this),this._reject.bind(this))
      } catch (error) {
        this._reject(error)
      }
      
  }
    _resolve(value){
        // 6、更改成功状态
        if(this.promiseStatus !== MyPromise.PENDING) return;
        this.promiseStatus = MyPromise.FULFILED;
        this.value = value
        this._runTask()
        console.table({stauts: this.promiseStatus, value: this.value})


    }
    _reject(reson){
        // 7、更改失败状态
        if(this.promiseStatus !== MyPromise.PENDING) return;
        this.promiseStatus = MyPromise.REJECTED;
        this.value = reson
        this._runTask()
        console.table({stauts: this.promiseStatus, value: this.value})

    }

    _runTask() {
        if (this.promiseStatus === MyPromise.PENDING) return 
        MyPromise.createMicroTask(() => {
            const { onResolve, onReject, resolve, reject } = this.handler.shift() || {}
            if (this.promiseStatus === MyPromise.FULFILED) {

                this._runOnce(onResolve, resolve, reject)
            } else {
                this._runOnce(onReject, resolve, reject)
            }
            if (this.handler.length){
                this._runTask()
            }
        })
       
    }
    _runOnce(callback, resolve, reject) {
        if (typeof callback === 'function') {
            try {
                const data = callback(this.value);
                if (MyPromise.isPromiseLike(data)) {
                    data.then(resolve, reject)
                } else {
                    resolve(data)
                }
            } catch (error) {
                reject(error)
            }
        } else {
            const fn = this.promiseStatus === MyPromise.FULFILED ? resolve : reject
            fn(this.value)
        }  
    }

    then(onResolve, onReject) { 
        return new MyPromise((resolve, reject) => {
            this.handler.push({
                onResolve,
                onReject,
                reject,
                resolve
            });
            this._runTask()
        })
    }  
    catch(err) {
        this._catchCb = err
    }
}