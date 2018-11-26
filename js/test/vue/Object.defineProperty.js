/**
 * Created by Zhoujianxiang on 2018/5/18.
 */
var person = {};
Object.defineProperty(person, "name", {
  configurable: false,
  value: "Nicholas"
});
alert(person.name);   //"Nicholas"
delete person.name;
alert(person.name);   //"Nicholas"
/*
 [[Configurable]]
 ：表示能否通过delete删除属性从而重新定义属性，能否修改属性的特性，或者能否把属性修改为访问器属性。像前面例子中那样直接在对象上定义的属性，它们的这个特性默认值为true。

 [[Enumerable]]
 ：表示能否通过for-in循环返回属性。像前面例子中那样直接在对象上定义的属性，它们的这个特性默认值为true。

 [[Writable]]
 ：表示能否修改属性的值。像前面例子中那样直接在对象上定义的属性，它们的这个特性默认值为true。

 [[Value]]
 ：包含这个属性的数据值。读取属性值的时候，从这个位置读；写入属性值的时候，把新值保存在这个位置。这个特性的默认值为undefined

* 可以多次调用Object.defineProperty()方法修改同一个属性，但在把configurable特性设置为false之后就会有限制了,
*一旦把属性定义为不可配置的，就不能再把它变回可配置了
* */

