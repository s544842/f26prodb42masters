var express = require('express');
const bicycle_controllers = require('../controllers/bicycle');
var router = express.Router();
var passport = require('passport');

const secured = (req, res, next) => {
	if(req.user)
		return next();
	res.send(`
		<script>
			alert('AUTHENTICATION FAILURE: Please login with valid credentials.');
			window.location.href = '/login';
		</script>
	`);
}
/* GET home page. */
router.get('/', bicycle_controllers.bicycle_view_all_page);

/* GET detail bicycle page */
router.get('/detail', bicycle_controllers.bicycle_view_one_page);

/* GET create bicycle page */
router.get('/create', bicycle_controllers.bicycle_create_page);

/* GET create update page */
router.get('/update', secured, bicycle_controllers.bicycle_update_page);
router.post('/login', passport.authenticate('local'), function(req, res) {
	res.redirect('/');
});

/* GET delete costume page */
router.get('/delete', bicycle_controllers.bicycle_delete_page);

module.exports = router;
