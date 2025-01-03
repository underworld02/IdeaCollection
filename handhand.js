//#30 正则相关 ######################

import { rejects } from "assert";
import { json } from "body-parser";
import { count, error } from "console";
import { promises } from "dns";
import test from "node:test";
import { resolve } from "path";

//1 实现千位分隔符
function thound(num){
    let num = parseFloat(num.toFixed(3));
    let [number, floatNum] = String.prototype.split.call(num,'.');
    let  str = number.replace(/\d(?=(\d{3})+$)/g,"$&,");
    return str + '.' + (floatNum ? floatNum : '');
}

//5 用正则写一个根据name获取cookie中的值的方法
function getCookie(cookie){
    cookie.exec(/(^| )name=([^;]*)/);

}

//#31 函数柯里化相关 ######################
function keli(func){
    let funcLength = func.length;
    let args = [...arguments].slice(1);

    let innerFunc = function(...innerArgs){
        let args = [...args,...innerArgs];
        if(args.length>=length){
            return fn.apply(this, args.slice(0, funcLength))
        }
        else{
            return innerFunc;
        }
    }
    return innerFunc;
}
// 分批传入参数  递归积累参数
// redux 源码的compose也是用了类似柯里化的操作
const curry = (fn, arr = []) => {// arr就是我们要收集每次调用时传入的参数
    let len = fn.length; // 函数的长度，就是参数的个数
  
    return function(...args) {
      let newArgs = [...arr, ...args] // 收集每次传入的参数
  
      // 如果传入的参数个数等于我们指定的函数参数个数，就执行指定的真正函数
      if(newArgs.length === len) {
        return fn(...newArgs)
      } else {
        // 递归收集参数
        return curry(fn, newArgs)
      }
    }
  }


// function keli(){
//     let innerFunc = () =>{
//         console.log(this);
//     }
//     return innerFunc;
// }

// let a = keli();
// let obj = {func:a}
// obj.func();  //window


//================================设计模式=========================================
//1. 工厂模式  Symbol()  当需要根据不同条件创建不同对象时，
class Button{
  constructor(text){
    this.text= text;
  }
}
class ButtonFactory{
  static createButton(text){
    return  new Button(text);
  }
}
//2.单例模式
class Logger{  //当需要全局唯一的对象实例时，例如日志记录器、全局配置对象等，
  constructor(){
    if(Logger.instance){
      return Logger.instance;
    }
    Logger.instance = this;
  }
  static log(message) {
    console.log(`Logging: ${message}`);
  }
}
//3.观察者模式  
class Subject{ //支持广播通信，当一个对象状态改变时，可以通知依赖它的其他对象进行更新。   由 被观察者 维护一组依赖
  constructor(){
    this.observers = [];
  }
  addObserver(observer){
    this.observers.push(observer);
  }
  remove(observer){
    let index = this.observers.indexOf(observer);
    if(index !== -1){
      this.observers.splice(index,1);
    }
  }
  notify(message){
    this.observers.forEach((observer)=>{
      observer.update(message);
    });
  }
}
class Observer{
  constructor(){
  }
  update(message){
    console.log(message);
  }
}
//4.发布订阅模式 //未改
class Center{    //发布者和订阅者通过消息中心解耦，发布者不直接通知订阅者，而是将消息发布到消息中心，由消息中心负责分发给订阅者。
  constructor(){
    this.events = {};
  }
  on(type,handler){
    if(!this.events[type]){
      this.events[type] = [];
    }
    this.events[type].push(handler);
    return ()=>{this.off(type,handler);}
  }
  emit(type,message){
    if(this.events[type]){
      this.events[type].forEach((fn)=>{fn(message);});
    }
  }
  off(type,handler){
    if(this.events[type]){
      let index = this.events[type].indexOf(handler);
      this.events[type].splice(index,1);
    }
  }
  once(type,handler){
    if(!this.events[type]){
      this.events[type] = [];
    }
    let fn  = (message)=>{
      handler(message);
      this.off(type,fn);
    }
    this.events[type].push(fn);
    return ()=>{this.off(type,fn);}
  }
}

//5.原型模式  //通过克隆现有对象来创建新对象，避免了频繁的对象创建过程，提高了性能。
class Shape {
  constructor(){
    this.type = '';
  }
  clone(){
    return Object.create(this);
  }
  draw() {
    console.log(`Drawing a ${this.type}`);
  }
}
const circlePrototype = new Shape();
circlePrototype.type = 'Circle';
const circle = circlePrototype.clone();
circle.draw(); // Output: Drawing a Circle
//6.装饰者模式

//7.适配器模式



//数组去重方法
//1 Array.from(利用ES6 Set去重)（ES6中最常用）  # 无法去{} []
//[...new Set(arr)]       
//2 利用for嵌套for，然后splice去重 内层循环时比较后值（ES5中最常用）   //==  NaN和{}没有去重，0  [] true  null直接消失了 //===  NaN{}[]没有去重
//3 sort() 前后判断 收集                                            //
//4 for遍历 利用indexOf判断去重 收集                                //NaN、{}  []没有去重
//5 for遍历 利用includes 收集                      
//6 利用对象的属性不能相同的特点进行去重                             //两个true直接去掉了，NaN和{} []去重
//7 filter 对象 hasOwnProperty                    
//6 filter indexOf为当前index                  
//7 sort后 从后向前递归  splice前后                        
//8 利用reduce+includes                     

//想实现一个对页面某个节点的拖曳？72
//--->drage.html
//使用js实现一个持续的动画效果 73
//--->anime.html

//判断两个对象相等 74
//1 JSON.stringify
JSON.stringify(obj1) === JSON.stringify(obj2);
//2 deepEqual
function stringify(obj1,obj2){
  if(obj1 === obj2){
    return true;
  }
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  }
  for(let key in obj1){
    if(!obj2.hasOwnProperty(key)|| !deepClone(obj1[key], obj2[key])){
      return false;
    }
  }
  return true;
}



//test
function asyncSend(){
  url =  '';
  
}
//================================高频手写题=========================================
//1. 防抖函数debounce
//--timer
function debounce1(fn,delay = 1000){
  let timer=null;
  return function(...args){
    if(timer){
      clearTimeout(timer);
    }
    timer = setTimeout(()=>{fn.apply(this,args)},delay);
  }
}
//--立即执行防抖
function debounce(fn, delay, immediate = false) {
  let timer = null;
  
  return function (...args) {
    if (timer) clearTimeout(timer);

    if (immediate && !timer) {
      fn.apply(this, args);
      immediate = false;
    }

    timer = setTimeout(() => {// 后续触发时延迟执行
      if (!immediate) {
        fn.apply(this, args);
      }
    }, delay);
  };
}

//--timestamp ///不算    防抖：确保在连续触发事件中，只有最后一次触发在 delay 毫秒后执行 fn。
function debounce2(fn,delay = 1000){
  let lasttime=0;
  return function(...args){
    let  now  =new Date();
    if(now-lasttime>=delay){
      fn.apply(this,args);
    }
    lasttime  = now;
  }
}
//2. 节流函数throttle
//--timer
function throttle(fn,delay = 1000){
  let timer =0;
  return function(...args){
    if(timer){
      return;
    }
    fn.apply(this,args);
    timer = setTimeout(()=>{timer=null},delay); //timer = setTimeout(function(){ func.apply(context, args); timer = 0; },delay);
  }
}
//--timestamp
function throttle2(fn,delay = 1000){
  let lastTime = 0;//let lastTime = +new  Date();
  return function(...args){
    let  now = +new  Date();
    if(now-lastTime>=delay){
      fn.apply(this,args);
      lastTime  = now;
    }
  }
}

//3. instanceOf
function instanceOf(obj,func){
  if(obj == null || typeof obj!=="object"){
    return false;
  }
  let proto = Object.getPrototypeOf(obj);
  while(proto){
    if(proto == func.prototype){
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}

//4. new
function myNew(constructor){
  let  obj ={};
  let args = [...arguments].slice(1);
  Object.setPrototypeOf(obj,constructor.prototype);
  let result = constructor.apply(obj,args);
  return typeof result ==="object" ?  result:obj;
}
//========================call apply bind==================================
//5. call
function  call(context = window,...args){//如果不传入参数，默认指向 window
  if (typeof context !== 'object') context = new Object(context)  // 值类型，变为对象
  let  symbol   = Symbol();   //工厂函数
  let fn = this;
  context[symbol]= fn;
  let res = context[symbol](...args);
  delete context[symbol];
  return res;
}
//6. apply
function apply(context =  window, args){
  if(typeof context !=="object"){
    context = new  Object(context);
  }
  let self = this;
  let symbol =  Symbol();
  context[symbol] =  self;
  let res = context[symbol](...args);
  delete context[symbol];
  return res;
}

//7. bind
      //this instanceof fBound为true表示构造函数的情况。如new func.bind(obj)
      // 当作为构造函数时，this 指向实例，此时 this instanceof fBound 结果为 true，可以让实例获得来自绑定函数的值
      // 当作为普通函数时，this 默认指向 window，此时结果为 false，将绑定函数的 this 指向 context
function bind(context =  window){
  let self = this;
  let args  = [...arguments].slice(1);
  let  fn = function(...newArgs){
    args=[...args,...newArgs];
    if(args.length >= self.length){
      context = this instanceof fn ? this:context;
      return  self.apply(context, args);
    }
    return  fn;
  }
  // 如果绑定的是构造函数(fn)，那么需要继承构造函数原型属性和方法：保证原函数的原型对象上的属性不丢失
  // 实现继承的方式: 使用Object.create
  fn.prototype = Object.create(self.prototype);
  return  fn;
}
//8. 深拷贝
//1
let newObj = JSON.parse(JSON.stringify(obj));
//2
function deepClone(obj,map= new WeakMap()){
  if(obj ==null  || typeof obj !=="object"){
    return obj;
  }
  if(obj instanceof RegExp){
    return new RegExp(obj);
  }
  if(obj  instanceof Date){
    return new Date(obj);
  }
  if(obj  instanceof Function){
    return new Function(obj);
  }
  if(map.get(obj)){
    return map.get(obj);
  }
  let result =  new obj.constructor();////[] {}
  map.set(obj,result);
  for(let key in  obj){
    if(obj.hasOwnProperty(key)){
      result[key] = deepClone(obj[key],map);
    }
  }
  return result;
}
//9. 类的继承


//========================10. Promise相关======================================

//Promise.resolve  静态
/*
1 传参为一个 Promise, 则直接返回它。
2 传参为一个 thenable 对象，返回的 Promise 会跟随这个对象，采用它的最终状态作为自己的状态。
3 其他情况，直接返回以该值为成功状态的promise对象。
*/
Promise.resolve= function(param){
  if(param instanceof Promise){
    return param;
  }
  return new Promise((resolve,reject)=>{
    if(param &&  param.then && typeof param.then ==='function'){
      param.then(resolve,reject);
    }
    else{
      resolve(obj);
    }
  });
}

//Promise.reject  静态
Promise.reject = function (reason) {
  return new Promise((resolve, reject) => {
      reject(reason);
  });
}

//Promise.prototype.finally     ###############################################################################
/*
1 前面的promise不管成功还是失败，都会走到finally中，并且finally之后，还可以继续then（说明它还是一个then方法是关键），并且会将初始的 promise 值原封不动的传递给后面的then.
2 finally里的函数，无论如何都会执行，并会把前面的值原封不动传递给下一个then方法中
3 如果finally函数中有promise等异步任务，会等它们全部执行完毕，再结合之前的成功与否状态，返回值
*/
Promise.prototype.finally  = function(fn){
  return Promise((resolve,reject)=>{
    this.then(data=>{
      fn();
      resolve(data);
    }, err=>{
      fn();
      reject(err);
    })
  })
}


//Promise.all
Promise.prototype.myAll = function(promises){
  return new Promise((resolve,reject)=>{
    let res =[];
    let count=0;
    if(typeof promises[Symbol.iterator] !=='function'){
      return reject("Type error");
    }
    if (promises.length === 0) {   //边界条件
      return resolve([]);
    } 

    for(let i = 0;i < promises.length; i++){
      Promise.resolve(promises).then((result)=>{  //// 为什么不直接 promise[i].then, 因为promise[i]可能不是一个promise
        res[i] = result;
        if(++count === promises.length){
          resolve(res);
        }
      }).catch((err)=>{
        reject(err);
      })
    }
  })
}

//实现promise.allsettle
/*
方法返回一个在所有给定的promise都已经fulfilled或rejected后的promise，并带有一个对象数组，每个对象表示对应的promise`结果
当您有多个彼此不依赖的异步任务成功完成时，或者您总是想知道每个promise的结果时，通常使用它。
Promise.allSettled 跟 Promise.all 类似, 其参数接受一个Promise的数组, 返回一个新的Promise, 唯一的不同在于, 其不会进行短路, 
也就是说当Promise全部处理完成后我们可以拿到每个Promise的状态, 而不管其是否处理成功。
*/

function isPromise (val) {   //兼容性  性能优化   ###############################################################################
  return typeof val.then === 'function'; // (123).then => undefined
}
Promise.allSettled= function(promises){
  return new Promise((resolve, reject)=>{
    let res = []; //[{ status: 'fulfilled', value: data },{}]
    let count=0,len =promises.length;

    let  setValue  = (id,data)=>{
      res[id] = data;
      if (++times === promises.length) {
        return resolve(arr);
      }
    }
    if(len===0){
      return resolve(res);
    }

    for (let i = 0; i < len; i++) {
      let current = promises[i];
      if (isPromise(current)) {
        current.then((data) => {
          setData(i, { status: 'fulfilled', value: data });
        }, err => {
          setData(i, { status: 'rejected', value: err })
        })
      } else {
        setData(i, { status: 'fulfilled', value: current })
      }
    }
  });
}























Promise.prototype.allsettle = function(promises){
    const isPromise = function(obj){
        return  obj && obj.then && typeof obj.then === "function";
    }
    return new Promise((resolve, reject) => {
        let arr = [];
        let times = 0;
        const setData = (index, data) => {
        arr[index] = data;
        if (++times === promises.length) {
            resolve(arr);
        }
        console.log('times', times)
        }
    
        for (let i = 0; i < promises.length; i++) {
        let current = promises[i];
        if (isPromise(current)) {
            current.then((data) => {
            setData(i, { status: 'fulfilled', value: data });
            }, err => {
            setData(i, { status: 'rejected', value: err })
            })
        } else {
            setData(i, { status: 'fulfilled', value: current })
        }
        }
    })
}

//只要有一个 promise 执行完，直接 resolve 并停止执行
Promise.prototype.myRace = function(promises) {
    return new Promise((resolve, reject) => {
      let len = promises.length;
      if(len === 0) return;
      for(let i = 0; i < len; i++) {
        Promise.resolve(promise[i]).then(data => {
          resolve(data);
          return;
        }).catch(err => {
          reject(err);
          return;
        })
      }
    })
  }
   

class MyPromise{
  static PENDING = "Pending";
  static FULFILLED = "Fulfilled"; 
  static REJECTED = "Rejected"; 

  constructor(excutor){
    try {
      excutor(this.resolve,this.reject);
    }
    catch(err){
      this.reject(err)
    }
  }
  status =  PENDING;
  value = null;
  reason  =  null;
  onFulfilledCallbacks  = [];
  onRejectedCallbacks  = [];

  static resolve(parameter){
    // 如果传入 MyPromise 就直接返回
    if (parameter instanceof MyPromise) {
      return parameter;
    }
    // 转成常规方式
    return new MyPromise(resolve =>  {
      resolve(parameter);
    });
  }
  static reject(){
    return MyPromise((resolve,reject)=>{
      if(MyPromise.prototype.isPrototypeOf(data)){
        return data.then(reject);
      }
      reject(data);
    });
  }

  resolve = (value) => {
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = value;
      // resolve里面将所有成功的回调拿出来执行
      while (this.onFulfilledCallbacks.length) {  //多次 p.then调用
        this.onFulfilledCallbacks.shift()(value)
      }
    }
  }
  reject = (reason) => {
    if (this.status === PENDING) {
      this.status = REJECTED;
      this.reason = reason;
      while (this.onRejectedCallbacks.length) {
        this.onRejectedCallbacks.shift()(reason)
      }
    }
  }

  then = (onFulfilled,onRejected) => {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value=>value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason};  //用户没有处理拒绝，就使用默认的拒绝回调,可以被外部的 .catch() 捕获
    
    const promise2 = new MyPromise((resolve,reject)=>{   //解决链式调用
      if(this.status  === FULFILLED){
        queueMicrotask(() => {
          try {
            const result = onFulfilled(this.value);
            resolvePromise(promise2,result,resolve,reject); //是否是promise       promise2?????  直接返回result？？？
          }
          catch(error){
            reject(error);
          }
        });
      }
      else if(this.status  === REJECTED){
        const result = onRejected(this.reason);
      }
      else{
        this.onFulfilledCallbacks.push(() => {
          queueMicrotask(()=>{
            try {
              const x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error)
            } 
          })
        });  //构造器内异步 +  多次调用 p.then 
        this.onRejectedCallbacks.push(onRejected);
      }
    })
    return promise2;
  }

  catch = (onFulfilled,onRejected) => {
    onFulfilled = onFulfilled ? onFulfilled:()=>{};
    onRejected = onRejected ? onRejected:()=>{};
  }

  finally = ()=>{

  }
}

MyPromise.deferred = function () {
  var result = {};
  result.promise = new MyPromise(function (resolve, reject) {
    result.resolve = resolve;
    result.reject = reject;
  });

  return result;
}

function resolvePromise(promise2,result, resolve, reject) {
  if(promise2 === result){
    return reject(new TypeError("Chaining cycle detected"));
  }
  if(result instanceof MyPromise){
    result.then(resolve,reject);
  }
  else{
    resolve(result);
  }
}

function resolvePromise2(promise, x, resolve, reject) {
  // 如果相等了，说明return的是自己，抛出类型错误并返回
  if (promise === x) {
    return reject(new TypeError('The promise and the return value are the same'));
  }

  if (typeof x === 'object' || typeof x === 'function') {
    // x 为 null 直接返回，走后面的逻辑会报错
    if (x === null) {
      return resolve(x);
    }

    let then;
    try {
      // 把 x.then 赋值给 then 
      then = x.then;
    } catch (error) {
      // 如果取 x.then 的值时抛出错误 error ，则以 error 为据因拒绝 promise
      return reject(error);
    }

    // 如果 then 是函数
    if (typeof then === 'function') {
      let called = false;                                           //通过 called 变量来防止多次调用
      try {
        then.call(
          x, // this 指向 x
          // 如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
          y => {                                                 //y：这是 then 执行成功后，返回的值。
            // 如果 resolvePromise 和 rejectPromise 均被调用，
            // 或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
            // 实现这条需要前面加一个变量 called
            if (called) return;
            called = true;
            resolvePromise(promise, y, resolve, reject);         // y 仍然是一个 Promise，那么就需要继续递归处理
          },
          // 如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
          r => {
            if (called) return;
            called = true;
            reject(r);
          });
      } catch (error) {
        // 如果调用 then 方法抛出了异常 error：
        // 如果 resolvePromise 或 rejectPromise 已经被调用，直接返回
        if (called) return;

        // 否则以 error 为据因拒绝 promise
        reject(error);
      }
    } else {
      // 如果 then 不是函数，以 x 为参数执行 promise
      resolve(x);
    }
  } else {
    // 如果 x 不为对象或者函数，以 x 为参数执行 promise
    resolve(x);
  }
}

module.exports = MyPromise;

//========================11. 发布订阅======================================

//========================12. 观察者======================================

//========================13. 单例======================================
class Logger{
  static instance = null;
  constructor(name){
    if(Logger.instance){
      return Logger.instance;
    }
    this.name= name;
    Logger.instance = this;
  }
}

//---Object.is---   
//由于 == 会进行 类型转换，它会尝试将这两个值转换为相同的类型，然后进行比较。 有时会导致一些 意外的行为  这种隐式类型转换可能是你不希望发生的
//使用 == 可以更好地处理不同的浏览器实现，尤其是在处理 postMessage 相关的消息时。不同的浏览器可能会有一些类型转换的差异，== 的宽松比较能够容忍这些差
Object.prototype.myIs = function(x,y){
  if(x===y){
    return x!==0 || y!==0 || 1/x === 1/y; 
  }
  else{
    return ''+x ===  "NaN" && ''+y==="NaN";
    return x !== x && y!==y;
  }
}

//---0.1-0.3ms---
(function(){  //，IIFE 并不能阻止隐式全局变量的创建    1创建一个 局部作用域  并防止局部变量污染全局作用域 不需要显式调用  2模拟块级作用域  3封装模块暴露内部功能 4立即执行的计算  5避免命名冲突 每个文件的变量可能会共享全局作用域 将变量或函数封装在 IIFE 内部 避免它们污染全局作用域
  let messageName = "my_message"
  let callbacks = [];
  function setZeroTimeout(fn){
    callbacks.push(fn);
    window.postMessage(messageName,'*');
  }
  function handlerMessage(event){
    if(event.source == window && event.data == messageName){
      event.stopPropagation();
      if (callbacks.length > 0) {
        var fn = callbacks.shift();
        fn();
      }
    }
  }
  window.addEventListener('message',handlerMessage,true);
  window.setZeroTimeout = setZeroTimeout;
})()

//=========================数组相关==========================
//实现forEach方法
Array.prototype.myForEach = function(callback, context=window) {
  // this=>arr
  let self = this,  
      i = 0,
      len = self.length;

  for(;i<len;i++) {
    typeof callback == 'function' && callback.call(context,self[i], i)
   }
}

//reduce  * * *
//1 initialValue+startInde 2 this 类数组 3 call
Array.prototype.myReduce = function(fn, initialValue){
  let arr = Array.prototype.slice.call(this);   //但是如果 myReduce 被绑定到类数组对象或其他对象上时，this 的值可能并不是一个标准的数组
  let result, startIndex;

  result = initialValue ? initialValue: arr[0];
  startIndex = initialValue ? 0 : 1;

  for(let i =startIndex;i<arr.length;i++){
    fn.call(null, result,arr[i],i,this); // 把初始值、当前值、索引、当前数组返回去。调用的时候传到函数参数中 [1,2,3,4].reduce((initVal,curr,index,arr))
  }
  return result;
}
//实现every方法
Array.prototype.myEvery=function(fn, context = window){   // var aa=arr.myEvery(function(v,index,arr){})
  let len=this.length,
      flag=true,
      i = 0;

  for(;i < len; i++){
    if(!fn.apply(context,[this[i], i , this])){   //thisArg 是可选参数，可以用来指定自定义回调函数里 执行时的 this 指向。
      flag=false;
      break;
    } 
  }
  return flag;
}
//实现some方法
Array.prototype.mySome = function(fn, context = window){
  let len = this.length,
      i = 0,
      flag = false;

  for(;i<len;i++){
    if(fn.apply(context,[this[i],i,this])){
      flag =  true;
      break;
    }
  }

  return this.flag;
}

//Array.isArray
Array.prototype.myisArray = function(obj){
  return Object.prototype.toString.call(obj)==="[object Array]";
}

//数组去重方法 * * *

//对象数组如何去重

//数组中的数据根据key去重

//LRUCache
class LRUCache{
  constructor(size){
    this.length = 0;
    this.cache = new Map();
  }
  get(key) {
    const cache = this.cache;
    if(!cache.has(key)){   //用has
      return null;
    }

    const value = cache.get(key);
    cache.delete(key);
    cache.set(key,value);
    return value;
  }
  set(key,val) {
    const cache = this.cache;
    if (cache.has(key)) {
      cache.delete(key)
    }
    cache.set(key, val);

    // 如果超出了容量，则需要删除最久的数据
    if (cache.size > this.length) {
      // 删除map最老的数据
      const delKey = cache.keys().next().value;
      cache.delete(delKey);
    }
  }
}

//===============================框架相关====================================
//1 将虚拟 Dom 转化为真实 Dom
function _render(vnode){
  if(typeof vnode === 'number'){
    vnode = String(vnode);
  }
  if(typeof vnode  === "string"){
    return document.createTextNode(vnode);
  }
  let dom = document.createElement(vnode.tag);
  if (vnode.attrs) {
    Object.keys(vnode.attrs).forEach((key) => {
      const value = vnode.attrs[key];
      dom.setAttribute(key, value);
    });
  }
  // 子数组进行递归操作
  vnode.children.forEach((child) => dom.appendChild(_render(child)));
  return dom;
}

//2 实现事件总线结合Vue应用
 /**
     * {
     *    'key1': [
     *        { fn: fn1, isOnce: false },
     *        { fn: fn3, isOnce: true },
     *    ]
     *    'key2': [] // 有序
     * }
     */
class EventBus{
  constructor() {
    this.events = {}
  }

  on(type, fn, isOnce = false) {
      const events = this.events
      if (events[type] == null) {
          events[type] = [] // 初始化 key 的 fn 数组
      }
      events[type].push({ fn, isOnce })
  }

  once(type, fn) {
      this.on(type, fn, true)
  }

  off(type, fn) {
      if (!fn) {// 解绑所有 type 的函数
          this.events[type] = []
      } else {
          const fnList = this.events[type]
          if (fnList) {
              this.events[type] = fnList.filter(item => item.fn !== fn)
          }
      }
  }

  emit(type, ...args) {
      const fnList = this.events[type]
      if (fnList == null) return

      // 注意过滤后重新赋值
      this.events[type] = fnList.filter(item => {
          const { fn, isOnce } = item
          fn(...args)

          if (!isOnce) return true
          return false // once 执行一次就要被过滤掉
      })
  }
}
//3 实现一个双向绑定
//defineProperty 版本
let input = document.createElement("input");
let span = document.createElement("span");
data = {
  text:"d"
}
Object.defineProperty(data,'text',{
  set(newVal){
    input.value = newVal;
    span.innerHTML = newVal;
  }
});
input.addEventListener('keyup',function(event){
  data.text = event.target.value;
});

//proxy 版本
let input2 = document.createElement("input");
let span2 = document.createElement("span");
let handler2  = {
  set(target,key,val){
    target[key] = val;
    input2.value= val;
    span2.innerHTML=val;
  }
}
let proxy2 = new Proxy(data,handler2);
input.addEventListener('keyup',function(e){
  data.text =  e.target.value;
})
//4 实现一个简易的MVVM



//36 综合

//1 sleep
function sleep(delay){
  return new Promise((resolve,reject)=>{
    setTimeout(resolve,delay);
  })
}
sleep(1000).then(()=>{});

//2 数组交集
function merge(arr1,arr2){
  let map =  new Set(arr1);
  let res  = [];
  for(let num  of arr2){
    if(map.has(num)){
      res.push(num);
      map.delete(num);
    }
  }
}
function merge2(arr1,arr2){
  return arr1.filter((item)=>{
    return arr2.indexOf(num)>-1;
  })
}

//9 版本号排序的方法



//封装
function Girl(name,age){
	var love = '小明';//love 是局部变量 准确说不属于对象 属于这个函数的额激活对象 函数调用时必将产生一个激活对象 love在激活对象身上   激活对象有作用域的关系 有办法访问  加一个函数提供外界访问
	this.name = name;
	this.age = age;
	this.say = function () {
		return love;
	};

	this.movelove = function (){
		love = '小轩'; //35
	}

} 

//iterator
obj[Symbol.iterator] = function () {
  let keyArr = Object.keys(obj)
  let index = 0
  return {
      next() {
          return index < keyArr.length ? {
              value: {
                  key: keyArr[index],
                  val: obj[keyArr[index++]]
              }
          } : {
              done: true
          }
      }
  }
}

for (let key of obj) {
console.log(key)
}