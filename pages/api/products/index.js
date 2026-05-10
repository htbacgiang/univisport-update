import db from "../../../utils/db";
import Products from "../../../models/Product";

const handler = async (req, res) => {
  try {
    await db.connectDb();
  } catch (error) {
    console.error('Database connection error:', error);
    return res.status(500).json({ err: 'Database connection failed' });
  }

  switch (req.method) {
    case "GET":
      if (req.query.id) {
        await getProductById(req, res);
      } else if (req.query.maxId) {
        await getMaxId(req, res);
      } else {
        await getProducts(req, res);
      }
      break;
    case "POST":
      if (req.body.action === 'checkSlug') {
        await checkSlug(req, res);
      } else {
        await createProduct(req, res);
      }
      break;
    case "PUT":
      await updateProduct(req, res);
      break;
    case "DELETE":
      await deleteProduct(req, res);
      break;
    default:
      res.status(405).json({ err: "Method not allowed" });
      break;
  }
};

export default handler;

const getProducts = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const products = await Products.find(filter);
    res.json({
      status: "success",
      result: products.length,
      products,
    });
  } catch (err) {
    console.error('Error fetching products:', err);
    return res.status(500).json({ err: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.query;
    // Try to find by numeric id first, then by MongoDB _id
    let product = await Products.findOne({ id: parseInt(id) });
    if (!product) {
      product = await Products.findById(id);
    }
    if (!product) {
      return res.status(404).json({ err: "Product not found" });
    }
    res.json({
      status: "success",
      product,
    });
  } catch (err) {
    console.error('Error fetching product by ID:', err);
    return res.status(500).json({ err: err.message });
  }
};

const getMaxId = async (req, res) => {
  try {
    const maxIdProduct = await Products.findOne().sort({ id: -1 }).select('id');
    const maxId = maxIdProduct ? maxIdProduct.id : 0;
    res.json({
      status: "success",
      maxId,
    });
  } catch (err) {
    console.error('Error fetching max ID:', err);
    return res.status(500).json({ err: err.message });
  }
};

const checkSlug = async (req, res) => {
  try {
    const { slug, id } = req.body;
    if (!slug) return res.status(400).json({ err: 'Slug is required' });

    let query = { slug };
    
    if (id) {
      // Handle both numeric id and MongoDB _id for exclusion
      const numericId = parseInt(id);
      if (!isNaN(numericId)) {
        query.id = { $ne: numericId };
      } else {
        query._id = { $ne: id };
      }
    }
    
    const existingProduct = await Products.findOne(query);
    if (existingProduct) {
      return res.status(200).json({ status: 'error', message: 'Slug đã tồn tại' });
    }
    res.json({ status: 'success' });
  } catch (err) {
    console.error('Error checking slug:', err);
    return res.status(500).json({ err: err.message });
  }
};

const createProduct = async (req, res) => {
  const session = await Products.startSession();
  try {
    session.startTransaction();
    
    // Generate a new unique id
    const maxIdProduct = await Products.findOne().sort({ id: -1 }).select('id').session(session);
    const newId = (maxIdProduct ? maxIdProduct.id : 0) + 1;
    
    // Check if the id already exists (extra safety)
    const existingProductById = await Products.findOne({ id: newId }).session(session);
    if (existingProductById) {
      await session.abortTransaction();
      return res.status(400).json({ err: 'Mã sản phẩm (ID) đã tồn tại' });
    }
    
    // Check if maSanPham already exists
    const { maSanPham } = req.body;
    const existingProductByMaSanPham = await Products.findOne({ maSanPham }).session(session);
    if (existingProductByMaSanPham) {
      await session.abortTransaction();
      return res.status(400).json({ err: 'Mã sản phẩm (maSanPham) đã tồn tại' });
    }
    
    const productData = { ...req.body, id: newId };
    // Normalize gallery: ensure width/height are numbers, fallback from aspectRatio
    if (productData.gallery && Array.isArray(productData.gallery)) {
      productData.gallery = productData.gallery
        .filter(item => item && item.src && item.src.trim() !== '')
        .map(item => {
          const aspectRatio = item.aspectRatio || 'landscape-3-4';
          const widthMap = { square: 1, portrait: 3, 'landscape-3-4': 4, landscape: 4 };
          const heightMap = { square: 1, portrait: 4, 'landscape-3-4': 3, landscape: 3 };
          const wNum = Number(item.width);
          const hNum = Number(item.height);
          return {
            src: item.src.trim(),
            aspectRatio,
            width: (!isNaN(wNum) && wNum > 0) ? wNum : widthMap[aspectRatio] || 16,
            height: (!isNaN(hNum) && hNum > 0) ? hNum : heightMap[aspectRatio] || 9,
          };
        });
    }
    console.log('Creating product with gallery items:', productData.gallery?.length || 0);
    const product = new Products(productData);
    await product.save({ session });
    
    await session.commitTransaction();
    
    res.json({
      status: "success",
      product,
    });
  } catch (err) {
    await session.abortTransaction();
    console.error('Error creating product:', err);
    if (err.code === 11000) {
      if (err.keyPattern.id) {
        return res.status(400).json({ err: 'Mã sản phẩm (ID) đã tồn tại, vui lòng thử lại' });
      }
      if (err.keyPattern.maSanPham) {
        return res.status(400).json({ err: 'Mã sản phẩm (maSanPham) đã tồn tại, vui lòng thử lại' });
      }
      if (err.keyPattern.slug) {
        return res.status(400).json({ err: 'Slug đã tồn tại, vui lòng thử lại' });
      }
    }
    return res.status(500).json({ err: err.message });
  } finally {
    session.endSession();
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id, maSanPham } = req.body;
    const queryId = req.query.id;
    
    // Find the existing product by numeric id or MongoDB _id
    let existingProduct = await Products.findOne({ id: parseInt(queryId) });
    if (!existingProduct) {
      existingProduct = await Products.findById(queryId);
    }
    if (!existingProduct) {
      return res.status(404).json({ err: "Product not found" });
    }
    
    // Check if the id is being changed to an existing one
    if (id && id !== existingProduct.id) {
      const existingProductById = await Products.findOne({ id, _id: { $ne: existingProduct._id } });
      if (existingProductById) {
        return res.status(400).json({ err: 'Mã sản phẩm (ID) đã tồn tại' });
      }
    }
    
    // Check if maSanPham is being changed to an existing one
    if (maSanPham && maSanPham !== existingProduct.maSanPham) {
      const existingProductByMaSanPham = await Products.findOne({ maSanPham, _id: { $ne: existingProduct._id } });
      if (existingProductByMaSanPham) {
        return res.status(400).json({ err: 'Mã sản phẩm (maSanPham) đã tồn tại' });
      }
    }
    
    // Normalize gallery before update
    if (req.body.gallery && Array.isArray(req.body.gallery)) {
      req.body.gallery = req.body.gallery
        .filter(item => item && item.src && item.src.trim() !== '')
        .map(item => {
          const aspectRatio = item.aspectRatio || 'landscape-3-4';
          const widthMap = { square: 1, portrait: 3, 'landscape-3-4': 4, landscape: 4 };
          const heightMap = { square: 1, portrait: 4, 'landscape-3-4': 3, landscape: 3 };
          const wNum = Number(item.width);
          const hNum = Number(item.height);
          return {
            src: item.src.trim(),
            aspectRatio,
            width: (!isNaN(wNum) && wNum > 0) ? wNum : widthMap[aspectRatio] || 16,
            height: (!isNaN(hNum) && hNum > 0) ? hNum : heightMap[aspectRatio] || 9,
          };
        });
    }
    console.log('Updating product gallery items:', req.body.gallery?.length || 0);
    const product = await Products.findByIdAndUpdate(existingProduct._id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return res.status(404).json({ err: "Product not found" });
    }
    
    res.json({
      status: "success",
      product,
    });
  } catch (err) {
    console.error('Error updating product:', err);
    if (err.code === 11000) {
      if (err.keyPattern.id) {
        return res.status(400).json({ err: 'Mã sản phẩm (ID) đã tồn tại, vui lòng thử lại' });
      }
      if (err.keyPattern.maSanPham) {
        return res.status(400).json({ err: 'Mã sản phẩm (maSanPham) đã tồn tại, vui lòng thử lại' });
      }
      if (err.keyPattern.slug) {
        return res.status(400).json({ err: 'Slug đã tồn tại, vui lòng thử lại' });
      }
    }
    return res.status(500).json({ err: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.query;
    
    // Try to find by numeric id first, then by MongoDB _id
    let product = await Products.findOne({ id: parseInt(id) });
    if (!product) {
      product = await Products.findById(id);
    }
    
    if (!product) {
      return res.status(404).json({ err: "Product not found" });
    }
    
    // Delete the product using its MongoDB _id
    await Products.findByIdAndDelete(product._id);
    
    res.json({
      status: "success",
      message: "Product deleted",
    });
  } catch (err) {
    console.error('Error deleting product:', err);
    return res.status(500).json({ err: err.message });
  }
};