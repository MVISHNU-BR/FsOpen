const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

const User = require('../models/user');


beforeEach(async () => {
    await User.deleteMany({})
})

describe("When get users from db", () => {
    test("get all users from db", async () => {

        const result = await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(result.body).toHaveLength(0)
    })
})

describe('When insert users in DB', () => {
    test('user with username with 2 characters', async () => {
        const user = {
            username: "jo",
            password: "test",
            name: "John Due"
        }
        await api
            .post('/api/users')
            .send(user)
            .expect(500)
    })

    test('user with no name and no pasword', async () => {
        const user = {
            username: "",
            password: "",
            name: "John Due"
        }

        const result = await api
            .post('/api/users')
            .send(user)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        expect(result.body.error).toBe("username and password are required")
    })

    test('User with password less than 3 characters', async () => {
        const user = {
            username: "Jonny",
            password: "12",
            name: "John Due"
        }

        const result = await api
            .post('/api/users')
            .send(user)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toBe("Password needs to be had 3 or more characters")
    })
})