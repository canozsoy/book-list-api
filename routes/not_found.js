const express = require('express');

const router = express.Router();

router.all('/', (req, res) => {
    res.sendStatus(404);
});

module.exports = router;
