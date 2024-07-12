import mongoose from "mongoose";

const cartschema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.default("cart", cartschema);
