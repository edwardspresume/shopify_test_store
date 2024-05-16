<script>
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/button/button.svelte';

	import * as Card from '$lib/components/ui/card';
	import * as Carousel from '$lib/components/ui/carousel';

	const { data } = $props();
</script>

<h1 class="mb-6 text-center text-4xl font-bold italic">Slider</h1>

<form method="post" action="?/checkOut" use:enhance class="sm:mx-auto sm:w-fit">
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

						<div class="space-y-2">
							<h2 class="text-lg font-semibold">{product.title}</h2>
							<p class="text-muted-foreground">${product.price}</p>
							<Button href={`/${product.handle}`} size="sm" variant="outline">View Product</Button>
						</div>
					</Card.Root>
				</Carousel.Item>
			{/each}
		</Carousel.Content>
		<Carousel.Previous />
		<Carousel.Next />
	</Carousel.Root>

	<Button type="submit" class="mx-auto mt-7 block">Check out</Button>
</form>
