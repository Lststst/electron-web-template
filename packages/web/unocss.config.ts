import {
  defineConfig,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';
import presetRemToPx from '@unocss/preset-rem-to-px';
import { colors } from '@unocss/preset-mini';
// import useColors from './src/styles/unocss-colors';

export default defineConfig({
  shortcuts: [
    {
      'flex-col': 'flex flex-col',
      'flex-row': 'flex flex-row',
      'flex-jc': 'flex justify-center',
      'flex-jb': 'flex justify-between',
      'flex-je': 'flex justify-end',
      'flex-ac': 'flex items-center',
      'flex-ae': 'flex items-end',
      'flex-as': 'flex items-stretch',
      'flex-c': 'flex justify-center items-center',
      'wh-full': 'w-full h-full',
      'wh-screen': 'w-screen h-screen',
      'bg-base': 'bg-page',
    },
    [/^icon-(\d+)$/, ([, d]) => `w-${d} h-${d}`],
  ],
  rules: [
    [
      /^ellipsis-(\d)$/,
      ([, d]) => ({
        overflow: 'hidden',
        'text-overflow': 'ellipsis',
        display: '-webkit-box',
        '-webkit-line-clamp': `${d}`,
        '-webkit-box-orient': 'vertical',
      }),
    ],
  ],
  presets: [
    presetUno(),
    presetIcons({
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetRemToPx(),
  ],
  theme: {
    colors: {
      sysDefault: '#1B2443', 
      primary: '#409eff',
      primaryBgHover: '#3a8ee6',
      regular: colors?.gray[800],
      secondary: colors!.gray[500],
      placeholder: colors!.gray[400],
    },
  },

  transformers: [transformerDirectives(), transformerVariantGroup()],
});
