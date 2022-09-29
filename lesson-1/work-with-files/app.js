const fs = require("fs/promises");

const fileOperations = async({action, filepath, data}) => {
    switch(action) {
        case "read":
            const text = await fs.readFile(filepath, "utf-8");
            console.log(text);
            // const result = await fs.readFile(filepath);
            // const text = result.toString();
            // console.log(text);
            break;
        case "add":
            await fs.appendFile(filepath, data);
            break;
        case "replace":
            await fs.writeFile(filepath, data);
            break;
        default: 
            console.log("Unknown action");
    }
}

// fileOperations({action: "read", filepath: "./files/file.txt"})
// fileOperations({action: "add", filepath: "./files/file.txt", data: "\nЗаписная книжка дьявола"})
// fileOperations({action: "replace", filepath: "./files/file.txt", data: "Записная книжка дьявола"})

// fileOperations({action: "add", filepath: "./files/file2.txt", data: "\nЗаписная книжка дьявола"})
// fileOperations({action: "replace", filepath: "./files/file3.txt", data: "Записная книжка дьявола"})

// fs.readFile("./files/file.txt")
//     .then(data => console.log(data))
//     .catch(error => console.log(error.message))

// fs.readFile("./files/file.txt", (error, data)=> {
//     console.log(error);
//     console.log(data);
// })