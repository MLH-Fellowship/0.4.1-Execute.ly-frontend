import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./themes/GlobalStyle";
import Routes from "./routes";

function App() {
  return (
    <ThemeProvider theme={{}}>
      <>
        <GlobalStyle />
          <Routes />
      </>
    </ThemeProvider>
  );
}

export default App;
