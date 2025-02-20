const getFileExtension = (lang) => {
  switch (lang.toLowerCase()) {
    case "javascript":
      return ".js";
    // case "typescript":
    //   return ".ts";
    case "python":
      return ".py";
    case "java":
      return ".java";
    case "c":
      return ".c";
    case "cpp":
    case "c++":
      return ".cpp";
    // case "csharp":
    // case "c#":
    //   return ".cs";
    // case "ruby":
    //   return ".rb";
    // case "php":
    //   return ".php";
    // case "swift":
    //   return ".swift";
    // case "kotlin":
    //   return ".kt";
    // case "go":
    //   return ".go";
    // case "rust":
    //   return ".rs";
    // case "dart":
    //   return ".dart";
    // case "html":
    //   return ".html";
    // case "css":
    //   return ".css";
    // case "json":
    //   return ".json";
    // case "xml":
    //   return ".xml";
    // case "yaml":
    // case "yml":
    //   return ".yaml";
    // case "sql":
    //   return ".sql";
    // case "r":
    //   return ".r";
    // case "shell":
    // case "bash":
    //   return ".sh";
    // case "perl":
    //   return ".pl";
    // case "lua":
    //   return ".lua";
    // case "scala":
    //   return ".scala";
    // case "haskell":
    //   return ".hs";
    // case "elixir":
    //   return ".ex";
    // case "erlang":
    //   return ".erl";
    // case "matlab":
    //   return ".m";
    // case "vb":
    // case "visual basic":
    //   return ".vb";
    default:
      return "Unknow";
  }
};

export default getFileExtension;
