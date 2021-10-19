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
	const result = await dynamoDB.get(params).promise();
	return result.Item === undefined ? null : result.Item;
};

exports.getAllProducts = async () => {
	const params = {
		TableName: GenericCRUDTableName,
	};

	const dynamoDB = new aws.DynamoDB.DocumentClient();
	const results = await dynamoDB.scan(params).promise();
	return results.Items;
};

exports.updateProduct = async (id, product) => {
	product.id = id;
	const params = {
		TableName: GenericCRUDTableName,
		Item: product,
	};

	const dynamoDB = new aws.DynamoDB.DocumentClient();
	await dynamoDB.put(params).promise();
};

exports.deleteProduct = async (id) => {
	const params = {
		TableName: GenericCRUDTableName,
		Key: {
			id: id,
		},
	};

	const dynamoDB = new aws.DynamoDB.DocumentClient();
	await dynamoDB.delete(params).promise();
};
