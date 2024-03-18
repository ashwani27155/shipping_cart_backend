const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const PORT = 8081;

// MongoDB connection URL
const dbURL =
	"mongodb+srv://abicashwani:vivek123@cluster0.pynjlmq.mongodb.net/";

// Create an Express application
const app = express();

// Parse JSON bodies
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// Define the directory for serving static images
const imagesDirectory = path.join(__dirname, "./public/image");
app.use("/", express.static(imagesDirectory));

// Import and set up routes
require("./routes/productRoutes")(app);
require("./routes/cart.routes")(app);

// Connect to MongoDB
mongoose
	.connect(dbURL)
	.then(() => {
		console.log("Database connected successfully");
	})
	.catch((error) => {
		console.error("Error connecting to database:", error);
	});

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
