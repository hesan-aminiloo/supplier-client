import { resources } from '@src/app/localization/i18n';
import { Normalize } from 'react-i18next';

export type ResourceType = (typeof resources)['de'];
export type TString = Normalize<(typeof resources)['de']['translation']>;

declare module 'react-i18next' {
  interface CustomTypeOptions {
    resources: ResourceType;
  }
}
