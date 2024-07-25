const express = require("express");
const app = express();
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
const portfolioRoute = require("./routes/portfolioRoute");

app.use(express.json());
app.use("/api/portfolio", portfolioRoute); // Corrected here

const port = process.env.PORT || 5000;




const path = require("path");
if(
  process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "portfolio/build")));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "protfolio/build/index.html"));
  })}


  
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
