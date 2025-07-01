import { FaMoon, FaSun } from "react-icons/fa";
import { ToggleBtn } from "./styled";

interface ThemeToggleProps {
  themeMode: "light" | "dark";
  setThemeMode: (mode: "light" | "dark") => void;
}

export function ThemeToggle({ themeMode, setThemeMode }: ThemeToggleProps) {
  return (
    <ToggleBtn
      onClick={() => setThemeMode(themeMode === "light" ? "dark" : "light")}
      title={themeMode === "light" ? "Modo escuro" : "Modo claro"}
    >
      {themeMode === "light" ? <FaMoon /> : <FaSun />}
    </ToggleBtn>
  );
}
