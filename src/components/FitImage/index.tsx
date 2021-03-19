import React, { useState } from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import FastImage, { OnLoadEvent } from 'react-native-fast-image';
import IconFA from 'react-native-vector-icons/FontAwesome';

import { getExtension } from '@utils/getExtension';

interface Props {
  url?: string | null;
  source?: any;
  defaultWidth?: number;
  defaultHeight?: number;
  pdfSize?: number;
  pdfColor?: string;
}

export const FitImage: React.FC<Props> = ({
  url,
  source,
  defaultWidth = 0,
  defaultHeight = 0,
  pdfSize = 60,
  pdfColor = 'maroon',
}) => {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  if (!url && !source) {
    return null;
  }

  // PDF returns an icon
  if (url?.includes('.pdf')) {
    return <IconFA name="file-pdf-o" size={pdfSize} color={pdfColor}/>;
  }

  // only images allowed for FastImage
  if (!source && url) {
    const ext = getExtension(url);
    if (!ext || ['jpg', 'jpeg', 'png', 'gif'].indexOf(ext) === -1) {
      return null;
    }
  }

  return (
    <View onLayout={(event: LayoutChangeEvent) => setWidth(event.nativeEvent.layout.width)}>
      <FastImage
        style={{
          width: width ? width : defaultWidth,
          height: height ? height : defaultHeight,
        }}
        source={source ? source : { uri: url }}
        resizeMode={FastImage.resizeMode.contain}
        onLoad={(e: OnLoadEvent) => setHeight(e.nativeEvent.height / e.nativeEvent.width * width)}
      />
    </View>
  );
};

