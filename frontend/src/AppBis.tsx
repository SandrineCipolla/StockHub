import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import StocksList from "./components/StocksList";
import "./App.css";
import Home from "./pages/home/Home.tsx";
import StockDetailsWithItems from "./components/StockDetailsWithItems.tsx";
import ItemsList from "./components/ItemsList.tsx";
import ItemDetails from "./components/ItemDetails.tsx";

import {MsalAuthenticationTemplate, useIsAuthenticated, useMsal} from "@azure/msal-react";
import {loginRequest} from "./authConfig.ts";
import {InteractionType} from "@azure/msal-browser";
import {useEffect} from "react";

function AppBis() {
    const {instance} = useMsal();
    const isAuthenticated = useIsAuthenticated();

    const handleLogin = () => {
        instance.loginRedirect(loginRequest);
    };

    const handleLogout = () => {
        instance.logoutRedirect();
    };

    useEffect(() => {
        // MSAL traite automatiquement la redirection ici après le login
        instance.handleRedirectPromise().then((response) => {
            if (response) {
                console.log("Authentication successful", response);
            }
        }).catch((error) => {
            console.error("Error during redirect:", error);
        });
    }, [instance]);

    return (
        <Router>
            <div>
                <Header/>
                <main>
                    {/* Afficher le bouton login/logout */}
                    {isAuthenticated ? (
                        <button onClick={handleLogout}>Logout</button>
                    ) : (
                        <button onClick={handleLogin}>Login</button>
                    )}

                    {/* Routes */}
                    <Routes>
                        <Route path="/" element={<Navigate to="/home"/>}/>
                        <Route path="/home" element={<Home/>}/>

                        {/* Protéger les routes avec MsalAuthenticationTemplate */}
                        <Route
                            path="/stocks"
                            element={
                                <MsalAuthenticationTemplate
                                    interactionType={InteractionType.Redirect}
                                    authenticationRequest={loginRequest}>
                                    <StocksList/>
                                </MsalAuthenticationTemplate>
                            }
                        />
                        <Route
                            path="/items"
                            element={
                                <MsalAuthenticationTemplate
                                    interactionType={InteractionType.Redirect}
                                    authenticationRequest={loginRequest}>
                                    <ItemsList/>
                                </MsalAuthenticationTemplate>
                            }
                        />
                        <Route
                            path="/stocks/:ID"
                            element={
                                <MsalAuthenticationTemplate
                                    interactionType={InteractionType.Redirect}
                                    authenticationRequest={loginRequest}>
                                    <StockDetailsWithItems/>
                                </MsalAuthenticationTemplate>
                            }
                        />
                        <Route
                            path="/stocks/:ID/items/:ID"
                            element={
                                <MsalAuthenticationTemplate
                                    interactionType={InteractionType.Redirect}
                                    authenticationRequest={loginRequest}>
                                    <ItemDetails/>
                                </MsalAuthenticationTemplate>
                            }
                        />

                        {/* Redirection après login */}
                        <Route path="/redirect" element={<div>Redirection en cours...</div>}/>
                    </Routes>
                </main>
                <Footer/>
            </div>
        </Router>
    );
}

export default AppBis;
