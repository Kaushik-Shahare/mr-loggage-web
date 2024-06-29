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

const editProfileController = async (req, res) => {
    try {
        const { newData, email } = req.body;
        const profileData = {}
        if (newData.firstName) profileData.firstName;
        if (newData.lastName) profileData.lastName;
        if (newData.phoneNumber) profileData.phoneNumber;
        if (newData.gender) profileData.gender;

        const response = await User.updateOne({ email }, profileData);
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

module.exports = { getProfileController, editProfileController };