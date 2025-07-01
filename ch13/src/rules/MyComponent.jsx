function MyComponent() {
  const [state, setState] = useState(initialState); // 첫 번째 훅
  const refContainer = useRef(initialValue);       // 두 번째 훅
  useEffect(() => {                                // 세 번째 훅
    // ... effect 로직 ...
  });
  // ... 컴포넌트 로직 ...
}