import { useState, useCallback } from 'react';
import { User, Mail, Hash, Phone, MapPin, Building2, Sparkles, RotateCcw, FlaskConical } from 'lucide-react';
import type { TagFormData } from '@/types';
import { FORM_FIELDS, INITIAL_FORM_DATA, SAMPLE_DATA } from '@/constants';
import { validateForm, hasErrors } from '@/utils/validation';

interface TagFormProps {
  onGenerate: (data: TagFormData) => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  user: <User size={16} />,
  mail: <Mail size={16} />,
  hash: <Hash size={16} />,
  phone: <Phone size={16} />,
  mapPin: <MapPin size={16} />,
  building: <Building2 size={16} />,
};

export const TagForm: React.FC<TagFormProps> = ({ onGenerate }) => {
  const [formData, setFormData] = useState<TagFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Partial<Record<keyof TagFormData, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof TagFormData, boolean>>>({});

  const handleChange = useCallback((field: keyof TagFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const newErrors = validateForm({ ...formData, [field]: value });
      setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
    }
  }, [formData, touched]);

  const handleBlur = useCallback((field: keyof TagFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const fieldErrors = validateForm(formData);
    setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
  }, [formData]);

  const handleSubmit = useCallback(() => {
    const allTouched = Object.fromEntries(
      Object.keys(formData).map((k) => [k, true])
    ) as Record<keyof TagFormData, boolean>;
    setTouched(allTouched);

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (!hasErrors(validationErrors)) {
      onGenerate(formData);
    }
  }, [formData, onGenerate]);

  const handleReset = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
    setTouched({});
  }, []);

  const handleLoadSample = useCallback(() => {
    setFormData(SAMPLE_DATA);
    setErrors({});
    setTouched({});
  }, []);

  return (
    <div className="form-container">
      <style>{`
        .form-container {
          background: linear-gradient(135deg, rgba(11, 61, 46, 0.6), rgba(7, 31, 23, 0.8));
          border: 1px solid rgba(59, 227, 111, 0.15);
          border-radius: 20px;
          padding: 32px;
          backdrop-filter: blur(10px);
        }

        .form-header {
          margin-bottom: 28px;
        }

        .form-title {
          font-family: 'Syne', sans-serif;
          font-size: 22px;
          font-weight: 800;
          color: #e8fef0;
          letter-spacing: -0.3px;
        }

        .form-subtitle {
          font-size: 13px;
          color: #6aad88;
          margin-top: 4px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        @media (max-width: 640px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
          .form-container {
            padding: 20px;
          }
        }

        .full-width {
          grid-column: 1 / -1;
        }

        .field-wrapper {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .field-label {
          font-size: 12px;
          font-weight: 600;
          color: #a3d9b8;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .field-label .icon {
          color: #3be36f;
          opacity: 0.8;
        }

        .field-required {
          color: #3be36f;
          font-size: 14px;
        }

        .input-wrapper {
          position: relative;
        }

        .field-input {
          width: 100%;
          background: rgba(7, 31, 23, 0.7);
          border: 1px solid rgba(59, 227, 111, 0.2);
          border-radius: 10px;
          padding: 12px 14px;
          font-size: 14px;
          color: #e8fef0;
          font-family: 'Space Grotesk', sans-serif;
          outline: none;
          transition: all 0.2s ease;
        }

        .field-input::placeholder {
          color: rgba(107, 173, 136, 0.5);
        }

        .field-input:focus {
          border-color: rgba(59, 227, 111, 0.5);
          box-shadow: 0 0 0 3px rgba(59, 227, 111, 0.1), 0 0 12px rgba(59, 227, 111, 0.08);
          background: rgba(7, 31, 23, 0.9);
        }

        .field-input.error {
          border-color: rgba(239, 68, 68, 0.5);
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.08);
        }

        .error-message {
          font-size: 11px;
          color: #f87171;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .actions {
          margin-top: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .btn-generate {
          width: 100%;
          background: linear-gradient(135deg, #3be36f, #22c55e);
          border: none;
          border-radius: 12px;
          padding: 15px 24px;
          font-size: 15px;
          font-weight: 700;
          color: #071f17;
          font-family: 'Space Grotesk', sans-serif;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          letter-spacing: 0.3px;
          transition: all 0.2s ease;
          box-shadow: 0 4px 15px rgba(59, 227, 111, 0.3);
        }

        .btn-generate:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 25px rgba(59, 227, 111, 0.45);
          background: linear-gradient(135deg, #4deba0, #28d660);
        }

        .btn-generate:active {
          transform: translateY(0);
        }

        .secondary-actions {
          display: flex;
          gap: 10px;
        }

        .btn-secondary {
          flex: 1;
          background: rgba(59, 227, 111, 0.06);
          border: 1px solid rgba(59, 227, 111, 0.2);
          border-radius: 10px;
          padding: 11px 16px;
          font-size: 13px;
          font-weight: 600;
          color: #a3d9b8;
          font-family: 'Space Grotesk', sans-serif;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: all 0.2s ease;
        }

        .btn-secondary:hover {
          background: rgba(59, 227, 111, 0.12);
          border-color: rgba(59, 227, 111, 0.35);
          color: #e8fef0;
        }
      `}</style>

      <div className="form-header">
        <div className="form-title">Generate Tag</div>
        <div className="form-subtitle">Fill in the client details to create a professional solar tag</div>
      </div>

      <div className="form-grid">
        {FORM_FIELDS.map((field, index) => (
          <div
            key={field.id}
            className={`field-wrapper ${field.id === 'address' ? 'full-width' : ''}`}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <label className="field-label" htmlFor={field.id}>
              <span className="icon">{ICON_MAP[field.icon]}</span>
              {field.label}
              {field.required && <span className="field-required">*</span>}
            </label>
            <div className="input-wrapper">
              <input
                id={field.id}
                type={field.type}
                value={formData[field.id]}
                onChange={(e) => handleChange(field.id, e.target.value)}
                onBlur={() => handleBlur(field.id)}
                placeholder={field.placeholder}
                className={`field-input ${errors[field.id] && touched[field.id] ? 'error' : ''}`}
                autoComplete="off"
              />
            </div>
            {errors[field.id] && touched[field.id] && (
              <div className="error-message">
                <span>⚠</span> {errors[field.id]}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="actions">
        <button className="btn-generate" onClick={handleSubmit}>
          <Sparkles size={18} />
          Generate Solar Tag
        </button>
        <div className="secondary-actions">
          <button className="btn-secondary" onClick={handleLoadSample}>
            <FlaskConical size={14} />
            Load Sample
          </button>
          <button className="btn-secondary" onClick={handleReset}>
            <RotateCcw size={14} />
            Clear Form
          </button>
        </div>
      </div>
    </div>
  );
};
