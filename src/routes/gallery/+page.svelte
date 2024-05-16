<script>
	import * as Card from '$lib/components/ui/card';

	const { data } = $props();
</script>

<h1 class="mb-6 text-center text-4xl font-bold italic">Gallery</h1>

<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
	{#each data.products as product (product.handle)}
		<Card.Root class="p-3">
			<img class="mb-4 aspect-square rounded-lg" src={product.image} alt={product.title} />
			<h2 class=" text-lg font-semibold">{product.title}</h2>
		</Card.Root>
	{/each}
</div>
