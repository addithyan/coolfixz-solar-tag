import { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, Info, X } from 'lucide-react';

export interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface ToastProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}

const ICONS = {
  success: <CheckCircle2 size={16} color="#3be36f" />,
  error: <XCircle size={16} color="#f87171" />,
  info: <Info size={16} color="#60a5fa" />,
};

const COLORS = {
  success: { border: 'rgba(59, 227, 111, 0.35)', bg: 'rgba(59, 227, 111, 0.08)' },
  error: { border: 'rgba(239, 68, 68, 0.35)', bg: 'rgba(239, 68, 68, 0.08)' },
  info: { border: 'rgba(96, 165, 250, 0.35)', bg: 'rgba(96, 165, 250, 0.08)' },
};

const Toast: React.FC<{ toast: ToastItem; onDismiss: (id: string) => void }> = ({
  toast,
  onDismiss,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const show = setTimeout(() => setVisible(true), 10);
    const hide = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onDismiss(toast.id), 300);
    }, 3500);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, [toast.id, onDismiss]);

  const colors = COLORS[toast.type];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        background: `linear-gradient(135deg, #0b3d2e, #071f17)`,
        border: `1px solid ${colors.border}`,
        borderRadius: '10px',
        padding: '12px 14px',
        boxShadow: `0 8px 24px rgba(0,0,0,0.4), 0 0 12px ${colors.bg}`,
        minWidth: '280px',
        maxWidth: '380px',
        transform: visible ? 'translateX(0)' : 'translateX(110%)',
        opacity: visible ? 1 : 0,
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
    >
      {ICONS[toast.type]}
      <span style={{ flex: 1, fontSize: '13px', color: '#e8fef0', fontWeight: '500' }}>
        {toast.message}
      </span>
      <button
        onClick={() => onDismiss(toast.id)}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: '#6aad88',
          padding: '2px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <X size={14} />
      </button>
    </div>
  );
};

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        alignItems: 'flex-end',
      }}
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};
