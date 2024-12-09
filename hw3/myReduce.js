Array.prototype.myReduce = function (fn, initacc) {
    let acc;
    let startIndex; 

    if (initacc === undefined){
        acc = this[0];
        startIndex = 1;
    }else{
        acc = initacc;
        startIndex= 0;
    }
    
    for (let i = startIndex; i < this.length; i++){
        acc = fn(acc, this[i]);
    }
    return acc;
};

const arr = [1,3,4,5];

const total = arr.myReduce((acc, cur)=> acc + cur, 0 )

console.log(total);