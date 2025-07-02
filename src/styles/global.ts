import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Muller';
    src: url('/fonts/MullerHairline.ttf') format('truetype');
    font-weight: 100;
    font-style: normal;
  }
  @font-face {
    font-family: 'Muller';
    src: url('/fonts/MullerHairlineItalic.ttf') format('truetype');
    font-weight: 100;
    font-style: italic;
  }
  @font-face {
    font-family: 'Muller';
    src: url('/fonts/MullerUltraLight.ttf') format('truetype');
    font-weight: 200;
    font-style: normal;
  }
  @font-face {
    font-family: 'Muller';
    src: url('/fonts/MullerUltraLightItalic.ttf') format('truetype');
    font-weight: 200;
    font-style: italic;
  }
  @font-face {
    font-family: 'Muller';
    src: url('/fonts/MullerThin.ttf') format('truetype');
    font-weight: 300;
    font-style: normal;
  }
  @font-face {
    font-family: 'Muller';
    src: url('/fonts/MullerThinItalic.ttf') format('truetype');
    font-weight: 300;
    font-style: italic;
  }
  @font-face {
    font-family: 'Muller';
    src: url('/fonts/MullerLight.ttf') format('truetype');
    font-weight: 350;
    font-style: normal;
  }
  @font-face {
    font-family: 'Muller';
    src: url('/fonts/MullerLightItalic.ttf') format('truetype');
    font-weight: 350;
    font-style: italic;
  }
  @font-face {
    font-family: 'Muller';
    src: url('/fonts/MullerRegular.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: 'Muller';
    src: url('/fonts/MullerRegularItalic.ttf') format('truetype');
    font-weight: 400;
    font-style: italic;
  }
  @font-face {
    font-family: 'Muller';
    src: url('/fonts/MullerMedium.ttf') format('truetype');
    font-weight: 500;
    font-style: normal;
  }
  @font-face {
    font-family: 'Muller';
    src: url('/fonts/MullerMediumItalic.ttf') format('truetype');
    font-weight: 500;
    font-style: italic;
  }
  @font-face {
    font-family: 'Muller';
    src: url('/fonts/MullerBold.ttf') format('truetype');
    font-weight: 700;
    font-style: normal;
  }
  @font-face {
    font-family: 'Muller';
    src: url('/fonts/MullerBoldItalic.ttf') format('truetype');
    font-weight: 700;
    font-style: italic;
  }
  @font-face {
    font-family: 'Muller';
    src: url('/fonts/MullerExtraBold.ttf') format('truetype');
    font-weight: 800;
    font-style: normal;
  }
  @font-face {
    font-family: 'Muller';
    src: url('/fonts/MullerExtraBoldItalic.ttf') format('truetype');
    font-weight: 800;
    font-style: italic;
  }
  @font-face {
    font-family: 'Muller';
    src: url('/fonts/MullerHeavy.ttf') format('truetype');
    font-weight: 850;
    font-style: normal;
  }
  @font-face {
    font-family: 'Muller';
    src: url('/fonts/MullerHeavyItalic.ttf') format('truetype');
    font-weight: 850;
    font-style: italic;
  }
  @font-face {
    font-family: 'Muller';
    src: url('/fonts/MullerBlack.ttf') format('truetype');
    font-weight: 900;
    font-style: normal;
  }
  @font-face {
    font-family: 'Muller';
    src: url('/fonts/MullerBlackItalic.ttf') format('truetype');
    font-weight: 900;
    font-style: italic;
  }

  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }
  body {
    font-family: 'Muller', 'Roboto', Arial, sans-serif;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.colors.title};
    font-weight: ${({ theme }) => theme.font.weight.bold};
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  button {
    font-family: inherit;
    cursor: pointer;
  }
`; 