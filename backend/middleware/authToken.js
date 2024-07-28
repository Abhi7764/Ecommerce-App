const jwt = require("jsonwebtoken");

const authToken = async (req, res, next) => {
    try {
        const token = req.cookies?.token || req.headers['authorization'];
        //console.log("token", token);

        if (!token) {
            return res.status(200).json({
                message: "First Login Please!",
                error: true,
                success: false,
            })
        }
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
            // console.log(decoded);
            if (err) {
                console.log("Error auth", err);
            }

            req.userId = decoded.tokenData?._id;
            // console.log(decoded.tokenData._id);
            next()
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            data: [],
            error: true,
            success: false,
        });
    }
}

module.exports = authToken;