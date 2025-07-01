import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { theme, themeDark } from "./styles/theme";
import { GlobalStyle } from "./styles/global";
import { BrowserRouter } from "react-router-dom";

import { Navbar } from "./components/navbar/Navbar";
import { Footer } from "./components/footer/Footer";
import { ThemeToggle } from "./components/themeToggle/ThemeToggle";
import { PageWrapper } from "./App.styles";

import AppRoutes from "./routes";

function App() {
  const [themeMode, setThemeMode] = useState<"light" | "dark">(() => {
    return (localStorage.getItem("themeMode") as "light" | "dark") || "light";
  });

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
              <ThemeToggle themeMode={themeMode} setThemeMode={setThemeMode} />
            }
          />
          <AppRoutes />
          <Footer />
        </PageWrapper>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
