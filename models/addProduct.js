const { Schema, model } = require("mongoose");
//Database Schema for add product
const ProductData = Schema(
	{
		productName: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		description: {
			type: String,
		},
		image: {
			type: String,
		},
	},
	{ timeStamps: true }
);
module.exports = model("product", ProductData);
