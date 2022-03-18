function countdown (x) {
    let time = setInterval(function () {
        x--;
        if(x<=0) {
            clearInterval(time);
            console.log("DONE");
        }
        else {
            console.log(x);
        }
    }, 1000);
}
