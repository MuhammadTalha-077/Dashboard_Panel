const router = require('express').Router();
const orderController = require('../controllers/orderController');
const { protect, admin } = require('../middleware/auth');

router.post('/', protect, orderController.createOrder);
router.get('/', protect, admin, orderController.listOrders);
router.get('/:id', protect, orderController.getOrder);
router.put('/:id', protect, admin, orderController.updateOrder);

module.exports = router;
