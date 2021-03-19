import DropdownAlert, { DropdownAlertType } from 'react-native-dropdownalert';
import { AxiosError } from 'axios';

import { getError } from '@utils/getError';

export class DropdownAlertService {
  static ref: DropdownAlert | null = null;

  static set(ref: DropdownAlert): void {
    this.ref = ref;
  }

  static alert(
    type: DropdownAlertType,
    title: string | AxiosError,
    message: string = '',
    payload: any = {},
    interval?: number,
    onTap?: () => void,
  ): boolean {
    if (this.ref) {
      if ((title as AxiosError).isAxiosError !== undefined) {
        title = getError(title as AxiosError);
      }
      if (onTap) {
        payload.onTap = onTap;
      }
      this.ref.alertWithType(type, title as string, message, payload, interval);

      return true;
    }

    return false;
  }
}
