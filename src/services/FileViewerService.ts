import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';

import { DropdownAlertService } from './DropdownAlertService';

export default class FileViewerService {

  static open(url: string, filename: string) {
    const localFile = `${RNFS.DocumentDirectoryPath}/${filename}`;

    RNFS.downloadFile({ fromUrl: url, toFile: localFile }).promise
      .then(() => FileViewer.open(localFile, { displayName: filename }))
      .catch(err => DropdownAlertService.alert('error', 'Ошибка загрузки файла', err.message));
  }
}
