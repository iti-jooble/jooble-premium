import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
// Import i18n initialization file
import "./i18n";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { TranslationProvider } from "./components/TranslationProvider";

createRoot(document.getElementById("root")!).render(
  <I18nextProvider i18n={i18n}>
    <TranslationProvider>
      <App />
    </TranslationProvider>
  </I18nextProvider>
);
