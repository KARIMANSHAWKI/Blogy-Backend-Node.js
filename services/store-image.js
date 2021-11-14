const fs = require("fs");
const hasWhiteSpaceFun = require('../services/has-white-space');
const router = require("express").Router();


router.post("/", (req, res) => {
  console.log(req.file);
  let originalName =  req.file.name;
  let fileName = '';
  if (hasWhiteSpaceFun.hasWhiteSpace(originalName)) {
    let fileWithoutSpace = originalName.split(" ").join("");
      fileName =  Date.now() + "-" + fileWithoutSpace
  } else {
     fileName = Date.now() + "-" + originalName;
  }

  let filePath = __dirname + "/images/" + fileName;
  file.mv(filePath);
  res.status(200).json("Image uploaded successfully");
});




module.exports = router;