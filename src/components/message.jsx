import { DotsIcon } from "./icons";

const Message = ({ message, myMessage = false }) => {
  function date(d) {
    const dateCreated = d;
    const date = new Date(dateCreated);

    // Extracting time in AM/PM format
    const time = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    console.log(time); // Output: "7:32 AM" (or "7:32 PM" depending on the current time)
    return time;
  }
  return (
    <>
      {myMessage ? (
        <div className="flex flex-col gap-1 w-full pr-4">
          <div className="flex items-center gap-2 justify-end">
            <DotsIcon className="cursor-pointer" />
            <div className="bg-[#F9FAFB] p-3 text-[#1F2937]">
              {message.body}
            </div>
          </div>
          <span className="text-[#9CA3AF] text-sm text-end">10:08 am</span>
        </div>
      ) : (
        <div className="flex gap-2 items-center">
          <div className="w-[24px] h-[24px] rounded-full bg-gray-200">
            <img className="w-full h-full" src="/profile.png" alt="img" />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <div className="flex items-center gap-2">
              <div className="bg-[#F9FAFB] p-3 text-[#1F2937]">
                {message.body}
              </div>
              <DotsIcon className="cursor-pointer" />
            </div>
            <span className="text-[#9CA3AF] text-sm">
              {date(message.dateCreated)}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default Message;
