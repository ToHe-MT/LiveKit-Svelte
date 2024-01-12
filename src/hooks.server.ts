import { SvelteKitAuth } from "@auth/sveltekit";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import GoogleProvider from "@auth/core/providers/google";
import {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
} from "$env/static/private";
import clientPromise from "$lib/database/clientPromise";

export const handle = SvelteKitAuth({
    providers: [
        GoogleProvider({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
        }),
    ],
    adapter: MongoDBAdapter(clientPromise, { databaseName: "development"}),
});
