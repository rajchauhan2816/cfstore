import { ProductVariantsDocument, ProductVariantsQueryVariables } from "@/generated/graphql";

import urqlClient from "./graphql";
/**
 *
 * @returns Array of ProductVariants
 * @type ProductVariants
 */
export function useProductVariantsQuery(variables: ProductVariantsQueryVariables) {
    return urqlClient.query(ProductVariantsDocument, variables, { requestPolicy: 'network-only' }).toPromise();
}
