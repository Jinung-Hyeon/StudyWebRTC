// const messageList = document.querySelector("ul");
// const nickForm = document.querySelector("#nick");
// const messageForm = document.querySelector("#message");
// const socket = new WebSocket(`ws://${window.location.host}`);


// function makeMessage(type, payload) {
//     const msg = {type, payload};
//     return JSON.stringify(msg);
// }


// // 소켓 서버에 연결됐을때
// socket.addEventListener("open", () => {
//     console.log("Connected to Server");
// });

// // 서버에서 메시지를 받았을때
// socket.addEventListener("message", (message) => {
//     //console.log("New Message : ", message.data);
//     const li = document.createElement("li");
//     li.innerText = message.data;
//     messageList.append(li);
// });

// // 서버가 연결이 끊겼을때
// socket.addEventListener("close", () => {
//     console.log("Disconnected from Server");
// });


// // setTimeout(() => {
// //     socket.send("hello from the browser!");
// // }, 10000);

// function handleSubmit(event) {
//     event.preventDefault();
//     const input = messageForm.querySelector("input");
//     socket.send(makeMessage("new_message", input.value));
//     const li = document.createElement("li");
//     li.innerText = `You: ${input.value}`;
//     messageList.append(li);
//     //console.log(input.value);
//     input.value = "";
    
// }



// function handleNickSubmit(event) {
//     event.preventDefault();
//     const input = nickForm.querySelector("input");
//     socket.send(makeMessage("nickname", input.value));
//     input.value = "";
// }

// messageForm.addEventListener("submit", handleSubmit);
// nickForm.addEventListener("submit", handleNickSubmit);

const socket = io();