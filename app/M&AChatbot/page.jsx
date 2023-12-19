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
  const [hint, setHint] = useState(true);
  const [modalClose, setModalClose] = useState(false);
  const [hintClose, setHintClose] = useState(true);
  // const [rows, setRows] = useState(1);
  const ref = useRef(null);
  const URL = process.env.NEXT_PUBLIC_API_URL;

  // Scroll to newest chat
  // const hanldeScroll = () => {
  //   setRows(2);
  // };

  const scrollToElement = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToElement();
    textAreaSize();
  }, [messages]);

  // Load chat history

  const onLoad = async () => {
    const response = await fetch(`${URL}/get-history`, {
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
        `<b>🤖:</b>     ${history[2]}`
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

    const response = await fetch(`${URL}/`, {
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
      `<b>🤖:</b>     ${data.response}`,
    ]);

    // const parseText = await response.text();
    // const text = parseText.replace(/\\n/g, "<br />").replace(/\\/g, "");
    // setAImessage(text);

    setIsLoading(false);

    // chat.scrollTop = chat.scrollHeight;
  };

  const showModal = () => {
    if (modal == false) {
      setModal(true);
      setModalClose(true);
    }
    if (modal == true && modalClose == true) {
      setModal(false);
      setModalClose(false);
    }
  };

  const showHint = () => {
    if (hint == false) {
      setHint(true);
      setHintClose(true);
    }
    if (hint == true && hintClose == true) {
      setHint(false);
      setHintClose(false);
    }
  };

  const closeHint = () => {
    setHint(false);
  };

  const closeModal = () => {
    setModal(false);
  };

  const clearHistory = async () => {
    const response = await fetch(`${URL}/delete-history`, {
      method: "POST",
      body: JSON.stringify({ userid: userId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setMessages([]);
    setModal(false);
  };

  const textAreaSize = () => {
    const textarea = document.querySelector("textarea");

    textarea.style.height = "auto";

    let scHeight = textarea.scrollHeight;
    if (scHeight < 300) {
      textarea.style.height = `${scHeight}px`;
    }

    if (scHeight >= 300) {
      textarea.style.height = `300px`;
    }
  };

  // hints

  const hint1 = () => {
    document.getElementById("inputField").value =
      "Can you introduce the debt-equity ratio rules in China to me?";
    setUsermessage(
      "Can you introduce the debt-equity ratio rules in China to me?"
    );
    setHint(false);
    textAreaSize();
  };

  const hint2 = () => {
    document.getElementById("inputField").value =
      "What are rules about asset deals and equity deals in China?";
    setUsermessage(
      "What are rules about asset deals and equity deals in China?"
    );
    setHint(false);
    textAreaSize();
  };

  const hint3 = () => {
    document.getElementById("inputField").value =
      "Do you have any idea about the debt push down in M&A?";
    setUsermessage("Do you have any idea about the debt push down in M&A?");
    setHint(false);
    textAreaSize();
  };

  const hint4 = () => {
    document.getElementById("inputField").value =
      "Are there any CFC rules in China? Can you brief it for me?";
    setUsermessage(
      "Are there any CFC rules in China? Can you brief it for me?"
    );
    setHint(false);
    textAreaSize();
  };
  const hint5 = () => {
    document.getElementById("inputField").value =
      "What are different types of legal vehicles for my company to invest into China?";
    setUsermessage(
      "What are different types of legal vehicles for my company to invest into China?"
    );
    setHint(false);
    textAreaSize();
  };

  const hint6 = () => {
    document.getElementById("inputField").value =
      "Are there any policy or implications related to indirect share transfer for my Chinese subsidiary that I should pay attention to?";
    setUsermessage(
      "Are there any policy or implications related to indirect share transfer for my Chinese subsidiary that I should pay attention to?"
    );
    setHint(false);
    textAreaSize();
  };

  return (
    <div
      className="fixed top-20 bottom-24 left-0 right-0 text-sm overflow-auto flex flex-col justify-start"
      id="chat"
    >
      <div>
        {messages?.map((message, _index) => (
          <div key={_index}>
            <section
              dangerouslySetInnerHTML={{ __html: message }}
              className="sm:mx-10 ml-5"
            />
          </div>
        ))}
        <div ref={ref} />
      </div>
      {hint && (
        <container className="  ml-2 text-white items-center bg-slate-700 shadow-md justify-center flex rounded-xl p-2 text-sm fixed right5 sm:right-10 right-5 top-44 opacity-80 width-auto">
          <div>
            <button
              className="px-5 my-2  text-gray-300 hover:text-white"
              onClick={hint1}
            >
              Debt Equity Ratio?
            </button>
            <br />
            <button
              className="px-5 my-2 text-gray-300 hover:text-white"
              onClick={hint2}
            >
              Share acquisition vs asset acquisition?
            </button>
            <br />
            <button
              className="px-5 my-2 text-gray-300 hover:text-white"
              onClick={hint3}
            >
              Debt push down?
            </button>
            <br />
            <button
              className="px-5 my-2 text-gray-300 hover:text-white"
              onClick={hint4}
            >
              CFC Rules?
            </button>
            <br />

            <button
              className="px-5 my-2 text-gray-300 hover:text-white"
              onClick={hint5}
            >
              Legal Vehicles?
            </button>
            <br />

            <button
              className="px-5 my-2 text-gray-300 hover:text-white"
              onClick={hint6}
            >
              Indirect transfer?
            </button>
            <br />

            <div className="flex justify-evenly text-xs">
              <button
                className="bg=slate-700 hover:bg-slate-950 border border-solid rounded-lg p-2 mt-5 mb-2"
                onClick={closeHint}
              >
                Close
              </button>
            </div>
          </div>
        </container>
      )}

      <button
        onClick={showHint}
        className="hover:bg-slate-900 cursor-pointer ml-2 text-white items-center bg-slate-700 shadow-md justify-center flex rounded-xl p-2 text-xs opacity-30 fixed right-5 sm:right-10 top-24 w-14"
      >
        Show Hint
      </button>
      {modal && (
        <container className="  ml-2 text-white items-center bg-slate-700 shadow-md justify-center flex rounded-xl p-2 text-sm fixed right5 sm:right-10 right-5 bottom-44 opacity-80 width-auto">
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
        className="hover:bg-slate-900 cursor-pointer ml-2 text-white items-center bg-slate-700 shadow-md justify-center flex rounded-xl p-2 text-xs opacity-30 fixed right-5 sm:right-10 bottom-24 w-14"
      >
        Clear History
      </button>

      <div
        className={
          "fixed bottom-5 left-5 right-5 sm:left-10 sm:right-10 items-end flex"
        }
      >
        <div className="w-screen rounded-2xl overflow-hidden text-slate-400 flex flex-col text-sm">
          <form className="bg-gray-700 py-1 pr-1 pl-5 flex gap-0 items-center">
            <textarea
              type="text"
              autoComplete="off"
              name="message"
              required
              className="resize-none items-center bg-transparent rounded-md flex-1 max-h-fit text-slate-50 focus:ring-0 focus:outline-none"
              placeholder="Type your message here..."
              onChange={(e) => {
                setUsermessage(e.target.value);
                textAreaSize();
              }}
              rows={1}
              // onScroll={hanldeScroll}
              id="inputField"
            ></textarea>
            <button
              type="submit"
              onClick={onSubmit}
              className="hover:bg-slate-600 cursor-pointer  items-center text-white font-bold opacity-80  justify-center flex rounded-xl p-4"
            >
              {isLoading ? "⏳" : "GO"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Playground;
