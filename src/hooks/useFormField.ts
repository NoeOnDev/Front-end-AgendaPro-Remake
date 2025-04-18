import { useState } from 'react';

export function useFormField<T>(initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [error, setError] = useState(false);
  
  const handleChange = (newValue: T) => {
    setValue(newValue);
    setError(false);
  };
  
  return {
    value,
    error,
    setValue,
    setError,
    handleChange,
    reset: () => {
      setValue(initialValue);
      setError(false);
    }
  };
}