import { useFormField } from './useFormField';
import { validateEmail } from '../utils/validation';

export function useEmailValidation(initialValue = '') {
  const email = useFormField(initialValue);
  
  const validate = () => {
    if (!validateEmail(email.value)) {
      email.setError(true);
      return false;
    }
    return true;
  };
  
  return {
    ...email,
    validate
  };
}