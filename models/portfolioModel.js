const mongoose = require("mongoose");


const introSchema = new mongoose.Schema({
    welcomeText : {
        type : String,
        required : true
    },
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true,
    },
    caption :{
        type : String,
        required : true,
    },
    description : {
        type : String,
        required: true,
    }
});


const aboutSchema = new mongoose.Schema({
    lottieURL : {
        type : String,
        required: true,
    },
    description1:{
        type : String,
        required : true,
    },
    description2:{
        type : String,
        required : true,
    },
    skill : {
        type : Array,
        required: true,
    }
});


const experienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  period: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});


const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  techonology: {
    type: Array,
    required: true,
  },
});


coursesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  }
});


const contactSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Gender: {
    type: String,
    required: true,
  },
  Age: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Phone: {
    type: String,
    required: true,
  },

  Address: {
    type: String,
    required: true,
  },
});



module.exports = {
    Intro : mongoose.model("intros", introSchema),
    About : mongoose.model("abouts", aboutSchema),
    Experience : mongoose.model("experiences", experienceSchema),
    Project : mongoose.model("projects", projectSchema),
    Course : mongoose.model("courses", coursesSchema),
    Contact : mongoose.model("contacts", contactSchema),

}