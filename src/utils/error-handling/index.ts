export const setErrorsInForm = (
  errors: Record<string, string[]>,
  setError: any,
  translateKeyObject?: Record<string, string>
) => {
  Object.keys(errors).forEach((key) => {
    setError(translateKeyObject && translateKeyObject[key] ? translateKeyObject[key] : key, {
      type: 'custom',
      message: errors[key].join(', '),
    });
  });
};
