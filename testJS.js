/*
 * @Author: underworld02 1069645184@qq.com
 * @Date: 2024-11-16 14:28:29
 * @LastEditors: underworld02 1069645184@qq.com
 * @LastEditTime: 2024-12-21 15:17:30
 * @FilePath: \wechat-master\testJS.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
//IFIE 的 作用域链和变全局
console.log('---IFIE---');
(function() {
    let c;
    console.log(c);
  a = 1;  // a 会变成全局变量
  var b = 2;  // b 是局部变量，仅在 IIFE 内部有效
})();
console.log(a);

//正则表达式
console.log('---正则表达式---');
let  url= 'https://www.peopleapp.com/newspaper?a=1&b=abc';
let pattern = /^https?:\/\/.*\?(.*)/;
let ans = url.match(pattern);
console.log(ans[1]);

//json
console.log('---json---');
let obj = {
  name: 'poetry',
  sayHello: function() {
    console.log('Hello!');
  }
};
obj.mine = obj;
// let serializedObj = JSON.stringify(obj);
// console.log(serializedObj); 

// let clonedObj = JSON.parse(serializedObj);
// console.log(Object.keys(clonedObj));
 
//setTimeout func
let timer = setTimeout(function(){
  console.log("ok");
  
},1);

////---obj{} [key]  arr[] [key]---
console.log('---obj{} [key]  arr[] [key]---');
let newobj = {}
newobj['a']=1;
let newarr = []
newarr[1]=1;
newarr[3]=3;
console.log(newobj);
console.log(newarr);

/////求一个字符串的字节长度
console.log('---求一个字符串的字节长度---');
function bytes(str){
  let count=0;
  for (let c of str) {
      if (/\w/.test(c)) {
          count += 1; 
      } else {
          count += 2; 
      }
  }

  return count;
}

console.log(bytes("ssdsd"));


//####写一段JS程序提取URL中的各个GET参数
console.log('---提取URL中的各个GET参数---');
url = 'http://item.taobao.com/item.htm?a=1&b=2&c=&d=xxx&e';
function queryPara(url){
    let result = {}; 
    let pattern = /^https?:\/\/.*\/.*\?(.*)/;   //url = url.split("?")[1];
    let match = pattern.exec(url);
    let list = match[1].split("&");
    for(let str of list){
      let key_value_lst = str.split("=");
      ans[key_value_lst[0]] = key_value_lst.length!=1?key_value_lst[1]:null;
    }
    console.log(ans);
}
queryPara(url)

//####清除字符串前后的空格
console.log('---清除字符串前后的空格---');
var strs = " \t\n test string ";
function trimSpace(strs){
  let pattern = /[^\s].*[^\s]/
  return pattern.exec(strs)[0];
}
console.log(trimSpace(strs)+"A");

function flatten(arr){

  return Object.assign([],arr);
}
console.log(flatten([1,2,[3,4]]));

//手写-实现一个寄生组合继承
name = "ww"
function myExtends(){
  function Parent(name){
      this.name = name;
      this.say = () => {
          console.log(this.name);
        };
  }
  Parent.prototype.func = () => {
    console.log(this.name);
  };;

  function Child(name, age){
      Parent.call(this,name);
      this.age = age;
  }
  Child.prototype = Object.create(Parent.prototype);  
  Child.prototype.constructor = Child;

  let child = new Child("cc",1);
  child.say(); //cc
  child.func(); //ww
}
myExtends();


//flatten
// console.log("---------flatten---------");
// function fun(arr){
//   let newobj = {}; 
//   Object.keys(arr).forEach((key)=>{
//       if(arr[key] === null || typeof arr[key] !== "object"){
//           newobj['['+key+']'] = arr[key];
//       }
//       else if(Array.isArray === (arr[key])){
//           let child = flattenObj(obj[key]);
//           Object.keys(child).forEach((childKey)=>{
//               newobj[childKey] = child[childKey];
//           });
//       }
//       newobj['['+key+']'] = flattenObj(arr[key]);
//   });
// }

// function flattenObj(obj){
//   let newobj = {}; 
//   Object.keys(obj).forEach((key)=>{
//       if(obj[key] === null || typeof obj[key] !== "object"){
//           newobj[key] = obj[key];
//       }
//       else{
//           let child = flattenObj(obj[key]);
//           Object.keys(child).forEach((childKey)=>{
//               newobj[childKey] = child[childKey];
//           });
//       }

//   })
// }
// obj = {
//   a: {
//        b: 1,
//        c: 2,
//        d: {e: 5}
//      },
//   b: {0:1, 1:3, 2:{a: 2, b: 3}},
//   c: 3
//  }
// console.log(flattenObj(obj));


//arguments
console.log("---------flatten---------");
function sum(a) {
  let b=a;
  console.log(arguments);
}
let aaa = {'0':1,'1':2,length:2}
console.log(aaa);

//this
console.log("---------this---------");
let thisa = function() {
  let func = () => {
    console.log(this.a);
  }
  func();
}

const thisobj = {a:'a'};
thisobj.fn = thisa;
thisobj.fn();
console.log("---------thisb---------");
let thisb = function() {
  let func = () => {
    console.log(this);
  }
  func();
}
thisb();

let nnn = +'1';
console.log(Number(nnn)===1)

//版本号排序
//['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5']。现在需要对其进行排序，排序的结果为 ['4.3.5','4.3.4.5','2.3.3','0.302.1','0.1.1']
arr  =[]
arr.sort((a, b) => {
  let i = 0;
  const arr1 = a.split(".");
  const arr2 = b.split(".");

  while (true) {
    const s1 = arr1[i];
    const s2 = arr2[i];
    i++;
    if (s1 === undefined || s2 === undefined) {
      return arr2.length - arr1.length;
    }

    if (s1 === s2) continue;

    return s2 - s1;
  }
});
// console.log(sortV(['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5']));
if({}){
  console.log("true-");
}
else{
  console.log("false-");
}


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
console.log(Object.getPrototypeOf(circlePrototype)=== Shape.prototype );

const circle = circlePrototype.clone();
console.log(Object.getPrototypeOf(circle));

function unique(arr) {
  if (!Array.isArray(arr)) {
      console.log('type error!')
      return
  }
  var arrry= [];
   var  obj = {};
  for (var i = 0; i < arr.length; i++) {
      if (!obj[arr[i]]) {
          arrry.push(arr[i])
          obj[arr[i]] = 1
      } else {
          obj[arr[i]]++
      }
  }
  return arrry;
}
var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{},[],[],+0,+0,-0,-0];
console.log(unique(arr))
console.log({}==0) //false
console.log([]==0) //true
console.log(true==1) //true
console.log(null==false) //false
console.log(null==undefined) //true
console.log(null==0) //false
console.log(0==false) //true

// console.log([]==[]) //false
// console.log([]===[]) //false
// console.log({}=={}) //false
// console.log({}==={}) //falset


console.log("==========值的转换=========")
let zero = BigInt(0);
let num = BigInt(1);
let symbol = Symbol();
let Fnull = null;
let Fund = undefined;
let Fobj = {a:2};
let Fobj2 = {
  valueOf(){
    return 'dd';
  },
  toString(){
    return "33";
  }
};
Fobj2[Symbol.toPrimitive] = ()=>{return 2};

let Farr = [1,2];

console.log(String(Farr));
console.log(Number(true));
console.log(0 + +'a');


console.log("========== =>的this=========")
let value = "window";
function Outer() {
  this.value = 'Outer context';

  this.arrowFunction = () => {
    console.log(this.constructor);
  };
  console.log(this.constructor);
  arrowFunction();

}

Outer();

let o = new Outer();
o.value = 'o';
o.arrowFunction();
//////////////////////////////////
async function timeout (ms) {
  await new Promise((resolve) => {
    setTimeout(()=>{resolve();console.log("hello")}, ms)    
  })
}
async function asyncConsole (value, ms) {
  await timeout(ms)
  console.log(value)
}
asyncConsole('hello async and await', 3000)


////////////////////////////
var a = 0
var b = async () => {
  a = a + await 10
  console.log('2', a) // -> '2' 10
  a = (await 10) + a
  console.log('3', a) // -> '3' 20
}
b()
a++
console.log('1', a) // -> '1' 1