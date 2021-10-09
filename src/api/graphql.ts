import { createClient } from "urql";

import { store } from '@/store'

function geToken() {
    const { auth: { token } } = store.getState()
    return token ?? ""
}

console.log(process.env.NEXT_PUBLIC_TEST);

const client = createClient({
    url: "https://saleor.code-server.repulse.tech/graphql/",
    fetchOptions: () => {
        return {
            headers: {
                Authorization: `JWT ${geToken()}`,
            }
        }
    }
});

export const { mutation, query } = client;

export default client;
