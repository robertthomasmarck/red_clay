import type { APIRoute } from 'astro';
import { Resend } from 'resend';

interface TurnstileResponse {
  success: boolean;
  'error-codes'?: string[];
  challenge_ts?: string;
  hostname?: string;
}

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  'cf-turnstile-response': string;
}

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();

    const data: ContactFormData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      message: formData.get('message') as string,
      'cf-turnstile-response': formData.get('cf-turnstile-response') as string,
    };

    // Validate required fields
    if (!data.name || !data.email || !data.phone || !data.message) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'All fields are required',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Invalid email format',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Verify Cloudflare Turnstile token
    const turnstileVerification = await verifyTurnstile(data['cf-turnstile-response']);
    if (!turnstileVerification.success) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'CAPTCHA verification failed. Please try again.',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Send email via Resend
    await sendEmail(data);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Form submitted successfully',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'An error occurred processing your request',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};

async function verifyTurnstile(token: string): Promise<TurnstileResponse> {
  const secretKey = import.meta.env.TURNSTILE_SECRET_KEY;

  // Skip verification if no secret key (local development)
  if (!secretKey || secretKey === 'your_secret_key') {
    console.warn('Turnstile verification skipped - no secret key configured');
    return { success: true };
  }

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret: secretKey,
      response: token,
    }),
  });

  return response.json();
}

async function sendEmail(data: ContactFormData): Promise<void> {
  const resend = new Resend(import.meta.env.RESEND_API_KEY);
  const toEmail = import.meta.env.CONTACT_EMAIL_TO;

  // Skip sending if no API key (local development)
  if (!import.meta.env.RESEND_API_KEY || import.meta.env.RESEND_API_KEY === 'your_resend_key') {
    console.log('Email sending skipped - no Resend API key configured');
    console.log('Form data:', data);
    return;
  }

  await resend.emails.send({
    from: 'Contact Form <onboarding@resend.dev>',
    to: toEmail,
    subject: `New Contact Form Submission from ${data.name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(data.message).replace(/\n/g, '<br>')}</p>
    `,
    replyTo: data.email,
  });
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}
