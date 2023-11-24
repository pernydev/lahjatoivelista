import { MongoClient } from 'mongodb';
import { env } from '$env/dynamic/private'

export const mongo = new MongoClient(env.MONGODB_URI).db(env.MONGODB_DB)

export function stringID(array) {
    return array.map((item) => {
        item._id = item._id.toString();
        return item;
    });
}