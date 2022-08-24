const express = require('express');

const app = express();
const { median, average, mode } = require('./helper');
const ExpressError = require('./expressERRORS');

app.get('/mean', (req, res, next) => {
    let nums= req.query.nums;
    let arr = nums.split(",");
    arr = arr.map(str => {return Number(str);});
    try {
        if (!nums) throw new ExpressError("nums are required", 400);
        if (arr.includes(NaN)) throw new ExpressError("Parameters must all be numbers", 400);
        result = average(arr)
        return res.send(result);
    } catch (e) {
        next (e);
    }
    
})

app.get('/median', (req, res, next) => {
    let nums= req.query.nums;
    let arr = nums.split(",");
    arr = arr.map(str => {return Number(str);});
    try {
        if (!nums) throw new ExpressError("nums are required", 400);
        if (arr.includes(NaN)) throw new ExpressError("Parameters must all be numbers", 400);
        result = median(arr);
        return res.send(result);
    } catch (e) {
        next (e);
    }
    
})

app.get('/mode', (req, res, next) => {
    let nums= req.query.nums;
    let arr = nums.split(",");
    arr = arr.map(str => {return Number(str);});
    try {
        if (!nums) throw new ExpressError("nums are required", 400);
        if (arr.includes(NaN)) throw new ExpressError("Parameters must all be numbers", 400);
        result = mode(arr);
        return res.send(result);
    } catch (e) {
        next (e);
    }
    
})

app.use((error, req, res, next) => {
    res.status(error.status).send(error.message);
})

app.listen(3000, () => {
    console.log("Server running on port 3000")
})

