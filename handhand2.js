function myNew(constructor){
    let  obj ={};
    Object.setPrototypeOf(obj,constructor.prototype);
    let args = [...arguments].slice(1);
    let res = constructor.apply(obj,args)
    return res && typeof(res)==="object"?res:obj;
}
