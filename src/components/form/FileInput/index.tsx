import React, { useState } from 'react';
import { TouchableOpacity, View, ViewStyle } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Button } from 'react-native-paper';
import { IconProps } from 'react-native-vector-icons/Icon';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Settings } from '@config/Settings';
import { ZoomViewer } from '@components/ZoomViewer';
import { UploadFile } from '@services/UploadFile';
import styles from './styles';

interface Props {
  title: string;
  file: UploadFile | null;
  setFile: (file: UploadFile | null) => void;
  disabled?: boolean;
  webpath?: string | null;
  authToken?: string | null;
  iconProps?: IconProps;
  containerStyle?: ViewStyle;
}

export const FileInput: React.FC<Props> = ({
  title, webpath, file, setFile, authToken, disabled, iconProps, containerStyle,
}) => {
  const [zoomPopup, setZoomPopup] = useState(false);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const openCamera = () => UploadFile.get(title, uploadFile => setFile(uploadFile));
  const url = file ? file.url : webpath;
  const headers = {
    'X-Token': Settings.api.xToken,
    Authorization: `Bearer ${authToken}`,
  };

  return (
    <View
      style={containerStyle ? containerStyle : styles.container}
      onLayout={(event: any) => setWidth(event.nativeEvent.layout.width)}
    >
      {iconProps && !file ? (
        <TouchableOpacity onPress={openCamera} style={{ alignSelf: 'center' }}>
          <Ionicons {...iconProps}/>
        </TouchableOpacity>
      ) : null}

      {!iconProps ? (
        <Button
          mode="outlined"
          disabled={disabled ? true : undefined}
          icon={({ color }) => <Ionicons name="ios-camera-outline" size={24} color={color}/>}
          onPress={openCamera}
          theme={Settings.theme}
          color={Settings.colors.primary}
        >{title}</Button>
      ) : null}

      {webpath || file ? (
        <View style={styles.imageBox}>
          {url ? (
            <TouchableOpacity onPress={() => {
              iconProps && file ? setFile(null) : setZoomPopup(true);
            }}
            >
              <FastImage
                source={{ uri: url, headers }}
                style={{ width, height, borderWidth: 0.5, borderColor: 'lightgrey' }}
                resizeMode={FastImage.resizeMode.contain}
                onLoad={(e: any) => setHeight(e.nativeEvent.height / e.nativeEvent.width * width)}
              />
            </TouchableOpacity>
          ) : null}

          {file ? (
            <TouchableOpacity onPress={() => setFile(null)}>
              <Ionicons name="ios-close" style={styles.deleteIcon}/>
            </TouchableOpacity>
          ) : null}
        </View>
      ) : null}

      <ZoomViewer zoomPopup={zoomPopup} setZoomPopup={setZoomPopup} url={url}/>
    </View>
  );
};
