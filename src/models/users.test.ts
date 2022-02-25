import User from "./users";

import mongooseConnection from '../utils/mongoose';
import { randomNumber } from "../utils/helpers";

console.log('Mongoose state:', mongooseConnection.connection.readyState);

afterAll(async () => {
    if (mongooseConnection.connection?.readyState !== 1) {
        await mongooseConnection.connection.close();
    }
});

describe('User Model Tests', () => {
    it ('Has all necessary fields', () => {
        const userParams = {
            firstName: 'Test',
            lastName: 'User',
            email: 'a@test.com',
            password: '32498sdffy843rhjgrg9023',
        };
        const user = new User(userParams);

        expect(user.firstName).toEqual(userParams.firstName);
        expect(user.lastName).toEqual(userParams.lastName);
    });

    it ('toJSON hides unwanted properties', async () => {
        const userParams = {
            firstName: 'Test',
            lastName: 'User',
            email: `a_${randomNumber()}@test.com`,
            password: '32498sdffy843rhjgrg9023',
        };
        const user = new User(userParams);
        await user.save();

        const userJSON = user.toJSON();
        expect(userJSON.password).toBeUndefined();
        expect(userJSON.__v).toBeUndefined();
        expect(userJSON._id).toBeUndefined();
        expect(userJSON.firstName).toEqual(userParams.firstName);
        expect(userJSON.lastName).toEqual(userParams.lastName);

    })
});