const mongooose = require("mongoose");

const connectDB = async () => {
    try {
        await mongooose.connect(process.env.MONGODB_URL);
    } catch (err) {
        console.log(err);
    }
}
module.exports = connectDB;