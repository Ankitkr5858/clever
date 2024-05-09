import { SmileEmojiIcon, SendIcon } from "./icons";
import Message from "./message";
const Chat = ({ messages }) => {
  return (
    <div className="flex flex-col h-screen">
      <div className="border-b border-[#F3F4F6] px-4 py-5">
        <div className="flex gap-3 items-center">
          <div className="w-[48px] h-[48px] rounded-full bg-gray-200">
            <img className="w-full h-full" src="/profile.png" alt="img" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-[#1F2937]">Marvin McKinney</span>
            <span className="text-[#9CA3AF] text-sm truncate">online</span>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-auto hide-scrollbar px-4">
        <span className="text-[#9CA3AF] text-sm block my-4 text-center">
          Friday
        </span>
        {messages.length > 0 ? messages.map((message, index) => (
          <Message key={index} message={message} myMessage={index % 2 === 0} />
        )) : <span className='block text-center text-[20px] font-bold mt-7'>Open a chat to See Messages</span>}
      </div>
      <div className="border-[#F3F4F6] border-b py-4 px-5">
        <div className="flex items-center gap-4">
          <div className="relative w-full">
            <input
              className="w-full outline-none h-[48px] border-[#D1D5DB] border rounded-[40px] pl-[3.5rem] pr-5 py-4"
              type="text"
              placeholder="Type a new message..."
            />
            <SmileEmojiIcon className="absolute top-[50%] translate-y-[-50%] left-[20px]" />
          </div>
          <SendIcon />
        </div>
      </div>
    </div>
  );
};
export default Chat;
