const express = require('express');
const { validateJWT } = require('../controllers/strategies/jwt');

const router = express.Router();
router.use(validateJWT);

router.get('/', (req, res) => {
    res.sendStatus(200);
});

module.exports = router;
