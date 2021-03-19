import { ErrorHandlerCallback, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

import { ax } from '@utils/ax';

export class ErrorHandler {
  static screenName = '';

  static register(profile_id: number | null, allowDev = false) {
    if (__DEV__ && !allowDev) {
      return;
    }

    const CustomErrorHandler: ErrorHandlerCallback = (e: any, isFatal?: boolean) => {
      const appName = DeviceInfo.getApplicationName();
      const exception = {
        error: `${e}${isFatal ? '. isFatal' : ''}`,
        handler: `${appName} @ ${this.screenName} Screen`,
        platform: Platform.OS,
        device: `${DeviceInfo.getDeviceId()} with OS ${DeviceInfo.getSystemVersion()}`,
        version: DeviceInfo.getVersion(),
        profile_id: profile_id,
      };
      ax().post('api/exception', exception);
    };

    ErrorUtils.setGlobalHandler(CustomErrorHandler);
  }
}
