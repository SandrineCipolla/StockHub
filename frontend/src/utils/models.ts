 export interface idTokenClaims {
    oid: string;
    sub: string;
}

export interface authenticationResult {
    account: any;
    idTokenClaims: any;
}

export interface ProtectedComponentProps {
     onLogin: () => void;
 }