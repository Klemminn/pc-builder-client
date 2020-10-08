import Colors from './Colors';

export type ThemeTypes = 'orange' | 'default' | 'secondary';

type ColorType = {
  background: string;
  font: string;
};

type ColorTypes = {
  [key in ThemeTypes]: ColorType;
};

export const ColorThemes: ColorTypes = {
  orange: {
    background: Colors.Orange,
    font: Colors.White,
  },
  default: {
    background: Colors.Orange,
    font: Colors.White,
  },
  secondary: {
    background: Colors.Orange,
    font: Colors.White,
  },
};
