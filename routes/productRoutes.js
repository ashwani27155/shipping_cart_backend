const Product = require("../controllers/addProduct");
const multer = require("multer");
const path = require("path");

// Multer storage configuration
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		// Set the destination folder for storing uploaded images
		cb(null, path.join(__dirname, "../public/image"));
	},
	filename: function (req, file, cb) {
		// Set the filename for the uploaded image (appending current timestamp)
		cb(null, Date.now() + "-" + file.originalname);
	},
});

// Initialize multer upload middleware with the defined storage configuration
const upload = multer({ storage: storage });

module.exports = (app) => {
	// Route for adding a product with image upload
	app.post("/addProduct", upload.single("image"), Product.addProduct);

	// Route for listing all products
	app.get("/listProduct", Product.listProduct);

	// Route for fetching a product by ID
	app.get("/get_Product_Id", Product.get_Product_Id);
};
