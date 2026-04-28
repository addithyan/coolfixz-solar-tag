import type { TagFormData } from '@/types';

type ValidationErrors = Partial<Record<keyof TagFormData, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+]?[\d\s\-().]{7,20}$/;

export const validateForm = (data: TagFormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!data.clientName.trim()) {
    errors.clientName = 'Client name is required';
  } else if (data.clientName.trim().length < 2) {
    errors.clientName = 'Name must be at least 2 characters';
  }

  if (!data.email.trim()) {
    errors.email = 'Email address is required';
  } else if (!EMAIL_REGEX.test(data.email)) {
    errors.email = 'Enter a valid email address';
  }

  if (!data.consumerId.trim()) {
    errors.consumerId = 'Consumer ID is required';
  } else if (data.consumerId.trim().length < 4) {
    errors.consumerId = 'Consumer ID too short';
  }

  if (!data.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!PHONE_REGEX.test(data.phone)) {
    errors.phone = 'Enter a valid phone number';
  }

  if (!data.location.trim()) {
    errors.location = 'Location is required';
  }

  if (!data.address.trim()) {
    errors.address = 'Address is required';
  } else if (data.address.trim().length < 10) {
    errors.address = 'Please enter a complete address';
  }

  return errors;
};

export const hasErrors = (errors: ValidationErrors): boolean =>
  Object.keys(errors).length > 0;
