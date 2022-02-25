import request from 'supertest';
import app from '../index';
import { randomNumber } from '../utils/helpers';

const userParams = {
    firstName: `Test`,
    lastName: 'User',
    email: `test_${randomNumber()}@test.com`,
    password: '123456',
    birthDate: '01-01-1991'
};

describe('Auth Integration Tests > Register', () => {
    it ('Should register user with valid input', async () => {
        const res = await request(app)
            .post('/register')
            .send(userParams);

        console.log(res.body);

        expect(res).toBeDefined();
        expect(res.status).toBe(200);
    });

    it ('Should not register user with invalid email', async () => {
        const badUser = { ...userParams, email: 'test.com' };
        const res = await request(app)
            .post('/register')
            .send(badUser);
        expect(res.status).toBe(400);
    });

    it ('Should not register user with invalid password', async () => {
        const badUser = { ...userParams, password: '1234' };
        const res = await request(app)
            .post('/register')
            .send(badUser);
        expect(res.status).toBe(400);
    });

    it ('Should not register user with invalid firstName', async () => {
        const badUser = { ...userParams, firstName: 'ab' };
        const res = await request(app)
            .post('/register')
            .send(badUser);
        expect(res.status).toBe(400);
    });
});


describe('Auth Integration Tests > Login', () => {
    it ('Should login user with valid input', async () => {
        const res = await request(app)
            .post('/login')
            .send({
                email: userParams.email,
                password: userParams.password
            });

        console.log(res.body);

        expect(res).toBeDefined();
        expect(res.status).toBe(200);
    });

    it ('Should not login user with invalid email', async () => {
        const badUser = { email: 'test.com' };
        const res = await request(app)
            .post('/login')
            .send(badUser);
        expect(res.status).toBe(400);
    });

    it ('Should not login user with invalid password', async () => {
        const badUser = { email: userParams.email, password: '654321' };
        const res = await request(app)
            .post('/login')
            .send(badUser);
        expect(res.status).toBe(401);
    });
});