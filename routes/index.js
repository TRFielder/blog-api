const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => res.send('Nothing useful at this route\n'));

module.exports = router;
