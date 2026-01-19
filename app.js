const express= require('express');
const path=require('path');
const mongoose= require('mongoose');
const camp=require('./model/campground');

mongoose.connect('mongodb://localhost:27017/camp-ground');

const db=mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("Database Connected!");
});

const app=express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded({ extended: true }));

app.get('/home', (req,res)=>{
    res.render('home')
})

app.get('/campgrounds', async (req,res)=>{
    const campgrounds = await camp.find({});
    res.render('campgrounds/index', {campgrounds});
})

app.post('/campgrounds',async (req,res)=>{
    const campground= new camp(req.body);
    await campground.save();
    res.redirect('/campgrounds')
});

app.get('/campgrounds/new', async(req,res) =>{
    res.render('campgrounds/new');
});

app.get('/campgrounds/:id', async (req,res)=> {
    const campground= await camp.findById(req.params.id);
    res.render('campgrounds/show',{campground});
})

app.get('/', (req, res)=>{
    res.send("Hello Camp Ground");
})

app.listen(3000,()=> {
    console.log("Serving on port 3000!");
})