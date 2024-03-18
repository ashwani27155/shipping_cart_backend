const mongoose = require("mongoose");
//Database Schema for cart data
const addToCartSchema = new mongoose.Schema(
	{
		productId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
		},
		quantity: {
			type: Number,
			default: 1,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("cart", addToCartSchema);
