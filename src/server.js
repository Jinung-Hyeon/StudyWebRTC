import http from "http";
import https from "https";
import SocketIO from "socket.io";
import express from "express";
import fs from "fs";

const app = express();
const options = {
    key: fs.readFileSync(__dirname + '/private.pem'),
    cert: fs.readFileSync(__dirname + '/public.pem')
};

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));


const httpServer = http.createServer(app);
const httpsServer = https.createServer(options, app);
const wsServer = SocketIO(httpsServer);

wsServer.on("connection", (socket) => {
    socket.on("join_room", (roomName) =>{
        socket.join(roomName);
        socket.to(roomName).emit("welcome");
    });

    socket.on("offer", (offer, roomName) => {
        socket.to(roomName).emit("offer", offer);
    });

    socket.on("answer", (answer, roomName) => {
        socket.to(roomName).emit("answer", answer);
    });

    socket.on("ice", (ice, roomName) => {
        socket.to(roomName).emit("ice", ice);
    });

    socket.on("disconnecting", () => {
        socket.rooms.forEach((room) => socket.to(room).emit("goodbye"));
    });

});



const handleListen = () => console.log('Listening on http://localhost:3000');
httpServer.listen(4000, handleListen);
httpsServer.listen(8443);

