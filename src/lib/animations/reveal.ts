import type { Action } from 'svelte/action';

export const reveal: Action<HTMLElement, { delay?: number; y?: number } | undefined> = (
	node,
	options
) => {
	const delay = options?.delay ?? 0;
	const y = options?.y ?? 28;

	node.style.opacity = '0';
	node.style.transform = `translateY(${y}px)`;

	const observer = new IntersectionObserver(
		([entry]) => {
			if (!entry?.isIntersecting) return;

			node.animate(
				[
					{ opacity: 0, transform: `translateY(${y}px)` },
					{ opacity: 1, transform: 'translateY(0)' }
				],
				{
					delay,
					duration: 760,
					easing: 'cubic-bezier(.2,.8,.2,1)',
					fill: 'forwards'
				}
			);

			observer.disconnect();
		},
		{ threshold: 0.2 }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
};
