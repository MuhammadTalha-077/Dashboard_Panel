const router = require('express').Router();
const { summary } = require('../controllers/statsController');
const { protect, admin } = require('../middleware/auth');

router.get('/summary', protect, admin, summary);

module.exports = router;
