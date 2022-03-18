function randomGame () {
let i = 0;
let count = setInterval(function () {
    let rando = Math.random();
    i++;
    if (rando > 0.75) {
        clearInterval(count);
        console.log(`It took ${i} attempt(s)`);
    }
}, 1000)
}
