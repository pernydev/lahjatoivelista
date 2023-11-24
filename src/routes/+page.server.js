import { mongo, stringID } from "$lib/db";

export async function load() {
    const wishes = await mongo.collection("wishes").find().toArray();

    return {
        wishes: stringID(wishes),
    };
}