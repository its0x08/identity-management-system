import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    email: { type: String, unique: true, required: true },
    password: String,
    firstName: String,
    lastName: String,
    birthDate: Date,
    isAdmin: { type: Boolean, default: false },
    lastLogin: Date,
    createdAt: Date,
    updatedAt: Date,
},
    {
        toJSON: {
            transform: function (doc, ret) {
                delete ret._id;
                delete ret.__v;
                delete ret.password;
            }
        },
        timestamps: true
    }
);

userSchema.virtual('fullName').get(function () {
    // @ts-ignore
    return this.firstName + ' ' + this.lastName;
});

const User = mongoose.model('User', userSchema);
export default User;