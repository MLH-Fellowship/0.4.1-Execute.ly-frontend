import React from "react";
import { ThemeProvider } from "styled-components";
import { Provider } from "unstated";

import GlobalStyle from "./themes/GlobalStyle";
import theme from './themes/theme';
import Routes from "./routes";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <Provider>
          <Routes />
        </Provider>
      </>
    </ThemeProvider>
  );
}

export default App;
