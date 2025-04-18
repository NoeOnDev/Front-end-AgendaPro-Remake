import { useFormField } from "./useFormField";

export function useTextField(initialValue = "", required = false) {
  const field = useFormField(initialValue);

  const validate = () => {
    if (required && field.value.trim() === "") {
      field.setError(true);
      return false;
    }
    return true;
  };

  return {
    ...field,
    validate,
  };
}
