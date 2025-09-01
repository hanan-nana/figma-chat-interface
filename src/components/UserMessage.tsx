interface UserMessageProps {
  message: string;
  timestamp: Date;
}

const UserMessage = ({ message, timestamp }: UserMessageProps) => {
  return (
    <div className="flex justify-end mb-2">
      <div className="max-w-[70%] px-4 py-2 rounded-2xl relative break-words bg-[#404040] text-white rounded-full">
        <p className="mb-0 leading-relaxed text-sm">{message}</p>
      </div>
    </div>
  );
};

export default UserMessage;
