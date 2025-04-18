import { usePasswordField } from "./usePasswordField";
import { validatePasswordsMatch } from "../utils/validation";

export function useConfirmPasswordField(
  primaryPasswordField: ReturnType<typeof usePasswordField>
) {
  const confirmPasswordField = usePasswordField();

  const validate = () => {
    const isValid = validatePasswordsMatch(
      primaryPasswordField.value,
      confirmPasswordField.value
    );
    if (!isValid) {
      confirmPasswordField.setError(true);
    }
    return isValid;
  };

  return {
    ...confirmPasswordField,
    validate,
  };
}
