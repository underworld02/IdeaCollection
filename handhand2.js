/*
 * @Author: underworld02 1069645184@qq.com
 * @Date: 2025-01-02 23:17:59
 * @LastEditors: underworld02 1069645184@qq.com
 * @LastEditTime: 2025-01-09 22:03:57
 * @FilePath: \wechat-master\handhand2.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
function find(context = window,...args){
    if (typeof context !=="object"){
        context  = new  Object(context);
    }
    let fn = this;
    let newFn = function(...newArgs){
        args = [...args,...newArgs];
        let _this =  this instanceof newFn?this:context;
        let res = fn.apply(_this,args);
        return res;
    }
    newFn.prototype = Object.create(fn.prototype);
    return newFn;
}

Promise.promiseAll =function(arr, count){
    return new Promise((resolve,reject)=>{
        let curCount = 0 ;
        let num = 0 ;
        let res = [];
        let taskList = [];

        let wakeUp=()=>{
            if(taskList.length==0 ||  curCount >=count){
                return;
            }
            curCount++;
            let [id,p]  = taskList.pop();
            Promise.resolve(p).then((data)=>{
                res[id] = data;
            }).catch((err)=>{
                return reject(err);
            }).finally(()=>{
                if(++num===arr.length){
                    resolve(res);
                }
                curCount--;
                wakeUp();
            })
        }

        for(let i=0;i<arr.length;i++){
            taskList.push([i,arr[i]]);
            wakeUp();
        }
    })
}

var object = { a: [{ b: { c: 3 } }] };
var array = [{ a: { b: [1] } }];
function getValue(target, valuePath, defaultValue) {
    let arr = valuePath.split('.');
    let  obj = target;
    for(let i=0;i<arr.length;i++){
        if(arr[i].includes('[')){
            let res = [...arr[i].match(/^(.*)\[(.*)\]$/)];
            if(res[1]){
                obj=obj[res[1]]; 
            }
            obj = obj[res[2]];
        }
        else{
            obj = obj[arr[i]];
        }
    }
    return obj;
}

console.log(getValue(object, "a[0].b.c", 0)); // 输出3
console.log(getValue(array, "[0].a.b[0]", 12)); // 输出 1
console.log(getValue(array, "[0].a.b[0].c", 12)); // 输出 12