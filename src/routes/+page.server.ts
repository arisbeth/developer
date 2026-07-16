import { fail } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const clean = (value: FormDataEntryValue | null) => String(value ?? '').trim();
const successMessage = 'Message delivered. Thank you for reaching out, I will reply soon.';
const escapeHtml = (value: string) =>
	value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#039;');

export const actions = {
	contact: async ({ request }) => {
		const data = await request.formData();
		const name = clean(data.get('name'));
		const email = clean(data.get('email'));
		const message = clean(data.get('message'));
		const website = clean(data.get('website'));

		const values = { name, email, message };

		if (website) {
			return { success: true, message: successMessage };
		}

		if (!name || !email || !message) {
			return fail(400, {
				message: 'Please complete all required fields.',
				values
			});
		}

		if (!emailPattern.test(email)) {
			return fail(400, {
				message: 'Please enter a valid email address.',
				values
			});
		}

		if (!env.RESEND_API_KEY) {
			return fail(500, {
				message: 'Missing RESEND_API_KEY. Add it to your .env file.',
				values
			});
		}

		const response = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${env.RESEND_API_KEY}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				from: env.CONTACT_FROM_EMAIL ?? 'Portfolio <onboarding@resend.dev>',
				to: [env.CONTACT_TO_EMAIL ?? 'arisbeth.hg@gmail.com'],
				reply_to: email,
				subject: `Portfolio message from ${name}`,
				text: [`Name: ${name}`, `Email: ${email}`, '', message].join('\n'),
				html: `
					<p><strong>Name:</strong> ${escapeHtml(name)}</p>
					<p><strong>Email:</strong> ${escapeHtml(email)}</p>
					<p>${escapeHtml(message).replaceAll('\n', '<br>')}</p>
				`
			})
		});

		if (!response.ok) {
			if (dev) {
				console.error('Resend contact form error', {
					status: response.status,
					body: await response.text()
				});
			}

			return fail(500, {
				message: 'The message could not be sent right now. Please try again later.',
				values
			});
		}

		return { success: true, message: successMessage };
	}
};
