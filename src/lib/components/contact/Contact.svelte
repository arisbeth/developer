<script lang="ts">
	import { reveal } from '$lib/animations/reveal';
	import contactImage from '$lib/assets/contact/contact.jpg';

	type ContactFormResult = {
		success?: boolean;
		message?: string;
		values?: {
			name?: string;
			email?: string;
			message?: string;
		};
	};

	let { form }: { form?: ContactFormResult } = $props();

	const socialLinks = [
		{
			label: 'GitHub',
			href: 'https://github.com/arisbeth',
			path: 'M8.2 16.7c-5 1.5-5-2.5-7-3m14 6v-3.9c0-1.1.1-1.5-.5-2.1 2-.2 4.1-1 4.1-4.5a3.5 3.5 0 0 0-1-2.5 3.3 3.3 0 0 0-.1-2.5s-.8-.3-2.6 1a9 9 0 0 0-4.7 0c-1.8-1.3-2.6-1-2.6-1a3.3 3.3 0 0 0-.1 2.5 3.5 3.5 0 0 0-1 2.5c0 3.5 2.1 4.3 4.1 4.5-.5.5-.8 1.1-.8 2.2v3.8'
		},
		{
			label: 'LinkedIn',
			href: 'https://www.linkedin.com/in/arisbeth-hernandez',
			path: 'M4.8 8.3v10.2M4.8 5.5v.1M9.2 18.5v-6.1c0-2.5 1.4-4.1 3.6-4.1 2 0 3.3 1.4 3.3 4.1v6.1M9.2 8.6v9.9'
		},
		{
			label: 'Instagram',
			href: 'https://www.instagram.com/artstaris',
			path: 'M7.2 3.8h5.6a3.4 3.4 0 0 1 3.4 3.4v5.6a3.4 3.4 0 0 1-3.4 3.4H7.2a3.4 3.4 0 0 1-3.4-3.4V7.2a3.4 3.4 0 0 1 3.4-3.4Zm2.8 3.7a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Zm4-1.1h.1'
		},
		{
			label: 'Curriculum Vitae',
			href: '/Arisbeth_CV.pdf',
			path: 'M6 2.5h6l4 4v11H6Zm6 0v4h4M8.5 10.5h5M8.5 13h5M8.5 15.5h3'
		}
	];
</script>

<div class="contact" use:reveal>
	<div class="contact-inner">
		<h2>Make Contact :)</h2>

		<div class="contact-grid">
			<img
				class="contact-image"
				src={contactImage}
				alt="Dog with headset for contact support"
				aria-hidden="true"
				use:reveal={{ delay: 120 }}
			/>

			<form method="POST" action="?/contact">
				<label class="honeypot">
					<span>Website</span>
					<input name="website" tabindex="-1" autocomplete="off" />
				</label>
				<label>
					<span>Your Name*</span>
					<input
						name="name"
						autocomplete="name"
						placeholder="Your Name*"
						value={form?.values?.name ?? ''}
						required
					/>
				</label>
				<label>
					<span>Your Email*</span>
					<input
						name="email"
						type="email"
						autocomplete="email"
						placeholder="Your Email*"
						value={form?.values?.email ?? ''}
						required
					/>
				</label>
				<label>
					<span>Your Message*</span>
					<textarea name="message" rows="4" placeholder="Your Message*" required
						>{form?.values?.message ?? ''}</textarea
					>
				</label>
				<button type="submit">Send</button>

				{#if form?.message}
					<p class:success={form.success} class="form-message" aria-live="polite">{form.message}</p>
				{/if}
			</form>
		</div>

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
</div>

<style>
	.contact {
		min-height: 65vh;
		display: grid;
		place-items: center;
		padding: clamp(5rem, 11vw, 8rem) 1.25rem clamp(5rem, 10vw, 7rem);
		background: #f8f8f6;
		color: #26272c;
	}

	h2 {
		margin: 0 0 clamp(3rem, 6vw, 4.6rem);
		font-size: clamp(1rem, 2vw, 1.35rem);
		font-weight: 400;
		letter-spacing: 0.18em;
		text-align: center;
	}

	.contact-grid {
		display: grid;
		grid-template-columns: minmax(8rem, 15rem) minmax(14rem, 24rem);
		align-items: end;
		justify-content: center;
		gap: clamp(1.5rem, 5vw, 4rem);
	}

	form {
		display: grid;
		gap: 0.7rem;
	}

	label {
		display: grid;
	}

	.honeypot {
		position: absolute;
		left: -9999px;
		opacity: 0;
		pointer-events: none;
	}

	span {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
	}

	input,
	textarea {
		width: 100%;
		border: 0;
		background: #24252b;
		color: #f8f8f6;
		font: inherit;
		font-size: 0.74rem;
		letter-spacing: 0.08em;
		outline: 1px solid transparent;
		padding: 0.58rem 0.8rem;
		resize: vertical;
	}

	input::placeholder,
	textarea::placeholder {
		color: #f8f8f6;
	}

	input:focus,
	textarea:focus {
		outline-color: #00b7a7;
	}

	button {
		border: 0;
		background: #f5a7d7;
		box-shadow: 0.55rem 0.55rem 0 #d5d5d2;
		color: #26272c;
		cursor: pointer;
		font: inherit;
		font-size: 0.74rem;
		letter-spacing: 0.08em;
		padding: 0.7rem 1rem;
		transition:
			transform 160ms ease,
			box-shadow 160ms ease;
	}

	button:hover,
	button:focus-visible {
		box-shadow: 0.25rem 0.25rem 0 #d5d5d2;
		transform: translate(0.3rem, 0.3rem);
	}

	.form-message {
		margin: 0.65rem 0 0;
		color: #a33b61;
		font-size: 0.7rem;
		letter-spacing: 0.08em;
		line-height: 1.5;
	}

	.form-message.success {
		color: #008a60;
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

	.contact-image {
		width: min(15rem, 36vw);
		height: auto;
		align-self: end;
		filter: grayscale(1) contrast(1.08);
		mix-blend-mode: multiply;
		user-drag: none;
		-webkit-user-drag: none;
		-moz-user-select: none;
	}

	@media (max-width: 680px) {
		.contact-grid {
			grid-template-columns: 1fr;
		}

		.contact-image {
			justify-self: center;
			width: min(13rem, 60vw);
		}
	}
</style>
