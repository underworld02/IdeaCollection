//最长公共前缀
function judge(strs){
    let index = 0;
    let str = strs[0];
    while(index < str.length){
        let strslience = str.slice(0,index+1);
        for(let i =1;i < strs.length;i++){
        
            if(!str[i] || !strs[i].startsWith(strslience)){
                return str.slice(0,index);
            }
        }
    }
    
    return str;
}

//flatten
function flatten(){

    
}