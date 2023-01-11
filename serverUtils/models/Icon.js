import mongoose from "mongoose";

const Schema = mongoose.Schema

const IconSchema = new Schema({
    icon: {type: String},
    user: {type: mongoose.SchemaTypes.ObjectId, ref: 'User'},
})

const Icon = mongoose.models.Icon || mongoose.model('Icon', IconSchema)

export default Icon