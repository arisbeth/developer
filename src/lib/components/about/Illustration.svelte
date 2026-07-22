<script lang="ts">
	import { onMount } from 'svelte';

	import introDog from '$lib/assets/intro/intro_dog.png';
	import introDesk from '$lib/assets/intro/intro_desk.png';

	let dog: HTMLImageElement = $state();

	onMount(() => {
		let targetX = 0;
		let currentX = 0;

		function updateTarget() {
			targetX = -window.scrollY * 0.05;

			targetX = Math.max(-30, Math.min(30, targetX));
		}

		function animate() {
			currentX += (targetX - currentX) * 0.08;

			if (dog) {
				dog.style.transform = `translateX(${currentX}px)`;
			}

			requestAnimationFrame(animate);
		}

		window.addEventListener('scroll', updateTarget, { passive: true });

		updateTarget();
		animate();

		return () => {
			window.removeEventListener('scroll', updateTarget);
		};
	});
</script>

<div class="illustration" aria-hidden="true">
	<img class="desk" src={introDesk} alt="A room with a window, a desk with a computer" />

	<img
		bind:this={dog}
		class="dog"
		src={introDog}
		alt="A dog with a sweater sitting on his office chair ready to code and make art"
	/>
</div>

<style>
	.illustration {
		position: relative;
		width: 60vw;
		aspect-ratio: 2.05;
		color: #60636a;
	}

	.desk {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: auto;
		border: 0;
	}

	.dog {
		position: absolute;
		width: 40%;
		left: 30%;
		bottom: 0;
		border: 0;
		z-index: 1;

		will-change: transform;
	}

	@media (max-width: 720px) {
		.illustration {
			width: 100vw;
		}
	}
</style>
