import type { Action } from 'svelte/action';

export const parallax: Action<HTMLElement, { speed?: number } | undefined> = (node, options) => {
	const speed = options?.speed ?? 0.12;
	let frame = 0;

	const update = () => {
		cancelAnimationFrame(frame);
		frame = requestAnimationFrame(() => {
			node.style.transform = `translate3d(0, ${window.scrollY * speed}px, 0)`;
		});
	};

	window.addEventListener('scroll', update, { passive: true });
	update();

	return {
		destroy() {
			cancelAnimationFrame(frame);
			window.removeEventListener('scroll', update);
		}
	};
};
