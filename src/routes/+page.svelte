<script lang="ts">
	import { enhance } from '$app/forms';

	import { route } from '$lib/ROUTES';
	import type { CarouselAPI } from '$lib/components/ui/carousel/context';

	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import * as Carousel from '$lib/components/ui/carousel';

	const { data } = $props();

	let { products } = data;

	let currentSlide = $state(0);
	let carouselApi: CarouselAPI | undefined = $state(undefined);

	$effect(() => {
		if (carouselApi) {
			currentSlide = carouselApi.selectedScrollSnap() + 1;

			carouselApi.on('select', () => {
				if (carouselApi) currentSlide = carouselApi.selectedScrollSnap() + 1;
			});
		}
	});
</script>

<h1 class="mb-6 text-center text-4xl font-bold italic">Slider</h1>

<form method="post" action={route('checkOut /')} use:enhance class="grid">
	<Carousel.Root
		bind:api={carouselApi}
		opts={{
			align: 'start',
			loop: true
		}}
		class="mx-auto max-w-xs sm:max-w-5xl"
	>
		<Carousel.Content class="-ml-2 md:-ml-4">
			{#each products as product (product.handle)}
				<Carousel.Item class="pl-2 md:basis-1/2 md:pl-4 lg:basis-1/3">
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

	<input type="hidden" name="productVariantId" value={products[currentSlide].variantId} />

	<Button type="submit" class="mx-auto mt-7">Check out</Button>
</form>
