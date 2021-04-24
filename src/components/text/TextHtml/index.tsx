import React from 'react';
import { Dimensions, View, ViewStyle, Linking } from 'react-native';
import HTML from 'react-native-render-html';
import { IGNORED_TAGS } from 'react-native-render-html/src/HTMLUtils';
import { FitImage } from '@components/FitImage';

interface Props {
  children: any;
  containerStyle?: ViewStyle;
}

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

export const TextHtml: React.FC<Props> = ({ children, containerStyle }) => {
  const renderers = {
    table: (x: any, c: any) => <View key={`${c}`} style={tableColumnStyle}>{c}</View>,
    col: (x: any, c: any) => <View key={`${c}`} style={tableColumnStyle}>{c}</View>,
    colgroup: (x: any, c: any) => <View key={`${c}`} style={tableRowStyle}>{c}</View>,
    tbody: (x: any, c: any) => <View key={`${c}`} style={tableColumnStyle}>{c}</View>,
    tfoot: (x: any, c: any) => <View key={`${c}`} style={tableRowStyle}>{c}</View>,
    th: (x: any, c: any) => <View key={`${c}`} style={thStyle}>{c}</View>,
    thead: (x: any, c: any) => <View key={`${c}`} style={tableRowStyle}>{c}</View>,
    caption: (x: any, c: any) => <View key={`${c}`} style={tableColumnStyle}>{c}</View>,
    tr: (x: any, c: any) => <View key={`${c}`} style={tableRowStyle}>{c}</View>,
    td: (x: any, c: any) => <View key={`${c}`} style={tdStyle}>{c}</View>,
    img: (x: any) => (
      <FitImage
        url={x.src}
        key={`${x.src}`}
        defaultWidth={Dimensions.get('screen').width}
        defaultHeight={600}
      />
    ),
  };

  const maxWidth = Dimensions.get('window').width;

  return (
    <View style={containerStyle}>
      <HTML
        html={children}
        imagesMaxWidth={maxWidth}
        staticContentMaxWidth={maxWidth}
        onLinkPress={(evt, href) => Linking.openURL(href)}
        ignoredTags={tags}
        renderers={renderers}
        alterChildren={node => {
          if (node.name === 'iframe' || node.name === 'img') {
            delete node.attribs.width;
            delete node.attribs.height;
          }
          return node.children;
        }}
      />
    </View>
  );
};
