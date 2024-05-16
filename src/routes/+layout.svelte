<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import '../app.css';

	const { children } = $props();
</script>

<main class="container py-6">
	<nav class="mb-5 flex justify-center space-x-4">
		<Button href="/">Home</Button>
		<Button href="/gallery">Gallery</Button>
	</nav>

	{@render children()}
</main>
