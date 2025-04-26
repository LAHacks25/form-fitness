import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <Auth0Provider
      domain="dev-ggn0ietjt3kd77u5.us.auth0.com"
      clientId="5c3ZCQrruAcSIhbHxUs5EUxSAn5FEMsF"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <App />
    </Auth0Provider>
  </BrowserRouter>
);
