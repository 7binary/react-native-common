import React from 'react';
import { Modal, TouchableOpacity } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Props {
  zoomPopup: boolean;
  setZoomPopup: (zoomPopup: boolean) => void;
  url?: string | null;
}

export const ZoomViewer: React.FC<Props> = ({ zoomPopup, setZoomPopup, url }) => {
  if (!url) {
    return null;
  }

  const closePopup = () => setZoomPopup(false);

  return (
    <Modal visible={zoomPopup} transparent={true}>
      <ImageViewer
        renderIndicator={() => (<></>)}
        renderHeader={() => (
          <TouchableOpacity
            style={{
              padding: 15,
              zIndex: 1000,
              position: 'absolute',
              top: 20,
              right: -5,
              opacity: 0.5,
            }}
            onPress={closePopup}
          >
            <Ionicons name="ios-close" color="white" size={42}/>
          </TouchableOpacity>
        )}
        onLongPress={closePopup}
        onCancel={closePopup}
        enableSwipeDown={true}
        imageUrls={[{ url }]}
      />
    </Modal>
  );
};
