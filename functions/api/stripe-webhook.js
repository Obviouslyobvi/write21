// Stripe Webhook Handler for Cloudflare Pages Functions
// This receives checkout.session.completed events from Stripe
// and marks users as paid in Supabase.

import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

export async function onRequestPost(context) {
  const { request, env } = context;

  // Initialize Stripe
  const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-12-18.acacia',
  });

  // Read the raw body for signature verification
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  let event;

  // Verify webhook signature
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return new Response(JSON.stringify({ error: 'Invalid signature' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Get the user ID from client_reference_id
    const userId = session.client_reference_id;

    if (!userId) {
      console.error('No client_reference_id in checkout session');
      return new Response(JSON.stringify({ error: 'Missing user ID' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Initialize Supabase with service role key (admin access)
    const supabaseAdmin = createClient(
      env.SUPABASE_URL,
      env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Mark user as paid
    try {
      const { error } = await supabaseAdmin
        .from('user_profiles')
        .update({
          is_paid: true,
          stripe_customer_id: session.customer,
          paid_at: new Date().toISOString(),
        })
        .eq('id', userId);

      if (error) {
        console.error('Failed to update user profile:', error);
        return new Response(JSON.stringify({ error: 'Database update failed' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      console.log(`User ${userId} marked as paid`);
    } catch (err) {
      console.error('Error updating user:', err);
      return new Response(JSON.stringify({ error: 'Internal error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  // Return 200 to acknowledge receipt
  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
