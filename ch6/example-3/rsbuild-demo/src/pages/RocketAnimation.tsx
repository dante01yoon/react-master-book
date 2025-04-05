import React, { useEffect, useRef, useState } from 'react';

interface Rock {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
}

interface Bullet {
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  size: number;
  active: boolean;
}

const RocketAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [mousePos, setMousePos] = useState<{x: number, y: number} | null>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // 캔버스 크기 설정
    canvas.width = window.innerWidth;
    canvas.height = 200;
    
    // 로켓 속성
    let rocketX = -50;
    const rocketY = 80;
    const rocketWidth = 50;
    const rocketHeight = 30;
    const speed = 2;
    
    // 애니메이션 상태
    let animationFrameId: number;
    let flameSize = 0;
    let flameGrowing = true;
    
    // 바위 배열
    const rocks: Rock[] = [];
    const createRock = () => {
      const size = Math.random() * 20 + 10;
      const x = Math.random() < 0.5 ? -size : canvas.width + size;
      const y = Math.random() * canvas.height;
      const speedX = (Math.random() - 0.5) * 4;
      const speedY = (Math.random() - 0.5) * 2;
      const rotation = Math.random() * Math.PI * 2;
      const rotationSpeed = (Math.random() - 0.5) * 0.1;
      
      rocks.push({
        x, y, size, speedX, speedY, rotation, rotationSpeed
      });
    };
    
    // 초기 바위 생성
    for (let i = 0; i < 10; i++) {
      createRock();
    }
    
    // 총알 배열
    const bullets: Bullet[] = [];
    
    // 총알 발사를 위한 클릭 이벤트 리스너 추가
    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      // 로켓 위치에서 클릭 지점을 향해 총알 생성
      const bulletX = rocketX + rocketWidth;
      const bulletY = rocketY + rocketHeight / 2;
      
      // 방향 벡터 계산
      const dirX = mouseX - bulletX;
      const dirY = mouseY - bulletY;
      
      // 방향 벡터 정규화
      const length = Math.sqrt(dirX * dirX + dirY * dirY);
      const normalizedDirX = dirX / length;
      const normalizedDirY = dirY / length;
      
      // 총알 추가
      bullets.push({
        x: bulletX,
        y: bulletY,
        speedX: normalizedDirX * 15,
        speedY: normalizedDirY * 15,
        size: 6,
        active: true
      });
    };
    
    canvas.addEventListener('click', handleClick);
    
    // 마우스 움직임 추적
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };
    
    canvas.addEventListener('mousemove', handleMouseMove);
    
    // 창 크기 조정 처리
    const handleResize = () => {
      canvas.width = window.innerWidth;
    };
    
    window.addEventListener('resize', handleResize);
    
    // 로켓 그리기 함수
    const drawRocket = (x: number, y: number) => {
      if (!ctx) return;
      
      // 로켓 본체
      ctx.fillStyle = '#f0f0f0';
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + rocketWidth - 10, y);
      ctx.lineTo(x + rocketWidth, y + rocketHeight / 2);
      ctx.lineTo(x + rocketWidth - 10, y + rocketHeight);
      ctx.lineTo(x, y + rocketHeight);
      ctx.closePath();
      ctx.fill();
      
      // 로켓 노즈
      ctx.fillStyle = '#e74c3c';
      ctx.beginPath();
      ctx.moveTo(x, y + 5);
      ctx.lineTo(x - 15, y + rocketHeight / 2);
      ctx.lineTo(x, y + rocketHeight - 5);
      ctx.closePath();
      ctx.fill();
      
      // 로켓 창문
      ctx.fillStyle = '#3498db';
      ctx.beginPath();
      ctx.arc(x + rocketWidth / 2 + 5, y + rocketHeight / 2, 8, 0, Math.PI * 2);
      ctx.fill();
      
      // 로켓 날개
      ctx.fillStyle = '#e74c3c';
      ctx.beginPath();
      ctx.moveTo(x + 10, y + rocketHeight);
      ctx.lineTo(x - 5, y + rocketHeight + 15);
      ctx.lineTo(x + 20, y + rocketHeight);
      ctx.closePath();
      ctx.fill();
      
      ctx.beginPath();
      ctx.moveTo(x + 10, y);
      ctx.lineTo(x - 5, y - 15);
      ctx.lineTo(x + 20, y);
      ctx.closePath();
      ctx.fill();
      
      // 로켓 불꽃
      if (flameGrowing) {
        flameSize += 0.5;
        if (flameSize > 20) flameGrowing = false;
      } else {
        flameSize -= 0.5;
        if (flameSize < 10) flameGrowing = true;
      }
      
      ctx.fillStyle = '#f39c12';
      ctx.beginPath();
      ctx.moveTo(x, y + 10);
      ctx.lineTo(x - flameSize - 10, y + rocketHeight / 2);
      ctx.lineTo(x, y + rocketHeight - 10);
      ctx.closePath();
      ctx.fill();
      
      // 내부 불꽃
      ctx.fillStyle = '#f1c40f';
      ctx.beginPath();
      ctx.moveTo(x, y + 14);
      ctx.lineTo(x - flameSize - 5, y + rocketHeight / 2);
      ctx.lineTo(x, y + rocketHeight - 14);
      ctx.closePath();
      ctx.fill();
    };
    
    // 바위 그리기
    const drawRock = (rock: Rock) => {
      if (!ctx) return;
      
      ctx.save();
      ctx.translate(rock.x, rock.y);
      ctx.rotate(rock.rotation);
      
      ctx.fillStyle = '#7f8c8d';
      ctx.beginPath();
      // 불규칙한 다각형으로 바위 생성
      const points = 6;
      for (let i = 0; i < points; i++) {
        const angle = (Math.PI * 2 * i) / points;
        const radius = rock.size * (0.8 + Math.random() * 0.4);
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.fill();
      
      ctx.restore();
    };
    
    // 총알 그리기
    const drawBullet = (bullet: Bullet) => {
      if (!ctx || !bullet.active) return;
      
      // 총알 궤적
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(bullet.x - bullet.speedX / 2, bullet.y - bullet.speedY / 2);
      ctx.lineTo(bullet.x, bullet.y);
      ctx.strokeStyle = 'rgba(231, 76, 60, 0.5)';
      ctx.lineWidth = bullet.size / 2;
      ctx.stroke();
      
      // 총알
      ctx.fillStyle = '#e74c3c';
      ctx.beginPath();
      ctx.arc(bullet.x, bullet.y, bullet.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };
    
    // 총알과 바위 충돌 확인
    const checkCollision = (bullet: Bullet, rock: Rock) => {
      if (!bullet.active) return false;
      
      const dx = bullet.x - rock.x;
      const dy = bullet.y - rock.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      return distance < rock.size + bullet.size;
    };
    
    // 별
    const stars: { x: number; y: number; size: number; opacity: number }[] = [];
    
    for (let i = 0; i < 100; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        opacity: Math.random()
      });
    }
    
    const drawStars = () => {
      if (!ctx) return;
      
      stars.forEach(star => {
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
    };
    
    // 애니메이션 루프
    const animate = () => {
      if (!ctx) return;
      
      // 캔버스 지우기
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // 배경
      ctx.fillStyle = 'hsl(var(--background))';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // 별 그리기
      drawStars();
      
      // 로켓 그리기
      drawRocket(rocketX, rocketY);
      
      // 바위 이동 및 그리기
      for (let i = rocks.length - 1; i >= 0; i--) {
        const rock = rocks[i];
        
        // 위치 업데이트
        rock.x += rock.speedX;
        rock.y += rock.speedY;
        rock.rotation += rock.rotationSpeed;
        
        // 화면 가장자리에서 감싸기
        if (rock.x < -rock.size * 2) rock.x = canvas.width + rock.size;
        if (rock.x > canvas.width + rock.size * 2) rock.x = -rock.size;
        if (rock.y < -rock.size * 2) rock.y = canvas.height + rock.size;
        if (rock.y > canvas.height + rock.size * 2) rock.y = -rock.size;
        
        // 바위 그리기
        drawRock(rock);
      }
      
      // 총알 이동 및 그리기
      for (let i = bullets.length - 1; i >= 0; i--) {
        const bullet = bullets[i];
        
        if (!bullet.active) continue;
        
        // 위치 업데이트
        bullet.x += bullet.speedX;
        bullet.y += bullet.speedY;
        
        // 총알이 화면 밖으로 나갔는지 확인
        if (bullet.x < 0 || bullet.x > canvas.width || 
            bullet.y < 0 || bullet.y > canvas.height) {
          bullet.active = false;
          continue;
        }
        
        // 바위와의 충돌 확인
        for (let j = rocks.length - 1; j >= 0; j--) {
          if (checkCollision(bullet, rocks[j])) {
            // 바위 제거
            rocks.splice(j, 1);
            // 총알 비활성화
            bullet.active = false;
            // 점수 증가
            setScore(prevScore => prevScore + 10);
            // 새 바위 생성
            createRock();
            break;
          }
        }
        
        // 총알 그리기
        drawBullet(bullet);
      }
      
      // 비활성 총알 제거
      for (let i = bullets.length - 1; i >= 0; i--) {
        if (!bullets[i].active) {
          bullets.splice(i, 1);
        }
      }
      
      // 로켓 이동
      rocketX += speed;
      
      // 로켓이 화면 밖으로 나가면 위치 재설정
      if (rocketX > canvas.width + 50) {
        rocketX = -50;
      }
      
      // 애니메이션 계속하기
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // 애니메이션 시작
    animate();
    
    // 정리
    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('click', handleClick);
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">로켓 애니메이션</h1>
      
      <div className="bg-card rounded-lg shadow-sm overflow-hidden relative">
        <canvas
          ref={canvasRef}
          className="w-full cursor-crosshair"
          style={{ height: '200px' }}
        />
        <div className="absolute top-2 right-4 bg-card/80 text-primary px-3 py-1 rounded-full">
          점수: {score}
        </div>
        <div className="absolute bottom-2 left-2 right-2 bg-card/70 text-foreground text-center p-2 text-sm rounded-md">
          마우스 커서 위치를 향해 총알을 발사하려면 아무 곳이나 클릭하세요
        </div>
      </div>
      
      <div className="bg-card rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">인터랙티브 캔버스 게임</h2>
        <p className="text-muted-foreground mb-4">
          이 페이지는 다음과 같은 인터랙티브 캔버스 애니메이션을 보여줍니다:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
          <li>화면을 가로질러 날아가는 로켓 감상하기</li>
          <li>무작위 방향으로 움직이는 바위 보기</li>
          <li>로켓에서 <strong>마우스 커서 위치를 향해</strong> 총알 발사하기</li>
          <li>총알로 바위를 파괴하여 점수 얻기</li>
        </ul>
      </div>
    </div>
  );
};

export default RocketAnimation; 