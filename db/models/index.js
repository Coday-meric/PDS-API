const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

db.enq_data = require("./enq_data.model.js")(mongoose);
db.rdv_data = require("./rdv_data.model.js")(mongoose);

module.exports = db;