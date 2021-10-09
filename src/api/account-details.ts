import { AccountDetailsDocument, AccountDetailsQueryVariables } from "@/generated/graphql";
import urqlClient from "./graphql";

/**
 *
 * @returns Account Details
 * @type me
 */
export const useAccountDetailsQuery = (variables: AccountDetailsQueryVariables) => {
  return urqlClient.query(AccountDetailsDocument, variables, { requestPolicy: 'network-only' }).toPromise();
}