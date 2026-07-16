import type { Action } from 'svelte/action';

export const splitText: Action<HTMLElement, { stagger?: number } | undefined> = (node, options) => {
	const text = node.textContent ?? '';
	const stagger = options?.stagger ?? 24;

	node.textContent = '';
	node.setAttribute('aria-label', text);

	for (const [index, char] of [...text].entries()) {
		const span = document.createElement('span');
		span.textContent = char === ' ' ? '\u00a0' : char;
		span.style.animationDelay = `${index * stagger}ms`;
		span.className = 'split-letter';
		span.setAttribute('aria-hidden', 'true');
		node.appendChild(span);
	}
};
