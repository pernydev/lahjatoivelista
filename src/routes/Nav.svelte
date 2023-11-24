<script>
    import { page } from '$app/stores';
</script>

<ul class="menu menu-horizontal bg-base-200 rounded-box mb-4">
	<li>
        <a href="/" class={$page.url.pathname === '/' ? 'active' : ''}>Etusivu</a>
    </li>
	<li>
        <a href="/wishes/add" class={$page.url.pathname === '/wishes/add' ? 'active' : ''}>Lisää toive</a>
    </li>
</ul>
