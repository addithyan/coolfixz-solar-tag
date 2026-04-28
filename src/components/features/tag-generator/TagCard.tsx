import { forwardRef, useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { Sun, Zap, MapPin, Phone, Mail, User, Hash, Building2, Calendar } from 'lucide-react';
import type { TagFormData } from '@/types';

interface TagCardProps {
  formData: TagFormData;
  createdAt?: string;
}

export const TagCard = forwardRef<HTMLDivElement, TagCardProps>(
  ({ formData, createdAt }, ref) => {
    const qrRef = useRef<HTMLCanvasElement>(null);
    const [qrDataUrl, setQrDataUrl] = useState<string>('');

    useEffect(() => {
      const qrContent = [
        `Consumer ID: ${formData.consumerId}`,
        `Client: ${formData.clientName}`,
        `Email: ${formData.email}`,
        `Phone: ${formData.phone}`,
        `Location: ${formData.location}`,
      ].join('\n');

      QRCode.toDataURL(qrContent, {
        width: 120,
        margin: 1,
        color: {
          dark: '#0b3d2e',
          light: '#e8fef0',
        },
        errorCorrectionLevel: 'M',
      })
        .then(setQrDataUrl)
        .catch(console.error);
    }, [formData]);

    const dateStr = createdAt
      ? new Date(createdAt).toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        })
      : new Date().toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        });

    return (
      <div
        ref={ref}
        id="solar-tag-card"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          background: 'linear-gradient(135deg, #071f17 0%, #0b3d2e 50%, #071f17 100%)',
          borderRadius: '20px',
          overflow: 'hidden',
          width: '480px',
          minWidth: '480px',
          border: '1px solid rgba(59, 227, 111, 0.25)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(59, 227, 111, 0.1)',
          position: 'relative',
        }}
      >
        {/* Top decorative strip */}
        <div
          style={{
            height: '4px',
            background: 'linear-gradient(90deg, transparent, #3be36f, #22c55e, #3be36f, transparent)',
          }}
        />

        {/* Header */}
        <div
          style={{
            padding: '24px 28px 18px',
            borderBottom: '1px solid rgba(59, 227, 111, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(59, 227, 111, 0.04)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #3be36f, #22c55e)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(59, 227, 111, 0.4)',
              }}
            >
              <Sun size={22} color="#071f17" strokeWidth={2.5} />
            </div>
            <div>
              <div
                style={{
                  fontSize: '20px',
                  fontWeight: '800',
                  color: '#3be36f',
                  letterSpacing: '-0.3px',
                  lineHeight: 1,
                  fontFamily: "'Syne', sans-serif",
                }}
              >
                SOLAR TAG
              </div>
              <div style={{ fontSize: '11px', color: '#6aad88', marginTop: '2px', letterSpacing: '0.5px' }}>
                INSTALLATION CERTIFICATE
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Zap size={13} color="#3be36f" />
            <div style={{ fontSize: '11px', color: '#3be36f', fontWeight: '600', letterSpacing: '0.5px' }}>
              VERIFIED
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '20px 28px' }}>
          {/* Consumer ID Badge */}
          <div
            style={{
              background: 'rgba(59, 227, 111, 0.08)',
              border: '1px solid rgba(59, 227, 111, 0.25)',
              borderRadius: '10px',
              padding: '12px 16px',
              marginBottom: '18px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <Hash size={15} color="#3be36f" />
            <div>
              <div style={{ fontSize: '10px', color: '#6aad88', letterSpacing: '1px', textTransform: 'uppercase' }}>
                Consumer ID
              </div>
              <div style={{ fontSize: '16px', fontWeight: '700', color: '#3be36f', letterSpacing: '0.5px', marginTop: '1px' }}>
                {formData.consumerId}
              </div>
            </div>
          </div>

          {/* Main content + QR */}
          <div style={{ display: 'flex', gap: '18px' }}>
            {/* Details */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Client Name */}
              <DetailRow icon={<User size={13} color="#3be36f" />} label="Client" value={formData.clientName} />

              {/* Email */}
              <DetailRow icon={<Mail size={13} color="#3be36f" />} label="Email" value={formData.email} small />

              {/* Phone */}
              <DetailRow icon={<Phone size={13} color="#3be36f" />} label="Phone" value={formData.phone} />

              {/* Location */}
              <DetailRow icon={<MapPin size={13} color="#3be36f" />} label="Location" value={formData.location} />

              {/* Address */}
              <DetailRow icon={<Building2 size={13} color="#3be36f" />} label="Address" value={formData.address} small />
            </div>

            {/* QR Code */}
            {qrDataUrl && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <div
                  style={{
                    padding: '8px',
                    background: '#e8fef0',
                    borderRadius: '10px',
                    border: '1px solid rgba(59, 227, 111, 0.3)',
                  }}
                >
                  <img src={qrDataUrl} alt="QR Code" width={100} height={100} />
                  <canvas ref={qrRef} style={{ display: 'none' }} />
                </div>
                <div style={{ fontSize: '9px', color: '#6aad88', textAlign: 'center', letterSpacing: '0.5px' }}>
                  SCAN TO VERIFY
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '14px 28px',
            borderTop: '1px solid rgba(59, 227, 111, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(0,0,0,0.2)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Calendar size={11} color="#6aad88" />
            <span style={{ fontSize: '11px', color: '#6aad88' }}>
              Issued: {dateStr}
            </span>
          </div>
          <div
            style={{
              fontSize: '10px',
              color: '#3be36f',
              fontWeight: '600',
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}
          >
            SolarTag Pro™
          </div>
        </div>

        {/* Bottom decorative strip */}
        <div
          style={{
            height: '3px',
            background: 'linear-gradient(90deg, transparent, #22c55e, #3be36f, #22c55e, transparent)',
          }}
        />

        {/* Corner decorations */}
        <CornerDecoration position="top-right" />
        <CornerDecoration position="bottom-left" />
      </div>
    );
  }
);

TagCard.displayName = 'TagCard';

interface DetailRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  small?: boolean;
}

const DetailRow: React.FC<DetailRowProps> = ({ icon, label, value, small = false }) => (
  <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
    <div style={{ marginTop: '1px', flexShrink: 0 }}>{icon}</div>
    <div style={{ minWidth: 0 }}>
      <div style={{ fontSize: '9px', color: '#6aad88', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
        {label}
      </div>
      <div
        style={{
          fontSize: small ? '11px' : '13px',
          color: '#e8fef0',
          fontWeight: '500',
          marginTop: '1px',
          wordBreak: 'break-word',
          lineHeight: '1.3',
        }}
      >
        {value}
      </div>
    </div>
  </div>
);

interface CornerDecorationProps {
  position: 'top-right' | 'bottom-left';
}

const CornerDecoration: React.FC<CornerDecorationProps> = ({ position }) => {
  const isTopRight = position === 'top-right';
  return (
    <div
      style={{
        position: 'absolute',
        ...(isTopRight ? { top: '12px', right: '12px' } : { bottom: '12px', left: '12px' }),
        width: '20px',
        height: '20px',
        borderTop: isTopRight ? '2px solid rgba(59, 227, 111, 0.25)' : 'none',
        borderRight: isTopRight ? '2px solid rgba(59, 227, 111, 0.25)' : 'none',
        borderBottom: !isTopRight ? '2px solid rgba(59, 227, 111, 0.25)' : 'none',
        borderLeft: !isTopRight ? '2px solid rgba(59, 227, 111, 0.25)' : 'none',
        borderRadius: isTopRight ? '0 4px 0 0' : '0 0 0 4px',
      }}
    />
  );
};
