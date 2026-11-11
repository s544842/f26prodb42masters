var express = require('express');
var router = express.Router();

// Require controller modules.
var api_controller = require('../controllers/api');
var bicycle_controller = require('../controllers/bicycle');
/// API ROUTE ///
// GET resources base.
router.get('/', api_controller.api);
/// COSTUME ROUTES ///
// POST request for creating a Costume.
router.post('/bicycle', bicycle_controller.bicycle_create_post);
// DELETE request to delete Costume.
router.delete('/bicycle/:id', bicycle_controller.bicycle_delete);
// PUT request to update Costume.
router.put('/bicycle/:id', bicycle_controller.bicycle_update_put);
// GET request for one Costume.
router.get('/bicycle/:id', bicycle_controller.bicycle_detail);
// GET request for list of all Costume items.
router.get('/bicycle', bicycle_controller.bicycle_list);
module.exports = router;
