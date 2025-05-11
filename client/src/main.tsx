import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./i18n";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { TranslationProvider } from "./providers/TranslationProvider";
import { Provider } from "react-redux";
import { store } from "./redux/store";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <TranslationProvider>
        <App />
      </TranslationProvider>
    </I18nextProvider>
  </Provider>,
);
