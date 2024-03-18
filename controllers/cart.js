const Cart = require("../models/addtocart");

//Api for add product into cart
exports.addToCart = async (req, res) => {
	const { productId, quantity } = req.body;
	console.log("req.body", req.body);
	try {

		//check if product is already in cart
		const isPrsent = await Cart.findOne({
			productId: productId,
		});

		if (isPrsent) {
			return res.status(200).send({
				message: "Product already in cart ",
				iscart: true,
			});
		}

		// cart object that is go inside database
		const DataToBeStoredInDB = {
			productId: req.body.productId,
			userId: req.body.userId,
			quantity: req.body.quantity,
		};
		const cart = new Cart(DataToBeStoredInDB);

		cart.save();//save the data into data base
		res.status(200).send({ message: "Product added into cart Successfully" });
	} catch (error) {
		console.log(error);
		res
			.status(404)
			.send({ message: "Some thing went wrong while adding product in cart" });
	}
};

//Api for increase cart Quantity
exports.increaseCartQuantity = async (req, res) => {
	try {
		const cartData = await Cart.findById({ _id: req.body._id });
		//update the database with increased cart quantity
		const increasedData = await Cart.findByIdAndUpdate(
			{ _id: req.body._id },
			{ $inc: { quantity: req.body.quantity } },
			{ new: true }
		);
		res
			.status(200)
			.send({ message: "Cart quantity is Increased successfully" });
	} catch (error) {
		console.log(error);
		res
			.status(400)
			.send({ message: "Something went wrong while updating cart" });
	}
};

//Api for decrease cart quantity
exports.decreaseCartQuantity = async (req, res) => {
	try {

		//condition check for decrease cart quantity is not greater then available cart quantity
		const cartData = await Cart.findById({ _id: req.body._id });
		if (req.body.quantity > cartData.quantity) {
			return res.status(400).send({
				message: "Some thing went wrong while decrease cart quantity",
			});
		}
		//Update cart quantity
		const decreasedData = await Cart.findByIdAndUpdate(
			{ _id: req.body._id },
			{ $inc: { quantity: -req.body.quantity } },
			{ new: true }
		);
		res
			.status(200)
			.send({ message: "Cart quantity is Decreased successfully" });
	} catch (error) {
		console.log(error);
		res
			.status(400)
			.send({ message: "Something went wrong while updating cart" });
	}
};


//Api for get the cart quantity
exports.getCart = async (req, res) => {
	try {

		//Aggregation for getting product data and cart data
		const cartData = await Cart.aggregate([
			{
				$lookup: {
					from: "products",
					let: { productId: "$productId" }, // Fix: Use ":" instead of ","
					pipeline: [
						{
							$match: {
								$expr: { $eq: ["$_id", "$$productId"] }, // Fix: Use "," instead of ":"
							},
						},
						{
							$project: {
								productName: 1,
								image: 1,
								price: 1,
								description: 1,
							},
						},
					],
					as: "result",
				},
			},
			{
				$unwind: {
					path: "$result",
				},
			},
			{
				$project: {
					data: "$result",
					quantity: 1,
					productId: 1,
				},
			},
		]);

		//Calculate the total cart quantity
		let sum = 0;
		cartData.forEach((item) => {
			sum += item.quantity;
		});

		const cartDataWithTotalQuantity = cartData.map((item) => {
			return { ...item, totalQuantity: sum };
		});

		res.status(200).send({
			message: "Cart get successfully",
			data: { cartDataWithTotalQuantity },
		});
	} catch (error) {
		console.log(error);
		res
			.status(400)
			.send({ message: "Something went wrong while getting cart" });
	}
};


//Api for deleteing all cart qunatity
exports.clearCart = async (req, res) => {
	try {
		const cartData = await Cart.deleteMany({});

		res.status(200).send({ message: "Cart deleted successfully" });
	} catch (error) {
		console.log(error);
		res
			.status(400)
			.send({ message: "Something went wrong while updating cart" });
	}
};
