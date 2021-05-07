import React,{ useState, useEffect }  from 'react';
import { Avatar, IconButton } from "@material-ui/core";
import './Chat.css';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from "react-router-dom";
import db from './firebase';
import {useStateValue} from "./StateProvider";
import firebase from 'firebase/app';
import Picker from 'emoji-picker-react';

const Chat = () => {
    // const [seed, setSeed] = useState("");
    const [input, setInput] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{user}] = useStateValue();
    const [showPicker, setShowPicker] = useState(false);

    useEffect(() => {
        if(roomId){
            db.collection('rooms')
            .doc(roomId)
            .onSnapshot(snapshot=>setRoomName(snapshot.data().name));

            db.collection('rooms')
            .doc(roomId)
            .collection("messages")
            .orderBy("timestamp","asc")
            .onSnapshot((snapshot)=>setMessages(snapshot.docs.map((doc)=>doc.data())))
        }
    }, [roomId])    
    

    // useEffect(() => {
    //     setSeed(Math.floor(Math.random()*5000));
    // }, [roomId])

    const sendMessage =(e)=>{
        e.preventDefault();
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInput("");
    }

    const onEmojiClick = (event, emojiObject) => {
        setInput(input+emojiObject.emoji);
      };
  

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${roomName}.svg`} />
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>last seen{" "}
                    {   messages.length > 0 ?
                        new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString() : null
                    }</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlinedIcon/>
                    </IconButton>  
                    <IconButton>
                        <AttachFileIcon/>
                    </IconButton>  
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
            {messages?.map(message => (
                    <p className={`chat__message ${ message.name === user.displayName && 'chat__receiver'}`} key={message.timestamp}>
                        <span className="chat__name">{message.name}</span>
                        {message.message}
                        <span className="chat__timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                    </p>
                ))}
            </div>
            <div className="chat__footer">
                    <div className="chat__emojiContainer" onClick={(e)=>setShowPicker(!showPicker)}>
                        <InsertEmoticonIcon/>
                    </div>
                    
                    <form>
                        <input type="text" value={input} onChange ={(e)=>setInput(e.target.value)}></input>
                        <button type="submit" onClick ={sendMessage}>Send a message</button>
                    </form>
                    <MicIcon/>
                    
                    {showPicker ? <Picker onEmojiClick={onEmojiClick}/>:null}
            </div>
            
        </div>
    )
}

export default Chat
