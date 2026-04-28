import { useRef, useState, useCallback } from 'react';
import { Sun, ChevronRight } from 'lucide-react';
import type { TagFormData } from '@/types';
import { TagForm } from '@/components/features/tag-generator/TagForm';
import { TagCard } from '@/components/features/tag-generator/TagCard';
import { ExportActions } from '@/components/features/tag-generator/ExportActions';
import { SavedTags } from '@/components/features/tag-generator/SavedTags';
import { useSavedTags } from '@/hooks/useSavedTags';
import { useToast } from '@/hooks/useToast';
import { ToastContainer } from '@/components/ui/Toast';

export const TagGeneratorPage: React.FC = () => {
  const [generatedTag, setGeneratedTag] = useState<TagFormData | null>(null);
  const [tagCreatedAt, setTagCreatedAt] = useState<string | undefined>(undefined);
  const [isAnimating, setIsAnimating] = useState(false);
  const tagCardRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const { savedTags, saveTag, deleteTag, clearAll } = useSavedTags();
  const { toasts, dismissToast, success, error, info } = useToast();

  const handleGenerate = useCallback((data: TagFormData) => {
    setIsAnimating(true);
    setGeneratedTag(data);
    setTagCreatedAt(new Date().toISOString());
    setTimeout(() => {
      setIsAnimating(false);
      previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
    info('Tag generated successfully!');
  }, [info]);

  const handleSave = useCallback(() => {
    if (!generatedTag) return;
    saveTag(generatedTag);
    success('Tag saved to local storage!');
  }, [generatedTag, saveTag, success]);

  const handleLoadSaved = useCallback((data: TagFormData) => {
    setGeneratedTag(data);
    setTagCreatedAt(undefined);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 50);
    info('Saved tag loaded!');
  }, [info]);

  const handleDelete = useCallback((id: string) => {
    deleteTag(id);
    info('Tag deleted.');
  }, [deleteTag, info]);

  const consumerIdSlug = generatedTag?.consumerId
    .replace(/[^a-z0-9]/gi, '-')
    .toLowerCase() ?? 'tag';

  return (
    <>
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      <main className="main-layout">
        <style>{`
          .main-layout {
            max-width: 1200px;
            margin: 0 auto;
            padding: 40px 24px 80px;
          }

          /* Hero section */
          .hero {
            text-align: center;
            margin-bottom: 56px;
          }

          .hero-eyebrow {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: rgba(59, 227, 111, 0.08);
            border: 1px solid rgba(59, 227, 111, 0.2);
            border-radius: 20px;
            padding: 5px 14px;
            font-size: 12px;
            font-weight: 600;
            color: #3be36f;
            letter-spacing: 1px;
            text-transform: uppercase;
            margin-bottom: 20px;
          }

          .hero-title {
            font-family: 'Syne', sans-serif;
            font-size: clamp(32px, 5vw, 52px);
            font-weight: 800;
            color: #e8fef0;
            letter-spacing: -1px;
            line-height: 1.1;
            margin-bottom: 14px;
          }

          .hero-title .accent {
            color: #3be36f;
            position: relative;
          }

          .hero-desc {
            font-size: 15px;
            color: #6aad88;
            max-width: 480px;
            margin: 0 auto;
            line-height: 1.6;
          }

          /* Two-column grid */
          .content-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 28px;
            align-items: start;
          }

          @media (max-width: 900px) {
            .content-grid {
              grid-template-columns: 1fr;
            }
          }

          /* Left column */
          .left-col {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }

          /* Right column */
          .right-col {
            display: flex;
            flex-direction: column;
            gap: 20px;
            position: sticky;
            top: 84px;
          }

          .preview-section {
            background: linear-gradient(135deg, rgba(11, 61, 46, 0.4), rgba(7, 31, 23, 0.6));
            border: 1px solid rgba(59, 227, 111, 0.12);
            border-radius: 20px;
            padding: 28px;
            display: flex;
            flex-direction: column;
            gap: 20px;
          }

          .preview-header {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 11px;
            font-weight: 600;
            color: #6aad88;
            letter-spacing: 1px;
            text-transform: uppercase;
          }

          .preview-card-wrapper {
            display: flex;
            justify-content: center;
            overflow-x: auto;
            padding: 4px 0;
          }

          .preview-placeholder {
            width: 100%;
            min-height: 240px;
            border: 2px dashed rgba(59, 227, 111, 0.12);
            border-radius: 16px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 12px;
            color: #6aad88;
            font-size: 13px;
          }

          .tag-appear {
            animation: tagAppear 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }

          @keyframes tagAppear {
            from {
              opacity: 0;
              transform: scale(0.92) translateY(12px);
            }
            to {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }

          /* Stats row */
          .stats-row {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
            margin-top: 8px;
          }

          .stat-card {
            background: rgba(59, 227, 111, 0.05);
            border: 1px solid rgba(59, 227, 111, 0.1);
            border-radius: 10px;
            padding: 12px 14px;
            text-align: center;
          }

          .stat-value {
            font-family: 'Syne', sans-serif;
            font-size: 22px;
            font-weight: 800;
            color: #3be36f;
          }

          .stat-label {
            font-size: 10px;
            color: #6aad88;
            margin-top: 2px;
            letter-spacing: 0.5px;
          }

          /* Divider */
          .divider {
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(59, 227, 111, 0.15), transparent);
          }
        `}</style>

        {/* Hero */}
        <div className="hero">
          <div className="hero-eyebrow">
            <Sun size={12} />
            Solar Installation Management
          </div>
          <h1 className="hero-title">
            Professional <span className="accent">Solar Tags</span>
            <br />
            Generated Instantly
          </h1>
          <p className="hero-desc">
            Create premium, scannable solar installation tags with client details,
            QR codes, and export options — all in your browser.
          </p>
        </div>

        <div className="content-grid">
          {/* Left Column */}
          <div className="left-col">
            <TagForm onGenerate={handleGenerate} />

            {/* Stats */}
            <div className="stats-row">
              <div className="stat-card">
                <div className="stat-value">{savedTags.length}</div>
                <div className="stat-label">Saved Tags</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">2</div>
                <div className="stat-label">Export Formats</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">∞</div>
                <div className="stat-label">Tags Free</div>
              </div>
            </div>

            <SavedTags
              tags={savedTags}
              onLoad={handleLoadSaved}
              onDelete={handleDelete}
              onClearAll={clearAll}
            />
          </div>

          {/* Right Column */}
          <div className="right-col" ref={previewRef}>
            <div className="preview-section">
              <div className="preview-header">
                <ChevronRight size={14} color="#3be36f" />
                Live Preview
              </div>

              <div className="preview-card-wrapper">
                {generatedTag ? (
                  <div className={isAnimating ? '' : 'tag-appear'}>
                    <TagCard
                      ref={tagCardRef}
                      formData={generatedTag}
                      createdAt={tagCreatedAt}
                    />
                  </div>
                ) : (
                  <div className="preview-placeholder">
                    <Sun size={32} style={{ opacity: 0.3 }} />
                    <div>Fill the form and click "Generate Solar Tag"</div>
                    <div style={{ fontSize: '11px', opacity: 0.6 }}>
                      Your tag preview will appear here
                    </div>
                  </div>
                )}
              </div>

              {generatedTag && (
                <>
                  <div className="divider" />
                  <ExportActions
                    tagRef={tagCardRef}
                    consumerIdSlug={consumerIdSlug}
                    onSave={handleSave}
                    onSuccess={success}
                    onError={error}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
