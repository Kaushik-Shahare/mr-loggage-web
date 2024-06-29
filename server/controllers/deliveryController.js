const Delivery = require('../models/delivery');
const fetchTimeSlots = async (req, res) => {

    const { trainArrival = "2024-06-22T23:00:00", bookingDateTime = "2024-06-21T15:30:00" } = req.body;
    const availableSlots = getAvailableSlots(trainArrival, bookingDateTime);
    console.log(availableSlots);

    function getAvailableSlots(trainArrival, bookingDateTime) {
        const trainTime = new Date(trainArrival);
        const bookingTime = new Date(bookingDateTime);
        const slots = [];

        const definedSlots = ["08:00-11:00", "19:00-22:00"];

        function createSlot(date, slot) {
            let d = date.getDate();
            let m = date.getMonth() + 1;
            let y = date.getFullYear();
            const [startHours, startMinutes] = slot.split("-")[0].split(":").map(Number);
            const slotStart = new Date(y, date.getMonth(), d, startHours - 1, startMinutes);
            const [hours, minutes] = slot.split("-")[1].split(":").map(Number);
            const slotEnd = new Date(date);
            slotEnd.setHours(hours + 1, minutes)
            console.log(d)

            return [`${y}-${m < 10 ? '0' + m : m}-${d < 10 ? '0' + d : d} ${slot}`, slotStart, slotEnd];
        }

        function addSlot(date, slot) {
            const [newSlot, slotStart, slotEnd] = createSlot(date, slot);
            if (bookingTime <= slotStart && trainTime >= slotEnd) {
                slots.push(newSlot);
            }

            console.log(bookingTime <= slotStart, trainTime >= slotEnd, slotStart, slotEnd)
        }

        let currentDate = new Date(trainTime);
        while (slots.length < 3) {
            console.log(slots)
            addSlot(currentDate, definedSlots[1]);
            addSlot(currentDate, definedSlots[0]);
            currentDate.setDate(currentDate.getDate() - 1); // Move to the previous day
            if (currentDate < bookingTime) break;
        }

        return slots.slice(0, 3);
    }

    if (availableSlots.length) {
        res.status(200).send({
            success: true,
            availableSlots
        })
    }
    else {
        res.status(200).send({
            success: true,
            message: "No Slots Available"
        })
    }

    // [
    //     '2024-06-22 19:00-22:00',
    //     '2024-06-22 08:00-11:00',
    //     '2024-06-21 19:00-22:00'
    // ]

}

const storeDeliveryDetails = async (req, res) => {
    try {
        const { societyAddress, city, state, pincode, trainNumber, PNR, coachNumber, seatNumber, arrivalTime, departureTime, slot, pickUpDate } = req.body.deliveryDetails;
        const pickUpAddress = { societyAddress, city, state, pincode };
        const deliveryAddress = { trainNumber, PNR, coachNumber, seatNumber, arrivalTime, departureTime };
        const pickUpSlot = { date: pickUpDate, slot };

        const delivery = new Delivery({
            userId: req.body.userId,
            pickUpAddress,
            deliveryAddress,
            pickUpSlot,
            ...req.body.deliveryDetails
        });
        const newDelivery = await delivery.save();

        res.status(200).send({
            success: true,
            message: "New delivery added successfully",
            newDelivery
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "error in adding new delivery",
            error
        })
    }
}


module.exports = { fetchTimeSlots, deliveryController };
