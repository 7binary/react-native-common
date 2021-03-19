export const getFirstError = (error: any): string | null => {
  if (error.response) {
    const { data } = error.response;
    let errors = [];
    if ('error' in data) {
      errors = [data.error];
    } else if ('errors' in data) {
      if (Array.isArray(data.errors)) {
        ({ errors } = data);
      } else {
        Object.keys(data.errors).forEach((k) => {
          errors.push(data.errors[k]);
        });
      }
    }
    return errors.length > 0 ? errors[0] : null;
  } else if (error.request) {
    return 'С вашим подключением не все так просто. Пожалуйста, проверьте доступ к интернету';
  } else {
    return error.toString();
  }
};
