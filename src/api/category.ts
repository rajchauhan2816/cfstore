import { AllCategoriesDocument } from "@/generated/graphql";
import { limit } from "./constant";

import urqlClient from "./graphql";
/**
 *
 * @returns Array of Category
 * @type Category
 */
export function useCategoriesQuery() {
    return urqlClient.query(AllCategoriesDocument, { categoriesLevel: 0, categoriesFirst: limit, childrenFirst: limit }, { requestPolicy: 'network-only' }).toPromise();
}
