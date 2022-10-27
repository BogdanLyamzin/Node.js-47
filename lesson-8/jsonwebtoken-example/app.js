const jwt = require("jsonwebtoken");
require("dotenv").config();

const {SECRET_KEY} = process.env;

const payload = {
    id: "6353ad29db0f6ef5ab69813a"
};

const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "24h"});
// console.log(token);

const decodeToken = jwt.decode(token);
// console.log(decodeToken);

try {
    const result = jwt.verify(token, SECRET_KEY);
    console.log(result);
    const wrongToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNTNhZDI5ZGIwZjZlZjVhYjY5ODEzYSIsImlhdCI6MTY2Njg4OTQwMiwiZXhwIjoxNjY2OTc1ODAyfQ.rkJ4zl4sULpj9I_ZRbrh6qWYbo1-q2UmJpKuI1KTdca";
    const result2 = jwt.verify(wrongToken, SECRET_KEY);
}
catch(error) {
    console.log(error.message);
}

