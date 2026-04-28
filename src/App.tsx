import { Header } from '@/components/ui/Header';
import { TagGeneratorPage } from '@/pages/TagGeneratorPage';
import '@/styles/globals.css';

const App: React.FC = () => {
  return (
    <div className="noise-bg" style={{ minHeight: '100vh', position: 'relative' }}>
      {/* Ambient glow effects */}
      <div
        style={{
          position: 'fixed',
          top: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '500px',
          background: 'radial-gradient(ellipse, rgba(59, 227, 111, 0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'fixed',
          bottom: '-10%',
          right: '-10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(ellipse, rgba(34, 197, 94, 0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Header />
        <TagGeneratorPage />
      </div>
    </div>
  );
};

export default App;
