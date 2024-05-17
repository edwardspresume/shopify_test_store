import { productsQuery, shopifyClient } from '$lib/server';
import type { PageServerLoad } from './$types';

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

		console.log({ products });
		return {
			products
		};
	} catch (error) {
		console.error('Failed to load products:', error);
		return { products: [] };
	}
}) satisfies PageServerLoad;
