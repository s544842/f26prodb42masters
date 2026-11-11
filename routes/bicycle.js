var express = require('express');
const bicycle_controllers = require('../controllers/bicycle');
var router = express.Router();

/* GET home page. */
router.get('/', bicycle_controllers.bicycle_view_all_page);

module.exports = router;
