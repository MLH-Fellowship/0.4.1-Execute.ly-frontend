const constants = {
  SERVER_URL: process.env.REACT_APP_SERVER_URL,
  SERVER_URL_PYTHON: process.env.REACT_APP_SERVER_URL_PYTHON,
};

export const languageList = [
  { label: "C (GCC 8.1.0)", value: "c99 2 c_cpp" },
  { label: "C++ (GCC 8.1.0)", value: "cpp 3 c_cpp" },
  { label: "NodeJS (10.1.0)", value: "nodejs 2 javascript" },
  { label: "Python (2.7.15)", value: "python2 1 python" },
  { label: "Python (3.6.5)", value: "python3 1 python" }
];

export const themeList = [
  { label: "Monokai", value: "monokai" },
  { label: "Github", value: "github" },
  { label: "Solarized Dark", value: "solarized_dark" },
  { label: "Dracula", value: "dracula" },
  { label: "Cobalt", value: "cobalt" }
];

export const fontSizeList = [
  { label: "12", value: "12" },
  { label: "14", value: "14" },
  { label: "16", value: "16" },
  { label: "18", value: "18" },
  { label: "20", value: "20" },
  { label: "18", value: "18" }
];
 
export default constants;
