import { useState } from "react";
import UserMessage from "./components/UserMessage";
import AssistantMessage from "./components/AssistantMessage";
import InputArea from "./components/InputArea";
import LoadingIndicator from "./components/LoadingIndicator";
import { ChatMessage } from "./types/chat";
import { generateUI } from "./api/generateUI";
import { GenerateUIResponse } from "./api/types";

function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (message: string, image?: File) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response: GenerateUIResponse = await generateUI(message, image);

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: `생성된 UI를 확인해주세요.\n\n${
          response.html
            ? "생성된 HTML 코드입니다:\n\n```html\n" + response.html + "\n```"
            : ""
        }`,
        isUser: false,
        timestamp: new Date(),
        imageDataUrl: response.imageDataUrl,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      parent.postMessage(
        {
          pluginMessage: {
            type: "generate-ui-response",
            data: response,
          },
        },
        "*"
      );
    } catch (error) {
      console.error("UI 생성 중 오류 발생:", error);

      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: "UI 생성 중 오류가 발생했습니다. 다시 시도해주세요.",
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#262626] text-white">
      <div className="flex flex-col h-screen">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-4">
            {messages.map((message) => (
              <div key={message.id} className="mb-4">
                {message.isUser ? (
                  <UserMessage
                    message={message.message}
                    timestamp={message.timestamp}
                  />
                ) : (
                  <AssistantMessage
                    message={message.message}
                    timestamp={message.timestamp}
                    imageDataUrl={message.imageDataUrl}
                  />
                )}
              </div>
            ))}
            {isLoading && <LoadingIndicator />}
          </div>
        </div>
        <InputArea onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default App;
