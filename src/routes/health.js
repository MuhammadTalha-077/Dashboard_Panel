const router = require('express').Router();
const { healthJson, statusPreview } = require('../controllers/healthController');

router.get('/', healthJson);
router.get('/preview', statusPreview);

module.exports = router;
