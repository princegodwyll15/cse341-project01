const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to the Home Route');
});
router.use("/contacts", require('./contact'))

module.exports = router;