function average(arr) {
    let avg = arr.reduce((a,b) => a+b, 0) /arr.length
    avg = avg.toFixed(2);
    return {
        operation: "mean",
        result: avg
    }
}


function median(arr) {
    const mid = Math.floor(arr.length/2)
    arr = arr.sort((a, b) => a - b);
    let med = arr.length % 2 !== 0 ? arr[mid] : (arr[mid - 1] + arr[mid]) / 2;
    return {
        operation: "median",
        result: med
    }
};

function mode(arr) {
    
    arr = arr.sort((a, b) => a - b);
    const mode = {};
    let max = 0, count = 0;

    for(let i = 0; i < arr.length; i++) {
        const item = arr[i];
        
        if(mode[item]) {
        mode[item]++;
        } else {
        mode[item] = 1;
        }
        
        if(count < mode[item]) {
        max = item;
        count = mode[item];
        }
    }
    
    return {
        operation: "median",
        result: max
    };
}

module.exports = {median, average, mode};