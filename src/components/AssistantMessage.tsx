import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState } from "react";

interface AssistantMessageProps {
  message: string;
  timestamp: Date;
  imageDataUrl?: string;
}

const AssistantMessage = ({
  message,
  timestamp,
  imageDataUrl,
}: AssistantMessageProps) => {
  const [downloadClicked, setDownloadClicked] = useState(false);
  const [copyClicked, setCopyClicked] = useState(false);

  const theme = {
    ...oneDark,
    hljs: { ...(oneDark as any).hljs, background: "transparent" },
    'pre[class*="language-"]': {
      ...(oneDark as any)['pre[class*="language-"]'],
      background: "transparent",
    },
    'code[class*="language-"]': {
      ...(oneDark as any)['code[class*="language-"]'],
      background: "transparent",
    },
  };

  const handleDownload = () => {
    if (imageDataUrl) {
      setDownloadClicked(true);

      const link = document.createElement("a");
      link.href = imageDataUrl;
      link.download = "generated-ui.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => setDownloadClicked(false), 1000);
    }
  };

  const handleCopyCode = (code: string) => {
    setCopyClicked(true);

    navigator.clipboard
      .writeText(code)
      .then(() => {
        console.log("코드가 클립보드에 복사되었습니다.");
        setTimeout(() => setCopyClicked(false), 1000);
      })
      .catch((err) => {
        console.error("복사 실패:", err);
        setTimeout(() => setCopyClicked(false), 1000);
      });
  };

  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto">
        {imageDataUrl && (
          <div className="mb-4 max-w-[70%] relative group">
            <img
              src={imageDataUrl}
              alt="Generated UI"
              className="w-full rounded-lg shadow-lg"
            />
            <button
              onClick={handleDownload}
              className="absolute top-2 right-2 bg-black/70 hover:bg-black/90 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              {downloadClicked ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 17V3" />
                  <path d="m6 11 6 6 6-6" />
                  <path d="M19 21H5" />
                </svg>
              )}
            </button>
          </div>
        )}

        <div className="prose prose-invert max-w-none text-sm">
          <ReactMarkdown
            components={{
              code: ({ className, children, ...props }: any) => {
                const match = /language-(\w+)/.exec(className || "");
                const isInline = !match;

                if (!isInline && match) {
                  const codeString = String(children).replace(/\n$/, "");
                  return (
                    <div className="relative group bg-[#303030] rounded-lg p-4 overflow-x-auto">
                      <SyntaxHighlighter
                        style={theme}
                        language={match[1]}
                        PreTag="div"
                        customStyle={{
                          margin: 0,
                          borderRadius: "8px",
                          fontSize: "14px",
                          lineHeight: "1.5",
                          background: "transparent",
                        }}
                      >
                        {codeString}
                      </SyntaxHighlighter>
                      <button
                        onClick={() => handleCopyCode(codeString)}
                        className="absolute top-2 right-2 bg-black/70 hover:bg-black/90 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        {copyClicked ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect
                              width="14"
                              height="14"
                              x="8"
                              y="8"
                              rx="2"
                              ry="2"
                            />
                            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                          </svg>
                        )}
                      </button>
                    </div>
                  );
                }

                return (
                  <code
                    className="bg-[#303030] px-1 py-0.5 rounded text-sm"
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
              p: ({ children }: any) => (
                <p className="mb-2 last:mb-0 text-gray-100 text-sm">
                  {children}
                </p>
              ),
              h1: ({ children }: any) => (
                <h1 className="text-lg font-bold mb-2 text-gray-100">
                  {children}
                </h1>
              ),
              h2: ({ children }: any) => (
                <h2 className="text-base font-bold mb-2 text-gray-100">
                  {children}
                </h2>
              ),
              h3: ({ children }: any) => (
                <h3 className="text-sm font-bold mb-2 text-gray-100">
                  {children}
                </h3>
              ),
              ul: ({ children }: any) => (
                <ul className="list-disc list-inside mb-2 space-y-1 text-gray-100 text-sm">
                  {children}
                </ul>
              ),
              ol: ({ children }: any) => (
                <ol className="list-decimal list-inside mb-2 space-y-1 text-gray-100 text-sm">
                  {children}
                </ol>
              ),
              li: ({ children }: any) => (
                <li className="text-sm text-gray-100">{children}</li>
              ),
              blockquote: ({ children }: any) => (
                <blockquote className="border-l-4 border-gray-500 pl-4 italic text-gray-300 text-sm">
                  {children}
                </blockquote>
              ),
            }}
          >
            {message}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default AssistantMessage;
