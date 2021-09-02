import Head from "next/head";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html,
  body {
    background-color: #000000;
    background-image: linear-gradient(rgb(212, 214, 234), rgb(156, 189, 134));
    color: #000000;
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
      Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
      sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;

    :hover, :focus, :active {
      text-decoration: underline;
    }
  }
  
  * {
    box-sizing: border-box;
    transition: all 200ms linear;
  }
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
