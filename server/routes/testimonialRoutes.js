const express = require("express");
const testimonialRouter = express.Router();
const {
  getTestimonials,
  submitTestimonial,
  deleteTestimonial,
  updateTestimonial,
} = require("../controllers/testimonialController");
const auth = require("../middlewares/auth");

testimonialRouter.get("/", auth, getTestimonials);
testimonialRouter.post("/submit", auth, submitTestimonial);
testimonialRouter.delete("/deleteT", auth, deleteTestimonial);
testimonialRouter.put("/updateT", auth, updateTestimonial);

module.exports = testimonialRouter;
