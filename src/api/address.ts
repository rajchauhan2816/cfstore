import { AddressCreateDocument,AddressCreateMutationVariables, AddressUpdateDocument, AddressUpdateMutationVariables, AddressDeleteDocument, AddressDeleteMutationVariables  } from "@/generated/graphql";

import urqlClient from "./graphql";
/**
 * @returns Create Account Address
 * @type AccountAddressCreate
 */
export function useAddressCreateMutation(variables:AddressCreateMutationVariables) {
    try {
        return urqlClient.mutation(AddressCreateDocument, variables).toPromise();
    } catch (error) {
        console.log(error);
    }
}

/**
 * @returns Update Account Address
 * @type AccountAddressUpdate
 */
export function useAddressUpdateMutation(variables:AddressUpdateMutationVariables){
    try {
        return urqlClient.mutation(AddressUpdateDocument, variables).toPromise();
    } catch (error) {
            console.log(error);
    }
}

/**
 * @returns Delete Account Address
 * @type AccountAddressDelete
 */
 export function useAddressDeleteMutation(variables:AddressDeleteMutationVariables){
    try {
        return urqlClient.mutation(AddressDeleteDocument, variables).toPromise();
    } catch (error) {
            console.log(error);
    }
}

