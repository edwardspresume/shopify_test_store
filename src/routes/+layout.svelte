<script>
	import { page } from '$app/stores';

	import { siteLinks } from '$lib/navLinks';

	import '../app.css';

	import Button from '$lib/components/ui/button/button.svelte';

	const { children } = $props();
</script>

<header class="relative mb-10 border-b border-accent-foreground/10">
	<div class="container flex items-center justify-between p-2">
		<Button href="/" variant="link" class="p-0 text-2xl font-bold">VisionVault</Button>

		<nav class="flex gap-2">
			{#each Object.values(siteLinks) as link}
				{@const isCurrentPage = $page.url.pathname === link.href ? 'page' : undefined}
				<Button
					href={link.href}
					size="sm"
					variant={isCurrentPage ? 'default' : 'outline'}
					aria-label={link.ariaLabel}
					aria-current={isCurrentPage}
				>
					{link.title}
				</Button>
			{/each}
		</nav>
	</div>
</header>

<main class="container pb-10">
	{@render children()}
</main>
