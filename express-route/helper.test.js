const { median, average, mode } = require('./helper');

let arr3 = [56, 99, 1006, 2, 5, 3]
let arr4 = [1,1,99,99,3,3,3, 7,7,7,7,7]

describe('average function', function() {

    test('round the average down to 2 decimal places', function() {
        const res = average(arr3)
        expect (res).toEqual({"operation": "mean", "result": "195.17" })    
    })
})

describe('median function', function() {
    test('return the median of array', function() {
        const res = median(arr3)
        expect (res).toEqual({"operation": "median", "result": 30.5})    
    })
})

describe('mode function', function() {
    test('return the mode of array with no repeats', function() {
        const res = mode(arr3)
        expect (res).toEqual({"operation": "median", "result": 2})    
    })

    test('return the mode of array with repeated numbers', function() {
        const res = mode(arr4)
        expect (res).toEqual( {"operation": "median", "result": 7})    
    })
})