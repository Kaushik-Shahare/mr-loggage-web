const User = require("../models/User");

const getProfileController = async (req, res) => {
    try {
        const { email } = req.body.data;
        const response = await User.findOne({ email });
        res.status(200).send({
            success: true,
            message: "User found",
            user: response
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in get User",
            error
        });
    }
}

const editProfielController = async (req, res) => {
    try {
        const { newData, email } = req.body;
        const response = await User.updateOne({ email }, newData);
        if (!response) {
            res.status(400).send({
                success: true,
                message: "User not updated",
            });
        }
        res.status(200).send({
            success: true,
            message: "User updated successfully",
            response
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in updating user",
            error
        });
    }
}

module.exports = { getProfileController, editProfielController };