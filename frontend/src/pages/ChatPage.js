import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
const ChatPage = () => {
    const [chats,setChats] = useState([]);
    const fetchChats = async ()=>{
        const {data} = await axios.get('/api/chat');
            
        console.log(data)
        setChats(data);
    } 
    useEffect(()=>{   // it is a hook in react which runs when the component is rendered for the first time 
        fetchChats();
    },[])

  return (
    <div>
      chat wala page
      {chats.map(chat=><div key={chat._id}>{chat.chatName}</div>)}
    </div>
  )
}

export default ChatPage
