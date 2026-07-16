<script lang="ts">
	import { magnetic } from '$lib/animations/magnetic';

	let {
		title,
		link,
		category,
		image,
		accent = '#f5a7d7'
	}: {
		title: string;
		link: string;
		category: string;
		image?: string;
		accent?: string;
	} = $props();
</script>

<article class="card" style={`--accent: ${accent}`} use:magnetic={{ strength: 0.055 }}>
	<a href={link} target="_blank" rel="noopener noreferrer">
		{#if image}
			<img src={image} alt={title} />
		{:else}
			<div class="generated-preview">
				<span>{title}</span>
			</div>
		{/if}
		<div class="meta">
			<h3>{title}</h3>
			<p>{category}</p>
		</div></a
	>
</article>

<style>
	.card {
		position: relative;
		flex: 0 0 clamp(16rem, 36vw, 32rem);
		overflow: hidden;
		background: #16171d;
		transition:
			transform 180ms ease,
			box-shadow 180ms ease;
		will-change: transform;
	}

	.card:hover {
		box-shadow: 0 1rem 3.5rem rgba(0, 183, 167, 0.12);
	}

	img,
	.generated-preview {
		display: block;
		width: 100%;
		aspect-ratio: 16 / 9;
		object-fit: cover;
	}

	img {
		transition: opacity 0.3s ease-in-out;
		opacity: 0.5;
		mix-blend-mode: luminosity;
	}
	.card:hover img {
		opacity: 1;
		mix-blend-mode: normal;
	}

	.generated-preview {
		display: grid;
		place-items: center;
		background:
			linear-gradient(135deg, color-mix(in srgb, var(--accent), black 10%), transparent 55%),
			repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.08) 0 1px, transparent 1px 13px),
			#24252b;
		color: #f7f7f7;
		font-size: clamp(1rem, 2vw, 1.45rem);
		letter-spacing: 0.1em;
		text-align: center;
		text-transform: uppercase;
	}

	.meta {
		padding: 1rem 1.1rem 1.1rem;
	}

	h3,
	p {
		margin: 0;
		font-weight: 400;
	}

	h3 {
		color: #f7f7f7;
		font-size: 0.82rem;
		letter-spacing: 0.1em;
	}

	p {
		margin-top: 0.4rem;
		color: #00b7a7;
		font-size: 0.68rem;
		letter-spacing: 0.08em;
	}
</style>
