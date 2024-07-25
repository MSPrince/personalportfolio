const router = require("express").Router();
const {
  Intro,
  About,
  Project,
  Contact,
  Experience,
  Course,
} = require("../models/portfolioModel");




const User = require("../models/userModel");



// get All PortFolio Data
router.get("/get-portfolio-data", async (req, res) => {
  try {
    const intros = await Intro.find();
    const abouts = await About.find();
    const projects = await Project.find();
    const experiences = await Experience.find();
    const courses = await Course.find();
    const contacts = await Contact.find();

    const portfolioData = {
      intro: intros[0],
      about: abouts[0],
      projects: projects,
      experiences: experiences,
      courses: courses,
      contact: contacts[0],
    };

    console.log("Portfolio Data:", portfolioData); // Log the data for debugging

    res.status(200).send(portfolioData);
  } catch (error) {
    console.error("Error fetching portfolio data:", error); // Log any errors
    res.status(500).send(error);
  }
});

// update Intro
router.post("/update-intro", async (req, res) => {
  try {
    const intro = await Intro.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );
    res.status(200).send({
      data: intro,
      success: true,
      message: "Intro updatad successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//update About
router.post("/update-about", async (req, res) => {
  try {
    const about = await About.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );
    res.status(200).send({
      data: about,
      success: true,
      message: "About updatad successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Add Experience

router.post("/add-experience", async (req, res) => {
  try {
    const experience = new Experience(req.body);
    await experience.save();
    res.status(200).send({
      data: experience,
      success: true,
      message: "Experience added successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "An error occurred while adding the experience",
      error: error.message,
    });
  }
});

// update experience
router.post("/update-experience", async (req, res) => {
  try {
    const experience = await Experience.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );
    res.status(200).send({
      data: experience,
      success: true,
      message: "Experience updated successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});
// delete experience
router.post("/delete-experience", async (req, res) => {
  try {
    const experience = await Experience.findOneAndDelete({
      _id: req.body._id,
    });

    if (!experience) {
      return res
        .status(404)
        .json({ success: false, message: "Experience not found" });
    }

    res.status(200).json({
      success: true,
      message: "Experience deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

// Add project
router.post("/add-project", async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(200).send({
      data: project,
      success: true,
      message: "Project added successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to add project",
      error: error.message,
    });
  }
});

// Update project
router.put("/update-project", async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );
    res.status(200).send({
      data: project,
      success: true,
      message: "Project updated successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to update project",
      error: error.message,
    });
  }
});

// Delete project
router.delete("/delete-project", async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({ _id: req.body._id });
    res.status(200).send({
      data: project,
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to delete project",
      error: error.message,
    });
  }
});

// Add course
router.post("/add-course", async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(200).send({
      data: course,
      success: true,
      message: "Course added successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to add course",
      error: error.message,
    });
  }
});

// Update course
router.put("/update-course", async (req, res) => {
  try {
    const course = await Course.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );
    res.status(200).send({
      data: course,
      success: true,
      message: "Course updated successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to update course",
      error: error.message,
    });
  }
});

// Delete course
router.delete("/delete-course", async (req, res) => {
  try {
    const course = await Course.findOneAndDelete({ _id: req.body._id });
    res.status(200).send({
      data: course,
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to delete course",
      error: error.message,
    });
  }
});

// update contact
router.put("/update-contact", async (req, res) => {
  try {
    const contact = await Contact.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );
    if (contact) {
      res.status(200).send({
        data: contact,
        success: true,
        message: "Contact updated successfully",
      });
    } else {
      res.status(404).send({
        success: false,
        message: "Contact not found",
      });
    }
  } catch (error) {
    console.error("Error:", error.message); // Log error
    res.status(500).send({
      success: false,
      message: "An error occurred while updating contact",
      error: error.message,
    });
  }
});





// Admin login
router.post("/admin-login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username , 
      password: req.body.password,
    });
    user.password = "";
    if (user) {
      res.status(200).send({
        success: true,
        message: "Login successful",
        data: user,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "Invalid username or password",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});


module.exports = router;
