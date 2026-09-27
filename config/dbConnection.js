const mongoos = require("mongoose")

const connectionString = process.env.MONGO_DB_URL

mongoos.connect(connectionString).then(() => {
    console.log("MongoDB connected succesfully");

}).catch((err) => {
    console.log("MongoDB connection failed");

})