import product from "../models/product.js";
export const getAllProducts = async (req, res) => {
  try {
    const Products = await product.find();
    res.status(200).json({
      success: true,
      products: Products,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      success: false,
      error: e,
    });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const Product = await product.findById(req.params.id);
    if (!Product) {
      return res.status(400).json({
        success: false,
        product: "no product with That id",
      });
    }

    res.status(200).json({
      success: true,
      product: Product,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      error: e,
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const Product = await product.create(req.body);

    res.status(201).json({
      success: true,
      product: Product,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      error: e,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const oldProduct = await product.findById(req.params.id);
    if (!oldProduct) {
      return res.status(400).json({
        success: false,
        product: "no product with That id",
      });
    }

    const Product = await product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      product: Product,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      error: e,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const Product = await product.findById(req.params.id);
    if (!Product) {
      return res.status(400).json({
        success: false,
        product: "no product with That id",
      });
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      product: "product deleted",
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      error: e,
    });
  }
};
