const ws = new require("ws");

const wsServer = new ws.Server({port: 5000});

const sockets = [];

wsServer.on("connection", (socket)=> {
    sockets.push(socket);
    // console.log("New frontend connection");
    setTimeout(()=> {
        socket.send("Welcome to web-socket server");
    }, 3000);

    sockets.forEach(item => {
        if(item !== socket) {
            item.send("New member connect")
        }
    })
})