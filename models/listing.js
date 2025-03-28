const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const listingSchema = new Schema({
    title :String,
    description:String,
    image : {
        type:String,
        default:"https://media.istockphoto.com/id/1899616788/photo/modern-villa.jpg?s=1024x1024&w=is&k=20&c=JA0SFZTiSYg9AuPttrfutZGbysQW8Sd41x-_8Xt11lU=",
    },
    price :Number,
    location : String,
    country : String,
       

});

const listing= mongoose.model('listing', listingSchema);
module.exports = listing;