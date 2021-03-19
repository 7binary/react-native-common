import React from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import RNPickerSelect, { Item } from 'react-native-picker-select';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';

import { Settings } from '@config/Settings';
import { ErrorMessage } from '@components/form/ErrorMessage';
import styles from './styles';

type NonEmptyArray<T> = [T, ...T[]];

export interface FormSelectOption {
  label: string;
  value: any;
}

export interface IdTitleOption {
  id: number;
  title: string;
}

export function convertOptions(options: IdTitleOption[]): FormSelectOption[] {
  return options.map(option => ({
    label: option.title,
    value: `${option.id}`,
  }));
}

export interface FormSelectProps {
  field: {name: string, value: string, onChange: (value: any) => any};
  form: {errors: {[s: string]: string}, touched: {[s: string]: string}};
  label: string;
  options: NonEmptyArray<FormSelectOption>;
  onChanged: (value: any) => void;
  disabled?: boolean;
  iconName?: string;
  iconColor?: string;
  iconSize?: number;
  placeholder?: string;
  props?: any;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  field: { name, value, onChange },
  form: { errors },
  label,
  options,
  onChanged,
  disabled = false,
  iconName,
  iconColor = Settings.colors.formIcon,
  iconSize = 28,
  placeholder = 'выберите из списка...',
}) => {
  let LeftIcon = null;
  if (iconName) {
    LeftIcon = iconName.includes('ios-') || iconName.includes('md-')
      ? <Ionicons name={iconName} size={iconSize} color={iconColor} style={{ ...styles.icon }}/>
      : <IconFA name={iconName} size={iconSize} color={iconColor} style={styles.icon}/>;
  }
  const errorMsg = errors[name] || null;
  const paddingHorizontal = 15;

  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingLeft: iconName ? 56 : paddingHorizontal,
      paddingRight: paddingHorizontal,
      paddingBottom: 10,
      color: '#333',
      marginTop: 2,
      lineHeight: 15,
    },
    inputAndroid: {
      fontSize: 16,
      marginLeft: iconName ? 50 : paddingHorizontal,
      paddingRight: paddingHorizontal,
      paddingBottom: 10,
      color: '#333',
    },
  });

  const placeholderOptions = {
    label: placeholder,
    value: '',
    color: '#9EA0A4',
  };

  if (!onChanged) {
    onChanged = onChange(name);
  }

  // select options: default if list is corrupted and transformed
  let items: Item[] = [{ label: '', value: '', key: '' }];
  if (options && options[0] && `${options[0].label}` !== '' && `${options[0].value}` !== '') {
    items = options.map((option: FormSelectOption): Item => ({
      label: `${option.label}`,
      value: `${option.value}`,
      color: '#333',
      key: `${option.value}`,
    }));
  }

  return (
    <View style={styles.box}>
      <Text style={{
        ...styles.label,
        marginLeft: iconName ? 55 : paddingHorizontal,
      }}
      >{label}</Text>
      <View style={styles.container}>
        {LeftIcon}
        <RNPickerSelect
          pickerProps={{
            itemStyle: {
              fontSize: Platform.OS === 'ios' ? 13 : 16,
            },
          }}
          placeholder={placeholderOptions}
          key={name}
          value={value}
          onValueChange={onChanged}
          items={items}
          style={pickerSelectStyles}
          disabled={!!disabled}
          textInputProps={{ multiline: true, numberOfLines: 5 }}
          Icon={() => (
            <Ionicons name="ios-caret-down" style={styles.downIcon}/>
          )}
          doneText="готово"
        />
      </View>
      <ErrorMessage>{errorMsg}</ErrorMessage>
    </View>
  );
};
