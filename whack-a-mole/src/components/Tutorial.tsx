import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// 이 컴포넌트는 사용된 React 개념에 대한 교육용 콘텐츠를 제공함
const Tutorial: React.FC = () => {
  return (
    <Card className="mt-8 mb-4">
      <CardHeader>
        <CardTitle>React Concepts Demonstrated</CardTitle>
        <CardDescription>
          This game demonstrates several key React concepts for intermediate developers
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="useState">
          <TabsList className="grid grid-cols-3 md:grid-cols-6">
            <TabsTrigger value="useState">useState</TabsTrigger>
            <TabsTrigger value="useEffect">useEffect</TabsTrigger>
            <TabsTrigger value="useRef">useRef</TabsTrigger>
            <TabsTrigger value="forwardRef">forwardRef</TabsTrigger>
            <TabsTrigger value="useReducer">useReducer</TabsTrigger>
            <TabsTrigger value="portal">Portal</TabsTrigger>
          </TabsList>
          
          <TabsContent value="useState" className="mt-4 text-left space-y-2">
            <h3 className="font-semibold">useState and Closures</h3>
            <p>The game uses useState for score, activeHoles, and gameState management.</p>
            <p>Notice how useState's lazy initialization loads the high score from localStorage.</p>
            <p>The update functions capture variables in closures, ensuring access to the latest state even before re-renders.</p>
            <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto mt-2">
              {`// Lazy initialization with localStorage
const [highScore, setHighScore] = useState(() => {
  const saved = localStorage.getItem('whackHighScore');
  return saved ? parseInt(saved) : 0;
});

// Closure preserves the current score value
const updateScore = () => {
  setScore(currentScore => {
    const newScore = currentScore + 1;
    // The closure has access to current score
    // before the component re-renders
    return newScore;
  });
};`}
            </pre>
          </TabsContent>
          
          <TabsContent value="useEffect" className="mt-4 text-left space-y-2">
            <h3 className="font-semibold">useEffect and Dependencies</h3>
            <p>useEffect manages game timers and side effects like storing high scores in localStorage.</p>
            <p>Different dependency arrays control when effects run:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Empty array [] - Run once on mount</li>
              <li>With dependencies [value] - Run when value changes</li>
              <li>No array - Run on every render</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto mt-2">
              {`// Store high score in localStorage when it changes
useEffect(() => {
  localStorage.setItem('whackHighScore', highScore.toString());
}, [highScore]);

// Game timer effect
useEffect(() => {
  let timerId: number;
  
  if (isGameRunning && timeLeft > 0) {
    timerId = window.setInterval(() => {
      setTimeLeft(time => time - 1);
    }, 1000);
  }
  
  return () => {
    window.clearInterval(timerId);
  };
}, [isGameRunning, timeLeft]);`}
            </pre>
          </TabsContent>
          
          <TabsContent value="useRef" className="mt-4 text-left space-y-2">
            <h3 className="font-semibold">useRef for Values and DOM Access</h3>
            <p>useRef serves two purposes in our game:</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Storing values without causing re-renders (like game state between renders)</li>
              <li>Accessing DOM elements directly (for animations and measurements)</li>
            </ol>
            <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto mt-2">
              {`// Store data without re-rendering
const prevActiveHoles = useRef<boolean[]>([]);

// Access DOM elements
const moleRefs = useRef<(HTMLDivElement | null)[]>(
  Array(9).fill(null)
);

// Using the ref to access a DOM node
useEffect(() => {
  if (moleRefs.current[index]) {
    // Now we can interact with the DOM node
    const moleElement = moleRefs.current[index];
    // Add animation, measure size, etc.
  }
}, [index]);`}
            </pre>
          </TabsContent>
          
          <TabsContent value="forwardRef" className="mt-4 text-left space-y-2">
            <h3 className="font-semibold">forwardRef for Component References</h3>
            <p>forwardRef allows parent components to obtain a reference to a child component's DOM node.</p>
            <p>Our Mole and Hole components use forwardRef to give the game access to their DOM elements for animations.</p>
            <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto mt-2">
              {`// In child component (Mole.tsx)
const Mole = forwardRef<HTMLDivElement, MoleProps>(
  ({ isVisible, onClick }, ref) => {
    // Component implementation
    return <div ref={ref}>...</div>;
  }
);

// In parent component (GameBoard.tsx)
const moleRefs = useRef<(HTMLDivElement | null)[]>([]);

// Later in JSX:
<Mole 
  ref={(el) => (moleRefs.current[index] = el)}
  isVisible={isActive}
  onClick={handleWhack}
/>`}
            </pre>
          </TabsContent>
          
          <TabsContent value="useReducer" className="mt-4 text-left space-y-2">
            <h3 className="font-semibold">useReducer vs useState</h3>
            <p>Our game uses useReducer for game state management, which is ideal for complex state logic.</p>
            <p><strong>Pros of useReducer:</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Centralized state logic</li>
              <li>More predictable state transitions</li>
              <li>Easier testing and debugging</li>
              <li>Better for complex state with multiple sub-values</li>
            </ul>
            <p><strong>Cons:</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>More boilerplate code</li>
              <li>Overkill for simple state</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto mt-2">
              {`// Game state reducer
function gameReducer(state, action) {
  switch (action.type) {
    case 'START_GAME':
      return { ...state, isRunning: true };
    case 'END_GAME':
      return { ...state, isRunning: false };
    case 'SET_DIFFICULTY':
      return { ...state, difficulty: action.payload };
    // More actions...
  }
}

// In component
const [gameState, dispatch] = useReducer(gameReducer, initialState);

// Dispatching actions
dispatch({ type: 'START_GAME' });
dispatch({ type: 'SET_DIFFICULTY', payload: 3 });`}
            </pre>
          </TabsContent>
          
          <TabsContent value="portal" className="mt-4 text-left space-y-2">
            <h3 className="font-semibold">React Portal</h3>
            <p>Our game modal uses React.createPortal to render outside the normal DOM hierarchy.</p>
            <p>Portals are useful for elements that need to visually "break out" of their container, like modals, tooltips, and popovers.</p>
            <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto mt-2">
              {`// Modal component using Portal
return createPortal(
  <div className="modal-overlay">
    <div className="modal-content">
      {/* Modal content */}
    </div>
  </div>,
  document.body  // The portal target (where it will render)
);`}
            </pre>
            <p className="mt-2">Benefits of Portals:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Avoids CSS stacking context and overflow issues</li>
              <li>Allows components to render outside their parent DOM hierarchy</li>
              <li>Maintains React event propagation despite DOM placement</li>
            </ul>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default Tutorial;
