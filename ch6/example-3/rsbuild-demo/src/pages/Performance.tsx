import React from 'react';

const Performance: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">Performance</h1>
      
      <section className="bg-card rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Build Performance Comparison</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="py-2 px-4 text-left">Build Tool</th>
                <th className="py-2 px-4 text-left">Initial Build</th>
                <th className="py-2 px-4 text-left">Incremental Build</th>
                <th className="py-2 px-4 text-left">Dev Server Start</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="py-2 px-4 font-medium">RSBuild</td>
                <td className="py-2 px-4 text-primary">&lt; 1 second</td>
                <td className="py-2 px-4">~100ms</td>
                <td className="py-2 px-4">&lt; 1 second</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 px-4 font-medium">Create React App</td>
                <td className="py-2 px-4">~10-15 seconds</td>
                <td className="py-2 px-4">~1-2 seconds</td>
                <td className="py-2 px-4">~5 seconds</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-medium">Webpack</td>
                <td className="py-2 px-4">~20-30 seconds</td>
                <td className="py-2 px-4">~3-5 seconds</td>
                <td className="py-2 px-4">~10 seconds</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Performance; 