const express = require('express');
const app = express();
const port = 8080;
const path = require('path');

const listing = require("./models/listing.js");

const mongoose = require('mongoose');
main()
.then(() => {console.log('Connected to MongoDB')})
.catch((err) => {console.log(err) });

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust'); // database name: wanderlust
}

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {    
    console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
    console.log("Working with GET request");
    res.send('Hello World');
});

app.get("/testlisting", async (req, res) => {
    let sampleListing = new listing({
        title:"Modern la Villa",
        description:"A modern villa with a pool",
        price:1200,
        location:"Bali",
        country:"Indonesia"
    });
    await sampleListing.save()
    console.log("samplelisting has been saved");
        res.send("Successfully saved");
   
    });