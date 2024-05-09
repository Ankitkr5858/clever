import "./App.css";
import SideBar from "./components/sidebar";
import ChatBox from "./components/chat";
import {useState} from "react";

export default function App() {
  const [messages, setMessages] = useState([]);
  console.log(messages)
  return (
    <main>
      <div className="grid grid-cols-[330px_1fr]">
        <SideBar setMessages={setMessages} />
        <ChatBox messages={messages}/>
      </div>
    </main>
  );
}
