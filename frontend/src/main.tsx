import React from "react";
import ReactDOM from "react-dom/client";
import {AuthenticationResult, EventType, PublicClientApplication} from "@azure/msal-browser";
import {msalConfig} from "./authConfig.ts";
import {MsalProvider} from "@azure/msal-react";
import App from "./App.tsx";
import {ThemeProvider, createTheme } from "@mui/material";
// import "../src/styles/berry-free-react-admin-template/remix/app/styles/style.css";
import berryTheme from "./styles/theme.ts";

const msalInstance = new PublicClientApplication(msalConfig);

// Default to using the first account if no account is active on page load
if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
    // Account selection logic is app dependent. Adjust as needed for different use cases.
    msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
}

msalInstance.addEventCallback((event) => {

    console.debug('Event received:', event.eventType);

    if (
        (event.eventType === EventType.LOGIN_SUCCESS ||
            event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS ||
            event.eventType === EventType.SSO_SILENT_SUCCESS) &&
        event.payload && (event.payload as AuthenticationResult).account
    ) {
        msalInstance.setActiveAccount((event.payload as AuthenticationResult).account);
    }
});
const theme = createTheme(berryTheme);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <MsalProvider instance={msalInstance}>
            <ThemeProvider  theme={theme}>
            <App/>
            </ThemeProvider>
        </MsalProvider>
    </React.StrictMode>
);
