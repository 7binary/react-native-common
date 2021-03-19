import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { Platform, TouchableOpacity, View } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { Settings } from '@config/Settings';
import { formattedDate } from '@utils/formattedDate';
import { toDate } from '@utils/toDate';
import styles from './styles';

interface Props {
  value: string | undefined;
  setValue: (value: string | undefined) => void;
  label: string | undefined;
  iconName?: string;
  iconColor?: string;
  iconSize?: number;
  phone?: boolean;
  mask?: string;
  dense?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  numeric?: boolean;
  onFocus?: Function;
  datepicker?: boolean;
  maxDate?: string;
  minDate?: string;
  lines?: number;
}

export const Input: React.FC<Props> = ({
  value,
  setValue,
  label,
  iconName,
  iconColor,
  iconSize,
  phone,
  mask,
  dense = true,
  disabled = false,
  autoFocus = false,
  numeric = false,
  onFocus,
  datepicker = false,
  maxDate,
  minDate,
  lines,
}) => {
  // for datepicker
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    if (!disabled) {
      setDatePickerVisibility(true);
    }
  };
  const hideDatePicker = () => setDatePickerVisibility(false);
  const datePicked = (date: Date) => {
    setValue(formattedDate(date));
    hideDatePicker();
  };

  // icon and style
  iconColor = iconColor || Settings.colors.formIcon;
  iconSize = iconSize || 28;
  let LeftIcon = null;

  if (typeof iconName === 'string') {
    LeftIcon = iconName.includes('ios-') || iconName.includes('md-')
      ? <Ionicons name={iconName} size={iconSize} color={iconColor} style={styles.icon}/>
      : <IconFA name={iconName} size={iconSize} color={iconColor} style={styles.icon}/>;
  }

  const inputStyle = styles.input;
  const paddingLeft = iconName ? 45 : 0;
  const extraProps: any = {};
  const extraDatepickerProps: any = {};

  // mask for phone number
  if (phone) {
    numeric = true;
    extraProps.render = (props: any) => (
      <TextInputMask {...props} type={'custom'} options={{ mask: '+7 (999) 999-9999' }}/>
    );
    if (value?.length === 0) {
      value = '+7';
    }
  } else if (mask) {
    extraProps.render = (props: any) => (
      <TextInputMask {...props} type={'custom'} options={{ mask }}/>
    );
  }

  // numeric keyboard
  if (numeric) {
    extraProps.keyboardType = 'numeric';
    extraProps.returnKeyType = 'done';
  }

  // datepicker props for input
  if (datepicker) {
    extraProps.onFocus = () => showDatePicker();
    if (minDate) {
      extraDatepickerProps.minimumDate = toDate(minDate);
    }
    if (maxDate) {
      extraDatepickerProps.maximumDate = toDate(maxDate);
    }
  }

  // multiline
  if (lines) {
    extraProps.numberOfLines = lines;
    extraProps.multiline = true;
  }

  return (
    <View style={styles.box}>
      <View style={styles.container}>
        {LeftIcon}

        {/* date picker */}
        {datepicker ? (<>
          <TouchableOpacity onPress={showDatePicker}>
            <TextInput
              label={label}
              value={value}
              style={{ ...inputStyle, paddingLeft }}
              dense={dense}
              disabled={disabled}
              pointerEvents="none"
              theme={Settings.theme}
              {...extraProps}
            />
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            date={toDate(value && value.length > 0 ? value : '')}
            onConfirm={datePicked}
            onCancel={hideDatePicker}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            cancelTextIOS="отмена"
            confirmTextIOS="ОК"
            headerTextIOS="Выберите дату"
            locale="ru"
            {...extraDatepickerProps}
          />
        </>) : null}

        {/* common text input*/}
        {!datepicker ? (
          <TextInput
            label={label}
            value={value}
            onChangeText={text => setValue(text)}
            style={{ ...inputStyle, paddingLeft }}
            dense={dense}
            disabled={disabled}
            autoFocus={autoFocus}
            onFocus={onFocus}
            theme={Settings.theme}
            {...extraProps}
          />
        ) : null}
      </View>
    </View>
  );
};
