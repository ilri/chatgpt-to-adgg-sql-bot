import React from "react";
import usericon from "../assest/images/usericon.png";

function Chatbot({ handleChat, chats, message, setMessage }) {
  return (
    <>
      <section className="chats-card" id="chatbotcard">
        {chats && chats.length
          ? chats.map(
              (chat, index) =>
                chat.role === "user" && (
                  <div className="user-msg-card">
                    <p
                      key={index}
                      className={
                        chat.role === "user" ? "user-msg" : "assitent-msg"
                      }
                    >
                      <span>{chat.content}</span>
                    </p>
                    <div className="usericon-card">
                      <img src={usericon} alt="user icon" />
                    </div>
                  </div>
                )
            )
          : ""}
      </section>

      <form action="" onSubmit={(e) => handleChat(e, message)}>
        <input
          type="text"
          name="message"
          className="search-input"
          value={message}
          placeholder="Type a message here and hit Enter..."
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
    </>
  );
}

export default Chatbot;
