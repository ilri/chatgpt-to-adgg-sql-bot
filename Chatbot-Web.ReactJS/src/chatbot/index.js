import React, { useState } from "react";
import Chatbot from "./chatbot";
import AssistCard from "./assistCard";
import cgiarLogo from "../assest/images/cgiarLogo.png";
import adggLogo from "../assest/images/adggLogo.png";
import { showError } from "../components/common/Notifications";

export default function ChatbotHome() {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [chatsReq, setChatsReq] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleChat = (e, message) => {
    e.preventDefault();
    setTimeout(function () {
      const chatElem = document.getElementById("chatbotcard");
      chatElem.scrollTop = chatElem.scrollHeight;
      const assistElem = document.getElementById("assistdatacard");
      assistElem.scrollTop = assistElem.scrollHeight;
    });

    if (!message) return;
    setIsTyping(true);

    let msgs = chats;
    let requests = chatsReq;
    msgs.push({ role: "user", content: message });
    requests.push({ role: "user", content: message });
    setChatsReq(requests);
    setChats(msgs);

    setMessage("");
    

    fetch(`${process.env.REACT_APP_API_URL}api/executeQuery`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({ role: "user", content: message }),
      body: JSON.stringify({
        chats: chatsReq,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (typeof data.data.content === "object") {
          data.data.content = JSON.stringify(data.data.content);
        }
        if (data.data.queryDetails) {
          requests.push({ role: "assistant", content: data.data.queryDetails });
        } else {
          requests.push({ role: "assistant", content: data.data.content });
        }
        msgs.push(data.data);
        setChats(msgs);
        setIsTyping(false);
      })
      .catch((error) => {
        console.log(error);
        setIsTyping(false);
        showError("Service Unavailable: Please try again later.");
      });
  };

  return (
    <div className="chatbot-home">
      <div className="chatbot-header">
        <div className="logo-card">
          <img src={cgiarLogo} alt="cgiar logo" className="logo-styles" />
        </div>
        <div>
          <img src={adggLogo} alt="addg logo" className="logo-styles" />
        </div>
      </div>
      <div className="chatbot-card">
        <div className="user-chat-card">
          <Chatbot
            chats={chats}
            isTyping={isTyping}
            handleChat={handleChat}
            setMessage={setMessage}
            message={message}
          />
        </div>
        <div className="assist-card" id="assistdatacard">
          <AssistCard data={chats} isTyping={isTyping} />
        </div>
      </div>
    </div>
  );
}
