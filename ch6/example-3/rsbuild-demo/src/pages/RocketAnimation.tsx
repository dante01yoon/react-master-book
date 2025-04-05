import React, { useEffect, useRef } from 'react';

const RocketAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
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
      
      // Move rocket
      rocketX += speed;
      
      // Reset rocket position when it goes off screen
      if (rocketX > canvas.width + 50) {
        rocketX = -50;
      }
      
      // Continue animation
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">Rocket Animation</h1>
      
      <div className="bg-card rounded-lg shadow-sm overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full"
          style={{ height: '200px' }}
        />
      </div>
      
      <div className="bg-card rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Canvas Animation Demo</h2>
        <p className="text-muted-foreground">
          This page demonstrates a canvas animation of a rocket flying across the screen.
          The animation uses HTML5 Canvas API and React hooks to create a smooth, infinite
          animation loop.
        </p>
      </div>
    </div>
  );
};

export default RocketAnimation; 