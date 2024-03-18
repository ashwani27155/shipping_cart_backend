const mondooge = require("mongoose");
const Product = require("../models/addProduct");

//Api for add product
exports.addProduct = async (req, res) => {
	
	try {
		const ProductDataToBeStoredInDB = {
			productName: req.body.productName,
			price: req.body.price,
			description: req.body.description,
			image: req.file ? req.file.filename : null,
		};
		const product = await new Product(ProductDataToBeStoredInDB);
		const productData = product.save();
		res
			.status(200)
			.send({ message: "Product added successfully", data: product });
	} catch (error) {
		console.log(error);
		res.status(400).send({
			message: "Something went wrong while adding data into db",
			error: error,
		});
	}
};

//Api for get the list of product
exports.listProduct = async (req, res) => {
	try {
		const product = await Product.find({});

		res
			.status(200)
			.send({ message: "Product fetched successfully", data: product });
	} catch (error) {
		console.log(error);
		res.status(400).send({
			message: "Something went wrong while fetching product data into db",
			error: error,
		});
	}
};

// Api for get the product by its id
exports.get_Product_Id = async (req, res) => {
	try {
		const { id } = req.query;
		const product = await Product.findById({ _id: id });

		res
			.status(200)
			.send({ message: "Product fetched successfully", data: product });
	} catch (error) {
		console.log(error);
		res.status(400).send({
			message: "Something went wrong while fetching product data into db",
			error: error,
		});
	}
};
