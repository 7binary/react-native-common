import React from 'react';
import { Dimensions, View, ViewStyle, TouchableOpacity, Text, TextStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HTML from 'react-native-render-html';
import { IGNORED_TAGS } from 'react-native-render-html/src/HTMLUtils';
import uuid from 'uuidv4';

import { FitImage } from '@components/FitImage';

const includeTags =
  ['img', 'table', 'caption', 'col', 'colgroup', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr'];
const tags = IGNORED_TAGS.filter(t => !includeTags.includes(t));

const tableDefaultStyle: ViewStyle = {
  flex: 1,
  justifyContent: 'flex-start',
};

const tableColumnStyle: ViewStyle = {
  ...tableDefaultStyle,
  flexDirection: 'column',
  alignItems: 'stretch',
};

const tableRowStyle: ViewStyle = {
  ...tableDefaultStyle,
  flexDirection: 'row',
  alignItems: 'stretch',
};

const tdStyle: ViewStyle = {
  ...tableDefaultStyle,
  paddingVertical: 3,
  paddingHorizontal: 5,
  borderWidth: 0.5,
  borderColor: '#AAA',
};

const thStyle: ViewStyle = {
  ...tdStyle,
  alignItems: 'center',
};

const aStyle: TextStyle = {
  marginBottom: -3,
};

interface Props {
  children: any;
  containerStyle?: ViewStyle;
}

export const TextHtml: React.FC<Props> = ({ children, containerStyle }) => {
  const navigation = useNavigation();

  const renderers = {
    table: (x: any, c: any) => <View key={`${c}${uuid()}`} style={tableColumnStyle}>{c}</View>,
    col: (x: any, c: any) => <View key={`${c}${uuid()}`} style={tableColumnStyle}>{c}</View>,
    colgroup: (x: any, c: any) => <View key={`${c}${uuid()}`} style={tableRowStyle}>{c}</View>,
    tbody: (x: any, c: any) => <View key={`${c}${uuid()}`} style={tableColumnStyle}>{c}</View>,
    tfoot: (x: any, c: any) => <View key={`${c}${uuid()}`} style={tableRowStyle}>{c}</View>,
    th: (x: any, c: any) => <View key={`${c}${uuid()}`} style={thStyle}>{c}</View>,
    thead: (x: any, c: any) => <View key={`${c}${uuid()}`} style={tableRowStyle}>{c}</View>,
    caption: (x: any, c: any) => <View key={`${c}${uuid()}`} style={tableColumnStyle}>{c}</View>,
    tr: (x: any, c: any) => <View key={`${c}${uuid()}`} style={tableRowStyle}>{c}</View>,
    td: (x: any, c: any) => <View key={`${c}${uuid()}`} style={tdStyle}>{c}</View>,
    img: (x: any) => (
      <FitImage
        url={x.src}
        key={`${x.src}${uuid()}`}
        defaultWidth={Dimensions.get('screen').width}
        defaultHeight={600}
      />
    ),
    a: (x: any, c: any) => (
      <TouchableOpacity
        onPress={() => navigation.navigate('Webview', { url: x.href })}
        key={`${x.href}${uuid()}`}
        style={aStyle}
      >
        <Text>{c}</Text>
      </TouchableOpacity>
    ),
  };

  return (
    <View style={containerStyle}>
      <HTML
        html={children}
        imagesMaxWidth={Dimensions.get('window').width}
        ignoredTags={tags}
        renderers={renderers}
      />
    </View>
  );
};
