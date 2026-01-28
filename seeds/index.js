const mongoose= require('mongoose');
const cities=require('./cities');
const { places, descriptors } = require('./seedHelper');
const campground=require('../model/campground');

mongoose.connect('mongodb://localhost:27017/camp-ground');
const db=mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("Database Connected!");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seed= async ()=>{
    await campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: `https://picsum.photos/400?random=${Math.random()}`,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui repellendus soluta ad, blanditiis necessitatibus quas pariatur! Dignissimos inventore sapiente veritatis sit, repudiandae laboriosam, alias sequi fugiat necessitatibus ab dolores quidem."
        })
        await camp.save();
    }
}

seed().then(() => {
    mongoose.connection.close();
})