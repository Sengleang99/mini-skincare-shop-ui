// src/lib/utils.ts
export function validateCheckoutForm(formData: {
  name: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
}) {
  const errors: Record<string, string> = {};

  if (!formData.name.trim()) {
    errors.name = 'Name is required';
  }

  if (!formData.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Email is invalid';
  }

  if (!formData.address.trim()) {
    errors.address = 'Address is required';
  }

  if (!formData.city.trim()) {
    errors.city = 'City is required';
  }

  if (!formData.zip.trim()) {
    errors.zip = 'ZIP code is required';
  }

  // Simple card validation (in a real app, use a proper library)
  const cleanedCardNumber = formData.cardNumber.replace(/\s+/g, '');
  if (!cleanedCardNumber) {
    errors.cardNumber = 'Card number is required';
  } else if (!/^\d{13,16}$/.test(cleanedCardNumber)) {
    errors.cardNumber = 'Card number is invalid';
  }

  if (!formData.cardExpiry.trim()) {
    errors.cardExpiry = 'Expiry date is required';
  } else if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(formData.cardExpiry)) {
    errors.cardExpiry = 'Expiry date is invalid (MM/YY)';
  }

  if (!formData.cardCvc.trim()) {
    errors.cardCvc = 'CVC is required';
  } else if (!/^\d{3,4}$/.test(formData.cardCvc)) {
    errors.cardCvc = 'CVC is invalid';
  }

  return errors;
}