<script lang="ts">
	let {
		id,
		tone = 'dark',
		children
	}: {
		id: string;
		tone?: 'dark' | 'light';
		children: import('svelte').Snippet;
	} = $props();
</script>

<section {id} class:light={tone === 'light'}>
	{@render children()}
</section>

<style>
	section {
		position: relative;
		overflow: hidden;
		background: #050505;
		color: #f7f7f7;
	}

	.light {
		background: #f8f8f6;
		color: #26272c;
	}
</style>
