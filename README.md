## AWS SERVERLESS DEMO

_A quick demo of AWS serverless implementation with generic CRUD RESTful APIs_

---

This demo is an AWS Serverless Application Model(SAM)-based application, which include basic CRUD RESTful APIs.

\
**Highlights:**

- The **SwaggerHub** has been used for API design;
- The **SAM CLI** has been used for package and deployment;
- The Apis includes basic CRUD such as getAllProducts, getProductById, AddNewProduct, UpdateProduct, DeleteProduct;
- The **index.js** file manages to export the Lambda function handlers, also focus on handling the request and the response;
- The **service.js** file manages to prepare params, retrieve data/manipulate the database, as well as Error Handling;
- The database is using **AWS DynamoDB**.

\
\
**The related Urls as below:**

The API design on the SwaggerHub: https://app.swaggerhub.com/apis/simon8029/generic-crud-api/0.0.1

The API Gateway endpoint: https://f5uxiys4g0.execute-api.us-east-1.amazonaws.com/dev
