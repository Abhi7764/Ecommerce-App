const bcrypt = require('bcrypt');
const userModel = require('../../models/userModel');
const jwt = require('jsonwebtoken');

const userLoginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email) {
            throw new Error("Please provide email");
        }
        if (!password) {
            throw new Error("Please provide password");
        }

        const user = await userModel.findOne({ email: email });
        if (!user) {
            throw new Error("User is not found");
        }

        const matchPassword = await bcrypt.compare(password, user.password);

        if (matchPassword) {

            const tokenData = {
                _id: user._id,
                email: user.email,
            }

            const token = jwt.sign({ tokenData }, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 });

            const tokenOption = {
                "httpOnly": true,
                "secure": true
            }

            res.cookie("token", token, tokenOption).status(200).json({
                message: "Login in successfully!",
                data: token,
                error: false,
                success: true,
            });

        } else {
            throw new Error("Please check password!");
        }

    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}

module.exports = userLoginController;