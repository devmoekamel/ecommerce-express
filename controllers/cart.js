import Cart from "../models/cart.js";
export const getCart = async (req, res) => {
  try {
    const cartitems = await Cart.findOne({ user: req.userid });
    if (!cartitems) return res.status(200).json({});
    res.status(200).json({ cart: [] });
  } catch (e) {
    res.status(400).json({
      success: false,
      error: e,
    });
  }
};

export const addToCart = async (req, res) => {
  const { productid } = req.body;

  try {
    let cart = await Cart.findOne({ user: req.userid });

    if (cart) {
      // If cart exists, initialize products array if it does not exist

      const productIndex = cart.products.findIndex(
        (p) => p.product && p.product.toString() === productid
      );

      if (productIndex != -1) {
        // If product already in cart, increase quantity
        cart.products[productIndex].quantity += 1;
      } else {
        // If product not in cart, add it
        cart.products.push({ product: productid, quantity: 1 });
      }
    } else {
      // If cart does not exist, create new cart
      cart = new Cart({
        user: req.userid,
        products: [{ product: productid, quantity: 1 }],
      });
    }

    // Save the cart
    const savedCart = await cart.save();

    // Populate product details
    const updatedCart = await Cart.findById(savedCart._id).populate(
      "products.product"
    );

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
    let cartItems = await Cart.findOne({ user: req.userid });
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
  // const { productId } = req.body;
  try {
    let cartItems = await Cart.findOne({ user: req.userid });
    if (!cartItems)
      return res.status(200).json({
        cart: [],
      });
    cartItems.products = [];
    await cartItems.save();
    return res.status(200).json({ cart: cartItems.products });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
