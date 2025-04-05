import React from 'react';

// 성능 페이지 컴포넌트
const Performance: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">성능</h1>
      
      <section className="bg-card rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">빌드 성능 비교</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="py-2 px-4 text-left">빌드 도구</th>
                <th className="py-2 px-4 text-left">초기 빌드</th>
                <th className="py-2 px-4 text-left">증분 빌드</th>
                <th className="py-2 px-4 text-left">개발 서버 시작</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="py-2 px-4 font-medium">RSBuild</td>
                <td className="py-2 px-4 text-primary">&lt; 1초</td>
                <td className="py-2 px-4">~100ms</td>
                <td className="py-2 px-4">&lt; 1초</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 px-4 font-medium">Create React App</td>
                <td className="py-2 px-4">~10-15초</td>
                <td className="py-2 px-4">~1-2초</td>
                <td className="py-2 px-4">~5초</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-medium">Webpack</td>
                <td className="py-2 px-4">~20-30초</td>
                <td className="py-2 px-4">~3-5초</td>
                <td className="py-2 px-4">~10초</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Performance; 