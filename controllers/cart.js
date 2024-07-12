import cart from "../models/cart.js";
import Cart from "../models/cart.js";
import product from "../models/product.js";
export const getCart = async (req, res) => {
  try {
    const cartitems = await Cart.findOne({ user: req.params.userid });
    if (!cartitems)
      return res.status(404).json({
        message: "cart not found",
      });
    res.json(cartitems);
  } catch (e) {
    res.status(400).json({
      success: false,
      error: e,
    });
  }
};

export const addToCart = async (req, res) => {
  const { productId } = req.body;
  try {
    let cartitems = await Cart.findOne({ user: req.params.userid });

    const productIndex = cartitems.products.findIndex(
      (p) => p.product.toString() == productId
    );
    if (productId != -1) {
      cartitems.products[productIndex].quantity += 1;
    } else {
      cartitems.products.push({ product: productId, quantity: 1 });
    }
    await cartitems.save();
    const updatedCart = await cartitems
      .populate("products.product")
      .execPopulate();
    res.status(201).json(updatedCart);
  } catch (e) {
    res.status(500).json({
      success: false,
      error: e.message,
    });
  }
};

export const deleteCart = async (req, res) => {
  const { productId } = req.body;
  try {
    let cartItems = await Cart.findOne({ user: req.params.userid });
    if (!cartItems)
      return res.status(200).json({
        success: false,
        cart: "cart not found",
      });
    cartItems.products = cartItems.products.filter(
      (p) => p.product.toString() != productId
    );
    await cartItems.save();
    const updatedCart = cartItems.populate("products.product").execPopulate();

    res.status(200).json(updatedCart);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const resetCart = async (req, res) => {
  const { userid, productId } = req.body;
  try {
    let cartItems = await Cart.findOne({ user: userid });
    cartItems.products = [];
    await cartItems.save();
    res.status(200).json(cartItems);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
