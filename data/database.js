const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

let database;

const initDb = (callback) => {
    if (database) {
        console.log("Database is already initialized");
        return callback(null, database);
    }
    console.log("MONGODB_URL:", process.env.MONGODB_URL); // Add this line to check the value of MONGODB_URL
    MongoClient.connect(process.env.MONGODB_URL)
        .then((client) => {
            database = client.db(); // Assign the db object
            callback(null, database);
        })
        .catch((err) => {
            callback(err);
        });
};

const getDatabase = () => {
    if (!database) {
        throw new Error("Database not initialized");
    }
    return database;
};

module.exports = {
    initDb,
    getDatabase
};