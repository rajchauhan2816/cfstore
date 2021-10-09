import { useSkuQuery } from "@/api";
import { store } from "./index";


/**
 * Async thunk that fetche SKU.
 */
const fetchSku = async ({ variantId }: { variantId: string }) => {
    // get state from store
    const { datePincode, demographic } = store.getState();
    //get data from state
    const { deliveryDate, pincode } = datePincode;
    const { channel } = demographic;
    // fetch SKU
    const { data } = await useSkuQuery({ productVariantsChannel: channel, productVariantsDate: deliveryDate, productVariantsFirst: 10, productVariantsPincode: pincode, productVariantsIds: [variantId] });
    const variant = data.productVariants.edges.map(x => x.node);
    return variant[0];
}

export { fetchSku };