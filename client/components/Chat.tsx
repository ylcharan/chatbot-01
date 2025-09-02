"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function Chat() {
  const [reply, setReply] = useState("");
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);

  const sendMessage = async () => {
    setReply("Thinking...");
    setChat((prev) => [...prev, { role: "user", content: msg }]);
    const res = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: msg }),
    });

    const data = await res.json();

    setReply(data.reply);
    setChat((prev) => [...prev, { role: "assistant", content: data.reply }]);
    setMsg("");
  };
  return (
    <div className="flex flex-col gap-4 justify-between w-[80%] overflow-hidden p-5">
      <div className="w-full">
        {chat.map((message, index) => (
          <div
            key={index}
            className={`text-xl w-max mt-2 ${
              message.role === "user"
                ? "ml-auto bg-gray-200 p-2 rounded-2xl text-slate-600 rounded-tr-none"
                : "text-black"
            }`}
          >
            <div className="flex flex-col gap-0.5 text-[16px] overflow-ellipsis">
              <div className="text-gray-500 text-[14px]">
                {message.role === "user" ? "" : "assistance :"}
              </div>
              <div className={`${message.role === "user" ? "" : "w-[750px]"}`}>
                {message.content}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mx-auto">
        <Input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          type="text"
          placeholder="Ask anything"
          className="w-[400px]"
        />
        <Button onClick={sendMessage} type="submit" variant="outline">
          Send
        </Button>
      </div>
    </div>
  );
}
