const express = require('express');
const ExpressError = require('./expressError')

function checkjson(req, res, next) {
    try {
        if (!req.body.name) {
            throw new ExpressError("Name is required", 402);
        } else if (!req.body.price) {
            throw new ExpressError("Price is required", 402);
        } else {
            return next();
        }
    } catch(e) {
        return next(e);
    }
}


module.exports = { checkjson }