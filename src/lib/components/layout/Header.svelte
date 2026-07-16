<script lang="ts">
	import { onMount } from 'svelte';
	import { activeSection } from '$lib/stores/navigation';

	const navItems = [
		{ label: 'welcome :)', href: '#welcome' },
		{ label: 'about', href: '#about' },
		{ label: 'skills', href: '#skills' },
		{ label: 'work', href: '#work' },
		{ label: 'reach out', href: '#contact' }
	];

	let isHidden = $state(false);
	let currentSection = $state('welcome');

	onMount(() => {
		let previousScrollY = window.scrollY;
		let ticking = false;

		const updateHeader = () => {
			const scrollY = window.scrollY;
			const distance = scrollY - previousScrollY;

			if (scrollY < 48) {
				isHidden = false;
			} else if (Math.abs(distance) > 4) {
				isHidden = distance > 0;
			}

			previousScrollY = scrollY;
			ticking = false;
		};

		const handleScroll = () => {
			if (!ticking) {
				window.requestAnimationFrame(updateHeader);
				ticking = true;
			}
		};

		const observer = new IntersectionObserver(
			(entries) => {
				const visibleSection = entries
					.filter((entry) => entry.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

				if (visibleSection) {
					currentSection = visibleSection.target.id;
					activeSection.set(currentSection);
				}
			},
			{ rootMargin: '-20% 0px -55% 0px', threshold: [0.1, 0.35, 0.6] }
		);

		navItems.forEach(({ href }) => {
			const section = document.querySelector(href);
			if (section) observer.observe(section);
		});

		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', handleScroll);
			observer.disconnect();
		};
	});
</script>

<header class:peekaboo-hidden={isHidden} class="site-header" aria-label="Primary navigation">
	<nav>
		{#each navItems as item}
			<a
				href={item.href}
				class:active={currentSection === item.href.slice(1)}
				aria-current={currentSection === item.href.slice(1) ? 'page' : undefined}
				onclick={() => {
					isHidden = false;
				}}
			>
				{item.label}
			</a>
		{/each}
	</nav>
</header>

<style>
	.site-header {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 50;
		width: 100%;
		padding: 1.15rem 1rem;
		mix-blend-mode: difference;
		transition:
			transform 260ms cubic-bezier(0.22, 1, 0.36, 1),
			opacity 180ms ease;
	}

	.peekaboo-hidden {
		opacity: 0;
		transform: translateY(-125%);
	}

	.site-header:focus-within {
		opacity: 1;
		transform: translateY(0);
	}

	nav {
		display: flex;
		justify-content: center;
		gap: clamp(1.1rem, 5vw, 4rem);
		font-size: clamp(0.58rem, 1.5vw, 0.74rem);
		letter-spacing: 0.08em;
	}

	a {
		position: relative;
		color: #f7f7f7;
		text-decoration: none;
		transition:
			color 180ms ease,
			opacity 180ms ease;
	}

	a::after {
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

	a:hover,
	a:focus-visible {
		color: #f8a8df;
	}

	a:hover::after,
	a:focus-visible::after,
	a.active::after {
		opacity: 1;
		transform: scaleX(1);
	}

	a.active {
		color: #f8a8df;
	}

	@media (prefers-reduced-motion: reduce) {
		.site-header,
		a,
		a::after {
			transition: none;
		}
	}
</style>
