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
    
    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = 200;
    
    // Rocket properties
    let rocketX = -50;
    const rocketY = 80;
    const rocketWidth = 50;
    const rocketHeight = 30;
    const speed = 2;
    
    // Animation state
    let animationFrameId: number;
    let flameSize = 0;
    let flameGrowing = true;
    
    // Rocks array
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
    
    // Create initial rocks
    for (let i = 0; i < 10; i++) {
      createRock();
    }
    
    // Bullets array
    const bullets: Bullet[] = [];
    
    // Add click event listener for firing bullets
    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      // Create a bullet from the rocket position toward click point
      const bulletX = rocketX + rocketWidth;
      const bulletY = rocketY + rocketHeight / 2;
      
      // Calculate direction vector
      const dirX = mouseX - bulletX;
      const dirY = mouseY - bulletY;
      
      // Normalize the direction vector
      const length = Math.sqrt(dirX * dirX + dirY * dirY);
      const normalizedDirX = dirX / length;
      const normalizedDirY = dirY / length;
      
      // Add bullet
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
    
    // Track mouse movement for aim line
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };
    
    canvas.addEventListener('mousemove', handleMouseMove);
    
    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
    };
    
    window.addEventListener('resize', handleResize);
    
    // Draw rocket function
    const drawRocket = (x: number, y: number) => {
      if (!ctx) return;
      
      // Rocket body
      ctx.fillStyle = '#f0f0f0';
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + rocketWidth - 10, y);
      ctx.lineTo(x + rocketWidth, y + rocketHeight / 2);
      ctx.lineTo(x + rocketWidth - 10, y + rocketHeight);
      ctx.lineTo(x, y + rocketHeight);
      ctx.closePath();
      ctx.fill();
      
      // Rocket nose
      ctx.fillStyle = '#e74c3c';
      ctx.beginPath();
      ctx.moveTo(x, y + 5);
      ctx.lineTo(x - 15, y + rocketHeight / 2);
      ctx.lineTo(x, y + rocketHeight - 5);
      ctx.closePath();
      ctx.fill();
      
      // Rocket window
      ctx.fillStyle = '#3498db';
      ctx.beginPath();
      ctx.arc(x + rocketWidth / 2 + 5, y + rocketHeight / 2, 8, 0, Math.PI * 2);
      ctx.fill();
      
      // Rocket fins
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
      
      // Rocket flame
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
      
      // Inner flame
      ctx.fillStyle = '#f1c40f';
      ctx.beginPath();
      ctx.moveTo(x, y + 14);
      ctx.lineTo(x - flameSize - 5, y + rocketHeight / 2);
      ctx.lineTo(x, y + rocketHeight - 14);
      ctx.closePath();
      ctx.fill();
    };
    
    // Draw a rock
    const drawRock = (rock: Rock) => {
      if (!ctx) return;
      
      ctx.save();
      ctx.translate(rock.x, rock.y);
      ctx.rotate(rock.rotation);
      
      ctx.fillStyle = '#7f8c8d';
      ctx.beginPath();
      // Create irregular polygon for rock
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
    
    // Draw bullet
    const drawBullet = (bullet: Bullet) => {
      if (!ctx || !bullet.active) return;
      
      // Draw bullet trail
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(bullet.x - bullet.speedX / 2, bullet.y - bullet.speedY / 2);
      ctx.lineTo(bullet.x, bullet.y);
      ctx.strokeStyle = 'rgba(231, 76, 60, 0.5)';
      ctx.lineWidth = bullet.size / 2;
      ctx.stroke();
      
      // Draw bullet
      ctx.fillStyle = '#e74c3c';
      ctx.beginPath();
      ctx.arc(bullet.x, bullet.y, bullet.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };
    
    // Check collision between bullet and rock
    const checkCollision = (bullet: Bullet, rock: Rock) => {
      if (!bullet.active) return false;
      
      const dx = bullet.x - rock.x;
      const dy = bullet.y - rock.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      return distance < rock.size + bullet.size;
    };
    
    // Stars
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
    
    // Animation loop
    const animate = () => {
      if (!ctx) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Background
      ctx.fillStyle = 'hsl(var(--background))';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars
      drawStars();
      
      // Draw rocket
      drawRocket(rocketX, rocketY);
      
      // Move and draw rocks
      for (let i = rocks.length - 1; i >= 0; i--) {
        const rock = rocks[i];
        
        // Update position
        rock.x += rock.speedX;
        rock.y += rock.speedY;
        rock.rotation += rock.rotationSpeed;
        
        // Wrap around screen edges
        if (rock.x < -rock.size * 2) rock.x = canvas.width + rock.size;
        if (rock.x > canvas.width + rock.size * 2) rock.x = -rock.size;
        if (rock.y < -rock.size * 2) rock.y = canvas.height + rock.size;
        if (rock.y > canvas.height + rock.size * 2) rock.y = -rock.size;
        
        // Draw rock
        drawRock(rock);
      }
      
      // Move and draw bullets
      for (let i = bullets.length - 1; i >= 0; i--) {
        const bullet = bullets[i];
        
        if (!bullet.active) continue;
        
        // Update position
        bullet.x += bullet.speedX;
        bullet.y += bullet.speedY;
        
        // Check if bullet is off screen
        if (bullet.x < 0 || bullet.x > canvas.width || 
            bullet.y < 0 || bullet.y > canvas.height) {
          bullet.active = false;
          continue;
        }
        
        // Check collision with rocks
        for (let j = rocks.length - 1; j >= 0; j--) {
          if (checkCollision(bullet, rocks[j])) {
            // Remove rock
            rocks.splice(j, 1);
            // Deactivate bullet
            bullet.active = false;
            // Increment score
            setScore(prevScore => prevScore + 10);
            // Create a new rock
            createRock();
            break;
          }
        }
        
        // Draw bullet
        drawBullet(bullet);
      }
      
      // Remove inactive bullets
      for (let i = bullets.length - 1; i >= 0; i--) {
        if (!bullets[i].active) {
          bullets.splice(i, 1);
        }
      }
      
      // Move rocket
      rocketX += speed;
      
      // Reset rocket position when it goes off screen
      if (rocketX > canvas.width + 50) {
        rocketX = -50;
      }
      
      // Draw aim line if mouse is over canvas
      if (mousePos) {
        const startX = rocketX + rocketWidth;
        const startY = rocketY + rocketHeight / 2;
        
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(mousePos.x, mousePos.y);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.setLineDash([5, 5]);
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.setLineDash([]);
      }
      
      // Continue animation
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('click', handleClick);
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">Rocket Animation</h1>
      
      <div className="bg-card rounded-lg shadow-sm overflow-hidden relative">
        <canvas
          ref={canvasRef}
          className="w-full cursor-crosshair"
          style={{ height: '200px' }}
        />
        <div className="absolute top-2 right-4 bg-card/80 text-primary px-3 py-1 rounded-full">
          Score: {score}
        </div>
        <div className="absolute bottom-2 left-2 right-2 bg-card/70 text-foreground text-center p-2 text-sm rounded-md">
          Click anywhere to fire bullets toward your cursor position
        </div>
      </div>
      
      <div className="bg-card rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Interactive Canvas Game</h2>
        <p className="text-muted-foreground mb-4">
          This page demonstrates an interactive canvas animation where you can:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
          <li>Watch the rocket fly across the screen</li>
          <li>See rocks moving in random directions</li>
          <li>Click to fire bullets from the rocket <strong>toward your cursor position</strong></li>
          <li>Destroy rocks with bullets to score points</li>
        </ul>
      </div>
    </div>
  );
};

export default RocketAnimation; 