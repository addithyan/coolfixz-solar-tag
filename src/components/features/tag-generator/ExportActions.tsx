import { useState, useCallback } from 'react';
import { Download, FileDown, Copy, Save, Loader2 } from 'lucide-react';
import { exportToPng, exportToPdf, copyToClipboard } from '@/utils/export';

interface ExportActionsProps {
  tagRef: React.RefObject<HTMLDivElement | null>;
  consumerIdSlug: string;
  onSave: () => void;
  onExportStart?: () => void;
  onExportEnd?: () => void;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

type LoadingState = 'png' | 'pdf' | 'copy' | null;

export const ExportActions: React.FC<ExportActionsProps> = ({
  tagRef,
  consumerIdSlug,
  onSave,
  onSuccess,
  onError,
}) => {
  const [loading, setLoading] = useState<LoadingState>(null);

  const getElement = (): HTMLDivElement | null => {
    return tagRef.current;
  };

  const handlePng = useCallback(async () => {
    const el = getElement();
    if (!el) return;
    setLoading('png');
    try {
      await exportToPng(el, { filename: `solar-tag-${consumerIdSlug}`, scale: 3 });
      onSuccess('Tag exported as PNG successfully!');
    } catch {
      onError('Failed to export PNG. Please try again.');
    } finally {
      setLoading(null);
    }
  }, [tagRef, consumerIdSlug, onSuccess, onError]);

  const handlePdf = useCallback(async () => {
    const el = getElement();
    if (!el) return;
    setLoading('pdf');
    try {
      await exportToPdf(el, { filename: `solar-tag-${consumerIdSlug}` });
      onSuccess('Tag exported as PDF successfully!');
    } catch {
      onError('Failed to export PDF. Please try again.');
    } finally {
      setLoading(null);
    }
  }, [tagRef, consumerIdSlug, onSuccess, onError]);

  const handleCopy = useCallback(async () => {
    const el = getElement();
    if (!el) return;
    setLoading('copy');
    try {
      await copyToClipboard(el);
      onSuccess('Tag copied to clipboard!');
    } catch {
      onError('Clipboard copy failed. Try PNG export instead.');
    } finally {
      setLoading(null);
    }
  }, [tagRef, onSuccess, onError]);

  return (
    <div className="export-actions">
      <style>{`
        .export-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .export-title {
          font-size: 11px;
          font-weight: 600;
          color: #6aad88;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 4px;
        }

        .export-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .export-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 16px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 600;
          font-family: 'Space Grotesk', sans-serif;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 1px solid transparent;
          white-space: nowrap;
        }

        .export-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .export-btn.png {
          background: rgba(59, 227, 111, 0.1);
          border-color: rgba(59, 227, 111, 0.3);
          color: #3be36f;
        }

        .export-btn.png:hover:not(:disabled) {
          background: rgba(59, 227, 111, 0.18);
          border-color: rgba(59, 227, 111, 0.5);
          box-shadow: 0 4px 12px rgba(59, 227, 111, 0.2);
        }

        .export-btn.pdf {
          background: rgba(59, 227, 111, 0.08);
          border-color: rgba(59, 227, 111, 0.2);
          color: #a3d9b8;
        }

        .export-btn.pdf:hover:not(:disabled) {
          background: rgba(59, 227, 111, 0.14);
          border-color: rgba(59, 227, 111, 0.35);
          color: #3be36f;
        }

        .export-btn.copy {
          background: rgba(59, 227, 111, 0.06);
          border-color: rgba(59, 227, 111, 0.15);
          color: #6aad88;
        }

        .export-btn.copy:hover:not(:disabled) {
          background: rgba(59, 227, 111, 0.12);
          border-color: rgba(59, 227, 111, 0.3);
          color: #a3d9b8;
        }

        .export-btn.save {
          background: rgba(59, 227, 111, 0.06);
          border-color: rgba(59, 227, 111, 0.15);
          color: #6aad88;
        }

        .export-btn.save:hover:not(:disabled) {
          background: rgba(59, 227, 111, 0.12);
          border-color: rgba(59, 227, 111, 0.3);
          color: #a3d9b8;
        }

        .spin {
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div className="export-title">Export Options</div>
      <div className="export-grid">
        <button className="export-btn png" onClick={handlePng} disabled={loading !== null}>
          {loading === 'png' ? (
            <Loader2 size={15} className="spin" />
          ) : (
            <Download size={15} />
          )}
          Export PNG
        </button>

        <button className="export-btn pdf" onClick={handlePdf} disabled={loading !== null}>
          {loading === 'pdf' ? (
            <Loader2 size={15} className="spin" />
          ) : (
            <FileDown size={15} />
          )}
          Export PDF
        </button>

        <button className="export-btn copy" onClick={handleCopy} disabled={loading !== null}>
          {loading === 'copy' ? (
            <Loader2 size={15} className="spin" />
          ) : (
            <Copy size={15} />
          )}
          Copy Image
        </button>

        <button className="export-btn save" onClick={onSave} disabled={loading !== null}>
          <Save size={15} />
          Save Locally
        </button>
      </div>
    </div>
  );
};
