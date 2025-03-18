const express = require('express');
const router = express.Router();


router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags ["Welcome to the Contact Page Home Route"]
    res.send('Welcome to the Contact Page Home Route');
});
router.use("/contacts", require('./contact'))

module.exports = router;