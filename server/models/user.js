let mongoose = require("mongoose");
let uniqueValidator = require('mongoose-unique-validator')
const usersSchema = mongoose.Schema({
    username: {type: String, unique: true},
    email: {type: String, unique: true},
    password: {type: String},
    points: {type: Number, default: 0},
}, {timestamp: true})
usersSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });
mongoose.model("user", usersSchema)

