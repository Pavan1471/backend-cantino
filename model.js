const mongoose = require("mongoose")


const FoodItems  = new mongoose.Schema({
   
    name:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    quantity:{
        type:String,
        required:true,
    },


});

const CartItemSchema = new mongoose.Schema({
    foodItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FoodItem',  // Reference to the FoodItem model/schema
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1, 
        min: 1,
    },
});


module.exports = {
    FoodItems: mongoose.model('FoodItems', FoodItems)
};