<script lang="ts">
	import introDog from '$lib/assets/intro/intro_dog.png';
	import introDesk from '$lib/assets/intro/intro_desk.png';
</script>

<div class="illustration" aria-hidden="true">
	<img class="desk" src={introDesk} alt="A room with a window, a desk with a computer" />
	<img class="dog" src={introDog} alt="A friendly dog" />
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
		right: 0;
		bottom: 0;
		width: 100%;
		height: auto;
		border: 0;
	}

	.dog {
		position: absolute;
		width: 40%;
		left: 25%;
		bottom: 0;
		border: 0;
		z-index: 1;
	}
</style>
