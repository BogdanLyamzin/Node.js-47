const {Schema, model} = require("mongoose");
const Joi = require("joi");

const {handleSaveErrors} = require("../helpers")

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        match: emailRegexp,
        required: true,
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
    }
}, {versionKey: false, timestamps: true});

userSchema.post("save", handleSaveErrors);

const User = model("user", userSchema);

const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

const schemas = {
    registerSchema,
    loginSchema,
}

module.exports = {
    User,
    schemas,
}


