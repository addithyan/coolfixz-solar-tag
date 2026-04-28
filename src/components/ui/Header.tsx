import { Sun, Zap } from 'lucide-react';
import { APP_CONFIG } from '@/constants';

export const Header: React.FC = () => {
  return (
    <header className="app-header">
      <style>{`
        .app-header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(7, 31, 23, 0.9);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(59, 227, 111, 0.1);
          padding: 0 24px;
        }

        .header-inner {
          max-width: 1200px;
          margin: 0 auto;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }

        .logo-icon {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: linear-gradient(135deg, #3be36f, #22c55e);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 12px rgba(59, 227, 111, 0.4);
        }

        .logo-text {
          font-family: 'Syne', sans-serif;
          font-size: 20px;
          font-weight: 800;
          color: #e8fef0;
          letter-spacing: -0.3px;
        }

        .logo-text span {
          color: #3be36f;
        }

        .header-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(59, 227, 111, 0.08);
          border: 1px solid rgba(59, 227, 111, 0.2);
          border-radius: 20px;
          padding: 5px 12px;
          font-size: 12px;
          font-weight: 600;
          color: #3be36f;
          letter-spacing: 0.3px;
        }

        .version-badge {
          font-size: 11px;
          color: #6aad88;
        }
      `}</style>

      <div className="header-inner">
        <div className="logo">
          <div className="logo-icon">
            <Sun size={20} color="#071f17" strokeWidth={2.5} />
          </div>
          <span className="logo-text">
            Solar<span>Tag</span>
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="version-badge">v{APP_CONFIG.version}</span>
          <div className="header-badge">
            <Zap size={12} />
            Pro Generator
          </div>
        </div>
      </div>
    </header>
  );
};
