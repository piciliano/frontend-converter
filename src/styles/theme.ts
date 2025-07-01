export const theme = {
  colors: {
    primary: "#005CA9",
    text: "#6c757d",
    background: "#fff",
    title: "#fff",
    error: "#d32f2f",
    success: "#388e3c",
    border: "#e0e0e0",
    card: "#fff",
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
    title: "#fff",
    error: "#ff6b6b",
    success: "#4caf50",
    border: "#23283a",
    card: "#23283a",
  },
  font: theme.font,
  spacing: theme.spacing,
};
