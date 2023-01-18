const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true
    },
    password:String,
    isWholesaler: {
		type: Boolean,
		required: true
	},
	isFarmer: {
		type: Boolean,
		required: true
	},
    products: [{
        crop:String,
        price:Number,
        quantity:Number,
        category:String
    }],
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.models['User'] || mongoose.model('User', UserSchema)
