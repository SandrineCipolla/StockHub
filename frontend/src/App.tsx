import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import StocksList from "./components/StocksList";
import "./App.css";
import {useEffect} from "react";
import {AuthenticationResult, EventType} from "@azure/msal-browser";
import {b2cPolicies, protectedResources} from "./authConfig.ts";

import {useMsal} from "@azure/msal-react";
import StockDetailsWithItems from "./components/StockDetailsWithItems.tsx";
import ItemsList from "./components/ItemsList.tsx";
import ItemDetails from "./components/ItemDetails.tsx";
import Home from "./pages/ItemDetailsPage.tsx";
import {ProtectedComponentProps} from "./utils/models.ts";

function ProtectedComponent({onLogin}:ProtectedComponentProps) {
    const {instance} = useMsal();

    useEffect(() => {
        console.info('Protected component useEffet');

        const callbackId = instance.addEventCallback((event) => {
            if (
                (event.eventType === EventType.LOGIN_SUCCESS || event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS) &&
                event.payload && (event.payload as AuthenticationResult).account
            ) {
                /**
                 * For the purpose of setting an active account for UI update, we want to consider only the auth
                 * response resulting from SUSI flow. "tfp" claim in the id token tells us the policy (NOTE: legacy
                 * policies may use "acr" instead of "tfp"). To learn more about B2C tokens, visit:
                 * https://docs.microsoft.com/en-us/azure/active-directory-b2c/tokens-overview
                 */

                const payload = event.payload as AuthenticationResult;
                //const idTokenClaims = payload.idTokenClaims as idTokenClaims;
                const token = payload.accessToken
                localStorage.setItem('authToken', token);
                console.log("Token acquired:", token);

                // if (compareIssuingPolicy(payload.idTokenClaims, b2cPolicies.names.editProfile)) {
                //     // retrieve the account from initial sing-in to the app
                //     const originalSignInAccount = instance
                //         .getAllAccounts()
                //         .find(
                //             (account) =>
                //                 (account.idTokenClaims as idTokenClaims).oid === idTokenClaims.oid &&
                //                 (account.idTokenClaims as idTokenClaims).sub === idTokenClaims.sub &&
                //                 compareIssuingPolicy(account.idTokenClaims, b2cPolicies.names.signUpSignIn)
                //         );
                //
                //     const signUpSignInFlowRequest = {
                //         authority: b2cPolicies.authorities.signUpSignIn.authority,
                //         account: originalSignInAccount,
                //     };
                //
                //     // silently login again with the signUpSignIn policy
                //     instance.ssoSilent(signUpSignInFlowRequest);
                // }

                /**
                 * Below we are checking if the user is returning from the reset password flow.
                 * If so, we will ask the user to reauthenticate with their new password.
                 * If you do not want this behavior and prefer your users to stay signed in instead,
                 * you can replace the code below with the same pattern used for handling the return from
                 * profile edit flow
                 */
                // if (compareIssuingPolicy(payload.idTokenClaims, b2cPolicies.names.forgotPassword)) {
                //     const signUpSignInFlowRequest = {
                //         authority: b2cPolicies.authorities.signUpSignIn.authority,
                //         scopes: [
                //             ...protectedResources.stockHubApi.scopes.read,
                //             ...protectedResources.stockHubApi.scopes.write,
                //         ],
                //     };
                //     instance.loginRedirect(signUpSignInFlowRequest);
                // }
            }

            // if (event.eventType === EventType.LOGIN_FAILURE) {
            //     // Check for forgot password error
            //     // Learn more about AAD error codes at https://docs.microsoft.com/en-us/azure/active-directory/develop/reference-aadsts-error-codes
            //     if (event.error && (event.error as AuthError).errorMessage.includes('AADB2C90118')) {
            //         const resetPasswordRequest = {
            //             authority: b2cPolicies.authorities.forgotPassword.authority,
            //             scopes: [],
            //         };
            //         instance.loginRedirect(resetPasswordRequest);
            //     }
            // }
        });

        return () => {
            if (callbackId) {
                instance.removeEventCallback(callbackId);
            }
        };
        // eslint-disable-next-line
    }, [instance]);

    return (
        <Router>
            <div>
                <Header onLogin={onLogin}/>
                <main>
                    <Routes>
                        {/*<Route path="/" element={<Navigate to="/home"/>}/>*/}
                        <Route path="/" element={<Home/>}/>
                        <Route path="/stocks" element={<StocksList/>}/>
                        <Route path="/items" element={<ItemsList/>}/>
                        <Route path="/stocks/:ID" element={<StockDetailsWithItems/>}/>
                        <Route path="/stocks/:ID/items/:ID" element={<ItemDetails/>}/>
                    </Routes>
                </main>
                <Footer/>
            </div>
        </Router>

    )
}

function App() {
    const {instance} = useMsal();
    // const activeAccount = instance.getActiveAccount();
    const signUpSignInFlowRequest = {
        authority: b2cPolicies.authorities.signUpSignIn.authority,
        scopes: [
            ...protectedResources.stockHubApi.scopes.read,
            ...protectedResources.stockHubApi.scopes.write,
        ],
    };
    const handleLogin = () => {
        instance.loginRedirect(signUpSignInFlowRequest);
    };

    // const handleLogout = () => {
    //     instance.logoutRedirect(
    //         {
    //             postLogoutRedirectUri: "/",
    //         }
    //     );
    // };

    return (
        <div>

            <ProtectedComponent onLogin={handleLogin}/>

            {/*{!activeAccount && (*/}
            {/*    <Button variant="contained"  onClick={handleLogin}>Login test</Button>*/}
            {/*)}*/}
        </div>


    );
}

export default App;
