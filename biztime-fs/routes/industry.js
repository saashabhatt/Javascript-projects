const express = require("express");
const router = express.Router();
const db = require("../db");
const ExpressError = require("../expressError");

router.post('/', async (req, res, next) => {
    try {
        const { code, industry } = req.body;
        const results = await db.query(`INSERT INTO industries (code, industry) VALUES ($1, $2) RETURNING *`, [code, industry]);
        return res.status(201).json({"industry": results.rows});
    } catch(e) {
        return next(e);
    }
})

router.get('/', async (req, res, next) => {
    try {
    const results = await db.query(`SELECT * FROM industries`);
    return res.json({"industries": results.rows})
    } catch(e) {
        return next(e);
    } 
})

router.get('/:code', async (req, res, next) => {
    try {
    const code = req.params.code;
    const compresults = await db.query(`SELECT name FROM companies WHERE industry_code=$1`, [code]);
    const indresults = await db.query(`SELECT * FROM industries WHERE code=$1`, [code]);
    
    if (indresults.rows.length != 0) {
        let ind = indresults.rows[0];
        let comp = compresults.rows;
        ind.companies = comp.map(i => i.name);
        return res.json({"industry": ind});
    } else {
        const err = new ExpressError("Not Found", 404);
        return next(err);
    }
    } catch(e) {
        return next(e);
    } 
})


// router.get('/comp', async (req, res, next) => {
//     try {
//     const results = await db.query(
//         `SELECT i.code, i.industry, c.name 
//             FROM industries AS i
//                 LEFT JOIN COMPANIES as c
//                 ON i.code = c.industry_code`);
//     return res.json({"industries": results.rows})
//     } catch(e) {
//         return next(e);
//     } 
// })


module.exports = router;