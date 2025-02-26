import React, { useContext, useState } from "react";
import Loader from "./ui/Loader";
import { SocketIo } from "../contexts/SocketContex";

const Workspace = ({ language, setLanguage, submitHandler, output, editorRef, download, loading, saveFile }) => {
  const { socketId, socket } = useContext(SocketIo);
  const [receiverEmail, setReceiverEmail] = useState("");

  const sendSocketId = () => {
    if (!receiverEmail) {
      alert("Please enter a valid email to send the socket ID.");
      return;
    }

    if (socket && socketId) {
      socket.send(
        JSON.stringify({ type: "socket_id", senderSocketId: socketId, receiverEmail })
      );
      alert(`Socket ID sent to ${receiverEmail}!`);
    } else {
      alert("WebSocket not connected!");
    }
  };

  return (
    <div className="relative mt-30 w-[60vw] bg-gray-900 border-gray-700 p-5 rounded-xl border shadow-lg mx-auto text-white">
      {/* Socket ID Display */}
      <div className="mb-3 bg-gray-800 p-3 rounded-md flex flex-col gap-2">
        <h2 className="text-blue-400 font-semibold">
          Socket ID: {socketId ? <span className="text-green-400">{socketId}</span> : "Connecting..."}
        </h2>

        <div className="flex items-center gap-3">
          <input
            type="email"
            placeholder="Enter Email to Send"
            value={receiverEmail}
            onChange={(e) => setReceiverEmail(e.target.value)}
            className="px-3 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-400 w-full"
          />
          <button
            onClick={sendSocketId}
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition"
          >
            Send
          </button>
        </div>
      </div>

      {/* Loader */}
      <Loader className={`absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 ${loading}`} />

      {/* Language Selector & Run Button */}
      <div className="flex justify-between items-center mb-3">
        <select
          className="px-3 py-2 bg-gray-800 text-white rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-400"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
        </select>

        <button
          onClick={submitHandler}
          className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition"
        >
          Run Code
        </button>
      </div>

      {/* Code Editor */}
      <div
        ref={editorRef}
        className="h-72 border border-gray-600 rounded-lg overflow-hidden p-2 text-white bg-gray-800 focus:ring-2 focus:ring-blue-400 transition-all"
      />

      {/* Output Section */}
      <pre className="bg-gray-800 text-white p-3 rounded-md">{output.output}</pre>

      {/* Save & Download Buttons */}
      <div className="flex justify-between">
        <button
          onClick={saveFile}
          className="mt-4 px-5 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 transition"
        >
          Save Code
        </button>
        <button
          onClick={download}
          className="mt-4 px-5 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 transition"
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default Workspace;
