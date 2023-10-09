import { Animations } from './animations';
import { AnimationsType } from './animations/animations.types';
import { BorderRadiuses } from './border-radiuses';
import { BorderRadiusesType } from './border-radiuses/border-radius.types';
import { Spacings } from './spacings';
import { SpacingsType } from './spacings/spacings.types';
import { Colors } from './colors';
import { ColorsType } from './colors/colors.types';
import { ZIndexes } from './z-indexes';
import { ZIndexesType } from './z-indexes/z-indexes.types';

export type ThemeType = {
  animations: AnimationsType;
  spacings: SpacingsType;
  borderRadiuses: BorderRadiusesType;
  colors: ColorsType;
  zIndexes: ZIndexesType;
};

export const Theme: ThemeType = {
  animations: Animations,
  borderRadiuses: BorderRadiuses,
  spacings: Spacings,
  colors: Colors,
  zIndexes: ZIndexes,
};
