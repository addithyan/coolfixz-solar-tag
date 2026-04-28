import type { FormField } from '@/types';

export const APP_CONFIG = {
  name: 'SolarTag',
  tagline: 'Professional Solar Installation Tags',
  company: 'SolarTag Pro',
  version: '1.0.0',
  storageKey: 'solar-tags-v1',
} as const;

export const FORM_FIELDS: FormField[] = [
  {
    id: 'clientName',
    label: 'Client Name',
    placeholder: 'Enter full name',
    type: 'text',
    icon: 'user',
    required: true,
  },
  {
    id: 'email',
    label: 'Email Address',
    placeholder: 'client@example.com',
    type: 'email',
    icon: 'mail',
    required: true,
  },
  {
    id: 'consumerId',
    label: 'Consumer ID',
    placeholder: 'e.g. SOLAR-2024-001',
    type: 'text',
    icon: 'hash',
    required: true,
  },
  {
    id: 'phone',
    label: 'Phone Number',
    placeholder: '+91 98765 43210',
    type: 'tel',
    icon: 'phone',
    required: true,
  },
  {
    id: 'location',
    label: 'Location / City',
    placeholder: 'e.g. Mumbai, Maharashtra',
    type: 'text',
    icon: 'mapPin',
    required: true,
  },
  {
    id: 'address',
    label: 'Full Address',
    placeholder: 'Street, Area, City, State - PIN',
    type: 'text',
    icon: 'building',
    required: true,
  },
];

export const INITIAL_FORM_DATA = {
  clientName: '',
  email: '',
  consumerId: '',
  phone: '',
  location: '',
  address: '',
};

export const SAMPLE_DATA = {
  clientName: 'Rajesh Kumar',
  email: 'rajesh.kumar@example.com',
  consumerId: 'SOLAR-2024-MH-1047',
  phone: '+91 98765 43210',
  location: 'Mumbai, Maharashtra',
  address: '42 Green Valley, Andheri West, Mumbai - 400053',
};
