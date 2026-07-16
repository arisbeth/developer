<script lang="ts">
	import SkillTerminal from './SkillTerminal.svelte';
</script>

<div class="skills-wrap">
	<SkillTerminal />

	<!-- 	<div class="icons" aria-hidden="true">
		<span>⌁</span>
		<span>▣</span>
		<span>▤</span>
		<span>○</span>
	</div> -->
</div>

<style>
	.skills-wrap {
		padding: 0 0 clamp(5.2rem, 9vw, 7.6rem);
		background: #f8f8f6;
	}

	.icons {
		display: flex;
		justify-content: center;
		gap: 0.5rem;
		margin-top: clamp(4rem, 8vw, 6rem);
		color: #707278;
		font-size: clamp(2rem, 4vw, 3rem);
		line-height: 1;
	}

	.icons span {
		display: inline-grid;
		width: 2.7rem;
		aspect-ratio: 1;
		place-items: center;
		border: 1px solid currentColor;
		border-radius: 50%;
		transform: rotate(-8deg);
	}
</style>
