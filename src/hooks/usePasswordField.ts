import { useState } from 'react';
import { useFormField } from './useFormField';

export function usePasswordField(initialValue = '') {
  const password = useFormField(initialValue);
  const [showPassword, setShowPassword] = useState(false);
  
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  
  const validate = (minLength = 6) => {
    if (password.value.length < minLength) {
      password.setError(true);
      return false;
    }
    return true;
  };
  
  return {
    ...password,
    showPassword,
    handleClickShowPassword,
    handleMouseDownPassword,
    validate
  };
}