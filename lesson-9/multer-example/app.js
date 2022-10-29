const multer = require("multer");
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs/promises");
const { nanoid } = require("nanoid");

const app = express();

app.use(cors());
app.use(express.static("public"))

const books = [];

const tempDir = path.join(__dirname, "./temp")

const multerConfig = multer.diskStorage({
    destination: tempDir,
    filename: (req, file, cb)=> {
        cb(null, file.originalname)
    }
});

const upload = multer({
    storage: multerConfig,
})

app.get("/api/books", (req, res)=>{
    res.json(books)
});

const booksDir = path.join(__dirname, "public", "books")
// upload.fields([{name: "cover", maxCount: 1}, {name: "subcover", maxCount: 2}])
// upload.array("cover", 8)

app.post("/api/books", upload.single("cover"), async(req, res)=> {
    const {path: tempUpload, originalname} = req.file;
    const resultUpload = path.join(booksDir, originalname);
    await fs.rename(tempUpload, resultUpload);
    const cover = path.join("books", originalname);
    const newBook = {
        id: nanoid(),
        ...req.body,
        cover,
    };

    books.push(newBook);
    res.status(201).json(newBook);
});

app.listen(3000)