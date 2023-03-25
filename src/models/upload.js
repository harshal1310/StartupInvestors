const upload = require("./addimg")
const express = require("express");
const router = express.Router();

router.post("/upload", upload.single("single_input"), async (req, res) => {
    if (req.file === undefined) return res.send("you must select a file.");
    const imgUrl = `http://localhost:8080/file/${req.file.filename}`;
    return res.send(imgUrl);
});

module.exports = router;