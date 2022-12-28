import mongoose from "mongoose";

const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {type: String, trim: true},
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
    },
    country: {type: String},
    password: {type: String, required: true, trim: true},
    createdAt: {type: Date, default: () => Date.now(), immutable: true},
    updatedAt: {type: Date, default: () => Date.now()},
    settings: {
        darkmode: {type: Boolean, default: false},
        themecolor: {
            type: String,
            enum: [
                'default', 'dark', 'green', 'blue', 'mustard', 'violet'
            ],
            default: 'default'
        }
    },
    image: {type: String, default: ''}
})

const User = mongoose.models.User || mongoose.model('User', UserSchema)

export default User