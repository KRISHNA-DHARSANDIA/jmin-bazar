import { createFont, createTokens } from 'tamagui';
import { createMedia } from '@tamagui/react-native-media-driver';
import { createTamagui } from 'tamagui';
import { lightTheme, darkTheme } from './themes/themes'; // Adjust the import path as needed

export const interFont = createFont({
  family: 'Inter, Helvetica, Arial, sans-serif',
  size: { 1: 12, 2: 14, 3: 15, 4: 20 },
  lineHeight: { 1: 17, 2: 22, 3: 25 },
  weight: { 4: '300', 6: '600' },
  letterSpacing: { 4: 0, 8: -1 },
  face: { 700: { normal: 'InterBold', italic: 'InterBold-Italic' }, 800: { normal: 'InterBold', italic: 'InterBold-Italic' }, 900: { normal: 'InterBold', italic: 'InterBold-Italic' } },
});

export const tokens = createTokens({
  size: { small: 20, medium: 30, true: 30, large: 40 },
  space: { small: 10, medium: 20, true: 20, large: 30 },
  color: {},
  radius: { small: 10, medium: 20, true: 20, large: 30 },
  zIndex: { small: 10, medium: 20, true: 20, large: 30 },
});

export const shorthands = {
  ac: 'alignContent',
  ai: 'alignItems',
  als: 'alignSelf',
  bblr: 'borderBottomLeftRadius',
  bbrr: 'borderBottomRightRadius',
  bg: 'backgroundColor',
  br: 'borderRadius',
  btlr: 'borderTopLeftRadius',
  btrr: 'borderTopRightRadius',
  f: 'flex',
  h: 'height',
  p: 'padding',
  mt: 'marginTop',
  mb: 'marginBottom',
} as const;

export default createTamagui({
  fonts: { heading: interFont, body: interFont },
  tokens,
  themes: {
    light: lightTheme,
    dark: darkTheme,
  },
  media: createMedia({
    sm: { maxWidth: 860 },
    gtSm: { minWidth: 860 + 1 },
    short: { maxHeight: 820 },
    hoverNone: { hover: 'none' },
    pointerCoarse: { pointer: 'coarse' },
  }),
  shorthands,
  defaultProps: {},
});
