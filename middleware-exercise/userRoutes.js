const express = require('express');
const router = new express.Router();
const items = require('./fakeDb')
const middleware = require('./middleware')
const ExpressError = require('./expressError')

router.get('/', (req,res) => {
    return res.json({ item: items });
})

router.post('/', middleware.checkjson, (req, res, next) => {
    let name = req.body.name;
    let price = req.body.price;
    let new_item = {name: name, price: price}
    items.push(new_item);
    return res.json( { item_added: new_item })
})

router.get('/:name', (req,res) => {
    const shopping_item = items.find(i => i.name === req.params.name)
    if (shopping_item === undefined) {
        throw new ExpressError("Name not found", 404)
    }
    return res.json({ item: shopping_item });
})

router.patch('/:name', (req, res) => {
    const foundname = items.find(i => i.name === req.params.name)
    if (foundname === undefined) {
        throw new ExpressError("Name not found", 404)
    }
    if (req.body.name) {
        foundname.name = req.body.name;
    }
    if (req.body.price) {
        foundname.price = req.body.price;
    }
    return res.json({ item: foundname });
})

router.delete('/:name', (req, res) => {
    const foundidx = items.findIndex(i => i.name === req.params.name)
    if (foundidx === -1) {
        throw new ExpressError("Name not found", 404)
    }
    items.splice(foundidx, 1)
    return res.json({"message" : "Deleted"} )
})

module.exports = router;
