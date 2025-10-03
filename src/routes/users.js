const router = require('express').Router();
const userController = require('../controllers/userController');
const { protect, admin, superadmin } = require('../middleware/auth');

router.get('/', protect, admin, userController.listUsers);
router.get('/:id', protect, admin, userController.getUser);
router.delete('/:id', protect, admin, userController.deleteUser);
// only superadmin can change roles
router.put('/:id/role', protect, superadmin, userController.updateUserRole);

module.exports = router;
