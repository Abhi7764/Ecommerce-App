const userModel = require("../../models/userModel");

const updateUser = async (req, res) => {
    try {
        const sessionId = req.userId;
        const { userId, email, name, role } = req.body;

        const payload = {
            ...(email && { email: email }),
            ...(name && { name: name }),
            ...(role && { role: role })
        }

        const user = await userModel.findById(sessionId);
        
        const updateUser = await userModel.findByIdAndUpdate(userId, payload);

        res.json({
            message: "User Updated!",
            success: true,
            error: false,
            data: updateUser,
        })

    } catch (err) {
        console.log(err)
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }

}

module.exports = updateUser;
