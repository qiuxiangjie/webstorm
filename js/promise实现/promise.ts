
class AlleyPromise{
  // 1、Promise三种状态
  static PENDING = 'PENDING';
  static FULFILED = 'FULFILED';
  static REJECTED = 'REJECTED';

  public value:any;
  private promiseStatus:string;


  constructor(callback){
      // 2、容错处理
      if(typeof callback !== 'function'){
          throw new TypeError('Promise resolver undefined is not a function')
      }

      //3、初始状态
      this.promiseStatus = AlleyPromise.PENDING;

      //4、定义初始值
      this.value;

      //5、调用callback函数
      callback(this._resolve.bind(this),this._reject.bind(this))
  }
 private _resolve(){
      // 6、更改成功状态
      if(this.promiseStatus !== AlleyPromise.PENDING) return;
      this.promiseStatus = AlleyPromise.FULFILED;
  }
  private _reject(){
      // 7、更改失败状态
      if(this.promiseStatus !== AlleyPromise.PENDING) return;
      this.promiseStatus = AlleyPromise.REJECTED;
  }
}