import AnimatedTooltip from "../Components/ui/animated-tooltip";
import React, { useState, useEffect, useRef } from "react";
import { EditorView, basicSetup } from "codemirror";
import { EditorState, Compartment } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { oneDark } from "@codemirror/theme-one-dark";
import { autocompletion } from "@codemirror/autocomplete";
import { RiFolderFill } from "react-icons/ri";
import { FileUpload } from "./ui/file_upload";
import { Navbar } from "./Navbar";




const languageCompartment = new Compartment();

const CodeEditor = () => {

  const [files, setFiles] = useState([]);
  const handleFileUpload = (files) => {
    setFiles(files);
    console.log(files);
  };

  const editorRef = useRef();
  const [editor, setEditor] = useState(null);
  const [language, setLanguage] = useState("javascript");
  const [filename, setFilename] = useState("untitled");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const people = [
    {
      id: 1,
      name: "John Doe",
      designation: "Software Engineer",
      image:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    },
    {
      id: 2,
      name: "Robert Johnson",
      designation: "Product Manager",
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 3,
      name: "Jane Smith",
      designation: "Data Scientist",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 4,
      name: "Emily Davis",
      designation: "UX Designer",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    // {
    //   id: 5,
    //   name: "Tyler Durden",
    //   designation: "Soap Developer",
    //   image:
    //     "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
    // },
    // {
    //   id: 6,
    //   name: "Dora",
    //   designation: "The Explorer",
    //   image:
    //     "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
    // },
  ];

  const demoFiles = [
    { name: "index.js", language: "javascript", content: "console.log('Hello, JavaScript!');" },
    { name: "script.py", language: "python", content: "print('Hello, Python!')" },
    { name: "Main.java", language: "java", content: "public class Main { public static void main(String[] args) { System.out.println('Hello, Java!'); } }" },
    { name: "program.cpp", language: "cpp", content: "#include <iostream>\nusing namespace std;\nint main() { cout << 'Hello, C++!'; return 0; }" },
  ];

  // Function to get file extension based on language
  const getFileExtension = (lang) => {
    switch (lang) {
      case "javascript":
        return ".js";
      case "python":
        return ".py";
      case "java":
        return ".java";
      case "cpp":
        return ".cpp";
      default:
        return "";
    }
  };

  function submitHandler() {
    if (!editor) {
      console.error("Editor is not initialized yet.");
      return;
    }

    setCode(editor.state.doc.toString());

    const obj = {
      filename: filename + getFileExtension(language), // ✅ Set filename with extension
      language: language,
      code: editor.state.doc.toString(),
    };

    fetch(import.meta.env.VITE_COMPILER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setOutput(data);
      })
      .catch((error) => console.error("Error:", error));
  }

  useEffect(() => {
    if (!editorRef.current) return;

    let languageExtension;
    switch (language) {
      case "javascript":
        languageExtension = javascript();
        break;
      case "python":
        languageExtension = python();
        break;
      case "java":
        languageExtension = java();
        break;
      case "cpp":
        languageExtension = cpp();
        break;
      default:
        languageExtension = javascript();
    }

    const startState = EditorState.create({
      doc: "", // Initial code
      extensions: [
        basicSetup,
        autocompletion(),
        oneDark,
        languageCompartment.of(languageExtension),
      ],
    });

    const view = new EditorView({
      state: startState,
      parent: editorRef.current,
    });

    setEditor(view);

    return () => {
      view.destroy();
    };
  }, [language]);

  function download() {
    if (!editor) return;

    const fileContent = editor.state.doc.toString();
    const fileBlob = new Blob([fileContent], { type: "text/plain" });
    const fileExtension = getFileExtension(language);
    const a = document.createElement("a");
    a.href = URL.createObjectURL(fileBlob);
    a.download = filename + fileExtension;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (


    <div className="overflow-hidden">
      <div className=" flex flex-row justify-between">
        <Navbar />
        {/* Sidebar */}
        <div className="w-[20vw]">
          <div className={`fixed left-0 top-0 h-full w-60 bg-gray-900 text-white shadow-lg transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-64"}`}>
            <button onClick={() => setSidebarOpen(false)} className="absolute top-2 right-3 text-white text-xl">✖</button>
            <h2 className="p-4 text-lg font-bold border-b border-gray-700">Files</h2>
            <ul className="p-3">
              {demoFiles.map((file) => (
                <li key={file.name} className="p-2 hover:bg-gray-700 cursor-pointer" onClick={() => loadDemoFile(file)}>
                  {file.name}
                </li>
              ))}
            </ul>
          </div>
          <button onClick={() => setSidebarOpen(true)} className="fixed left-2 top-2 bg-transparent">
            <RiFolderFill size={24} className="text-yellow-500 cursor-pointer" />
          </button>
        </div>

        {/* Editor */}
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

        {/* sidebar2 */}
        <div className="flex flex-col  justify-around items-center">
          {/* tooltip */}
          <div className="w-[20vw] flex justify-center mt-16">
            <AnimatedTooltip items={people} />

          </div>

          {/* upload */}
          <div>
          <FileUpload onChange={handleFileUpload} />
          </div>

          {/* filename */}
          <div>
            <input
              type="text"
              className="px-3 py-2 bg-gray-800 text-white rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-400"
              placeholder="Enter filename"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
            />
            <p className="text-gray-400 text-sm">Filename: {filename + getFileExtension(language)}</p>
          </div>
        </div>
      </div>
    </div>





  );
};

export default CodeEditor;
