import ImagePicker, { ImagePickerOptions, ImagePickerResponse } from 'react-native-image-picker';
import { PermissionsAndroid, Platform } from 'react-native';

import { DropdownAlertService } from '@services/DropdownAlertService';

export class UploadFile {
  base64: string | null;
  url: string | null;
  name?: string | null;
  id?: number | null;
  uid?: number | null;

  constructor(
    base64: string | null = null,
    url: string | null = null,
    name?: string | null,
  ) {
    this.base64 = base64;
    this.url = url;
    this.uid = (new Date()).getTime();
    this.name = name ? name : `${this.uid}`;
  }

  toArray() {
    const model: any = {};
    if (this.base64) {model.base64 = this.base64;}
    if (this.url) {model.url = this.url;}
    if (this.name) {model.name = this.name;}
    if (this.id) {model.id = this.id;}
    if (this.uid) {model.uid = this.uid;}

    return model;
  }

  static fromObject(obj: any): UploadFile {
    const model = new UploadFile();
    if ('base64' in obj) {model.base64 = obj.base64;}
    if ('url' in obj) {model.url = obj.url;}
    if ('name' in obj) {model.name = obj.name;}
    if ('id' in obj) {model.id = obj.id;}
    if ('uid' in obj) {model.uid = obj.id;}

    return model;
  }

  static async get(title: string, success: (uploadFile: UploadFile) => void): Promise<void> {
    const options: ImagePickerOptions = {
      title,
      cancelButtonTitle: 'Отменить',
      takePhotoButtonTitle: 'Сфотографировать',
      chooseFromLibraryButtonTitle: 'Выбрать из библиотеки',
      maxWidth: 1920,
      maxHeight: 1080,
      quality: 0.7,
      storageOptions: {
        skipBackup: true,
        path: 'Pictures/myAppPicture/',
        privateDirectory: true,
      },
    };

    if (Platform.OS === 'android') {
      const permissons = [PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, PermissionsAndroid.PERMISSIONS.CAMERA];
      await PermissionsAndroid.requestMultiple(permissons);
      const permissionCamera = await PermissionsAndroid.check('android.permission.CAMERA');
      const permissionWriteStorage = await PermissionsAndroid.check('android.permission.WRITE_EXTERNAL_STORAGE');

      if (!permissionCamera || !permissionWriteStorage) {
        console.log('> Camera permission is NOT GRANTED by the user');
        return;
      }
    }

    ImagePicker.showImagePicker(options, (response: ImagePickerResponse) => {
      try {
        if (response.didCancel) {
          return; // user cancelled
        } else if (response.error) {
          DropdownAlertService.alert('error', response.error);
          console.log('ImagePicker Error: ', response.error);
          console.log(response);
          return;
        }
        const file = new UploadFile(
          `data:image/jpeg;base64,${response.data}`,
          response.uri,
          response.fileName,
        );
        success(file);
      } catch (e) {
        console.log('> Error @ ImagePicker.showImagePicker:', e);
      }
    });
  }
}
