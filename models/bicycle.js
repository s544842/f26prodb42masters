const mongoose = require("mongoose")
const bicycleSchema = mongoose.Schema({
	wheels: {
		type: Number,
		required: true,
		max: 2},
	color: {
		type: String,
		required: true,
		minLength: 3},
	brand: String
})

module.exports = mongoose.model("Bicycle", bicycleSchema)
