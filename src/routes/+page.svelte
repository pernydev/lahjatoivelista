<script>
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	export let data;

	import Openlink from './Openlink.svelte';
	import Error from './Error.svelte';
	import Nav from './Nav.svelte';

	let linkopener;
	let err;

	let name = 'Joe';

	let imGetiing = [];
	onMount(() => {
		const gettingCSV = localStorage.getItem('imGetting');
		if (gettingCSV) {
			imGetiing = gettingCSV.split(',');
		}

		name = localStorage.getItem('name').toLowerCase();
	});

	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	async function grant(wishid) {
		const res = await fetch(`/api/wishes/${wishid}/grant`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const json = await res.json();

		if (res.status === 200) {
			const wish = data.wishes.find((w) => w._id === wishid);
			if (json.granted) {
				imGetiing = [...imGetiing, wishid];
				localStorage.setItem('imGetting', imGetiing.join(','));

				// find the wish and set granted to true
				const wish = data.wishes.find((w) => w._id === wishid);
				wish.granted = true;
			} else {
				imGetiing = imGetiing.filter((w) => w !== wishid);
				localStorage.setItem('imGetting', imGetiing.join(','));

				// find the wish and set granted to false
				const wish = data.wishes.find((w) => w._id === wishid);
				wish.granted = false;
			}
			return;
		}
		err(json.error, res.status);
	}
</script>

<Openlink bind:this={linkopener} />
<Error bind:err />

<article class="prose mb-4">
	<h1>Lahjatoiveet</h1>
</article>

<main class="flex gap-4 flex-wrap justify-center">
	<div class="card bg-base-300 shadow-xl p-4 w-96 md:w-1/3">
		<h2 class="card-title">Lisää toive</h2>
		<div class="form-control w-full max-w-xs">
			<form action="/wishes/new" method="POST">
				<label class="label" for="wish-input">
					<span class="label-text">Toive</span>
				</label>
				<input
					type="text"
					placeholder="Sukat"
					class="input input-bordered w-full"
					id="wish-input"
					name="title"
				/>
				<label class="label" for="wisher-input">
					<span class="label-text">Toivojan nimi</span>
				</label>
				<input
					type="text"
					placeholder="Pertti"
					class="input input-bordered w-full"
					id="wisher-input"
					name="wisher"
					disabled
					value={capitalizeFirstLetter(name)}
				/>
				<label class="label" for="wish-link-input">
					<span class="label-text">Toiveen linkki</span>
				</label>
				<input
					type="text"
					placeholder="https://www.sukat.fi"
					class="input input-bordered w-full"
					id="wish-link-input"
					name="url"
				/>
				<label class="label" for="wish-description-input">
					<span class="label-text">Toiveen kuvaus</span>
				</label>
				<textarea
					placeholder="Jotku tosi lämpimät sukat"
					class="textarea textarea-bordered w-full"
					id="wish-description-input"
					name="description"
				/>
				<button class="btn btn-success w-full mt-4">Lisää</button>
			</form>
		</div>
	</div>
	<div class="flex-1">
		<ul class="flex flex-row flex-wrap gap-4">
			{#each data.wishes as wish}
				{#if !wish.granted || imGetiing.includes(wish._id) || name === wish.wisher.toLowerCase()}
					<li class="card w-96 bg-base-300 shadow-xl">
						<div class="card-body">
							<h2 class="card-title heading-2">{wish.wisher}: {wish.title}</h2>
							<p>{wish.description}</p>
							<div class="card-actions">
								<button class="btn btn-ghist flex-1" on:click={() => linkopener.open(wish.url)}
									>Avaa linkki</button
								>
								{#if wish.granted && !wish.wisher.toLowerCase() == name}
									<button
										class="btn btn-error"
										on:click={async () => {
											await grant(wish._id);
										}}>En hommaakaan!</button
									>
								{:else}
									<button
										class="btn btn-primary flex-1"
										on:click={async () => {
											if (wish.wisher.toLowerCase()	 == name) {
												err('Et voi hommata tätä lahjaa!', 403);
											} else {
												await grant(wish._id);
											}
										}}>Hommaan!</button
									>
								{/if}
							</div>
						</div>
					</li>
				{/if}
			{/each}
		</ul>
	</div>
</main>
