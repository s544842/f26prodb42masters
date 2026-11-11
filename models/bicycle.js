const mongoose = require("mongoose")
const bicycleSchema = mongoose.Schema({
	wheels: Number,
	color: String,
	brand: String
})

module.exports = mongoose.model("Bicycle", bicycleSchema)
