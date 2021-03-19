import React, { useRef } from 'react';
import { Button, Modal, Portal, Provider } from 'react-native-paper';
import { View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Settings } from '@config/Settings';
import styles from './styles';

type ScanResultTypes = 'CODE_128' | 'CODE_39' | 'CODE_93' | 'EAN_13' | 'EAN_8';

export interface ScanResult {
  type: ScanResultTypes | string;
  data: string;
}

interface Props {
  visible: boolean,
  setVisible: (visible: boolean) => void;
  onBarcode: (scanResult: ScanResult) => void;
}

export const Scanner: React.FC<Props> = ({ visible, setVisible, onBarcode }) => {
  // prevent to scan the same barcode multiple times
  const barcodes = useRef<{[key: string]: boolean}>({});

  const hideScanner = () => setVisible(false);
  const onBarCodeRead = (scanResult: ScanResult) => {
    const { data: barcode, type } = scanResult;
    if (barcode && barcode.length > 0 && !barcodes.current[barcode]) {
      __DEV__ && console.log(`>>> SCANNED UNIQ BARCODE ${type}: ${barcode}`);
      barcodes.current[barcode] = true;
      onBarcode(scanResult);
      hideScanner();
    }
  };

  const BackButton = (
    <View style={styles.controls}>
      <Button
        style={styles.backBtn}
        onPress={hideScanner}
        mode="contained"
        icon={({ color }) => (
          <Ionicons name="ios-arrow-undo-circle-outline" size={24} color={color}/>
        )}
      >Вернуться</Button>
    </View>
  );

  return (
    <Provider theme={Settings.theme}>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideScanner}
          contentContainerStyle={styles.modal}
        >
          <View style={styles.container}>
            <RNCamera
              style={styles.preview}
              type={RNCamera.Constants.Type.back}
              onBarCodeRead={onBarCodeRead}
            >
              {() => (
                <>
                  {BackButton}
                  <View style={styles.controls}>
                    <Ionicons name="ios-scan-outline" style={styles.scanIcon}/>
                  </View>
                  {BackButton}
                </>
              )}
            </RNCamera>
          </View>
        </Modal>
      </Portal>
    </Provider>
  );
};
