<script>
	import { onMount } from "svelte";

	let dialog;
	let url = 'http://scam.com';

	export function open(link) {
    console.log(link);
		url = new URL(link);
		dialog.showModal();
	}

	function openConfirm() {
		window.open(url, '_blank', 'noopener,noreferrer');
		dialog.close();
	}
</script>

<dialog class="modal modal-bottom sm:modal-middle" bind:this={dialog}>
	<div class="modal-box">
		<h3 class="font-bold text-lg">Varoitus!</h3>
		<p class="py-4">
			Olet siirtymässä ulkoiselle nettisivulle <b>{url.hostname}</b>. Olethan varovainen!
		</p>
		<div class="modal-action">
			<form method="dialog">
				<button class="btn">Takaisin</button>
				<button class="btn btn-error" on:click={openConfirm}>Jatka</button>
			</form>
		</div>
	</div>
</dialog>
