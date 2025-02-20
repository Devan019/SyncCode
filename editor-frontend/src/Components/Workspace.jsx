import React from 'react'



const Workspace = ({language, setLanguage, submitHandler, output, editorRef, download}) => {
  return (
    <div className="mt-30 w-[60vw] bg-gray-900  border-gray-700 p-5 rounded-xl border shadow-lg  mx-auto">
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


          <div
            ref={editorRef}
            className="h-72 border border-gray-600 rounded-lg overflow-hidden p-2 text-white bg-gray-800 focus:ring-2 focus:ring-blue-400 transition-all"
          />

          <pre className="bg-gray-800 text-white p-3 rounded-md">{output.output}</pre>

          <div className="flex justify-between">
            <button className="mt-4 px-5 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 transition">
              Save Code
            </button>
            <button onClick={download} className="mt-4 px-5 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 transition">
              Download
            </button>
          </div>

        </div>
  )
}

export default Workspace