<script>
	import '$lib/global.css';
	import { onMount } from 'svelte';

	let mameModal;
	let readyButton;

	onMount(() => {
		if (!localStorage.getItem('name')) {
			mameModal.showModal();
		}
	});
</script>

<dialog class="modal" bind:this={mameModal}>
	<div class="modal-box">
		<h3 class="font-bold text-lg">Tervetuloa lahjlalistaan!</h3>
		<p class="py-4">Kirjoita nimesi alle, jotta tiedämme kuka olet.</p>
		<input
			type="text"
			name="name"
			placeholder="Nimesi"
			class="input input-bordered w-full"
			on:input={(e) => {
				if (e.target.value.length > 0) {
					readyButton.disabled = false;
					localStorage.setItem('name', e.target.value);
				} else {
					readyButton.disabled = true;
					localStorage.removeItem('name');
				}

			}}
		/>

		<div class="modal-action">
			<form method="dialog">
				<button class="btn btn-success" disabled bind:this={readyButton}>Valmis</button>
			</form>
		</div>
	</div>
</dialog>

<div class="container mx-auto mt-4">
	<slot />
</div>
