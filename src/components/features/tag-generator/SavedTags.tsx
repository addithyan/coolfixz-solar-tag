import { useState } from 'react';
import { Bookmark, Trash2, ChevronDown, ChevronUp, BookOpen, X } from 'lucide-react';
import type { SavedTag, TagFormData } from '@/types';

interface SavedTagsProps {
  tags: SavedTag[];
  onLoad: (data: TagFormData) => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
}

export const SavedTags: React.FC<SavedTagsProps> = ({ tags, onLoad, onDelete, onClearAll }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);

  if (tags.length === 0 && !isOpen) {
    return (
      <div
        style={{
          background: 'rgba(59, 227, 111, 0.04)',
          border: '1px dashed rgba(59, 227, 111, 0.15)',
          borderRadius: '12px',
          padding: '16px',
          textAlign: 'center',
          color: '#6aad88',
          fontSize: '13px',
        }}
      >
        <Bookmark size={18} style={{ margin: '0 auto 8px', opacity: 0.5 }} />
        <div>No saved tags yet</div>
        <div style={{ fontSize: '11px', marginTop: '4px', opacity: 0.7 }}>
          Generate and save tags to access them here
        </div>
      </div>
    );
  }

  return (
    <div className="saved-tags-container">
      <style>{`
        .saved-tags-container {
          background: linear-gradient(135deg, rgba(11, 61, 46, 0.5), rgba(7, 31, 23, 0.7));
          border: 1px solid rgba(59, 227, 111, 0.12);
          border-radius: 14px;
          overflow: hidden;
        }

        .saved-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 18px;
          cursor: pointer;
          transition: background 0.2s;
        }

        .saved-header:hover {
          background: rgba(59, 227, 111, 0.04);
        }

        .saved-header-left {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 600;
          color: #a3d9b8;
        }

        .saved-count {
          background: rgba(59, 227, 111, 0.15);
          border: 1px solid rgba(59, 227, 111, 0.25);
          border-radius: 20px;
          padding: 1px 8px;
          font-size: 11px;
          font-weight: 700;
          color: #3be36f;
        }

        .saved-list {
          max-height: 280px;
          overflow-y: auto;
          border-top: 1px solid rgba(59, 227, 111, 0.1);
        }

        .tag-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 18px;
          border-bottom: 1px solid rgba(59, 227, 111, 0.06);
          cursor: pointer;
          transition: background 0.15s;
        }

        .tag-item:hover {
          background: rgba(59, 227, 111, 0.05);
        }

        .tag-item:last-child {
          border-bottom: none;
        }

        .tag-item-info {
          flex: 1;
          min-width: 0;
        }

        .tag-item-name {
          font-size: 13px;
          font-weight: 600;
          color: #e8fef0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .tag-item-meta {
          font-size: 11px;
          color: #6aad88;
          margin-top: 2px;
          display: flex;
          gap: 8px;
        }

        .tag-item-actions {
          display: flex;
          gap: 6px;
          flex-shrink: 0;
        }

        .tag-action-btn {
          background: none;
          border: 1px solid transparent;
          border-radius: 6px;
          padding: 5px;
          cursor: pointer;
          color: #6aad88;
          transition: all 0.15s;
          display: flex;
          align-items: center;
        }

        .tag-action-btn.load:hover {
          background: rgba(59, 227, 111, 0.12);
          border-color: rgba(59, 227, 111, 0.3);
          color: #3be36f;
        }

        .tag-action-btn.del:hover {
          background: rgba(239, 68, 68, 0.1);
          border-color: rgba(239, 68, 68, 0.3);
          color: #f87171;
        }

        .clear-bar {
          padding: 10px 18px;
          border-top: 1px solid rgba(59, 227, 111, 0.08);
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 8px;
        }

        .clear-btn {
          background: none;
          border: none;
          font-size: 11px;
          font-family: 'Space Grotesk', sans-serif;
          cursor: pointer;
          padding: 4px 10px;
          border-radius: 6px;
          transition: all 0.15s;
        }

        .clear-btn.danger {
          color: #f87171;
          border: 1px solid rgba(239, 68, 68, 0.2);
        }

        .clear-btn.danger:hover {
          background: rgba(239, 68, 68, 0.1);
        }

        .clear-btn.cancel {
          color: #6aad88;
        }

        .clear-btn.cancel:hover {
          color: #a3d9b8;
        }
      `}</style>

      <div className="saved-header" onClick={() => setIsOpen(!isOpen)}>
        <div className="saved-header-left">
          <Bookmark size={16} color="#3be36f" />
          Saved Tags
          <span className="saved-count">{tags.length}</span>
        </div>
        {isOpen ? <ChevronUp size={16} color="#6aad88" /> : <ChevronDown size={16} color="#6aad88" />}
      </div>

      {isOpen && (
        <>
          <div className="saved-list">
            {tags.map((tag) => (
              <div key={tag.id} className="tag-item">
                <BookOpen size={14} color="#3be36f" style={{ flexShrink: 0 }} />
                <div className="tag-item-info">
                  <div className="tag-item-name">{tag.formData.clientName}</div>
                  <div className="tag-item-meta">
                    <span>{tag.formData.consumerId}</span>
                    <span>·</span>
                    <span>
                      {new Date(tag.createdAt).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                      })}
                    </span>
                  </div>
                </div>
                <div className="tag-item-actions">
                  <button
                    className="tag-action-btn load"
                    onClick={(e) => {
                      e.stopPropagation();
                      onLoad(tag.formData);
                    }}
                    title="Load this tag"
                  >
                    <BookOpen size={13} />
                  </button>
                  <button
                    className="tag-action-btn del"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(tag.id);
                    }}
                    title="Delete tag"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {tags.length > 1 && (
            <div className="clear-bar">
              {confirmClear ? (
                <>
                  <span style={{ fontSize: '11px', color: '#f87171' }}>Clear all {tags.length} tags?</span>
                  <button className="clear-btn cancel" onClick={() => setConfirmClear(false)}>
                    Cancel
                  </button>
                  <button
                    className="clear-btn danger"
                    onClick={() => {
                      onClearAll();
                      setConfirmClear(false);
                    }}
                  >
                    Confirm
                  </button>
                </>
              ) : (
                <button
                  className="clear-btn danger"
                  onClick={() => setConfirmClear(true)}
                >
                  <X size={11} style={{ marginRight: 4 }} />
                  Clear All
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};
