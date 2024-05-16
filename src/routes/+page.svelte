<script>
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/button/button.svelte';

	import * as Card from '$lib/components/ui/card';
	import * as Carousel from '$lib/components/ui/carousel';

	const { data } = $props();
</script>

<h1 class="mb-6 text-center text-4xl font-bold italic">Slider</h1>

<form method="post" action="?/checkOut" use:enhance class="mx-auto w-fit">
	<Carousel.Root
		opts={{
			align: 'start',
			loop: true
		}}
		class="w-full max-w-5xl"
	>
		<Carousel.Content>
			{#each data.products as product (product.handle)}
				<Carousel.Item class="md:basis-1/2 lg:basis-1/3">
					<Card.Root class="p-3">
						<img class="mb-4 aspect-auto rounded-lg" src={product.image} alt={product.title} />
						<h2 class="mb-2 text-lg font-semibold">{product.title}</h2>
						<p class="text-gray-500">${product.price}</p>
						<a class="text-blue-500 hover:underline" href={`/${product.handle}`}>View Product</a>
					</Card.Root>
				</Carousel.Item>
			{/each}
		</Carousel.Content>
		<Carousel.Previous />
		<Carousel.Next />
	</Carousel.Root>

	<Button type="submit" class="mt-4">Check out</Button>
</form>
