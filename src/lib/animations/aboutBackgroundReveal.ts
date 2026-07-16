import type { Action } from 'svelte/action';

const clamp = (value: number) => Math.min(1, Math.max(0, value));

export const aboutBackgroundReveal: Action<HTMLElement> = (node) => {
	let frame = 0;

	const update = () => {
		cancelAnimationFrame(frame);

		frame = requestAnimationFrame(() => {
			const welcome = node.querySelector<HTMLElement>('#welcome');
			if (!welcome) return;

			const start = welcome.offsetTop + welcome.offsetHeight * 0.38;
			const end = welcome.offsetTop + welcome.offsetHeight * 0.92;
			const progress = clamp((window.scrollY - start) / (end - start));

			node.style.setProperty('--about-bg-progress', progress.toFixed(3));
		});
	};

	update();
	window.addEventListener('scroll', update, { passive: true });
	window.addEventListener('resize', update);

	return {
		destroy() {
			cancelAnimationFrame(frame);
			window.removeEventListener('scroll', update);
			window.removeEventListener('resize', update);
		}
	};
};
