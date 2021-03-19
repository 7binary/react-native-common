import { PermissionsAndroid, Platform } from 'react-native';
import RNFetchBlob, { RNFetchBlobConfig } from 'rn-fetch-blob';

import { Settings } from '@config/Settings';
import { DropdownAlertService} from '@services/DropdownAlertService';

export class DownloadService {
  private static async run(urlPath: string, fileName: string, successAlert = 'Файл загружен', accessToken?: string | null) {
    const url = `${Settings.api.baseURL}/${urlPath}`;
    const dir = Platform.OS === 'ios' ? RNFetchBlob.fs.dirs.DocumentDir : RNFetchBlob.fs.dirs.DownloadDir;
    const filePath = `${dir}/${fileName}`;
    const headers = {
      'Content-Type': 'application/json',
      'X-Token': Settings.api.xToken,
      Authorization: `Bearer ${accessToken}`,
    };

    const configOptions = Platform.select({
      ios: {
        fileCache: true,
        path: filePath,
      },
      android: {
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          title: fileName,
          path: filePath,
        },
      },
    }) as RNFetchBlobConfig;

    RNFetchBlob.config(configOptions).fetch('POST', url, headers)
      .then(async (response) => {
        DropdownAlertService.alert('success', successAlert);
        if (Platform.OS === 'ios') {
          RNFetchBlob.ios.openDocument(response.data);
        }
      })
      .catch(e => DropdownAlertService.alert('error', `Ошибка загрузки: ${e.message}`));
  }

  static async download(urlPath: string, fileName: string, successAlert = 'Файл загружен', accessToken?: string | null) {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
        title: 'Предоставьте доступ',
        message: 'Для загрузки нужен доступ на сохранение файла',
        buttonNegative: 'Отклонить',
        buttonPositive: 'Разрешить',
      });
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        await this.run(urlPath, fileName, successAlert, accessToken);
      }
    } else {
      await this.run(urlPath, fileName, successAlert, accessToken);
    }
  }

  static buildQuery(payload: []): string {
    return Object.keys(payload).map((k: any) => `${encodeURIComponent(k)}=${encodeURIComponent(payload[k])}`).join('&');
  }
}
