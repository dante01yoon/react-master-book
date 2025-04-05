import React from 'react';

// Feature card interface
interface FeatureProps {
  title: string;
  description: string;
  icon: string;
}

// Feature card component
const FeatureCard: React.FC<FeatureProps> = ({ title, description, icon }) => (
  <div className="feature-card">
    <div className="feature-icon">{icon}</div>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

const Features: React.FC = () => {
  // Feature data
  const features = [
    {
      title: 'Lightning Fast',
      description: 'Built with Rust for superior build performance that\'s up to 10x faster than JavaScript-based tools.',
      icon: '⚡'
    },
    {
      title: 'Zero Config',
      description: 'Get started instantly with sensible defaults, but easily customize when needed.',
      icon: '⚙️'
    },
    {
      title: 'TypeScript First',
      description: 'First-class TypeScript support with type checking built right in.',
      icon: '📝'
    },
    {
      title: 'Optimized Builds',
      description: 'Automatic code-splitting, tree-shaking, and optimizations for smaller bundles.',
      icon: '📦'
    },
    {
      title: 'Hot Reloading',
      description: 'Instant feedback with Hot Module Replacement that preserves state.',
      icon: '🔄'
    },
    {
      title: 'Modern React',
      description: 'Built for modern React patterns including Server Components.',
      icon: '🚀'
    }
  ];

  return (
    <section id="features" className="features">
      <h2>Key Features</h2>
      <div className="features-grid">
        {features.map((feature, index) => (
          <FeatureCard 
            key={index}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
          />
        ))}
      </div>
      
      <div className="build-performance">
        <h3>Build Performance</h3>
        <div className="performance-bar">
          <div className="bar rsbuild" style={{ width: '10%' }}>
            <span className="label">RSBuild: 0.8s</span>
          </div>
          <div className="bar cra" style={{ width: '50%' }}>
            <span className="label">CRA: 12s</span>
          </div>
          <div className="bar webpack" style={{ width: '100%' }}>
            <span className="label">Webpack: 25s</span>
          </div>
        </div>
        <p className="performance-note">
          * Build times based on a medium-sized React application with 50 components
        </p>
      </div>
    </section>
  );
};

export default Features; 