import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../app/store";
import "../styles/fonts.css";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
);

export default MyApp;
