import { useState, useEffect } from "react";

const LoadingIndicator = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev === "...") return "";
        return prev + ".";
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto">
        <div className="flex gap-1">
          <span className="text-gray-100 text-sm">
            UI를 생성중이에요. 잠시만 기다려주세요{dots}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
