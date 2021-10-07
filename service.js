"use strict";

const aws = require("aws-sdk");
const { nanoid } = require("nanoid");

const GenericCRUDTableName = process.env.TABLE_NAME;

exports.addProduct = async (product) => {
	product.id = nanoid();

	const params = {
		TableName: GenericCRUDTableName,
		Item: product,
	};

	const dynamoDB = new aws.DynamoDB.DocumentClient();
	try {
		await dynamoDB.put(params).promise();
	} catch (error) {
		console.log(`Failed to add product: ${error}`);
		throw error;
	}
};

exports.getProduct = async (id) => {
	const params = {
		TableName: GenericCRUDTableName,
		Key: {
			id: id,
		},
	};

	const dynamoDB = new aws.DynamoDB.DocumentClient();
	try {
		const result = await dynamoDB.get(params).promise();
		return result.Item === undefined ? null : result.Item;
	} catch (error) {
		console.log(`Failed to get product with id "${id}": ${error}`);
		throw error;
	}
};

exports.getAllProducts = async () => {
	const params = {
		TableName: GenericCRUDTableName,
	};

	const dynamoDB = new aws.DynamoDB.DocumentClient();
	try {
		const results = await dynamoDB.scan(params).promise();
		return results.Items;
	} catch (error) {
		console.log(`Failed to fetch products: ${error}`);
		throw error;
	}
};

exports.updateProduct = async (id, product) => {
	product.id = id;
	const params = {
		TableName: GenericCRUDTableName,
		Item: product,
	};

	const dynamoDB = new aws.DynamoDB.DocumentClient();
	try {
		await dynamoDB.put(params).promise();
	} catch (error) {
		console.log(`Failed to update product: ${error}`);
		throw error;
	}
};

exports.deleteProduct = async (id) => {
	const params = {
		TableName: GenericCRUDTableName,
		Key: {
			id: id,
		},
	};

	const dynamoDB = new aws.DynamoDB.DocumentClient();
	try {
		await dynamoDB.delete(params).promise();
	} catch (error) {
		console.log(`Failed to delete product with id "${id}": ${error}`);
		throw error;
	}
};
