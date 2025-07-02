import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { theme, themeDark } from "./styles/theme";
import { GlobalStyle } from "./styles/global";
import { BrowserRouter } from "react-router-dom";

import { Navbar } from "./components/navbar/Navbar";
import { Footer } from "./components/footer/Footer";
import { ThemeToggle } from "./components/themeToggle/ThemeToggle";
import { PageWrapper } from "./App.styles";
import { HelpButton } from "./components/HelpButton";
import { ChatFloatingButton } from "./components/ChatFloatingButton";
import { ChatWidget } from "./components/ChatWidget";

import AppRoutes from "./routes";

function App() {
  const [themeMode, setThemeMode] = useState<"light" | "dark">(() => {
    return (localStorage.getItem("themeMode") as "light" | "dark") || "light";
  });
  const [chatAberto, setChatAberto] = useState(false);

  useEffect(() => {
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);

  return (
    <ThemeProvider theme={themeMode === "dark" ? themeDark : theme}>
      <GlobalStyle />
      <BrowserRouter>
        <PageWrapper>
          <Navbar
            rightExtra={
              <>
                <HelpButton onClick={() => setChatAberto(true)} />
                <ThemeToggle themeMode={themeMode} setThemeMode={setThemeMode} />
              </>
            }
          />
          <AppRoutes />
          <Footer />
          <ChatFloatingButton onClick={() => setChatAberto(true)} />
          <ChatWidget open={chatAberto} onClose={() => setChatAberto(false)} />
        </PageWrapper>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
