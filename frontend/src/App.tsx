import {useMsal} from "@azure/msal-react";
import Home from "./pages/home/Home.tsx";
import StocksList from "./components/StocksList.tsx";
import  {useEffect} from "react";
import {EventType} from "@azure/msal-browser";
import {b2cPolicies, protectedResources} from "./authConfig.ts";
import {compareIssuingPolicy} from "./utils/claimsUtils.ts";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

function ProtectedComponent() {
    const {instance} = useMsal();

    useEffect(() => {
        console.info('Protected component useEffet');

        const callbackId = instance.addEventCallback((event) => {
            if (
                (event.eventType === EventType.LOGIN_SUCCESS || event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS) &&
                event.payload && event.payload.account
            ) {
                /**
                 * For the purpose of setting an active account for UI update, we want to consider only the auth
                 * response resulting from SUSI flow. "tfp" claim in the id token tells us the policy (NOTE: legacy
                 * policies may use "acr" instead of "tfp"). To learn more about B2C tokens, visit:
                 * https://docs.microsoft.com/en-us/azure/active-directory-b2c/tokens-overview
                 */
                if (compareIssuingPolicy(event.payload.idTokenClaims, b2cPolicies.names.editProfile)) {
                    // retrieve the account from initial sing-in to the app
                    const originalSignInAccount = instance
                        .getAllAccounts()
                        .find(
                            (account) =>
                                account.idTokenClaims?.oid === event.payload?.idTokenClaims.oid &&
                                account.idTokenClaims?.sub === event.payload?.idTokenClaims.sub &&
                                compareIssuingPolicy(account.idTokenClaims, b2cPolicies.names.signUpSignIn)
                        );

                    let signUpSignInFlowRequest = {
                        authority: b2cPolicies.authorities.signUpSignIn.authority,
                        account: originalSignInAccount,
                    };

                    // silently login again with the signUpSignIn policy
                    instance.ssoSilent(signUpSignInFlowRequest);
                }

                /**
                 * Below we are checking if the user is returning from the reset password flow.
                 * If so, we will ask the user to reauthenticate with their new password.
                 * If you do not want this behavior and prefer your users to stay signed in instead,
                 * you can replace the code below with the same pattern used for handling the return from
                 * profile edit flow
                 */
                if (compareIssuingPolicy(event.payload.idTokenClaims, b2cPolicies.names.forgotPassword)) {
                    let signUpSignInFlowRequest = {
                        authority: b2cPolicies.authorities.signUpSignIn.authority,
                        scopes: [
                            ...protectedResources.stockHubApi.scopes.read,
                            ...protectedResources.stockHubApi.scopes.write,
                        ],
                    };
                    instance.loginRedirect(signUpSignInFlowRequest);
                }
            }

            if (event.eventType === EventType.LOGIN_FAILURE) {
                // Check for forgot password error
                // Learn more about AAD error codes at https://docs.microsoft.com/en-us/azure/active-directory/develop/reference-aadsts-error-codes
                if (event.error && event.error.errorMessage.includes('AADB2C90118')) {
                    const resetPasswordRequest = {
                        authority: b2cPolicies.authorities.forgotPassword.authority,
                        scopes: [],
                    };
                    instance.loginRedirect(resetPasswordRequest);
                }
            }
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
                <Routes>
                    <Route path="/" element={<Home/>}/>

                    <Route
                        path="/stocks"
                        element={
                            <StocksList/>
                        }
                    />
                </Routes>
            </div>
        </Router>

    )
}

function App() {
    const {instance} = useMsal();
    const signUpSignInFlowRequest = {
        authority: b2cPolicies.authorities.signUpSignIn.authority,
        /*   scopes: [
               ...protectedResources.stockHubApi.scopes.read,
               ...protectedResources.stockHubApi.scopes.write,
           ],*/
    };

    return (
        <div>
            <h1>Protected Component</h1>
            <ProtectedComponent/>
            <button onClick={() => instance.loginRedirect(signUpSignInFlowRequest)}>Login test</button>
        </div>


    );
}

export default App;