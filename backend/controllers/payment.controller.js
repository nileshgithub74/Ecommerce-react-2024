import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_51QNVRfK0MnJ6utZuh1IJHh7nhkMXZ5asp1NWKO67Roi2yzxfptD5TAjj2KpGCuPnaEkIJJG9nx30c8R410FukvZJ00TCk1iycW');

export const createPaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount.' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount:   Math.round(amount * 100),
      currency: 'usd',
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Payment intent error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};
