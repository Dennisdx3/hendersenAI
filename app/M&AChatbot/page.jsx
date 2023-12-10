"use client";

import { useAuth } from "@clerk/nextjs";
import { useState, useEffect, useRef } from "react";

const Playground = () => {
  const { userId } = useAuth();
  const [userMessage, setUsermessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const [messages, setMessages] = useState([]);
  const [modal, setModal] = useState(false);
  const ref = useRef(null);

  // Scroll to newest chat

  const scrollToElement = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToElement();
  }, [messages]);

  // Load chat history

  const onLoad = async () => {
    const response = await fetch("http://localhost:8000/get-history", {
      method: "POST",
      body: JSON.stringify({ userid: userId }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(setHistoryLoaded(true));

    const data = (await response.json()).history;

    const chatHistory = [];

    data.forEach((history) => {
      chatHistory.push(
        `<b>You:</b>     ${history[1]}`,
        `<b>Bot:</b>     ${history[2]}`
      );
    });
    setMessages(chatHistory);
    setIsLoading(false);
  };

  if (!historyLoaded) {
    onLoad();
  }

  // Handle query

  const onSubmit = async (e) => {
    e.preventDefault();
    // const formData = new FormData(e.currentTarget);
    // const prompt = formData.get("message");

    const prompt = {
      userid: userId,
      content: userMessage,
    };

    if (prompt.content.length === 0 || isLoading) return;
    setMessages([...messages, `<b>You:</b>     ${userMessage}`]);

    setIsLoading(true);
    document.getElementById("inputField").value = "";
    // setUsermessage("");

    const response = await fetch("http://localhost:8000", {
      method: "POST",
      body: JSON.stringify(prompt),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    setMessages([
      ...messages,
      `<b>You:</b>     ${data.message}`,
      `<b>Bot:</b>     ${data.response}`,
    ]);

    // const parseText = await response.text();
    // const text = parseText.replace(/\\n/g, "<br />").replace(/\\/g, "");
    // setAImessage(text);

    setIsLoading(false);

    // chat.scrollTop = chat.scrollHeight;
  };

  const showModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const clearHistory = async () => {
    const response = await fetch("http://localhost:8000/delete-history", {
      method: "POST",
      body: JSON.stringify({ userid: userId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setMessages([]);
    setModal(false);
  };

  return (
    <div
      className="fixed top-20 bottom-24 left-8 right-0 text-sm overflow-auto flex flex-col justify-start"
      id="chat"
    >
      <div>
        {messages?.map((message, _index) => (
          <div key={_index}>
            <section dangerouslySetInnerHTML={{ __html: message }} />
          </div>
        ))}
        <div ref={ref} />
      </div>
      {modal && (
        <container className="  ml-2 text-white items-center bg-slate-700 shadow-md justify-center flex rounded-xl p-2 text-sm fixed right-10 bottom-44 opacity-80 width-auto">
          <div>
            <p className="p-5 mb-5">Are you sure to clear all chat history?</p>
            <div className="flex justify-evenly text-xs">
              <button
                className="bg=slate-700 hover:bg-slate-950 border border-solid rounded-lg p-2 mb-2"
                onClick={clearHistory}
              >
                Yes, Clear
              </button>
              <button
                className="bg=slate-700 hover:bg-slate-950 border border-solid rounded-lg p-2 mb-2"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </container>
      )}

      <button
        onClick={showModal}
        className="hover:bg-slate-900 cursor-pointer ml-2 text-white items-center bg-slate-700 shadow-md justify-center flex rounded-xl p-2 text-xs opacity-30 fixed right-10 bottom-24 w-14"
      >
        Clear History
      </button>

      <div className={"fixed bottom-5 left-10 right-10 items-end flex"}>
        <div className="w-screen opacity-90 rounded-2xl overflow-hidden text-slate-400 flex flex-col text-sm">
          <form className="bg-gray-900 -mr-0 py-1 pr-1 pl-5 flex gap-0 items-center">
            <input
              type="text"
              autoComplete="off"
              name="message"
              required
              className=" bg-transparent rounded-md flex-1 max-h-56 w-64 text-slate-50 focus:ring-0 focus:outline-none"
              placeholder="Type your message here..."
              onChange={(e) => setUsermessage(e.target.value)}
              id="inputField"
            ></input>
            <button
              type="submit"
              onClick={onSubmit}
              className="hover:bg-slate-600 cursor-pointer outline outline-1 outline-offset-4 outline-slate-800 text-white items-center border border-x-slate-700 border-b-slate-700 border-t-slate-600 bg-slate-700 opacity-80 shadow-md justify-center flex rounded-xl p-4"
            >
              {isLoading ? "⏳" : "🚀"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Playground;
