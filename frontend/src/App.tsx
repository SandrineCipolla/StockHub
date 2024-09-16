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

function App() {
    // return (
    //     <Router>
    //         <div>
    //             <Header/>
    //             <main>
    //                 <Routes>
    //                     <Route path="/" element={<Navigate to="/home"/>}/>
    //                     <Route path="/home" element={<Home/>}/>
    //                     <Route path="/stocks" element={<StocksList/>}/>
    //                     <Route path="/items" element={<ItemsList/>}/>
    //                     <Route path="/stocks/:ID" element={<StockDetailsWithItems/>}/>
    //                     <Route path="/stocks/:ID/items/:ID" element={<ItemDetails/>}/>
    //                 </Routes>
    //             </main>
    //             <Footer/>
    //         </div>
    //     </Router>
    // );
    const {instance} = useMsal();
    const isAuthenticated = useIsAuthenticated();

    const handleLogin = () => {
        instance.loginRedirect(loginRequest);
    };

    const handleLogout = () => {
        instance.logoutRedirect();
    };

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
                                <MsalAuthenticationTemplate interactionType={InteractionType.Redirect}
                                                            authenticationRequest={loginRequest}>
                                    <ItemsList/>
                                </MsalAuthenticationTemplate>
                            }
                        />
                        <Route
                            path="/stocks/:ID"
                            element={
                                <MsalAuthenticationTemplate interactionType={InteractionType.Redirect}
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
                    </Routes>
                </main>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
