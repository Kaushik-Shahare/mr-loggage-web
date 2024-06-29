const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  smallQuantity: {
    type: Number,
    required: true,
    min: 0,
  },
  mediumQuantity: {
    type: Number,
    required: true,
    min: 0,
  },
  largeQuantity: {
    type: Number,
    required: true,
    min: 0,
  },
  pickupAddress: {
    societyAddress: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
  },
  deliveryAddress: {
    trainNumber: {
      type: String,
      required: true,
    },
    PNR: {
      type: String,
      required: true,
    },
    coachNumber: {
      type: String,
      required: true,
    },
    seatNumber: {
      type: String,
      required: true,
    },
    arrivalTime: {
      type: Date,
      required: true,
    },
    departureTime: {
      type: Date,
      required: true,
    }
  },
  deliveryStatus: {
    type: String,
    required: true,
    enum: ["Pending", "In Transit", "Delivered", "Cancelled"],
    default: "Pending",
  },
  pickUpSlot: {
    date: {
      type: Date,
      required: true,
    },
    slot: {
      type: String,
      required: true,
    },
  }
}, { timestamps: true });

const Delivery = mongoose.model("Delivery", deliverySchema);

module.exports = Delivery;