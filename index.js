const express = require("express");
const dotenv = require("dotenv");
const app = express();
const mongoose = require("mongoose");

// ROUTES
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const uploadImage = require("./services/store-image");


// MIDDLEWARES
dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Database connected ...."))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/upload-image", uploadImage);

app.listen("5000", () => {
  console.log("Server is running ....");
});
