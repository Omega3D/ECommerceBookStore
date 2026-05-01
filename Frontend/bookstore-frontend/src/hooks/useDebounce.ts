import { useEffect, useState } from "react";

export const useDebounce = <T>(value: T, delay = 400) => {
    const [debounced, setDebounced] = useState(value);
  
    useEffect(() => {
      const timeout = setTimeout(() => {
        setDebounced(value);
      }, delay);
  
      return () => clearTimeout(timeout);
    }, [value, delay]);
  
    return debounced;
  };