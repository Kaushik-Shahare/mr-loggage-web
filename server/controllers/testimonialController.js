const Testimonial = require("../models/Testimonial");

const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().populate(
      "userId",
      "firstName lastName"
    );
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const submitTestimonial = async (req, res) => {
  const { userId, content } = req.body;

  if (!userId || !content) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const testimonial = new Testimonial({
    userId: userId,
    content: content,
  });

  try {
    const newTestimonial = await testimonial.save();
    res.status(201).json(newTestimonial);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteTestimonial = async (req, res) => {
  const { id } = req.query;
  console.log(id);

  if (!id) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const testimonial = await Testimonial.findByIdAndDelete(id);
    res.json({ message: "Testimonial deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateTestimonial = async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    testimonial.content = req.body.content;
    await testimonial.save();
    res.json(testimonial);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getTestimonials,
  submitTestimonial,
  deleteTestimonial,
  updateTestimonial,
};
