/**
 * esbuild CLI 명령어를 사용하여 JSX를 변환하는 예제 스크립트
 * 
 * 이 스크립트는 esbuild CLI 명령어 사용법을 보여주고, 직접 실행합니다.
 */
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// 작업 디렉토리 설정
const rootDir = path.join(__dirname, '..');
const srcDir = path.join(rootDir, 'src');
const distDir = path.join(rootDir, 'dist');

// 명령어 실행 함수
function runCommand(command, description) {
  console.log(`\n=== ${description} ===`);
  console.log(`명령어: ${command}\n`);
  
  try {
    // 명령 실행 (stdout을 문자열로 반환)
    const output = execSync(command, { 
      cwd: rootDir, 
      encoding: 'utf8',
      stdio: 'inherit' // 실시간으로 출력 표시
    });
    
    console.log('\n✅ 명령 실행 완료\n');
    return true;
  } catch (error) {
    console.error(`❌ 명령 실행 중 오류 발생: ${error.message}`);
    return false;
  }
}

// CLI 예제 실행
async function runCliExamples() {
  console.log('===== esbuild CLI 명령어 예제 =====\n');
  
  // dist 디렉토리가 없으면 생성
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }
  
  // 예제 1: 기본 JSX 변환 (classic 모드)
  runCommand(
    'npx esbuild src/App.jsx --bundle --outfile=dist/cli-classic.js',
    'Classic 모드로 JSX 변환 (기본값)'
  );
  
  // 예제 2: 자동 JSX 변환 (automatic 모드)
  runCommand(
    'npx esbuild src/AppNoReact.jsx --jsx=automatic --bundle --outfile=dist/cli-automatic.js',
    'Automatic 모드로 JSX 변환 (React 17+)'
  );
  
  // 예제 3: 번들링 없이 변환만 수행
  runCommand(
    'npx esbuild src/App.jsx --loader=jsx --outfile=dist/transform-only.js',
    '번들링 없이 JSX 변환만 수행'
  );
  
  // 예제 4: 미니파이 옵션 추가
  runCommand(
    'npx esbuild src/App.jsx --bundle --minify --outfile=dist/minified.js',
    '미니파이된 번들 생성'
  );
  
  // 마무리 메시지
  console.log('\n===== esbuild CLI 명령어 예제 완료 =====');
  console.log('생성된 파일:');
  console.log('- dist/cli-classic.js: 기본 JSX 변환 (React.createElement)');
  console.log('- dist/cli-automatic.js: automatic 모드 JSX 변환 (react/jsx-runtime)');
  console.log('- dist/transform-only.js: 번들링 없이 변환만 수행');
  console.log('- dist/minified.js: 미니파이된 번들');
}

// 실행
runCliExamples(); 