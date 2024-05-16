import { route } from '$lib/ROUTES';
import type { AriaAttributes } from 'svelte/elements';

type NavLink = {
	href: string;
	title: string;
	ariaLabel?: AriaAttributes['aria-label'];
	isExternal?: boolean;
};

export type NavLinks = {
	[key: string]: NavLink;
};

type CreateNavLinkParams = Required<Pick<NavLink, 'title' | 'href'>> &
	Partial<Pick<NavLink, 'ariaLabel' | 'isExternal'>>;

export const createNavLink = ({
	title,
	href,
	ariaLabel,
	isExternal
}: CreateNavLinkParams): NavLink => {
	ariaLabel = ariaLabel ?? `Go to ${title.toLowerCase()} page`;

	return {
		title,
		href,
		ariaLabel,
		isExternal: isExternal ?? false
	};
};

export const siteLinks = {
	home: createNavLink({
		title: 'Home',
		href: route('/'),
		ariaLabel: 'Go to home page'
	}),
	about: createNavLink({
		title: 'Gallery',
		href: route('/gallery'),
		ariaLabel: 'Go to gallery page'
	})
} as const;
