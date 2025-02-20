
import React, { useState, useEffect, useRef } from "react";
import { EditorView, basicSetup } from "codemirror";
import { EditorState, Compartment } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { oneDark } from "@codemirror/theme-one-dark";
import { autocompletion } from "@codemirror/autocomplete";
import { Navbar } from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import Workspace from "../Components/Workspace";
import ToolTipbar from '../Components/ToolTipbar'
import getFileExtension from "../../public/getFileExtension";
import getLanguageFromExtension from "../../public/getLanguage";

const languageCompartment = new Compartment();

const Editor = () => {

  const editorRef = useRef();
  const [editor, setEditor] = useState(null);
  const [language, setLanguage] = useState("javascript");
  const [filename, setFilename] = useState("untitled");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const codeSetToEditor = (intialCode) => {
    if (!editorRef.current) return;
  
    // Destroy the previous editor instance if it exists
    if (editor) {
      editor.destroy();
    }
  
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
      doc: intialCode, // Load new code
      extensions: [
        basicSetup,
        autocompletion(),
        oneDark,
        languageCompartment.of(languageExtension),
      ],
    });
  
    const newView = new EditorView({
      state: startState,
      parent: editorRef.current,
    });
  
    setEditor(newView); // Store the new editor instance
  };
  

  const handleFileUpload = (files) => {
    const file = files[0];
    if (file) {
      let fileName = file.name;
      const fileExtension = fileName.split('.').pop();
      
      if (getLanguageFromExtension(fileExtension) === "Unknown") return;
  
      setLanguage(getLanguageFromExtension(fileExtension));

      fileName = fileName.replace(/\.[^.]+$/, ""); 
      setFilename(fileName);
  
      const fileReader = new FileReader();
      fileReader.onload = function (evt) {
        codeSetToEditor(evt.target.result);
      };
      fileReader.readAsText(file);
  
      console.log(file);
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
   codeSetToEditor("")
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
        <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        />

        {/* Editor */}
        <Workspace
        language={language}
        setLanguage={setLanguage}
        submitHandler={submitHandler}
        output={output}
        editorRef={editorRef}
        download={download}
        />

        {/* sidebar2 */}
        <ToolTipbar
        language={language}
        handleFileUpload={handleFileUpload}
        filename={filename}
        setFilename={setFilename}
        getFileExtension={getFileExtension}
        />
      </div>
    </div>

  );
};

export default Editor;
