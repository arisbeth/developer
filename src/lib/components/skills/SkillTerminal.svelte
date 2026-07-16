<script lang="ts">
	import { reveal } from '$lib/animations/reveal';

	const groups = [
		{
			title: 'Frontend',
			items: ['Svelte', 'SvelteKit', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Responsive Design']
		},
		{
			title: 'CMS & Integration',
			items: ['Craft CMS', 'WordPress', 'Headless CMS', 'Twig', 'GraphQL', 'Shopify']
		},
		{
			title: 'Workflow & Tools',
			items: ['Git', 'Docker', 'DDEV', 'Vite', 'npm', 'Deployment workflows']
		},
		{
			title: 'Design & UI',
			items: ['Figma', 'Adobe XD', 'Sketch', 'Zeplin', 'Wireframes', 'Accessibility']
		}
	];
</script>

<div class="terminal" use:reveal>
	{#each groups as group}
		<div class="group">
			<h3>{group.title}:</h3>
			<p>{group.items.join('   ·   ')}</p>
		</div>
	{/each}
</div>

<style>
	.terminal {
		width: min(64rem, 82vw);
		margin: 0 0 0 auto;
		padding: clamp(2rem, 4vw, 3.4rem);
		background: #25262c;
		color: #00b76b;
	}

	.group + .group {
		margin-top: 1.2rem;
	}

	h3,
	p {
		margin: 0;
		font-size: clamp(0.68rem, 1.35vw, 0.86rem);
		letter-spacing: 0.06em;
		line-height: 1.45;
	}

	h3 {
		font-weight: 500;
	}

	p {
		color: #00a990;
	}

	@media (max-width: 720px) {
		.terminal {
			width: 92vw;
		}
	}
</style>
