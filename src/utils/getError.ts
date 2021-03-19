import { AxiosError } from 'axios';

export const getError = (error: AxiosError): string => {
  if (error.response) {
    const { data } = error.response;
    if ('error' in data) {
      return data.error;
    } else if ('errors' in data) {
      if (Array.isArray(data.errors)) {
        return data.errors[0];
      } else {
        const errors: string[] = [];
        Object.keys(data.errors).forEach((k) => {
          errors.push(data.errors[k]);
        });
        return errors[0];
      }
    }
  } else if (error.request) {
    return 'С вашим подключением не все так просто. Пожалуйста, проверьте доступ к интернету';
  }

  return error.toString();
};
