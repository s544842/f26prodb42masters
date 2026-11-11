var Bicycle = require('../models/bicycle');

//List of all Bicycles
exports.bicycle_list = async function(req, res) {
	try{
		theBicycles = await Bicycle.find();
		res.send(theBicycles);
	}
	catch(err){
		res.status(500);
		res.send(`{"error": ${err}}`);
	}
};

//For a specific Bicycle
exports.bicycle_detail = function(req, res) {
	res.send('NOT IMPLEMENTED: Bicycle detail: ' + req.params.id);
};

//Handle Bicycle create on POST
exports.bicycle_create_post = function(req, res) {
	res.send('NOT IMPLEMENTED: Bicycle create on POST');
};

//Handle Bicycle delete from on DELETE
exports.bicycle_delete = function(req, res) {
	res.send('NOT IMPLEMENTED: Bicycle delete DELETE ' + req.params.id);
};

//Handle Bicycle update form on PUT
exports.bicycle_update_put = function(req, res) {
	res.send('NOT IMPLEMENTED: Bicycle update PUT ' + req.params.id);
};

//show all view
exports.bicycle_view_all_page = async function(req, res) {
	try{
		theBicycles = await Bicycle.find();
		res.render('bicycle', {title: 'Bicycle Search Results', results: theBicycles});
	}
	catch(err){
		res.status(500);
		res.send(`{"error":${err}}`);
	}
};
