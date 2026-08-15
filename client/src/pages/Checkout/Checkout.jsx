import { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import toast from 'react-hot-toast';
import { FiLock, FiCreditCard } from 'react-icons/fi';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK || 'pk_test_placeholder');

const CheckoutForm = ({ biodataId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [cardError, setCardError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setCardError('');

    try {
      // Create payment intent
      const { data } = await axiosSecure.post('/create-payment-intent', { price: 5 });
      const clientSecret = data.clientSecret;

      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: { email: user?.email || 'anonymous' }
        }
      });

      if (error) {
        setCardError(error.message);
        setProcessing(false);
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        // Save payment to DB
        await axiosSecure.post('/payments', {
          email: user.email,
          biodataId: parseInt(biodataId),
          amount: 5,
          transactionId: paymentIntent.id,
        });

        // Create contact request (pending)
        await axiosSecure.post('/contact-requests', {
          requesterEmail: user.email,
          requesterName: user.displayName,
          biodataId: parseInt(biodataId),
        });

        toast.success('Payment Successful! Contact request submitted for admin approval.');
        navigate('/dashboard/contact-request');
      }
    } catch (err) {
      setCardError('Payment failed. Please try again.');
      toast.error('Payment failed!');
    }

    setProcessing(false);
  };

  const cardStyle = {
    style: {
      base: {
        color: '#F0F0F5',
        fontFamily: 'DM Sans, sans-serif',
        fontSize: '16px',
        '::placeholder': { color: '#6B6B82' }
      },
      invalid: { color: '#ff4d4d' }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Biodata ID</label>
        <input type="text" readOnly value={biodataId} />
      </div>
      <div className="form-group">
        <label>Your Email</label>
        <input type="email" readOnly value={user?.email || ''} />
      </div>
      <div className="form-group">
        <label>Card Details</label>
        <div className="stripe-input">
          <CardElement options={cardStyle} />
        </div>
        {cardError && <p className="error-text">{cardError}</p>}
      </div>
      <button type="submit" className="auth-btn" disabled={!stripe || processing}>
        <FiLock style={{ marginRight: '8px' }} />
        {processing ? 'Processing...' : 'Pay $5.00 & Request Contact'}
      </button>
    </form>
  );
};

const Checkout = () => {
  const { biodataId } = useParams();

  return (
    <div className="checkout-page">
      <div className="checkout-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <FiCreditCard style={{ color: 'var(--primary)', fontSize: '1.5rem' }} />
          <h2>Request Contact Information</h2>
        </div>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>
          Pay a one-time fee to request the contact information of this profile. The request will be sent to admin for review.
        </p>
        <div className="checkout-price">$5.00 <span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>USD</span></div>

        <Elements stripe={stripePromise}>
          <CheckoutForm biodataId={biodataId} />
        </Elements>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '16px', textAlign: 'center' }}>
          🔒 Secure payment powered by Stripe. Your payment info is encrypted.
        </p>
      </div>
    </div>
  );
};

export default Checkout;
