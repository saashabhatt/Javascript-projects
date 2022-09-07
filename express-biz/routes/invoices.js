const express = require("express");
const db = require("../db");
const ExpressError = require("../expressError");

const router = new express.Router();

router.get('/', async (req, res, next) => {
    try {
    const results = await db.query(`SELECT * FROM invoices`);
    return res.json({"invoices": results.rows})
    } catch(e) {
        return next(e);
    } 
});

router.get('/:id', async (req, res, next) => {
    try {
    const { id } = req.params;
    const results = await db.query(`SELECT * FROM invoices WHERE id=$1`, [id]);
    if (results.rows.length != 0) {
        return res.json(results.rows[0]);
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
        let { comp_code, amt } = req.body;
        let add_date = Date.now();
        const results = await db.query(`INSERT INTO invoices (comp_code, amt) VALUES ($1, $2) RETURNING *`, [comp_code, amt]);
        return res.status(201).json({"invoice": results.rows});
    } catch(e) {
        return next(e);
    }
})

router.patch('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const { amt } = req.body;
        const results = await db.query(`UPDATE invoices SET amt=$1 WHERE id=$2 RETURNING *`, [amt, id]);
        if (results.rows.length != 0) {
            return res.status(201).json({"invoices": results.rows[0]});
        } else {
            const err = new ExpressError("Not Found", 404);
            return next(err);
        }
    } catch(e) {
        return next(e);
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const results = await db.query(`DELETE FROM invoices WHERE id = $1`, [id]);
        
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
