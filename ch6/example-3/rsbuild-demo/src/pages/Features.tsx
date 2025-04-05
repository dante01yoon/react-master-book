import React from 'react';

const Features: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">Features</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <FeatureCard 
          title="Rust-Powered Performance" 
          description="Experience lightning-fast builds with RSBuild's Rust-based architecture"
        />
        <FeatureCard 
          title="Zero Configuration" 
          description="Works out of the box with sensible defaults for React projects"
        />
        <FeatureCard 
          title="Modern Theming" 
          description="Multiple themes with CSS variables and shadcn-inspired design system"
        />
        <FeatureCard 
          title="Tailwind Integration" 
          description="Seamless integration with Tailwind CSS for rapid UI development"
        />
      </div>
    </div>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description }) => (
  <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

export default Features; 