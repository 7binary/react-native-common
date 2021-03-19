import axios, { AxiosInstance } from 'axios';
import * as AxiosLogger from 'axios-logger';
import { FormikHelpers } from 'formik';

import { Settings } from '@config/Settings';

AxiosLogger.setGlobalConfig({
  dateFormat: false,
  prefixText: false,
  status: true,
  headers: false,
  data: false,
});

interface AxOptions {
  actions?: FormikHelpers<any>;
  setLoading?: (isLoading: boolean) => void;
}

function memoizedAx() {
  let cachedClients: {[key: string]: AxiosInstance} = {};

  return function({ actions, setLoading }: AxOptions = {}): AxiosInstance {
    const { xToken, appVersion, jwtToken } = Settings.api;
    // check cached axios
    if (!actions && !setLoading && cachedClients[jwtToken || '']) {
      return cachedClients[jwtToken || ''];
    }

    // form headers
    const headers: {[key: string]: string} = {
      'Content-Type': 'application/json',
      'X-Token': xToken,
    };
    if (jwtToken) {
      headers.Authorization = `Bearer ${Settings.api.jwtToken}`;
    }
    if (appVersion) {
      headers['X-App-Version'] = appVersion;
    }

    // form axios client
    const client: AxiosInstance = axios.create({
      baseURL: Settings.api.baseURL,
      timeout: 60000,
      headers,
    });

    if (setLoading) {
      client.interceptors.request.use(
        (config) => {
          setLoading(true);
          return config;
        },
        (error) => Promise.reject(error),
      );
      client.interceptors.response.use(
        (response) => {
          setLoading(false);
          return response;
        },
        (error) => {
          setLoading(false);
          return Promise.reject(error);
        },
      );
    }

    if (actions) {
      client.interceptors.request.use(
        (config) => {
          actions.setSubmitting(true);
          actions.setStatus(null);
          return config;
        },
        (error) => Promise.reject(error),
      );
      client.interceptors.response.use(
        (response) => {
          actions.setSubmitting(false);
          return response;
        },
        (error) => {
          actions.setSubmitting(false);
          actions.setStatus(error);
          return Promise.reject(error);
        },
      );
    }

    // add logger for dev
    if (__DEV__ && Settings.api.axiosLogger) {
      client.interceptors.request.use(AxiosLogger.requestLogger);
      client.interceptors.response.use(AxiosLogger.responseLogger);
    }

    // cache axios client
    if (!actions && !setLoading) {
      cachedClients[jwtToken || ''] = client;
    }

    return client;
  };
};

export const ax = memoizedAx();
