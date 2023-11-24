import { mongo } from '$lib/db';
import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
		const body = await request.formData();

		const wish = {
			title: body.get('title'),
			description: body.get('description'),
			granted: false,
			url: body.get('url'),
			wisher: body.get('wisher')
		};

		const result = await mongo.collection('wishes').insertOne(wish);

		throw redirect(303, `/`);
	}
};
