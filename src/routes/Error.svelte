<script>
    let dialog;
    let error = "An error occured"
    let status = "";
    export function err(errorMsg, statusCode) {
        error = errorMsg;
        status = statusCode;
        dialog.showModal();
    }
</script>

<dialog class="modal" bind:this={dialog}>
	<div class="modal-box">
		<form method="dialog">
			<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
		</form>
		<h3 class="font-bold text-lg">Virhe {status}</h3>
		<p class="py-4">
            {error}
        </p>
	</div>
</dialog>
