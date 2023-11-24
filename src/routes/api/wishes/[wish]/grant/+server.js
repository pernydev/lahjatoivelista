import { mongo } from "$lib/db";
import { json } from "@sveltejs/kit";
import { ObjectId } from "mongodb";

export async function POST(request) {
    // change the wish's granted property to the opposite of what it is (true -> false, false -> true)
    const id = new ObjectId(request.params.wish);
    
    const wish = await mongo.collection("wishes").findOne({ _id: id });

    if (!wish) {
        return json({ error: "Wish not found" }, { status: 404 });
    }

    const { granted } = wish;

    await mongo.collection("wishes").updateOne({ _id: id }, { $set: { granted: !granted } });

    return json({ granted: !granted });
}