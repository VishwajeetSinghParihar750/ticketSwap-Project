import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URI);

let _db;

let initDb = async (callback) => {
  if (_db) {
    console.log("database exists ... ");
    return callback(null, _db);
  }
  try {
    await client.connect();
    _db = client.db(process.env.DB_NAME);
    console.log("database created ... ");
    return;
  } catch (err) {
    callback(err);
  }
};

let getDb = () => {
  if (!_db) {
    throw Error("database not initialised...");
  }
  return _db;
};

module.exports = { initDb, getDb };
