import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="space-y-6">
      <section className="bg-card rounded-lg p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-primary mb-4">Welcome to RSBuild Demo</h1>
        <p className="text-muted-foreground">
          A demonstration of RSBuild with React, Tailwind CSS, and the shadcn design system.
        </p>
      </section>
      
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Getting Started</h2>
        <p>
          Explore the different features of RSBuild through the navigation menu.
        </p>
      </section>
    </div>
  );
};

export default Home; 