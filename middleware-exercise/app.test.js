process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("./app");
let items = require("./fakeDb");

let apples = {name: "apple", price: 12.99 };

beforeEach(function() {
    items.push(apples);
});

afterEach(function() {
    items.length = 0;
})

describe("GET /items", () => {
    test("Get all items", async () => {
        let res = await request(app).get('/items');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ item: [apples] })
    })
})


describe("GET /items/:name", () => {
    test("Get a specific item", async () => {
        let res = await request(app).get(`/items/${apples.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ item: apples })
    })

    test("Responds with 404 for invalid name", async () => {
        let res = await request(app).get(`/items/samsung`);
        expect(res.statusCode).toBe(404);
    })
})

describe("POST /items", () => {
    test("Add an item", async () => {
        let res = await request(app).post('/items').send({ name: "Table", price: 99.99 });
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ item_added: { name: "Table", price: 99.99 }})
    })

    test("Post an invalid item", async () => {
        let res = await request(app).post('/items').send({ name: "Table" });
        expect(res.statusCode).toBe(402);
    })
})

describe("PATCH /items/:name", () => {
    test("Update an item", async () => {
        let res = await request(app).patch(`/items/${apples.name}`).send({ name: "iPhone", price: 1099.99 });
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ item: { name: "iPhone", price: 1099.99 }})
    })

    test("Responds 404 to invalid name", async () => {
        let res = await request(app).patch(`/items/piggles`).send({ name: "iPhone", price: 1099.99 });
        expect(res.statusCode).toBe(404);
    })
})

describe("DELETE /items/:name", () => {
    test("Delete an item", async () => {
        let res = await request(app).delete(`/items/${apples.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({"message" : "Deleted"})
    })

    test("Responds 404 to invalid name", async () => {
        let res = await request(app).delete(`/items/samsung`);
        expect(res.statusCode).toBe(404);
    })
})