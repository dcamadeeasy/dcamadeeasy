import type { Provider } from "@auth/core/providers";

export function CredentialsProvider(): Provider {
    return {
        id: "credentials",
        name: "Credentials",
        type: "credentials",
        credentials: {
            email: {label: "Email", type: "email"},
        },
        authorize(credentials, request) {
            const email = credentials['email'];

            // TODO: call to db to check if the user exists user?
            
            return {id: 1, email};
        },
    }
}