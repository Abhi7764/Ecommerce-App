const userModel = require('../../models/userModel');
const bcrypt = require('bcrypt');

const userSignUpController = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        const user = await userModel.findOne({ email: email });
        //console.log(user);
        if (user) {
            throw new Error("User already exists!")
        }
        if (!email) {
            throw new Error("Please provide email");
        }
        if (!password) {
            throw new Error("Please provide password");
        }
        if (!name) {
            throw new Error("Please provide name");
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);

        if (!hashPassword) {
            throw new Error("Something is wrong");
        }

        const payload = {
            ...req.body,
            role: "General",
            password: hashPassword
        }

        const userData = new userModel(payload);
        const saveUser = await userData.save();
        res.status(201).json({
            message: "Signup successfully!",
            data: saveUser,
            success: true,
            error: false,
        });
    } catch (err) {
        res.json({
            message: err.message, // Logging the error message correctly
            error: true,
            success: false,
        });
    }
}
module.exports = userSignUpController;
