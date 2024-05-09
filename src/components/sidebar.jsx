import { useEffect, useState } from "react";
import getChannels from "../api/channel";

const Sidebar = ({ setMessages }) => {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getChannels();
        setApiData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="flex flex-col border-r border-[#F3F4F6] cursor-pointer max-h-[100vh] overflow-auto pt-10 hide-scrollbar">
      <span className="text-[#1F2937] px-5 font-bold block mb-4">
        All Messages
      </span>
      {apiData.map((data, index) => (
        <div
          onClick={() => {
            setMessages(data._messages);
          }}
          key={index}
          className="hover:bg-[#F9FAFB] w-full"
        >
          <div className="grid grid-cols-[48px_1fr] gap-3 items-center p-5">
            <div className="min-w-[48px] w-[48px] h-[48px] rounded-full bg-gray-200">
              <img className="w-full h-full" src="/profile.png" alt="img" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-bold">{data.friendlyName}</span>
                <span className="text-[#9CA3AF] text-[14px]">6:45pm</span>
              </div>
              <div className="relative w-full">
                {data.getMessages ? (
                  <AsyncMessageLoader channel={data} />
                ) : (
                  "No messages"
                )}
                <span className="absolute right-0 top-[2px] w-[20px] h-[20px] rounded-full flex items-center justify-center bg-[#1F2937] text-white text-sm">
                  2
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Component for asynchronously loading messages
const AsyncMessageLoader = ({ channel }) => {
  const [message, setMessage] = useState("");

  async function getMessageData(channel) {
    try {
      const messages = await channel.getMessages();
      // Assuming you want the latest message
      const latestMessage = messages[messages.length - 1].body;
      return latestMessage;
    } catch (error) {
      console.error("Error fetching messages:", error);
      return "Error";
    }
  }
  useEffect(() => {
    async function fetchMessage() {
      const latestMessage = await getMessageData(channel);
      setMessage(latestMessage);
    }
    fetchMessage();
  }, [channel]);

  return <div className="max-w-[80%] block">
  {message.split(' ').slice(0, 5).join(' ')}{message.split(' ').length > 5 ? '...' : ''}
</div>
;
};

export default Sidebar;
