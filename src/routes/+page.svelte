<script lang="ts">
	import About from '$lib/components/about/About.svelte';
	import Contact from '$lib/components/contact/Contact.svelte';
	import Hero from '$lib/components/hero/Hero.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import Section from '$lib/components/layout/Section.svelte';
	import Projects from '$lib/components/projects/Projects.svelte';
	import Skills from '$lib/components/skills/Skills.svelte';
	import { aboutBackgroundReveal } from '$lib/animations/aboutBackgroundReveal';

	let { form } = $props<{
		form?: {
			success?: boolean;
			message?: string;
			values?: {
				name?: string;
				email?: string;
				message?: string;
			};
		};
	}>();
</script>

<svelte:head>
	<title>Arisbeth | Web Developer & UI Designer</title>
	<meta
		name="description"
		content="Portfolio for Arisbeth, Web Developer and UI Designer building digital atmospheres."
	/>
</svelte:head>

<Header />

<main use:aboutBackgroundReveal>
	<Section id="welcome">
		<Hero />
	</Section>

	<Section id="about" tone="light">
		<About />
	</Section>

	<Section id="skills" tone="light">
		<Skills />
	</Section>

	<Section id="work">
		<Projects />
	</Section>

	<Section id="contact" tone="light">
		<Contact {form} />
	</Section>
</main>

<Footer />

<style>
	main {
		--about-bg-progress: 0;
	}

	:global(#welcome) {
		isolation: isolate;
	}

	:global(#welcome)::after {
		position: absolute;
		right: 0;
		bottom: -1px;
		left: 0;
		z-index: 0;
		height: min(64vh, 34rem);
		background: #f3a7dc;
		content: '';
		transform: scaleY(var(--about-bg-progress));
		transform-origin: bottom;
		transition: transform 90ms linear;
	}

	:global(#welcome > *) {
		position: relative;
		z-index: 1;
	}

	@media (prefers-reduced-motion: reduce) {
		:global(#welcome)::after {
			transition: none;
		}
	}
</style>
