var express = require('express');
const bicycle_controllers = require('../controllers/bicycle');
var router = express.Router();

/* GET home page. */
router.get('/', bicycle_controllers.bicycle_view_all_page);

/* GET detail bicycle page */
router.get('/detail', bicycle_controllers.bicycle_view_one_page);

/* GET create bicycle page */
router.get('/create', bicycle_controllers.bicycle_create_page);

/* GET create update page */
router.get('/update', bicycle_controllers.bicycle_update_page);

module.exports = router;
