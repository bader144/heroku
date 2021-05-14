const mogoose = require('mongoose');

const {Schema} = mogoose;

const userSchema = Schema({
    firstname: { type : String, required : true },
    lastName: { type : String, required : true },
    email: { type : String, required : true  },
    userID: { type : String, required : true, index : true,  unique : true},
    city: { type : String},
    state: { type : String },
    zip: { type : String},
    phoneNumber: { type : String},
    textInput: { type : String},
    date: {type : Date, default: Date.now}
});

const User = mogoose.model('User', userSchema);

module.exports = User;
