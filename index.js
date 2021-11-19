const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cors = require('cors');
const multer = require("multer");
const path = require("path");
const connectDB = require("./config/db");

// LOAD ROUTES
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");

//LOAD CONFIG
dotenv.config({ path: "./config/config.env" });

// STATIC Files
app.use("/images", express.static(path.join(__dirname, "/images")));

// MIDDLEWARES
dotenv.config();
app.use(cors());
app.use(express.json());

// CONNECT DB
connectDB();

// STORE IMAGE
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
  });
  

// ROUTES
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

// INIT SERVER
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server is running ....");
});
