<script lang="ts">
	import { splitText } from '$lib/animations/splitText';

	import BackgroundNoise from './BackgroundNoise.svelte';
	import TerminalCursor from './TerminalCursor.svelte';
</script>

<div class="hero-shell">
	<BackgroundNoise />

	<div class="hero-copy">
		<p class="eyebrow" use:splitText={{ stagger: 18 }}>Turning ideas into experiences</p>
		<h1><span>&gt;</span><TerminalCursor /> building digital atmosphere</h1>
		<p class="subtitle">Motion, interaction and modern frontend systems.</p>
	</div>
</div>

<style>
	.hero-shell {
		position: relative;
		display: grid;
		min-height: 90vh;
		place-items: center;
		padding: 7rem 1.25rem 5rem;
	}

	.hero-copy {
		position: relative;
		z-index: 1;
		text-align: center;
	}

	.eyebrow {
		color: #f0a5d8;
		font-size: clamp(0.68rem, 1.6vw, 0.95rem);
		letter-spacing: 0.5em;
		text-transform: uppercase;
		margin-bottom: clamp(0.9rem, 2.5vw, 1.25rem);
	}
	.eyebrow > span {
		text-transform: lowercase;
		letter-spacing: 0;
	}

	.eyebrow + .eyebrow {
		margin-bottom: clamp(1.8rem, 5vw, 3.4rem);
		letter-spacing: 0.25em;
	}

	h1 {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: center;
		gap: 0.35em;
		max-width: 78rem;
		margin: 0;
		font-size: clamp(1.65rem, 5.7vw, 4rem);
		font-weight: 500;
		line-height: 1.15;
	}

	h1 span {
		color: #f7f7f7;
	}

	.subtitle {
		margin: clamp(1.4rem, 3vw, 2.4rem) auto 0;
		color: #00b7a7;
		font-size: clamp(0.68rem, 1.4vw, 0.9rem);
		letter-spacing: 0.08em;
	}

	@media (max-width: 768px) {
		.hero-shell {
			padding-bottom: 0;
		}
	}

	:global(.split-letter) {
		display: inline-block;
		animation: letter-in 520ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
	}

	@keyframes letter-in {
		from {
			opacity: 0;
			transform: translateY(0.7rem);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
