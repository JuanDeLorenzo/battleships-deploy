import io from 'socket.io-client';
import {useEffect, useState} from "react";

//const socket = io.connect("http://localhost:3001")
//
//
//function Chat() {
//
//    const [room, setRoom] = useState("");
//
//    const [message, setMessage] = useState("");
//    const [messageRecieved, setMessageRecieved] = useState("");
//
//    const joinRoom = () => {
//        if (room !== "") {
//            socket.emit("join_room", room)
//        }
//    }
//    const sendMessage = () =>{
//        socket.emit("send_message", {
//            message, room
//        })
//    };
//
//    useEffect(() =>{
//        socket.on("recieve_message", (data) =>{
//            setMessageRecieved(data.message)
//        });
//    }, [socket])
//
//    return (
//        <div className="App">
//            <input placeholder="Room Number..." onChange={(event) => {
//                setRoom(event.target.value);
//            }}/>
//            <button onClick={joinRoom}>Join Room</button>
//            <input placeholder={"Message..."} onChange={(event) => {
//                setMessage(event.target.value);
//            }}/>
//            <button onClick={sendMessage}>Send Message</button>
//            <h1>Message: </h1>
//            {messageRecieved}
//        </div>
//    );
//}
//
//export default Chat;
//