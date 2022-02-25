import User from '../models/users';
import { hash } from '../utils/bcrypt';
import mongooseConnection from '../utils/mongoose';

console.log('Mongoose state:', mongooseConnection.connection.readyState);

const randomNumber = (min: number = 0, max: number = Date.now()): number => {
    return Math.floor(
        Math.random() * (max - min + 1) + min
    )
}

const random = randomNumber();
const password = randomNumber();

const createAdminUser = async () => {

    const passwordHash = await hash(`${password}`);
    const user = new User({
        email: `admin_${random}@gmail.com`,
        password: passwordHash,
        firstName: `Admin`,
        lastName: `${random}`,
        birthDate: '01-01-1999',
        isAdmin: true,
    });

    return await user.save();
};

createAdminUser()
    .then((user: any) => {
        console.log(`
            Admin user added successfully
                Email: ${user.email}
                Password: ${password}
        `);
        process.exit(0);
    })
    .catch((e: Error) => console.log(`Error while creating admin user\n${e}`))
