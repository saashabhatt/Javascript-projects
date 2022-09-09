process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('../app');
const db = require('../db');

let compres;
let invoicesres;

beforeEach(async () => {
    const result = await db.query(`INSERT INTO companies (code, name, description)
    VALUES ('apple', 'Apple Computer', 'Maker of OSX.') RETURNING code, name, description`);
    const ires = await db.query(`INSERT INTO invoices (comp_Code, amt, paid, paid_date)
    VALUES ('apple', 100, false, null)`)
    compres = result.rows[0];
    invoicesres = ires.rows[0];
})

afterEach(async () => {
    await db.query(`DELETE FROM companies`);
})

afterAll(async () => {
    await db.end();
})

describe ("GET /companies", () => {
    test("Get a list with one company", async () => {
        const res = await request(app).get('/companies')
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({companies: [compres]});
    })
})


describe ("GET /companies/:code", () => {
    test("Get a company with a code", async () => {
        const res = await request(app).get(`/companies/0`)
        expect(res.statusCode).toBe(404);
    })
})

describe ("POST /companies/", () => {
    test("Add a company", async () => {
        const res = await request(app).post(`/companies`).send({name: "Adidas", description: "German shoemaker"})
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({company: [{code: "Adidas", name: "Adidas", description: "German shoemaker"}] });
    })
})

describe ("PATCH /companies/:code", () => {
    test("Update a company", async () => {
        const res = await request(app).patch(`/companies/${compres.code}`).send({name: "Bandidas", description: "Mexican restaurant"})
        expect(res.statusCode).toBe(201);
    })
})

describe ("DELETE /companies/:code", () => {
    test("Delete a company", async () => {
        const res = await request(app).delete(`/companies/${compres.code}`);
        expect(res.statusCode).toBe(200);
    })
})