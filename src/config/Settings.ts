import { ImageURISource, StatusBarStyle, ViewStyle, StyleProp } from 'react-native';
import { BottomTabBarOptions } from '@react-navigation/bottom-tabs';
import { MaterialTopTabBarOptions } from '@react-navigation/material-top-tabs/src/types';
import { DefaultTheme } from 'react-native-paper';
import DeviceInfo from 'react-native-device-info';

export interface SettingsApi {
  baseURL: string;
  xToken: string;
  jwtToken?: string | null;
  appVersion?: string | null;
  axiosLogger: boolean;
}

export interface SettingsColors {
  primary: string;
  accent: string;
  headerBackground: string;
  headerTextActive: string;
  headerTextInactive: string;
  borderColor: string;
  formIcon: string;
  background: string,
  success: string,
  warning: string,
  danger: string,
}

export type Theme = typeof DefaultTheme;

const defaultColors: SettingsColors = {
  primary: '#4F88B1',
  accent: '#13B59D',
  success: '#13B59D',
  warning: '#F86E34',
  danger: '#F53E4F',
  background: 'transparent',
  headerBackground: '#4F88B1',
  headerTextActive: '#333',
  headerTextInactive: '#AAA',
  borderColor: '#E1E1E1',
  formIcon: '#444444',
};

const defaultApi: SettingsApi = {
  baseURL: '',
  xToken: '',
  jwtToken: null,
  appVersion: null,
  axiosLogger: true,
};

interface SettingsConfig {
  screen: ViewStyle;
  sidemenu: boolean;
  border: {
    width: number,
    color: string,
  },
  statusbarLight: {
    backgroundColor: string,
    barStyle: StatusBarStyle,
  },
  statusbarDark: {
    backgroundColor: string,
    barStyle: StatusBarStyle,
  },
  header: {
    backgroundColor: string,
    color: string,
  },
  headerIcon: StyleProp<any>,
  headerBadge: {
    darkTheme: {
      bgColor: string,
      borderColor: string,
    },
    lightTheme: {
      bgColor: string,
      borderColor: string,
    },
  },
  tabbarIconSize: number;
  tabbar: BottomTabBarOptions,
  tabs: MaterialTopTabBarOptions,
  backgroundImage?: ImageURISource,
}

const defaultConfig: SettingsConfig = {
  screen: {
    padding: 0,
    flex: 1,
    backgroundColor: 'white',
  },
  sidemenu: false,
  border: {
    width: 0.5,
    color: defaultColors.borderColor,
  },
  statusbarLight: {
    backgroundColor: 'white',
    barStyle: 'dark-content',
  },
  statusbarDark: {
    backgroundColor: defaultColors.headerBackground,
    barStyle: 'light-content',
  },
  header: {
    backgroundColor: defaultColors.primary,
    color: defaultColors.headerTextActive,
  },
  headerIcon: {
    fontSize: 26,
    paddingHorizontal: 10,
    color: defaultColors.headerTextActive,
  },
  tabbarIconSize: 24,
  tabbar: {
    activeTintColor: 'white',
    activeBackgroundColor: defaultColors.headerBackground,
    inactiveTintColor: defaultColors.headerTextInactive,
    inactiveBackgroundColor: defaultColors.headerBackground,
  },
  tabs: {
    activeTintColor: defaultColors.headerTextActive,
    inactiveTintColor: defaultColors.headerTextInactive,
    showLabel: true,
    showIcon: true,
    labelStyle: {
      fontSize: 14,
      fontWeight: 'bold' as 'bold',
    },
  },
  headerBadge: {
    darkTheme: {
      bgColor: 'gray',
      borderColor: defaultColors.borderColor,
    },
    lightTheme: {
      bgColor: defaultColors.primary,
      borderColor: defaultColors.borderColor,
    },
  },
};

export class Settings {
  private static _api: SettingsApi;
  private static _colors: SettingsColors;
  private static _config: SettingsConfig;
  private static _theme: Theme;

  public static setConfig(config: Partial<SettingsConfig>) {
    if (!this._config) {
      this._config = defaultConfig;
    }
    this._config = { ...this._config, ...config };
  }

  public static get config(): SettingsConfig {
    return this._config || defaultConfig;
  }

  public static setColors(colors: Partial<SettingsColors>) {
    if (!this._colors) {
      this._colors = defaultColors;
    }
    this._colors = { ...this._colors, ...colors };
  }

  public static get colors(): SettingsColors {
    return this._colors || defaultColors;
  }

  public static setApi(api: Partial<SettingsApi>) {
    if (!this._api) {
      this._api = defaultApi;
    }
    if (!api.appVersion) {
      api.appVersion = DeviceInfo.getVersion();
    }
    this._api = { ...this._api, ...api };
  }

  public static get api(): SettingsApi {
    return this._api || defaultApi;
  }

  public static setTheme(theme: Theme) {
    this._theme = theme;
  }

  public static get theme(): Theme {
    return this._theme;
  }

}
