import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

  * {
      margin: 0;
      padding: 0;
    }
    button {
      outline: none;
      cursor: pointer;
    }
    *,
    *::before,
    *::after {
      box-sizing: inherit;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    html {
      font-size: 62.5%;
      box-sizing: border-box;
    }
    body {
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 1.6rem;
      line-height: 1.6;
    }
    form,
    input,
    textarea,
    button,
    select,
    a {
      -webkit-tap-highlight-color: rgba(0,0,0,0);
    }
`;
