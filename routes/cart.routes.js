const Cart = require("../controllers/cart");

module.exports = (app) => {
	// Route for adding a product to the cart
	app.post("/addToCart", Cart.addToCart);

	// Route for increasing the quantity of a product in the cart
	app.post("/increaseCartQnt", Cart.increaseCartQuantity);

	// Route for decreasing the quantity of a product in the cart
	app.post("/decreaseCartQnt", Cart.decreaseCartQuantity);

	// Route for getting the contents of the cart
	app.get("/getCart", Cart.getCart);

	// Route for clearing the cart
	app.delete("/clearCart", Cart.clearCart);
};
