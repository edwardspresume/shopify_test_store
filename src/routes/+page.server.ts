import { productsQuery, shopifyClient, singleItemCheckoutQuery } from '$lib/server';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

type ProductNode = {
	title: string;
	handle: string;
	images: { edges: { node: { url: string } }[] };
	variants: { edges: { node: { id: string } }[] };
	priceRange: { minVariantPrice: { amount: number } };
};

type GraphQLResponse = {
	products: {
		edges: {
			node: ProductNode;
		}[];
	};
};

export const load = (async () => {
	try {
		const { data: productsData } = await shopifyClient.request<GraphQLResponse>(productsQuery);

		if (!productsData?.products || !Array.isArray(productsData.products.edges)) {
			throw new Error('Unexpected response from Shopify');
		}

		const products = productsData.products.edges.map(
			({ node: { title, handle, images, variants, priceRange } }) => ({
				title,
				handle,
				image: images?.edges?.[0]?.node?.url || '',
				variantId: variants?.edges?.[0]?.node?.id || '',
				price: priceRange?.minVariantPrice?.amount || 0
			})
		);

		return {
			products
		};
	} catch (error) {
		console.error('Failed to load products:', error);
		return { products: [] };
	}
}) satisfies PageServerLoad;

export const actions: Actions = {
	checkOut: async ({ request }) => {
		const formData = await request.formData();
		const productVariantId = formData.get('productVariantId');

		if (!productVariantId) {
			fail(400, {
				message: 'Invalid product variant ID'
			});
		}

		let checkoutUrl: string;

		try {
			const quantity = 1;

			const { data: checkoutData } = await shopifyClient.request(singleItemCheckoutQuery, {
				variables: {
					cartInput: {
						lines: [
							{
								quantity: quantity,
								merchandiseId: productVariantId
							}
						],
						attributes: [
							{ key: 'customName', value: 'Example Name' },
							{ key: 'font', value: 'default' }
						]
					}
				}
			});

			checkoutUrl = checkoutData.cartCreate.cart.checkoutUrl;
		} catch (error) {
			console.error('Failed to create checkout:', error);

			return fail(500, {
				message: 'Failed to create checkout'
			});
		}

		throw redirect(303, checkoutUrl);
	}
};
