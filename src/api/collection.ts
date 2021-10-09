import { AllCollectionsDocument, AllCollectionsQueryVariables } from "@/generated/graphql";

import urqlClient from "./graphql";
/**
 *
 * @returns Array of Collection
 * @type Colletion
 */
export function useCollectionsQuery(variables: AllCollectionsQueryVariables) {
    return urqlClient.query(AllCollectionsDocument, variables).toPromise();
}
