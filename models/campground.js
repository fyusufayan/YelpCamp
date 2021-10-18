const mongooes=require('mongoose');
const Schema=mongooes.Schema;

const CampgroundSchema=new Schema({
    title:String,
    image:String,
    price:Number,
    description:String,
    location:String
});


module.exports=mongooes.model('Campground',CampgroundSchema);