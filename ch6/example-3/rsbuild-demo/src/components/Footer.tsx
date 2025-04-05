import React from 'react';

// This component will be lazy-loaded using RSBuild's automatic code splitting
// It demonstrates how RSBuild optimizes your application

const Footer: React.FC = () => {
  return (
    <footer className="bg-muted py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">RSBuild Demo</h3>
            <p className="text-muted-foreground">
              A demonstration of RSBuild's features with modern React and Tailwind CSS.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://rsbuild.dev/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  RSBuild Documentation
                </a>
              </li>
              <li>
                <a 
                  href="https://tailwindcss.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Tailwind CSS
                </a>
              </li>
              <li>
                <a 
                  href="https://ui.shadcn.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  shadcn/ui Design System
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <p className="text-muted-foreground">
              This demo showcases how RSBuild, Tailwind CSS, and the shadcn design system 
              can be integrated to create a modern React application with theming support.
            </p>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} RSBuild Demo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 