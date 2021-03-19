import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';

import { Settings } from '@config/Settings';
import { UploadFile } from '@services/UploadFile';
import { ZoomViewer } from '@components/ZoomViewer';
import styles from './styles';

interface FileUploadProps {
  index: number;
  file: UploadFile;
  removeFile: (index: number) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ index, file, removeFile }) => {
  const [zoomPopup, setZoomPopup] = useState(false);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  return (
    <View
      style={styles.imageContainer}
      onLayout={(event: any) => setWidth(event.nativeEvent.layout.width)}
    >
      <View style={styles.imageBox}>
        <TouchableOpacity onPress={() => setZoomPopup(true)}>
          <FastImage
            source={{ uri: file.url! }}
            style={{ ...styles.fastimage, width, height }}
            resizeMode={FastImage.resizeMode.contain}
            onLoad={(e: any) => setHeight(e.nativeEvent.height / e.nativeEvent.width * width)}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => removeFile(index)}>
          <Ionicons name="ios-close" style={styles.deleteIcon}/>
        </TouchableOpacity>
      </View>
      <ZoomViewer zoomPopup={zoomPopup} setZoomPopup={setZoomPopup} url={file.url}/>
    </View>
  );
};

interface UploadFilesProps {
  files: UploadFile[];
  setFiles: (files: UploadFile[]) => void;
  maxFiles?: number;
  title?: string;
}

export const UploadFiles: React.FC<UploadFilesProps> = ({
  files, setFiles, maxFiles = 10, title = 'Загрузить фото',
}) => {
  const removeFile = (index: number) => {
    setFiles(files.filter((file, idx) => idx !== index));
  };
  const openCamera = () => UploadFile.get(title, file => setFiles([...files, file]));

  return (
    <View>
      {files.length > 0 ? (
        <View style={styles.images}>
          {files.map((file, index) => (
            <FileUpload key={file.url} index={index} file={file} removeFile={removeFile}/>
          ))}
        </View>
      ) : null}

      <Button
        mode="outlined"
        disabled={files.length >= maxFiles}
        icon={({ color }) => (
          <Ionicons name="ios-camera-outline" size={24} color={color}/>
        )}
        onPress={openCamera}
        color={Settings.colors.primary}
        theme={Settings.theme}
      >{title}</Button>
    </View>
  );
};
