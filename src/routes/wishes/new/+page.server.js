import { mongo } from '$lib/db';
import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
		const body = await request.formData();

		let url = body.get('url');

		try	{
			new URL(url);
		} catch {
			url = `http://${url}`;
			try	{
				new URL(url);
			} catch {
				url = undefined;
			}
		}

		const wish = {
			title: body.get('title'),
			description: body.get('description'),
			granted: false,
			url: url,
			wisher: body.get('wisher')
		};

		const result = await mongo.collection('wishes').insertOne(wish);

		throw redirect(303, `/`);
	}
};
