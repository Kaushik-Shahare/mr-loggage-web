const express = require("express");
const deliveryRouter = express.Router();
const { fetchTimeSlots, storeDeliveryDetails } = require("../controllers/deliveryController");

deliveryRouter.post("/fetch-time-slots", fetchTimeSlots);
deliveryRouter.post('/delivery-details', storeDeliveryDetails);

module.exports = deliveryRouter;
