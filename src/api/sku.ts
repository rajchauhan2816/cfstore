import { SkuDocument, SkuQueryVariables } from "@/generated/graphql";

import urqlClient from "./graphql";
/**
 *
 * @returns Array of Single Variant
 * @type ProductVariants
 */
export function useSkuQuery(variables: SkuQueryVariables) {
    return urqlClient.query(SkuDocument, variables, { requestPolicy: 'network-only' }).toPromise();
}
