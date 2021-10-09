import { createClient } from "urql";

import { store } from '@/store'

function geToken() {
    const { auth: { token } } = store.getState()
    return token ?? ""
}

const client = createClient({
    url: "http://localhost:8000/graphql/",
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
