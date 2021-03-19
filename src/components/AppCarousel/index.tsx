import React, { useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Ionicons from 'react-native-vector-icons/FontAwesome5';
import FastImage from 'react-native-fast-image';

import { FitImage } from '@components/FitImage';
import styles from './styles';

export interface CarouselBanner {
  illustration: string;
  title?: string;
  subtitle?: string;
}

interface Props {
  data: CarouselBanner[];
}

export const AppCarousel: React.FC<Props> = ({ data }) => {
  const [ref, setRef] = useState<Carousel<CarouselBanner>>();
  const { width: screenWidth } = Dimensions.get('window');
  const [height, setHeight] = useState(150);
  const [width, setWidth] = useState(screenWidth);

  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }

  if (data.length === 1) {
    return <FitImage url={data[0].illustration}/>;
  }

  const goForward = () => {
    ref?.snapToNext();
  };

  const goBackward = () => {
    ref?.snapToNext();
  };

  const renderItem: React.FC<{item: CarouselBanner}> = ({ item }) => {
    return (
      <View
        onLayout={(event: any) => setWidth(event.nativeEvent.layout.width)}
        style={{ width, height }}
      >
        <FastImage
          style={{ ...styles.image, width, height }}
          source={{ uri: item.illustration }}
          resizeMode={FastImage.resizeMode.contain}
          onLoad={(e: any) => setHeight(e.nativeEvent.height / e.nativeEvent.width * screenWidth)}
         />

        {item.title && (
          <View style={styles.titleWrap}>
            <Text style={styles.title} numberOfLines={2}>
              {item.title}
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {data.length > 1 ? (
        <TouchableOpacity
          style={{ ...styles.actions, ...styles.prevAction, top: (height / 2 - 15) }}
          onPress={goBackward}
        >
          <Ionicons color="white" size={22} name="chevron-left"/>
        </TouchableOpacity>
      ) : null}
      <Carousel
        ref={(c: Carousel<any>) => setRef(c)}
        sliderWidth={width}
        itemWidth={width}
        loop={true}
        data={data}
        renderItem={renderItem}
      />
      {data.length > 1 ? (
        <TouchableOpacity
          style={{ ...styles.actions, ...styles.nextAction, top: (height / 2 - 15) }}
          onPress={goForward}
        >
          <Ionicons color="white" size={22} name="chevron-right"/>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
