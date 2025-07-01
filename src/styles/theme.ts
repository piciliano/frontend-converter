export const theme = {
  colors: {
    primary: "#005CA9",
    text: "#6c757d",
    background: "#fff",
    secondaryBackground: "#f8f9fa",
    title: "#222",
    cardTitle: "#222",
    cardDesc: "#6c757d",
    error: "#d32f2f",
    success: "#388e3c",
    border: "#e0e0e0",
    card: "#fff",
    shadow: "0 2px 8px rgba(0,0,0,0.06)",
    hoverBackground: "#f8fafc",
    hoverText: "#2d3748",
  },
  font: {
    family: "Roboto, Arial, sans-serif",
    size: {
      small: "0.875rem",
      medium: "1rem",
      large: "1.25rem",
      title: "2rem",
    },
    weight: {
      normal: 400,
      bold: 700,
    },
  },
  spacing: (factor: number) => `${factor * 8}px`,
};

export const themeDark = {
  colors: {
    primary: "#005CA9",
    text: "#bfc8d6",
    background: "#181c24",
    secondaryBackground: "#23283a",
    title: "#fff",
    cardTitle: "#fff",
    cardDesc: "#bfc8d6",
    error: "#ff6b6b",
    success: "#4caf50",
    border: "#23283a",
    card: "#23283a",
    shadow: "0 2px 8px rgba(0,0,0,0.4)",
    hoverBackground: "#23283a",
    hoverText: "#fff",
  },
  font: theme.font,
  spacing: theme.spacing,
};
