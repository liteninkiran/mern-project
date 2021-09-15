import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    id: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

const user = mongoose.model('User', userSchema);

export default user;

