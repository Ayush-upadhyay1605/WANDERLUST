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


// app.get("/testlisting", async (req, res) => {
//     let sampleListing = new listing({
//         title:"Modern la Villa",
//         description:"A modern villa with a pool",
//         price:1200,
//         location:"Bali",
//         country:"Indonesia"
//     });
//     await sampleListing.save()
//     console.log(sampleListing);
//         res.send("Successfully saved");
   
//     });


//INDEX ROUTE
app.get("/listings", async (req, res) => {
    let allListings = await listing.find();
    // console.log(allListings);
    res.render('./listings/index.ejs', {allListings});
});

//CREATE NEW ROUTE
app.get("/listings/new", (req, res) => {
    res.render('./listings/new.ejs');
});

app.post("/listings",async (req,res)=> {
    let {title,description,image,price,location,country} =req.body;
    let newlist= await new listing({
        title:title,
        description:description,
        image:image,
        price:price,
        location:location,
        country:country,
    })
    newlist.save()
    .then((data)=> {
        console.log(data);
    })
    .catch((err)=> {
        console.log(err);
    })
    res.redirect("listings")

})

// SHOW ROUTE --- INDIVIDUAL LISTING
app.get("/listings/:id", async (req, res) => {
    let {id} = req.params;
    let selectedListing= await listing.findById(id);
    console.log(selectedListing);
    res.render('./listings/show.ejs', {selectedListing});
});

//EDIT AND UPDATE ROUTE
app.get("/listings/:id/edit", async (req, res) => {
    let {id} = req.params;
    let editList= await listing.findById(id);
    console.log(editList);
    res.render('./listings/edit.ejs', {editList});
});

app.patch("/listings/:id" , async (req,res)=> {
    let {id}=req.params;
    let {title,description,image,price,location,country} =req.body;
    let updateList = await listing.findByIdAndUpdate({_id:id},{title:title},{description:description},{image:image},{price:price},{location:location},{country:country},{new:true})
    .then((data)=> {
        console.log(data);
    })
    .catch((err)=> {
        console.log(err);
    })
    
    res.redirect(`/listings/${id}`);
});

//DESTROY ROUTE
app.get("/listings/:id/delete", async (req, res) => {
    let {id} = req.params;
    let deleteList= await listing.findById(id);
    console.log(deleteList);
    res.render('./listings/delete.ejs', {deleteList});
});

app.delete("/listings/:id" ,async (req,res)=> {
    let {id}=req.params;
    let List = await listing.findByIdAndDelete({_id:id})
    .then((data)=> {
        console.log(data);
    })
    .catch((err)=> {
        console.log(err);
    })
    
    res.redirect("/listings");
});