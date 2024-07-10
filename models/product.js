import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: "String",
    required: [true, "please provide product name"],
  },
  description: {
    type: "String",
    required: [true, "please provide product description"],
  },
  price:{
    type:Number,
    required: [true, "please provide product description"],
  },
  date:
  {
    type:Date,
    default:Date.now
  }

});

export default mongoose.model("product", ProductSchema);
