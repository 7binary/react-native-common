import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Checkbox, Button, TouchableRipple, Dialog, Portal, Provider } from 'react-native-paper';

import { Settings } from '@config/Settings';
import { TextHtml } from '@components/text/TextHtml';
import styles from './styles';

export interface Page {
  title: string;
  content: string;
  hide_title: boolean;
  url: string | null;
}

interface Props {
  accepted: () => void;
  declined: () => void;
  page?: Page;
  textIntro: string;
  textLink: string;
}

export const PageCheckbox: React.FC<Props> = ({ accepted, declined, page, textIntro, textLink }) => {
  const [checked, setChecked] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const onPressCheckbox = () => {
    if (!checked) {
      setShowDialog(true);
    } else {
      setChecked(false);
      declined();
    }
  };

  const acceptAction = () => {
    setShowDialog(false);
    setChecked(true);
    accepted();
  };

  return (
    <Provider theme={Settings.theme}>
      <TouchableRipple onPress={onPressCheckbox} style={styles.container}>
        <View style={styles.row}>
          <View pointerEvents="none" style={styles.checkboxContainer}>
            <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              theme={Settings.theme}
            />
          </View>
          <Text style={styles.label}>
            {textIntro} <Text style={styles.link}>{textLink}</Text>
          </Text>
        </View>
      </TouchableRipple>

      <Portal>
        <Dialog visible={showDialog} onDismiss={() => setShowDialog(false)}>
          <ScrollView contentContainerStyle={styles.dialogScrollview}>
            {page ? <TextHtml>{page.content}</TextHtml> : null}
          </ScrollView>
          <Dialog.Actions style={styles.dialogActions}>
            <Button
              onPress={acceptAction}
              mode="contained"
              theme={Settings.theme}
              color={Settings.colors.primary}
            >Согласен</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Provider>
  );
};
