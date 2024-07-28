const userModel = require("../models/userModel");

const adminAuth = async (req, res, next) => {
    try {
        const sessionUserId = req.userId;
        const user = await userModel.findById(sessionUserId);
        if (user.role !== "Admin") {
            return res.status(200).json({
                message: "Only Admin has Permission",
                error: true,
                success: false,
            })
        }

        next();

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            data: [],
            error: true,
            success: false,
        });
    }
}

module.exports = adminAuth;