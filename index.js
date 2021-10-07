"use strict";

const service = require("./service.js");

exports.getAllProducts = async (event) => {
	const products = await service.getAllProducts();

	return {
		statusCode: 200,
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(products, null, 2),
	};
};

exports.addProduct = async (event) => {
	let product = JSON.parse(event.body);

	await service.addProduct(product);
	return {
		statusCode: 201,
		body: JSON.stringify("product has been added", null, 2),
	};
};

exports.getProduct = async (event) => {
	const id = event.pathParameters.id;

	const product = await service.getProduct(id);
	if (product === null) {
		return {
			statusCode: 404,
		};
	}

	return {
		statusCode: 200,
		body: JSON.stringify(product, null, 2),
	};
};

exports.updateProduct = async (event) => {
	const id = event.pathParameters.id;

	if ((await service.getProduct(id)) === null) {
		return {
			statusCode: 404,
		};
	}

	let product = JSON.parse(event.body);

	await service.updateProduct(id, product);

	return {
		statusCode: 200,
		body: JSON.stringify("product details updated", null, 2),
	};
};

exports.deleteProduct = async (event) => {
	const id = event.pathParameters.id;

	if ((await service.getProduct(id)) === null) {
		return {
			statusCode: 404,
		};
	}

	await service.deleteProduct(id);

	return {
		statusCode: 200,
		body: JSON.stringify("product is deleted", null, 2),
	};
};
