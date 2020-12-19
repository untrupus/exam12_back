const mongoose = require("mongoose");
const idValidator = require("mongoose-id-validator");

const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectID,
        ref: "User",
        required: true
    }
});

PhotoSchema.plugin(idValidator);
const Photo = mongoose.model("Photo", PhotoSchema);
module.exports = Photo;