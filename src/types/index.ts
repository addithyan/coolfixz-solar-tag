export interface TagFormData {
  clientName: string;
  email: string;
  consumerId: string;
  phone: string;
  location: string;
  address: string;
}

export interface SavedTag {
  id: string;
  formData: TagFormData;
  createdAt: string;
}

export type ExportFormat = 'png' | 'pdf';

export interface FormField {
  id: keyof TagFormData;
  label: string;
  placeholder: string;
  type: string;
  icon: string;
  required: boolean;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}
