const userModel = require("../models/userModel");

const addProductPermission = async (userId) => {
    try {
        const user = await userModel.findById(userId);

        if (user.role !== "Admin") {
            return false;
        }
        return true;

    } catch (err) {
        console.error('Error checking user permission:', err);
        return false;
    }
}

module.exports = addProductPermission