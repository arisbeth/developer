import type { Action } from 'svelte/action';

export const magnetic: Action<HTMLElement, { strength?: number } | undefined> = (node, options) => {
	const strength = options?.strength ?? 0.22;

	const move = (event: MouseEvent) => {
		const rect = node.getBoundingClientRect();
		const x = (event.clientX - rect.left - rect.width / 2) * strength;
		const y = (event.clientY - rect.top - rect.height / 2) * strength;
		node.style.transform = `translate(${x}px, ${y}px)`;
	};

	const reset = () => {
		node.style.transform = 'translate(0, 0)';
	};

	node.addEventListener('mousemove', move);
	node.addEventListener('mouseleave', reset);

	return {
		destroy() {
			node.removeEventListener('mousemove', move);
			node.removeEventListener('mouseleave', reset);
		}
	};
};
