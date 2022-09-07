const express = require("express");
const router = express.Router();
const db = require("../db");
const ExpressError = require("../expressError")

router.get('/', async (req, res, next) => {
    try {
    const results = await db.query(`SELECT * FROM companies`);
    return res.json({"companies": results.rows})
    } catch(e) {
        return next(e);
    } 
})

router.get('/:code', async (req, res, next) => {
    try {
    const { code } = req.params;
    const results = await db.query(`SELECT * FROM companies WHERE code=$1`, [code]);
    const inv = await db.query(`SELECT * FROM invoices WHERE comp_code=$1`, [code]);

    if (results.rows.length != 0) {
        let comp = results.rows[0];
        let invoices = inv.rows;
        comp.invoices = invoices.map(i => i.id);
        return res.json({"company": comp});
    } else {
        const err = new ExpressError("Not Found", 404);
        return next(err);
    }
    } catch(e) {
        return next(e);
    } 
})

router.post('/', async (req, res, next) => {
    try {
        const { code, name, description } = req.body;
        const results = await db.query(`INSERT INTO companies (code, name, description) VALUES ($1, $2, $3) RETURNING *`, [code, name, description]);
        return res.status(201).json(results.rows);
    } catch(e) {
        return next(e);
    }
})

router.patch('/:code', async (req, res, next) => {
    try {
        const code = req.params.code;
        const {  name, description } = req.body;
        const results = await db.query(`UPDATE companies SET name=$1, description=$2 WHERE code=$3 RETURNING code, name, description`, [name, description, code]);
        if (results.rows.length != 0) {
            return res.status(201).json(results.rows[0]);
        } else {
            const err = new ExpressError("Not Found", 404);
            return next(err);
        }
    } catch(e) {
        return next(e);
    }
})

router.delete('/:code', async (req, res, next) => {
    try {
        const code = req.params.code;
        const results = await db.query(`DELETE FROM companies WHERE code = $1`, [code]);
        if (results.rows.length != 0) {
            return res.send({msg : "DELETED" });
        } else {
            const err = new ExpressError("Not Found", 404);
            return next(err);
        }
    } catch(e) {
        return next(e);
    }
})

module.exports = router;