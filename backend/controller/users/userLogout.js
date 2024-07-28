const userLogout = async (req, res) => {
    try {
        res.clearCookie("token");

        res.json({
            message: "Logged out successfully!",
            error: false,
            success: true,
            data: [],
        })
    } catch (err) {
        res.json({
            message: err.message,
            error: true,
            success: false,
        });
    }
}

module.exports = userLogout;
