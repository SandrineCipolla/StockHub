
import { AccountInfo } from "@azure/msal-browser";

export const getUsername = (accounts: AccountInfo[]): string => {
    return accounts.length > 0 ? accounts[0].username : 'Utilisateur inconnu';
};