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
exports.bicycle_detail = async function(req, res) {
	console.log("detail " + req.params.id);
	try{
		result = await Bicycle.findById(req.params.id);
		res.send(result);
	} catch(error) {
		res.status(500);
		res.send(`{"error": document for id ${req.params.id} not found`);
	}
};

//Handle Bicycle create on POST
exports.bicycle_create_post = async function(req, res) {
	console.log(req.body)
	let document = new Bicycle();
	document.wheels = req.body.wheels;
	document.color = req.body.color;
	document.brand = req.body.brand;
	try{
		let result = await document.save();
		res.send(result);
	}
	catch(err){
		res.status(500);
		res.send(`{"error": ${err}}`);
	}
};

//Handle Bicycle delete from on DELETE
exports.bicycle_delete = async function(req, res) {
	console.log("DELETE " + req.params.id);
	try{
		result = await Bicycle.findByIdAndDelete(req.params.id);
		console.log("Removed " + result + " successfully");
		res.send(result);
	} catch(err){
		res.status(500);
		res.send(`{"error": Error deleting ${err}}`);
	}
};

//Handle Bicycle update form on PUT
exports.bicycle_update_put = async function(req, res) {
	console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`);
	try{
		let toUpdate = await Bicycle.findById(req.params.id);
		if(req.body.wheels)
			toUpdate.wheels = req.body.wheels;
		if(req.body.color)
			toUpdate.color = req.body.color;
		if(req.body.brand)
			toUpdate.brand = req.body.brand;
		let result = await toUpdate.save();
		console.log("Success " + result);
		res.send(result);
	} catch(err){
		res.status(500);
		res.send(`{"error": ${err}: Update for id ${req.params.id} failed`);
	}
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

//handle show one view with iq specified by query
exports.bicycle_view_one_page = async function(req, res) {
	console.log("single view for id " + req.query.id);
	try{
		result = await Bicycle.findById(req.query.id);
		res.render('bicycledetail',
			{ title: 'Bicycle Detail', toShow: result });
	} 
	catch(err){
		res.status(500);
		res.send(`{'error': '${err}'}`);
	}
};

//handle building view for creating bicycle
exports.bicycle_create_page = function(req, res) {
	console.log("create view");
	try{
		res.render('bicyclecreate', {title: 'Bicycle Create'});
	}
	catch(err){
		res.status(500);
		res.send(`{'error': '${err}'}`);
	}
};

//handle building view for updating bicycle
//query provides id
exports.bicycle_update_page = async function(req, res) {
	console.log("update view for item " + req.query.id);
	try{
		let result = await Bicycle.findById(req.query.id);
		res.render('bicycleupdate', {title: 'Bicycle Update', toShow:result});
	}
	catch(err){
		res.status(500);
		res.send(`{'error': '${err}'}`);
	}
};
