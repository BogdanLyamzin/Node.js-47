const express = require("express");
const fs = require("fs/promises")
const moment = require("moment")
const cors = require("cors")

const books = require("./books")

const app = express();

app.use(cors())

// app.use( async(req, res, next)=> {
//     const {url, method} = req;
//     const date = moment().format("YYYY-MM-DD_hh:mm:ss");
//     await fs.appendFile("server.log", `\n${method} ${url} ${date}`);
//     next()
// })

// app.use((req, res, next)=> {
//     console.log("First middleware");
//     next()
// })

// app.use((req, res, next)=> {
//     console.log("Second middleware");
//     next()
// })

app.get("/products", (req, res)=> {
    res.json([])
})

app.get("/books", (req, res)=> {
    res.json(books)
})

app.use((req, res)=> {
    res.status(404).json({
        message: "Not found"
    })
})

app.listen(3000)