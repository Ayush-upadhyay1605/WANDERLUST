const mongoose = require('mongoose');
const data = require('./data.js');
const listing = require('../models/listing.js');

main()
.then(() => {console.log('Connected to MongoDB')})
.catch((err) => {console.log(err) });

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust'); // database name: wanderlust
}




const initdb = async () => {
    await listing.deleteMany({});
    await listing.insertMany([data]);
    console.log("Data has been added to the database");
    };

    initdb();