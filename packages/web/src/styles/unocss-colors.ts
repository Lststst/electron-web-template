import path from 'path';
import sass from 'sass';
import { colors } from '@unocss/preset-mini';

function MatchColor() {
  const a = path.resolve(__dirname, './theme-chalk/index.scss');
  const { css } = sass.compile(a);

  const regex = /--sc-\w+-\w+(-\w+)?: .+;/g;
  const colorCode = css.match(regex);
  if (!colorCode) return {};
  const results: any = {};
  colorCode.forEach((match) => {
    const parts = match.split(': ');
    results[parts[0]] = parts[1].slice(0, -1);
  });

  return results as Record<string, string>;
}

function handlerColor(data: Record<string, string>) {
  const colorMap = {
    red: 'error',
    blue: 'primary',
    yellow: 'warning',
    green: 'success',
    gray: 'info',
  } as const;
  const color = <Record<string, Record<string, any>>>{};
  const colorKey = Object.keys(colorMap) as (keyof typeof colorMap)[];

  colorKey.forEach((k) => {
    const v: string = colorMap[k];
    const setName = (n?: string | number) => `--sc-color-${v}${n ? `-${n}` : ''}`;
    const setColor = (n?: string | number) => {
      const name = setName(n);
      // return `rgb(var(${name}, ${hex2rgb(data[name])}))`;
      // return `var(${name}, ${data[name]})`;
      return `${data[name]}`;
    };
    color[k] = Object.keys(colors![k]).reduce((pre, cur) => {
      if (cur === 'DEFAULT') {
        pre[cur] = setColor('5');
      } else {
        if (+cur > 50) {
          pre[cur] = setColor(+cur / 100);
        } else if (+cur === 50) {
          pre[cur] = setColor('0');
        } else {
          pre[cur] = setColor(+cur);
        }
      }
      return pre;
    }, Object.create(null));
  });  
  return color;
}

function handlerBgColor(data: Record<string, string>) {
  const bgColorPrefix = '--sc-bg-color';
  const color = Object.keys(data)
    .filter((k) => k.startsWith(bgColorPrefix))
    .reduce((pre, cur) => {
      let name = cur.replace(bgColorPrefix, '').replace(/-/g, '');
      if (!name) name = 'DEFAULT';

      pre[name] = data[cur];
      return pre;
    }, Object.create(null));

  return { color, page: color.page };
}

const colorData = MatchColor();

const useColors = handlerColor(colorData);

const bgColor = handlerBgColor(colorData);

export default {
  ...useColors,
  ...bgColor,
};
