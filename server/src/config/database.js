require("dotenv").config()
const cassandra = require("cassandra-driver");

const cloud = { secureConnectBundle: process.env["ASTRA_DB_SECURE_BUNDLE_PATH"] };
const authProvider = new cassandra.auth.PlainTextAuthProvider("token", process.env["ASTRA_DB_APPLICATION_TOKEN"]);
const client = new cassandra.Client({ cloud, authProvider });

module.exports = client;