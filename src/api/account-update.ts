import { AccountUpdateDocument, AccountUpdateMutationVariables } from "@/generated/graphql";

import urqlClient from "./graphql";
/**
 *
 * @returns Update Account Information
 * @type User
 */
export function useAccoutUpdateMutation(variables:AccountUpdateMutationVariables) {
    try {
    return urqlClient.mutation(AccountUpdateDocument, variables).toPromise();
    } catch (error) {
        console.log(error);
    }
}
