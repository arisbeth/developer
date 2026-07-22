<script lang="ts">
	import { reveal } from '$lib/animations/reveal';
	import { parallax } from '$lib/animations/parallax';
	import Illustration from './Illustration.svelte';

	const socialLinks = [
		{
			label: 'GitHub',
			href: 'https://github.com/arisbeth',
			path: 'M8.2 16.7c-5 1.5-5-2.5-7-3m14 6v-3.9c0-1.1.1-1.5-.5-2.1 2-.2 4.1-1 4.1-4.5a3.5 3.5 0 0 0-1-2.5 3.3 3.3 0 0 0-.1-2.5s-.8-.3-2.6 1a9 9 0 0 0-4.7 0c-1.8-1.3-2.6-1-2.6-1a3.3 3.3 0 0 0-.1 2.5 3.5 3.5 0 0 0-1 2.5c0 3.5 2.1 4.3 4.1 4.5-.5.5-.8 1.1-.8 2.2v3.8'
		},
		{
			label: 'Curriculum Vitae',
			href: '/Arisbeth_CV.pdf',
			path: 'M6 2.5h6l4 4v11H6Zm6 0v4h4M8.5 10.5h5M8.5 13h5M8.5 15.5h3'
		}
	];
</script>

<div class="intro">
	<div class="art">
		<Illustration />
	</div>

	<div class="name-card" use:parallax={{ speed: -0.2 }}>
		<span class="p">&gt;_</span>
		<h2>arisbeth</h2>
		<span>Web Developer & UI Designer</span>
	</div>
</div>

<div class="terminal-band">
	<p use:reveal={{ delay: 120 }}>
		I specialize in turning complex problems into beautiful, intuitive and highly functional and
		accessible web applications. Whether it's crafting front-end interfaces or engineering robust
		back-end systems, I love every part of the development lifecycle.
	</p>
</div>

<div class="summary" use:reveal>
	<h3>Professional Summary</h3>
	<p>
		Frontend Web Developer and UI Designer with experience building responsive, CMS-driven websites
		and digital experiences for editorial, cultural and commercial projects. Skilled in frontend
		architecture, CMS integration and scalable UI implementation using SvelteKit, Craft CMS,
		WordPress, A11y and modern development workflows.
	</p>
	<nav class="socials" aria-label="Social media">
		{#each socialLinks as social}
			<a href={social.href} target="_blank" rel="noreferrer" aria-label={social.label}>
				<svg viewBox="0 0 20 20" aria-hidden="true">
					<path d={social.path} />
				</svg>
			</a>
		{/each}
	</nav>
</div>

<style>
	.intro {
		width: 100vw;
		position: relative;
		display: grid;
		align-items: end;
		padding: clamp(4rem, 11vw, 8rem) 0 clamp(4rem, 11vw, 8rem);
	}

	.art {
		position: absolute;
		bottom: 0;
	}

	.name-card {
		position: relative;
		z-index: 2;
		width: min(54rem, 76vw);
		margin-left: auto;
		padding: clamp(1.8rem, 4vw, 3.2rem) clamp(2rem, 6vw, 5.5rem);
		background: rgba(33, 34, 40, 0.95);
		box-shadow: 0 28px 60px rgba(0, 0, 0, 0.18);
	}

	.name-card .p {
		display: inline-block;
		margin: 0 1.2rem 0 0;
		color: #00b76b;
		font-size: clamp(2rem, 5vw, 3.8rem);
		line-height: 0.85;
	}

	h2 {
		display: inline-block;
		margin: 0;
		color: #f3a7dc;
		font-size: clamp(2.4rem, 8vw, 5.2rem);
		font-weight: 400;
		letter-spacing: 0.14em;
	}

	.name-card span {
		display: block;
		margin-top: 0.8rem;
		color: #00b7a7;
		font-size: clamp(0.78rem, 2vw, 1.08rem);
		letter-spacing: 0.08em;
	}

	.terminal-band {
		width: 100vw;
		margin: 0 0 0 auto;
		padding: clamp(2.1rem, 5vw, 3.6rem) clamp(1.5rem, 5vw, 3.6rem);
		background:
			linear-gradient(#050505, #050505) padding-box,
			linear-gradient(90deg, rgba(0, 183, 167, 0.15), rgba(243, 167, 220, 0.16)) border-box;
		border-bottom: 3.6rem solid #24252b;
		color: #f8f8f6;
	}

	.terminal-band p {
		max-width: 39rem;
		margin: 0;
		font-size: clamp(0.7rem, 1.3vw, 0.84rem);
		letter-spacing: 0.07em;
		line-height: 1.45;
	}

	.summary {
		max-width: 40rem;
		padding: 8rem 5vw;
		text-align: center;
		margin: 0 auto;
	}

	h3 {
		margin: 0 0 2.6rem;
		font-size: clamp(1rem, 2vw, 1.25rem);
		font-weight: 400;
		letter-spacing: 0.18em;
	}

	.summary p {
		margin: 0;
		font-size: clamp(0.72rem, 1.45vw, 0.86rem);
		letter-spacing: 0.08em;
		line-height: 1.42;
	}

	.socials {
		display: flex;
		justify-content: center;
		gap: 0.85rem;
		margin-top: clamp(3rem, 7vw, 5rem);
	}

	.socials a {
		display: grid;
		width: 2.65rem;
		aspect-ratio: 1;
		place-items: center;
		border: 1px solid #707278;
		border-radius: 50%;
		color: #24252b;
		text-decoration: none;
		transition:
			background 160ms ease,
			border-color 160ms ease,
			color 160ms ease,
			transform 160ms ease;
	}

	.socials a:hover,
	.socials a:focus-visible {
		border-color: #00b76b;
		background: #24252b;
		color: #f5a7d7;
		transform: translateY(-0.22rem);
	}

	svg {
		width: 1.25rem;
		height: 1.25rem;
		fill: none;
		stroke: currentColor;
		stroke-linecap: round;
		stroke-linejoin: round;
		stroke-width: 1.45;
	}

	@media (max-width: 720px) {
		.intro {
			padding-bottom: 10rem;
		}
		.name-card {
			width: 91vw;
		}
	}

	@media (min-width: 1920px) {
		.intro {
			min-height: 700px;
		}
	}
</style>
