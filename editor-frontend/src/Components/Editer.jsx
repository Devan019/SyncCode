import React, { useState, useEffect, useRef } from "react";
import { EditorView, basicSetup } from "codemirror";
import { EditorState, Compartment } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { oneDark } from "@codemirror/theme-one-dark";
import { autocompletion } from "@codemirror/autocomplete";

const languageCompartment = new Compartment();

const CodeEditor = () => {
  const editorRef = useRef();
  const [editor, setEditor] = useState(null);
  const [language, setLanguage] = useState("javascript");

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

  return (
    <div className="p-5 bg-gray-900 rounded-xl border border-gray-700 shadow-lg w-[65vw] mx-auto">
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
          className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition"
        >
          Run Code
        </button>
      </div>
      <div
        ref={editorRef}
        className="h-72 border border-gray-600 rounded-lg overflow-hidden p-2 text-white bg-gray-800 focus:ring-2 focus:ring-blue-400 transition-all"
      />
    </div>
  );
};

export default CodeEditor;
