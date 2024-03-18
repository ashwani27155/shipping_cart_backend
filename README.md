# Local Development Setup Guide

Follow these steps to set up the project locally on your machine:

## Step 1: Open a Text Editor

Open any text editor like Visual Studio Code for an enhanced development experience.

## Step 2: Install Dependencies

Navigate to the project directory and run the following command to install all project dependencies:

```cmd
npm install

Step 3: Start the Development Server

Once all dependencies are installed, start the development server by running:
npm start

# Backend API Overview

The backend of the application provides several APIs to manage product listings, shopping cart functionalities, and product details retrieval.

## Product Listing

- **Endpoint**: `/productslist`
- **Method**: GET
- **Description**: Retrieves a list of all available products.
- **Usage**: Use this endpoint to fetch all products available in the inventory.

## Add to Cart

- **Endpoint**: `/addtocart`
- **Method**: POST
- **Description**: Adds a product to the user's shopping cart.
- **Parameters**: 
  - `productId`: ID of the product to be added.
  - `quantity`: Quantity of the product to add to the cart.
- **Usage**: Send a POST request with product ID and desired quantity to add the product to the cart.

## Clear Cart

- **Endpoint**: `/clearcart`
- **Method**: delete
- **Description**: Clears all items from the user's shopping cart.
- **Usage**: Send a POST request to clear all items from the cart.

## Increase Cart Quantity

- **Endpoint**: `/increasecartqunatity`
- **Method**: POST
- **Description**: Increases the quantity of a product in the user's shopping cart.
- **Parameters**: 
  - `productId`: ID of the product to increase quantity.
- **Usage**: Send a POST request with product ID to increase the quantity of the specified product in the cart.

## Decrease Cart Quantity

- **Endpoint**: `/decreasecartquantity`
- **Method**: POST
- **Description**: Decreases the quantity of a product in the user's shopping cart.
- **Parameters**: 
  - `productId`: ID of the product to decrease quantity.
- **Usage**: Send a POST request with product ID to decrease the quantity of the specified product in the cart.

## Get Product by ID

- **Endpoint**: `/single_product/:id`
- **Method**: GET
- **Description**: Retrieves details of a specific product by its ID.
- **Parameters**: 
  - `id`: ID of the product to retrieve details.
- **Usage**: Use this endpoint to fetch details of a specific product by its ID.

