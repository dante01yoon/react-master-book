import { useContext, useMemo } from "react";

const useCountSelector = (selector) => {
  const context = useContext(CounterContext); // ➊
  return useMemo(() => selector(context), [context, selector]); // ➋
};
 