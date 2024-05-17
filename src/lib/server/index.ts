import { SECRET_SHOPIFY_ACCESS_TOKEN, SHOPIFY_STORE_DOMAIN } from '$env/static/private';
import { createStorefrontApiClient } from '@shopify/storefront-api-client';

export const shopifyClient = createStorefrontApiClient({
	storeDomain: SHOPIFY_STORE_DOMAIN,
	apiVersion: '2024-04',
	privateAccessToken: SECRET_SHOPIFY_ACCESS_TOKEN
});

const gql = String.raw;

export const productsQuery = gql`
	{
		products(first: 5) {
			edges {
				node {
					title
					handle
					images(first: 1) {
						edges {
							node {
								altText
								url
							}
						}
					}
					variants(first: 1) {
						edges {
							node {
								id
							}
						}
					}
					priceRange {
						minVariantPrice {
							amount
						}
					}
				}
			}
		}
	}
`;

export const singleItemCheckoutQuery = gql`
	mutation cartCreate($cartInput: CartInput!) {
		cartCreate(input: $cartInput) {
			cart {
				id
				checkoutUrl
				lines(first: 5) {
					edges {
						node {
							merchandise {
								... on ProductVariant {
									title
								}
							}
							quantity
						}
					}
				}
				attributes {
					key
					value
				}
			}
		}
	}
`;
