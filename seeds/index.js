const mongoose=require('mongoose');
const cities=require('./cities.js');
const{places,descriptors}=require('./seedHelpers.js');
const Campground=require('../models/campground.js');

mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser:true,
    useUnifiedTopology:true    
});

const db=mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("Database connected");
});


const sample= array => array[Math.floor(Math.random()*array.length)];


const seedDb=async()=>{
    await Campground.deleteMany({});
    for(let i=0;i<300;i++){
        const random1000=Math.floor(Math.random()*1000);
        const price=Math.floor(Math.random()*20)+10;
        const camp=new Campground({
            //MY AUTHOR ID
            author:'618bf25af49bfbc9d7f84a2e',
            location:`${cities[random1000].city},${cities[random1000].state}`,
            title:`${sample(descriptors)} ${sample(places)}`,
            description:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos deserunt voluptates perferendis perspiciatis ipsa quas beatae expedita odit ut labore, assumenda adipisci repellendus dolor autem tenetur ex corrupti ea maiores!',
            price,
            geometry: {
                type:"Point",
                coordinates:[cities[random1000].longitude,cities[random1000].latitude]
            },
            images:[
                {
                //   url: 'https://res.cloudinary.com/dou8gckhw/image/upload/v1636832325/YelpCamp/xxyadp0jqydwemsr9lbd.jpg',
                //   filename: 'YelpCamp/xxyadp0jqydwemsr9lbd'
                  url:'https://res.cloudinary.com/dou8gckhw/image/upload/v1636963246/YelpCamp/ispg7gc0ec3q776r5kwk.jpg',
                  filename:'YelpCamp/ispg7gc0ec3q776r5kwk'
                }
              ]
        });
        await camp.save();
    }
}

seedDb().then(()=>{
    mongoose.connection.close();
});