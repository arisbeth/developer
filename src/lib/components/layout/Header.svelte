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
	let isScrolled = $state(false);
	let mobileOpen = $state(false);
	let currentSection = $state('welcome');

	function openMenu() {
		mobileOpen = true;
		document.documentElement.style.overflow = 'hidden';
	}

	function closeMenu() {
		mobileOpen = false;
		document.documentElement.style.overflow = '';
	}

	function toggleMenu() {
		mobileOpen ? closeMenu() : openMenu();
	}

	onMount(() => {
		let previousScrollY = window.scrollY;
		let ticking = false;

		const updateHeader = () => {
			const scrollY = window.scrollY;
			const distance = scrollY - previousScrollY;

			isScrolled = scrollY > 40;

			if (!mobileOpen) {
				if (scrollY < 48) {
					isHidden = false;
				} else if (Math.abs(distance) > 4) {
					isHidden = distance > 0;
				}
			}

			previousScrollY = scrollY;
			ticking = false;
		};

		const handleScroll = () => {
			if (!ticking) {
				requestAnimationFrame(updateHeader);
				ticking = true;
			}
		};

		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((entry) => entry.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

				if (visible) {
					currentSection = visible.target.id;
					activeSection.set(currentSection);
				}
			},
			{
				rootMargin: '-20% 0px -55% 0px',
				threshold: [0.1, 0.35, 0.6]
			}
		);

		navItems.forEach(({ href }) => {
			const section = document.querySelector(href);

			if (section) observer.observe(section);
		});

		const handleKeydown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				closeMenu();
			}
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		window.addEventListener('keydown', handleKeydown);

		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('keydown', handleKeydown);

			document.documentElement.style.overflow = '';

			observer.disconnect();
		};
	});
</script>

<header
	class="site-header"
	class:peekaboo-hidden={isHidden && !mobileOpen}
	class:scrolled={isScrolled}
>
	<div class="nav-wrapper">
		<!-- Desktop navigation -->

		<nav class="desktop-nav" aria-label="Primary navigation">
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

		<!-- Mobile toggle -->

		<button
			class="menu-toggle"
			type="button"
			aria-expanded={mobileOpen}
			aria-controls="mobile-navigation"
			onclick={toggleMenu}
		>
			<span class="menu-text">
				{#if mobileOpen}
					CLOSE
				{:else}
					MENU
				{/if}
			</span>

			<span class="menu-icon" class:open={mobileOpen}>
				<span></span>
				<span></span>
			</span>
		</button>
	</div>
</header>

<!-- Mobile overlay -->

<div class="mobile-overlay" class:open={mobileOpen} onclick={closeMenu}>
	<nav
		id="mobile-navigation"
		class="mobile-nav"
		aria-label="Mobile navigation"
		onclick={(event) => event.stopPropagation()}
	>
		<p class="mobile-title">arisbeth dev</p>

		{#each navItems as item, index}
			<a
				href={item.href}
				class:active={currentSection === item.href.slice(1)}
				style={`--delay:${index * 90}ms`}
				onclick={closeMenu}
			>
				{item.label}
			</a>
		{/each}
	</nav>
</div>

<style>
	/* ==========================================================
   HEADER
========================================================== */

	.site-header {
		position: fixed;
		inset: 0 0 auto 0;
		z-index: 100;
		display: flex;
		justify-content: center;
		pointer-events: none;
		padding: 1rem;
		transition: padding 0.35s ease;
	}

	.site-header.scrolled {
		padding: 0;
	}

	.nav-wrapper {
		pointer-events: auto;

		display: flex;
		align-items: center;
		justify-content: center;

		width: fit-content;

		padding: 0.9rem 1.4rem;

		/* border-radius: 999px; */

		transform-origin: center;

		transition:
			background 0.35s ease,
			border-color 0.35s ease,
			box-shadow 0.35s ease,
			transform 0.45s cubic-bezier(0.22, 1, 0.36, 1),
			opacity 0.35s ease,
			backdrop-filter 0.35s ease;

		mix-blend-mode: difference;
	}

	/* ==========================================================
   SCROLLED
========================================================== */

	.site-header.scrolled .nav-wrapper {
		background: rgba(16, 16, 16, 0.55);

		backdrop-filter: blur(8px);

		-webkit-backdrop-filter: blur(8px);

		/* border: 1px solid rgba(255, 255, 255, 0.08); */

		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);

		mix-blend-mode: normal;
	}

	/* ==========================================================
   PEEKABOO
========================================================== */

	.peekaboo-hidden .nav-wrapper {
		opacity: 0;

		transform: translateY(-28px) scale(0.92);
	}

	.site-header:not(.peekaboo-hidden) .nav-wrapper {
		opacity: 1;

		transform: translateY(0) scale(1);
	}

	/* ==========================================================
   DESKTOP NAV
========================================================== */

	.desktop-nav {
		display: flex;

		align-items: center;

		gap: clamp(1.2rem, 4vw, 3.5rem);

		font-size: 0.72rem;

		letter-spacing: 0.08em;
	}

	.desktop-nav a {
		position: relative;

		text-decoration: none;

		color: #fff;

		transition:
			color 0.25s ease,
			opacity 0.25s ease;
	}

	.desktop-nav a::after {
		content: '';

		position: absolute;

		left: 0;
		right: 0;
		bottom: -8px;

		height: 1px;

		background: #00b76b;

		transform: scaleX(0.3);

		opacity: 0;

		transform-origin: center;

		transition:
			transform 0.25s ease,
			opacity 0.25s ease;
	}

	.desktop-nav a:hover,
	.desktop-nav a.active {
		color: #f8a8df;
	}

	.desktop-nav a:hover::after,
	.desktop-nav a.active::after {
		opacity: 1;

		transform: scaleX(1);
	}

	/* ==========================================================
   MENU BUTTON
========================================================== */

	.menu-toggle {
		display: none;

		align-items: center;

		gap: 0.7rem;

		padding: 0;

		background: none;

		border: none;

		cursor: pointer;

		color: #fff;

		font: inherit;

		letter-spacing: 0.08em;
	}

	.menu-text {
		font-size: 0.72rem;

		user-select: none;
	}

	.menu-icon {
		position: relative;

		width: 16px;

		height: 16px;

		display: block;
	}

	.menu-icon span {
		position: absolute;

		top: 50%;
		left: 50%;

		width: 14px;
		height: 1.5px;

		border-radius: 999px;

		background: #fff;

		transform-origin: center;

		transition:
			transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
			opacity 0.25s;
	}

	.menu-icon span:first-child {
		transform: translate(-50%, -50%) rotate(0);
	}

	.menu-icon span:last-child {
		transform: translate(-50%, -50%) rotate(90deg);
	}

	/* OPEN */

	.menu-icon.open span:first-child {
		transform: translate(-50%, -50%) rotate(45deg);
	}

	.menu-icon.open span:last-child {
		transform: translate(-50%, -50%) rotate(-45deg);
	}

	/* ==========================================================
   MOBILE OVERLAY
========================================================== */

	.mobile-overlay {
		position: fixed;

		inset: 0;

		display: flex;

		align-items: center;

		justify-content: center;

		opacity: 0;

		pointer-events: none;

		transition:
			opacity 0.45s ease,
			backdrop-filter 0.45s ease;

		z-index: 90;
	}

	.mobile-overlay.open {
		opacity: 1;
		pointer-events: auto;

		background:
			linear-gradient(180deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0)),
			rgba(8, 8, 8, 0.74);

		backdrop-filter: blur(28px);

		-webkit-backdrop-filter: blur(28px);
	}

	/* ==========================================================
   MOBILE NAV
========================================================== */

	.mobile-nav {
		display: flex;

		flex-direction: column;

		align-items: center;

		gap: 1.6rem;
	}

	.mobile-title {
		margin-bottom: 2rem;

		font-size: 0.75rem;

		letter-spacing: 0.22em;

		color: rgba(255, 255, 255, 0.45);
	}

	/* LINKS */

	.mobile-nav a {
		text-decoration: none;

		color: white;

		font-size: clamp(2rem, 8vw, 3.4rem);

		line-height: 1;

		opacity: 0;

		filter: blur(8px);

		transform: translateY(28px);

		transition:
			transform 0.55s cubic-bezier(0.22, 1, 0.36, 1),
			opacity 0.45s,
			filter 0.45s;

		transition-delay: var(--delay);
	}

	.mobile-overlay.open a {
		opacity: 1;

		filter: none;

		transform: none;
	}

	.mobile-nav a.active {
		color: #f8a8df;
	}

	/* ==========================================================
   RESPONSIVE
========================================================== */

	@media (max-width: 768px) {
		.desktop-nav {
			display: none;
		}

		.menu-toggle {
			display: flex;
		}
	}

	@media (min-width: 769px) {
		.mobile-overlay {
			display: none;
		}
		.desktop-nav {
			font-size: 0.75rem;
		}
	}

	/* A11y */

	/* ==========================================================
   ACCESSIBILITY
========================================================== */

	.desktop-nav a:focus-visible,
	.mobile-nav a:focus-visible,
	.menu-toggle:focus-visible {
		outline: 2px solid #f8a8df;

		outline-offset: 6px;

		border-radius: 999px;
	}

	/* ==========================================================
   HOVER
========================================================== */

	@media (hover: hover) {
		.desktop-nav a:hover {
			transform: translateY(-1px);
		}

		.menu-toggle:hover {
			opacity: 0.75;
		}
	}

	/* ==========================================================
   REDUCED MOTION
========================================================== */

	@media (prefers-reduced-motion: reduce) {
		* {
			animation: none !important;

			transition: none !important;

			scroll-behavior: auto !important;
		}
	}

	/* ==========================================================
   SMALL DEVICES
========================================================== */

	@media (max-width: 480px) {
		.nav-wrapper {
			padding: 0.8rem 1rem;
		}

		.mobile-nav {
			gap: 1.2rem;
		}

		.mobile-nav a {
			font-size: 1.85rem;
		}
	}

	/* ==========================================================
   LARGE SCREENS
========================================================== */

	@media (min-width: 1600px) {
		.desktop-nav {
			font-size: 0.8rem;
			gap: 4rem;
		}
	}

	/* ==========================================================
   GLASS SHINE
========================================================== */

	/* ==========================================================
   PERFORMANCE
========================================================== */

	.nav-wrapper {
		will-change: transform, opacity, backdrop-filter;
	}

	.mobile-overlay {
		will-change: opacity;
	}

	.mobile-nav a {
		will-change: transform, filter, opacity;
	}
</style>
