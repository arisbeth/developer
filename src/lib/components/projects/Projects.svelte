<script lang="ts">
	import { reveal } from '$lib/animations/reveal';
	import image_1 from '$lib/assets/projects/image_1.jpg';
	import image_2 from '$lib/assets/projects/image_2.jpg';
	import image_3 from '$lib/assets/projects/image_3.jpg';
	import image_4 from '$lib/assets/projects/image_4.jpg';
	import ProjectCard from './ProjectCard.svelte';

	const projects = [
		{
			title: 'Camp Aranzazu',
			link: 'https://camparanzazu.org',
			category: 'Craft CMS + Twig Backend + Custom Tailwind Frontend',
			image: image_1,
			accent: '#00b7a7'
		},
		{
			title: 'Little Woodrows',
			link: 'https://littlewoodrows.com/',
			category: 'WordPress + PHP Backend + Custom WordPress Theme Frontend',
			image: image_2,
			accent: '#f5a7d7'
		},
		{
			title: 'Cafe MomentumAnnual Report',
			link: 'https://annualreport.cafemomentum.org/',
			category: 'SvelteKit + WPGraphQL + Headless WordPress Frontend',
			image: image_3,
			accent: '#ff5b2e'
		},
		{
			title: 'Kensington',
			link: 'https://kensingtondev.com/',
			category: 'Craft CMS + Backend Twig + Custom Tailwind Frontend',
			image: image_4,
			accent: '#6877ff'
		}
	];
</script>

<div class="work" use:reveal>
	<h2>>_ Projects</h2>

	<div class="rail" aria-label="Portfolio projects">
		{#each projects as project}
			<ProjectCard {...project} />
		{/each}
	</div>

	<p class="caption">
		Front-end development & CMS Integration<br />CTTO ©
		<a
			class="black-magic"
			href="https://heyblackmagic.com/about"
			target="_blank"
			rel="noopener noreferrer">Black Magic</a
		>
	</p>
</div>

<style>
	.work {
		padding: clamp(4rem, 9vw, 7rem) 0 clamp(4rem, 9vw, 6.4rem);
	}

	h2 {
		margin: 0 0 clamp(4rem, 9vw, 6.4rem) clamp(1.25rem, 4vw, 3rem);
		font-size: clamp(1rem, 2.4vw, 1.45rem);
		font-weight: 400;
		letter-spacing: 0.08em;
	}

	.rail {
		display: flex;
		gap: clamp(1rem, 2.5vw, 2rem);
		overflow-x: auto;
		padding: 0 clamp(1.25rem, 4vw, 3rem) 1rem;
		scroll-snap-type: x mandatory;
		scrollbar-color: #2b2d35 transparent;
	}

	.rail :global(article) {
		scroll-snap-align: center;
	}

	.caption {
		max-width: 25rem;
		margin: clamp(2.8rem, 6vw, 5rem) clamp(1.25rem, 9vw, 9rem) 0 auto;
		color: #f7f7f7;
		font-size: clamp(0.66rem, 1.3vw, 0.82rem);
		letter-spacing: 0.1em;
		line-height: 1.8;
		text-align: right;
	}

	a.black-magic {
		position: relative;
		color: #f7f7f7;
		text-decoration: none;
		transition:
			color 180ms ease,
			opacity 180ms ease;
	}

	a.black-magic::after {
		position: absolute;
		right: 0;
		bottom: -0.52rem;
		left: 0;
		height: 1px;
		background: #00b76b;
		content: '';
		opacity: 0;
		transform: scaleX(0.35);
		transition:
			opacity 180ms ease,
			transform 180ms ease;
	}

	a.black-magic:hover,
	a.black-magic:focus-visible {
		color: #f8a8df;
	}

	a.black-magic:hover::after,
	a.black-magic:focus-visible::after {
		opacity: 1;
		transform: scaleX(1);
	}
</style>
