import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));


const handleListen = () => console.log('Listening on http://localhost:3000');
// app.listen(3000, handleListen);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// function handleConnection(socket){
//     console.log(socket);
// }

// wss.on("connection", handleConnection);

const sockets = []; // 연결되는 브라우저들을 저장하는 배열 생성

wss.on("connection", (socket) => { // 브라우저와 연결이되면
    //console.log(socket);
    sockets.push(socket);
    console.log("Connected to Browser");
    socket.on("close", () => console.log("Disconnected from the Browser")); // 브라우저 연결이 끊겼을때
    socket.on("message", (message) => { // 브라우저에서 메시지를 보낼때
        //console.log(message.toString());
        sockets.forEach(aSocket => aSocket.send(message.toString()));
    });
    //socket.send("hello!!"); // 브라우저에 메시지 보냄
});

server.listen(3000, handleListen);

