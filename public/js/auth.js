// Authentication Logic for Nonfiction Blueprint

// Check if user is authenticated - redirect to login if not
async function requireAuth() {
  const client = initSupabase();
  const { data: { session } } = await client.auth.getSession();

  if (!session) {
    window.location.href = '/login.html';
    return null;
  }

  return session;
}

// Check if user has paid
async function checkPaidStatus() {
  const client = initSupabase();
  const { data: { session } } = await client.auth.getSession();

  if (!session) return false;

  const { data, error } = await client
    .from('user_profiles')
    .select('is_paid')
    .eq('id', session.user.id)
    .single();

  if (error || !data) return false;
  return data.is_paid;
}

// Sign up with email and password
async function signUp(email, password) {
  const client = initSupabase();
  const { data, error } = await client.auth.signUp({
    email,
    password
  });

  if (error) throw error;
  return data;
}

// Sign in with email and password
async function signIn(email, password) {
  const client = initSupabase();
  const { data, error } = await client.auth.signInWithPassword({
    email,
    password
  });

  if (error) throw error;
  return data;
}

// Sign out
async function signOut() {
  const client = initSupabase();
  const { error } = await client.auth.signOut();
  if (error) throw error;
  window.location.href = '/';
}

// Get current user session
async function getSession() {
  const client = initSupabase();
  const { data: { session } } = await client.auth.getSession();
  return session;
}

// Get Stripe Payment Link URL with user ID
async function getPaymentUrl() {
  const session = await getSession();
  if (!session) return null;

  // Replace with your actual Stripe Payment Link
  const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/YOUR_LINK';
  return `${STRIPE_PAYMENT_LINK}?client_reference_id=${session.user.id}`;
}

// Listen for auth state changes
function onAuthStateChange(callback) {
  const client = initSupabase();
  client.auth.onAuthStateChange((event, session) => {
    callback(event, session);
  });
}
