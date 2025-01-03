/*
 * @Author: underworld02 1069645184@qq.com
 * @Date: 2024-11-16 22:27:46
 * @LastEditors: underworld02 1069645184@qq.com
 * @LastEditTime: 2024-12-07 21:22:10
 * @FilePath: \undefinede:\a前端\wechat-master\handcode.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

//防抖动是将多次密集的触发只执行一次 (相邻触发的间隔)   限制执行次数
//节流是将多次执行变成每隔一段时间执行（相邻执行时间） 限制执行的频率
//防抖 - timer
function debounce(func,delay = 1000){  //func 应作为 debounce 的参数传入
    let timer = null;
    return function(...args){
        if(timer){
            clearTimeout(timer);
        }
        timer = setTimeout(()=>{
            func.apply(this,args); //func 调用时的上下文绑定问题  this 依赖场景
        },delay);
    }
}

// //防抖 - timestamp
// function debounce2(func,delay=1000){
//     let timeLast = new Date();
//     return function(...args){
//         let timeNow = new Date();
//         if(timeNow-timeLast>=delay){
//             func.apply(this,args);
//         }
//         timeLast = timeNow;
//     }
// }

//节流 - timestamp
function throttle(func,delay=1000){
    let timeLast = 0;      //第一次可以执行
    return function(...args){
        let timeNow = +new Date();
        if(timeNow-timeLast>delay){
            func.apply(this,args);
            timeLast = timeNow;
        }

    }
}
//节流 - timer
function throttle(func,delay=1000){
    let timer = null;
    return function(...args){
        if(timer){
            return;
        }
        timer = setTimeout(()=>{
            func.apply(this,args);
            timer=null;   //不手动将 timer = null，timer 仍然持有一个值（即定时器的 ID）。
        },delay);
    }
}



//打乱 使用Fisher-Yates算法      最后一个元素 n 开始，逐步向前遍历
function fisherYates(arr){  
    for(let i=arr.length-1; i>=0; i--){
        let index = Math.floor(Math.random()*(i+1));
        let temp = arr[index];
        arr[index] = arr[i];
        arr[i] = temp;
    }
    return arr;
}

//打乱 sort方法结合随机数
function sortShuffle(arr){
    arr.sort(function() {
        return Math.random() - 0.5;
    });
    return arr;
}

//websocket--clent
// 0	CONNECTING	连接正在建立中。
// 1	OPEN	    连接已建立，可以发送和接收数据。
// 2	CLOSING	    连接正在关闭。
// 3	CLOSED      连接已关闭或未能建立连接。
function websocketClient(){
    const socket =  new WebSocket("ws://localhost:3000");
    socket.addEventListener('open',()=>{});
    socket.send('ss');
    socket.addEventListener('message',(event)=>{
        let message = event.data;
    });
    socket.addEventListener('close',()=>{});
}
//websocket--Node.js
function websocketServer(){
    const WebSocket = require('ws');
    const wss = new WebSocket.Server({ port: 3000 });
    wss.on('connection', (socket) => {
        console.log('Client connected');
        // 监听接收到消息事件
        socket.on('message', (message) => {
          // 发送消息给客户端
          socket.send('Hello client!');
        });
        // 监听连接关闭事件
        socket.on('close', () => {
          console.log('Client disconnected');
        });
    });
}


//io客户端代码（JavaScript）：
import io from 'socket.io-client';
function ioClient(){
    const socket = io('http://localhost:3000');
    socket.on('connect',()=>{});
    socket.emit('message','sss');  // 发送消息给服务器
    socket.on('message',(message)=>{});
    socket.on('disconnect', ()=> {});
}

//io服务器端代码（Node.js）：
function ioServer(){
    const express = require('express');
    const app = express();
    const http = require('http').createServer(app);
    const io = require('socket.io')(http);

    io.on('connection',(socket)=>{
        socket.on('message',(message)=>{});
        socket.emit('message', 'Hello client!');
        socket.on('disconnect',()=>{

        });
    });
    http.listen(3000,()=>{
        console.log('Server 已经在本地的 3000 端口启动');
    });
}

function deepClone(obj,map = new WeakMap()){
    if(typeof obj ==='null' || typeof obj ==='function' || (typeof obj !=='object' && typeof obj !=='symbol')){
        return obj;
    }
    //RegExp
    //Date
    //Error
    //
    if(map.get(obj)!==null){
        return map.get(obj);
    }
    let isArray = Array.isArray(obj);
    let newObj = isArray?[]:{};

    let keys = Object.keys(obj);
    keys.forEach(key => {
        newObj[key]= deepClone(obj[key]);
    });
    return newObj;
}

//通用的事件侦听器函数 - 基础1
myEvent = {
    // 视能力分别使用dom0||dom2||IE方式 来绑定事件
        // 参数： 操作的元素,事件名称 ,事件处理程序
        addEvent : function(element, type, handler,option = false) {
            if (element.addEventListener) {     // DOM2 事件模型，现代浏览器支持
                element.addEventListener(type, handler, option);
            } else if (element.attachEvent) {   // IE 事件模型（IE8 及以下支持）
                element.attachEvent('on' + type, function() {
                    handler.call(element);
                });
            } else {                            // DOM0 事件模型（古老浏览器支持）
                element['on' + type] = handler;
            }
        },
        // 移除事件
        removeEvent : function(element, type, handler,option) {
            if (element.removeEventListener) {
                element.removeEventListener(type, handler, option);
            } else if (element.datachEvent) {
                element.detachEvent('on' + type, handler);
            } else {
                element['on' + type] = null;
            }
        },
        // 阻止事件 (主要是事件冒泡，因为IE不支持事件捕获)
        stopPropagation : function(event) {
            if (event.stopPropagation) {
                event.stopPropagation();
            } else {
                event.cancelBubble = true;
            }
        },
        // 取消事件的默认行为
        preventDefault : function(event) {
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        },
        // 获取事件目标
        getTarget : function(event) {
            return event.target || event.srcElement;
        }

}
//判断一个对象是否为数组 - 基础2
function isArray(obj){
    return Array.isArray(obj) || (typeof obj === 'object' && Object.prototype.call(obj) === '[object Array]');
}

//################ 排序专区 ##################### - 基础2
//1.冒泡排序  最好 平均 最差 空间
function swap(arr,i,j){
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
function bubbleSort(arr){
    for(let i= arr.length-1;i>=0;i--){
        let swaped = false;
        for(let j = 0;j<i;j++){
            if(arr[j]>arr[j+1]){
                swap(arr,j,j+1);
                swaped =true;
            }
        }
        if(!swaped){
            break;
        }
    }
}
//2.快排  最好 平均 最差 空间
arr = fisherYates(arr);
function quickSort(arr,left,right){
    if(left>=right){
        return;
    }
    let rand = Math.floor(Math.random()*(right-left+1)+left);
    swap(arr,left,rand);
    let temp = arr[left];

    let i=left;
    let j=right;
    while(i<j){
        while(i<j && arr[j]>=temp){
            j--;
        }
        if(i<j){
            arr[i]=arr[j];
            i++;
        }
        while(i<j && arr[i]<temp){
            i++;
        }
        if(i<j){
            arr[j]=arr[i];
            j--;
        }
        
    }
    arr[i] = temp;
    quickSort(arr,left,i-1);
    quickSort(arr,i+1,right);
}

//求一个字符串的字节长度  
function bytes(str){  //for...in 遍历的是字符串的索引，而不是字符。
    for (let c of str) {
        if (/\w/.test(c)) {     // if (str.charCodeAt(i) > 255) bytes++;
            count += 1; 
        } else {
            count += 2; 
        }
    }

    return count;
}
//如果需要支持 Unicode 字符
function GetBytes(str) {
    let bytes = 0; // 初始化字节数为 0
    for (let i = 0; i < str.length; i++) {
        const charCode = str.charCodeAt(i);
        // 判断字符所占字节数
        if (charCode <= 0x7F) {
            bytes += 1; // 单字节字符（0x00 - 0x7F）
        } else if (charCode <= 0x7FF) {
            bytes += 2; // 双字节字符（0x80 - 0x7FF）
        } else if (charCode <= 0xFFFF) {
            bytes += 3; // 三字节字符（0x800 - 0xFFFF）
        } else {
            bytes += 4; // 四字节字符（超出 0xFFFF，如 Emoji）
        }
    }
    return bytes;
}

//####点击每一列的时候alert其index - 基础8
var lst = document.getElementById("rdfsf").getElementsByTagName("li");   //es6
for(let i=0;i<lst.length;i++){
    lst[i].addEventListener('click',function(){
        alert(i);
    })
}
/*
lis[i].addEventListener('click', function() {
        alert(this.index); // this.index 指向当前元素的 index 属性
    });
*/
var lis=document.getElementById('2223').getElementsByTagName('li');  //老版本
 for(var i=0;i<3;i++){
     lis[i].index=i;
     lis[i].onclick=(function(a){
         return function() {
             alert(a);
         }
     })(i);
 }

//####log - 基础9
function log(...args) { 
    console.log(...args); // 等价于 console.log.apply(console, arguments) es5
}

//####输出今天的日期 - 基础10
function todayDate(){
    let d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth()+1;
    month = month < 10 ? '0' + month : month;
    let day = d.getDay();
    day = day<10?'0'+day:day;
    console.log(year+'-'+month+'-'+day);
}
//####写一段JS程序提取URL中的各个GET参数 - 基础12 
url = 'http://item.taobao.com/item.htm?a=1&b=2&c=&d=xxx&e';
function queryPara(url){
    var result = {};
     url = url.split("?")[1];
     var map = url.split("&");
     for(var i = 0, len = map.length; i < len; i++) {
        result[map[i].split("=")[0]] = map[i].split("=")[1];
     }
     return result;
}
queryPara(url)

//####清除字符串前后的空格 - 基础13
function trimSpace(strs){
    String.prototype.trim = function() {
        return this.replace(/^\s+/, "").replace(/\s+$/,"");   // /[^\s].*[^\s]/
    }
}

//####数组扁平化处理 - 基础16
function flattenArr1(arr){
   return arr.reduce((newArr,item)=>{
    return newArr.concat(Array.isArray(item)?flattenArr1(item):item);
   },[])
}
function flattenArr2(arr){
    let newArr =[];
    arr.forEach((item)=>{
        if(Array.isArray(item)){
            newArr.concat(flattenArr2(item));
        }
        else{
            newArr.concat(item);
        }
    })
    return newArr;
}
//手写-实现一个对象的 flatten 方法  - 基础25
function isObject(val) {
    return typeof val === "object" && val !== null;
}

function flattenObj(obj){
    if(!isObject(obj)){
        return obj;
    }
    let res = {};
    const dep = (item, prefix)=>{
        if(!isObject(item)){
            res[prefix] = item
            return;
        }
        /*
        if (Array.isArray(cur)) {
            cur.forEach((item, index) => {
              dfs(item, `${prefix}[${index}]`);
            });
          } else {
            for (let k in cur) {
              dfs(cur[k], `${prefix}${prefix ? "." : ""}${k}`);
            }
        }
        */
        Object.keys(item).forEach((key) => {
            if(Array.isArray(item)){
                dep(item[key],prefix+'.['+key+']');
            }
            else{
                dep(item[key],prefix+key);
            }
        });
    }
    dep(obj,"");

}

//手写 promise.all 和 race   - 基础17

//##############################################################################################继承
//手写-实现一个寄生组合继承    - 基础19
function myExtends(){ //ES5
    function Parent(name){
        this.name = name;
        this.say = () => {   //箭头函数的 this 不会随着调用位置变化，而是在 定义时绑定 到其所在作用域的 this
            console.log(this.name);
          };
    }
    Parent.prototype.name = "aa";

    function Child(name, age){
        // 调用父类的构造函数，继承父类的属性
        Parent.call(this,name);  //call 将 Parent 的构造函数上下文绑定到 Child 实例。 将 name 和 say 方法绑定到 Child 的实例
        this.age = age;             //say 的 this 是在 Parent.call(this, name) 中定义的。  但箭头函数的 this 并不是指向定义它的函数对象（Parent），而是继承了箭头函数定义时所在的作用域的 this
    }
    // 设置子类的原型指向父类的原型，继承父类的方法
    Child.prototype = Object.create(Parent.prototype); //ES5 中新增的方法//原型继承只影响 Parent.prototype 的方法，  Parent 构造函数中定义的方法（如 say）是直接绑定在实例上的
    Child.prototype.constructor = Child;

    let child = new Child("cc",1);
    child.say();   //输出 cc
}

function myExtends2(){  //ES6
    class Parent {
        constructor(name) {
          this.name = name;
        }
        greet() {
          console.log(`Hello, my name is ${this.name}`);
        }
        //静态方法和属性不会被继承，需要显式声明
        static sayHello() {
            console.log('Hello from Parent');
        }
      }
      
      // 定义子类，继承父类
    class Child extends Parent {
        constructor(name, age) {
          // 调用父类的构造函数
            super(name);   //子类必须在调用 super() 之后才能访问 this
            this.age = age;
        }
    }
}

function myExtends0(){ //ES5之前 组合继承  原型链继承(共享引用类型属性 无法向父类的构造函数传递参数)+构造函数继承(无法继承原型方法)
    function Parent(name) {
        this.name = name;
        this.colors = ['red', 'blue', 'green'];
      }
      
      Parent.prototype.greet = function () {
        console.log('Hello, my name is ' + this.name);
      };
      
      // 子类
      function Child(name, age) {
        Parent.call(this, name); // 借用构造函数继承
        this.age = age;
      }
      
      // 原型链继承
      Child.prototype = new Parent();
      Child.prototype.constructor = Child;
}
//父类的构造函数会被调用两次：
//一次是在 Parent.call(this, ...) 中
//一次是在 new Parent() 创建子类原型时
//##############################################################################################

//手写-new 操作符      - 基础20
function myNew(constructor,...args){
    let obj = Object.create(constructor.prototype);
    let res = constructor.call(obj, ...args);
    if (res && (typeof res === "object" || typeof res === "function")) {
        return res;
    }
    return obj;
}

//手写-setTimeout 模拟实现 setInterval  - 基础21
//，timer用于保存setTimeout的返回值，isClear用于标记是否需要清除定时器。
//使用setInterval能更准确地控制时间间隔，因为setInterval会尽可能保持固定的间隔时间。而使用setTimeout实现的mySetInterval函数可能会存在一些累积的误差
function mySetInterval(handler, delay = 1000){
    let timer = null;
    let isClear = false;
    function interval(){
        if(isClear){
            isClear = false;
            clearTimeout(timer);
            return;
        }
        timer = setTimeout(interval,delay);
        handler();
    }
    timer = setTimeout(interval, delay);
    return () => {
        isClear = true;
    };
}

//手写-发布订阅模式 - 基础22
class EventEmitter{
    constructor(){
        this.events = {};
    }
    on(type,handler){
        if(this.events[type]){
            this.events[type].push(handler);
        }
        else{
            this.events[type]=[handler];
        }
        return () => this.off(type, handler);
    }
    off(type,handler){
        if (!this.events[type]) return;
        this.events[type] = this.events[type].filter((item)=>{return item !==handler});
    }
    once(type,handler){
        const onceFunc = (...args) => {
            handler.apply(this, args); // 调用原始回调
            this.off(type, onceFunc); // 移除包装函数
        };
        this.on(type, onceFunc); // 注册包装函数
    
    }
    emit(type, ...args){
        this.events[type] && this.events[type].forEach((handler) => {handler.apply(this,args)});
    }
}
//将虚拟 Dom 转化为真实 Dom   - 基础24
function toRealDom(vnode){
    if (typeof vnode === "number") {
        vnode = String(vnode);
    }
    if(typeof vnode === "string"){
        return document.createTextNode(vnode);
    }

    // 普通DOM
    const dom = document.createElement(vnode.tag);
    if (vnode.attrs) {
        // 遍历属性
        Object.keys(vnode.attrs).forEach((key) => {
          const value = vnode.attrs[key];
          dom.setAttribute(key, value);
        });
    }
    // 子数组进行递归操作 这一步是关键
    vnode.children.forEach((child) => dom.appendChild(_render(child)));
    return dom;
}

//判断括号字符串是否有效    - 基础26
function matchPoint(str){  //AC
    if (str.length % 2 === 1) {
        return false;
    }
    let arr = [];
    let regPair = {
        '(':')',
        '[':']',
        '{':'}',
    }
    for(let c of str){
        if(c in regPair){
            arr.push(c);
        }
        else{
            let ch = arr.pop();
            if(regPair[ch]!==c){
                return false;
            }
        }
    }
    return arr.length === 0;
}
//查找数组公共前缀      - 基础27 
function prefix(strs){  ///AC
    let len = strs[0].length;
    for(let i=1;i<=len;i++){
        let s = strs[0].slice(0,i);
        for(let item of strs){
            if(!strs[i] || !item.startsWith(s)){
                return strs[0].slice(0,i-1);
            }
        }
    }
    return strs[0];
}
//字符串最长的不重复子串    - 基础28
function subStringLen(str){
    let len = str.length;
    if(len===0){
        return 0;
    }
    let left = 0,right = -1,count =0;
    let set = new WeakSet();
    while(right<len-1){
        right++;
        let c = str.charAt(right);
        while(set.has(c)){
            set.delete(str.charAt(left));
            left++;
        }
        set.add(c);
        count = count<(right-left+1)?(right-left+1):count;
    }
    return count;

}

/*
const lengthOfLongestSubstring = function (s) {
  if (s.length === 0) {
    return 0;
  }

  let left = 0;
  let right = 1;
  let max = 0;
  while (right <= s.length) {
    let lr = s.slice(left, right);
    const index = lr.indexOf(s[right]);

    if (index > -1) {
      left = index + left + 1;
    } else {
      lr = s.slice(left, right + 1);
      max = Math.max(max, lr.length);
    }
    right++;
  }
  return max;
};
*/

//手写call 
Function.prototype.mycall = function(context){
    if(typeof this !== "function"){      //this是调用mycall的那个函数
        throw new Error("Function");
    }
    context =context || window;
    let args = [...arguments].slice(1);

    context[symbol] = this;
    let symbol = new Symbol();
    let result = null;
    result = context[symbol](...args);

    delete context[symbol];
    return result;
}
//手写apply
Function.prototype.myApply = function(context){
    if(typeof this !== "function"){
        throw new Error("Function");
    }
    context =context || window;
    let args = arguments[1];
    let symbol = new Symbol();
    context[symbol] = this;
    let result = null;
    result = context[symbol](...args);
    delete context[symbol];
    return result;
} 

//====手写bind

Function.prototype.myBind = function(context){
    if(typeof this !== "function"){
        throw new Error("Function");
    }
    const self = this; // 保存当前函数
    const boundFunction = function (...innerArgs) {//绑定后的函数
       
        const finalContext = this instanceof boundFunction ? this : context;
        return self.apply(finalContext, [...args, ...innerArgs]);
    };
    boundFunction.prototype = Object.create(self.prototype);   
    return boundFunction;
} 

//核心点:
//1.保存当前函数：将当前函数 保存在一个变量中以便后续调用
//2.绑定 this 的逻辑：通过 new 调用的，则 this 指向新实例  否则，this 应该指向 context
//3.支持传参：通过解构 ...args 收集绑定时的参数，...innerArgs 收集调用时的参数
//4.继承原型链：绑定后的函数也需要保留原函数的原型，以支持 new 调用
Function.prototype.myBind = function(context){
    if(typeof this !== "function"){
        throw new Error("Function");
    }
    const self = this; // 保存当前函数
    const boundFunction = function (...innerArgs) {//绑定后的函数
        // 使用 `this instanceof boundFunction` 判断是否用作构造函数
        /*
        是为了处理 bind 方法返回的函数被用作构造函数时的特殊情况。
        在 JavaScript 中，函数既可以作为普通函数调用，也可以通过 new 关键字作为构造函数调用。
        当 bind 返回的绑定函数被用作构造函数时，其 this 应该指向新创建的实例对象，而不是绑定时的 context
        const finalContext = this instanceof Constructor ? this : c*/
        const finalContext = this instanceof boundFunction ? this : context;
        return self.apply(finalContext, [...args, ...innerArgs]);
    };
    //由于 bind 的作用，普通调用时 this 会被显式设置为 context。
    //如果 boundFunction 是通过 new 调用的，this 会被设置为新创建的实例对象

    // 1. 如果绑定的是构造函数，那么需要继承构造函数原型属性和方法：保证原函数的原型对象上的属性不丢失
    // 2. 实现继承的方式: 使用Object.create  继承自self
    // 3. 通过 obj.func() this 的指向会按照 对象调用规则 确定; 然而，由于 bind 的设计是为了强制绑定 this，bind 会覆盖对象调用规则，即 this 的指向依然是绑定时指定的 context
    boundFunction.prototype = Object.create(self.prototype);   //const BoundPerson = Person.bind(null);   const person = new BoundPerson('Alice');
    return boundFunction;
} 

//深拷贝
//简版

//详版
const getType = obj => Object.prototype.toString.call(obj);

const isObject = (target) => (typeof target === 'object' || typeof target === 'function') && target !== null;

const canTraverse = {
  '[object Map]': true,
  '[object Set]': true,
  '[object Array]': true,
  '[object Object]': true,
  '[object Arguments]': true,
};
const mapTag = '[object Map]';
const setTag = '[object Set]';
const boolTag = '[object Boolean]';
const numberTag = '[object Number]';
const stringTag = '[object String]';
const symbolTag = '[object Symbol]';
const dateTag = '[object Date]';
const errorTag = '[object Error]';
const regexpTag = '[object RegExp]';
const funcTag = '[object Function]';

const handleRegExp = (target) => {
  const { source, flags } = target;
  return new target.constructor(source, flags);
}

const handleFunc = (func) => {
  // 箭头函数直接返回自身
  if(!func.prototype) return func;
  const bodyReg = /(?<={)(.|\n)+(?=})/m;
  const paramReg = /(?<=\().+(?=\)\s+{)/;
  const funcString = func.toString();
  // 分别匹配 函数参数 和 函数体
  const param = paramReg.exec(funcString);
  const body = bodyReg.exec(funcString);
  if(!body) return null;
  if (param) {
    const paramArr = param[0].split(',');
    return new Function(...paramArr, body[0]);
  } else {
    return new Function(body[0]);
  }
}

const handleNotTraverse = (target, tag) => {
  const Ctor = target.constructor;
  switch(tag) {
    case boolTag:
      return new Object(Boolean.prototype.valueOf.call(target));
    case numberTag:
      return new Object(Number.prototype.valueOf.call(target));
    case stringTag:
      return new Object(String.prototype.valueOf.call(target));
    case symbolTag:
      return new Object(Symbol.prototype.valueOf.call(target));
    case errorTag: 
    case dateTag:
      return new Ctor(target);
    case regexpTag:
      return handleRegExp(target);
    case funcTag:
      return handleFunc(target);
    default:
      return new Ctor(target);
  }
}

const deepClone = (target, map = new WeakMap()) => {
  if(!isObject(target)) 
    return target;
  let type = getType(target);
  let cloneTarget;
  if(!canTraverse[type]) {
    // 处理不能遍历的对象
    return handleNotTraverse(target, type);
  }else {
    // 这波操作相当关键，可以保证对象的原型不丢失！
    let ctor = target.constructor;
    cloneTarget = new ctor();
  }

  if(map.get(target)) 
    return target;
  map.set(target, true);

  if(type === mapTag) {
    //处理Map
    target.forEach((item, key) => {
      cloneTarget.set(deepClone(key, map), deepClone(item, map));
    })
  }
  
  if(type === setTag) {
    //处理Set
    target.forEach(item => {
      cloneTarget.add(deepClone(item, map));
    })
  }

  // 处理数组和对象
  for (let prop in target) {
    if (target.hasOwnProperty(prop)) {
        cloneTarget[prop] = deepClone(target[prop], map);
    }
  }
  return cloneTarget;
}