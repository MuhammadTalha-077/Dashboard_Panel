const router = require('express').Router();
const productController = require('../controllers/productController');
const { protect, admin } = require('../middleware/auth');

router.get('/', productController.listProducts);
router.get('/:id', productController.getProduct);

// admin CRUD
router.post('/', protect, admin, productController.createProduct);
router.put('/:id', protect, admin, productController.updateProduct);
router.delete('/:id', protect, admin, productController.deleteProduct);

module.exports = router;
