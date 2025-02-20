const getLanguageFromExtension = (extension) => {
  switch (extension) {
    case "js":
      return "JavaScript";
    case "py":
      return "Python";
    case "java":
      return "Java";
    case "cpp":
      return "C++";
    case "c":
      return "C";
    // case "cs":
    //   return "C#";
    // case "ts":
    //   return "TypeScript";
    // case "rb":
    //   return "Ruby";
    // case "php":
    //   return "PHP";
    // case "swift":
    //   return "Swift";
    // case "kt":
    //   return "Kotlin";
    // case "go":
    //   return "Go";
    // case "rs":
    //   return "Rust";
    // case "dart":
    //   return "Dart";
    // case "html":
    //   return "HTML";
    // case "css":
    //   return "CSS";
    // case "json":
    //   return "JSON";
    // case "xml":
    //   return "XML";
    // case "sh":
    //   return "Shell Script";
    // case "sql":
    //   return "SQL";
    default:
      return "Unknown";
  }
};

export default getLanguageFromExtension;
