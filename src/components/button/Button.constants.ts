import { ButtonColors, ButtonSizeType, ButtonVariants } from './Button.types';

export const SOLID_BUTTON_COLORS: Record<ButtonColors, string> = {
  primary: `
    bg-primary-500
    text-white
    border-transparent
    disabled:bg-primary-200
    disabled:hover:bg-primary-200
    disabled:text-primary-50
    hover:bg-primary-600
    active:bg-primary-600
    active:text-primary-200
    active:fill-primary-200
  `,

  // todo setup neutral color for SOLID_BUTTON_COLORS
  neutral: `
  `,

  // todo setup indigo color for SOLID_BUTTON_COLORS
  indigo: `
  `,

  analogousIndigo: `
    bg-analogous-indigo-500
    text-white
    border-transparent
    disabled:bg-primary-200
    disabled:hover:bg-analogous-indigo-200
    disabled:text-analogous-indigo-50
    hover:bg-analogous-indigo-600
    active:bg-analogous-indigo-600
    active:text-analogous-indigo-200
    active:fill-analogous-indigo-200
  `,

  // todo setup teal color for SOLID_BUTTON_COLORS
  teal: `
  `,

  destructive: `
    bg-destructive-500
    hover:bg-destructive-600
    active:bg-destructive-600
    disabled:bg-destructive-200
    disabled:hover:bg-destructive-200
    disabled:text-destructive-50
    border-transparent
    text-white
    active:text-destructive-200
    active:fill-destructive-200
  `,

  warning: `
    bg-warning-500
    hover:bg-warning-600
    active:bg-warning-600
    disabled:bg-warning-200
    disabled:hover:bg-warning-200
    disabled:text-warning-50
    border-transparent
    text-white
    active:text-warning-200
    active:fill-warning-200
  `,

  success: `
    bg-success-500
    hover:bg-success-600
    active:bg-success-600
    disabled:bg-success-200
    disabled:hover:bg-success-200
    disabled:text-success-50
    border-transparent
    text-white
    active:text-success-200
    active:fill-success-200
  `,
};

export const SECONDARY_BUTTON_COLORS: Record<ButtonColors, string> = {
  primary: `
    bg-primary-50
    border-transparent
    text-primary-500
    hover:bg-primary-100
    active:bg-primary-100
    disabled:bg-primary-50
    hover:text-primary-600
    active:text-primary-500
    disabled:fill-primary-200
    disabled:text-primary-200
    disabled:hover:bg-primary-50
    disabled:hover:fill-primary-200
  `,

  analogousIndigo: `
    bg-analogous-indigo-50
    border-transparent
    text-analogous-indigo-500
    hover:bg-analogous-indigo-100
    active:bg-analogous-indigo-100
    disabled:bg-analogous-indigo-50
    hover:text-analogous-indigo-600
    active:text-analogous-indigo-500
    disabled:fill-analogous-indigo-200
    disabled:text-analogous-indigo-200
    disabled:hover:bg-analogous-indigo-50
    disabled:hover:fill-analogous-indigo-200
  `,

  neutral: `
    bg-neutral-50
    border-transparent
    text-neutral-500
    hover:bg-neutral-100
    active:bg-neutral-100
    disabled:bg-neutral-50
    hover:text-neutral-600
    active:text-neutral-500
    disabled:fill-neutral-200
    disabled:text-neutral-200
    disabled:hover:bg-neutral-50
    disabled:hover:fill-neutral-200
  `,

  indigo: `
    bg-analogous-indigo-50
    border-transparent
    text-analogous-indigo-500
    hover:bg-analogous-indigo-100
    active:bg-analogous-indigo-100
    disabled:bg-analogous-indigo-50
    hover:text-analogous-indigo-600
    active:text-analogous-indigo-500
    disabled:fill-analogous-indigo-200
    disabled:text-analogous-indigo-200
    disabled:hover:bg-analogous-indigo-50
    disabled:hover:fill-analogous-indigo-200
  `,

  teal: `
    bg-analogous-teal-50
    border-transparent
    text-analogous-teal-300
    hover:bg-analogous-teal-100
    active:bg-analogous-teal-100
    disabled:bg-analogous-teal-50
    hover:text-analogous-teal-600
    active:text-analogous-teal-500
    disabled:fill-analogous-teal-200
    disabled:text-analogous-teal-200
    disabled:hover:bg-analogous-teal-50
    disabled:hover:fill-analogous-teal-200
  `,

  destructive: `
    bg-destructive-50
    border-transparent
    text-destructive-500
    hover:bg-destructive-100
    active:bg-destructive-100
    disabled:bg-destructive-50
    hover:text-destructive-600
    active:text-destructive-500
    disabled:fill-destructive-200
    disabled:text-destructive-200
    disabled:hover:bg-destructive-50
    disabled:hover:fill-destructive-200
  `,

  warning: `
    bg-warning-50
    border-transparent
    text-warning-500
    hover:bg-warning-100
    active:bg-warning-100
    disabled:bg-warning-50
    hover:text-warning-600
    active:text-warning-500
    disabled:fill-warning-200
    disabled:text-warning-200
    disabled:hover:bg-warning-50
    disabled:hover:fill-warning-200
  `,

  success: `
    bg-success-50
    border-transparent
    text-success-500
    hover:bg-success-100
    active:bg-success-100
    disabled:bg-success-50
    hover:text-success-600
    active:text-success-500
    disabled:fill-success-200
    disabled:text-success-200
    disabled:hover:bg-success-50
    disabled:hover:fill-success-200
  `,
};

export const TERTIARY_BUTTON_COLORS: Record<ButtonColors, string> = {
  primary: `
    bg-white
    hover:bg-neutral-50
    active:bg-neutral-50
    active:border-neutral-300
    active:text-neutral-500
    disabled:bg-white
    disabled:hover:bg-white
    disabled:hover:bg-white
    disabled:text-neutral-300
    disabled:hover:bg-neutral-50
    border-neutral-200
    text-neutral-700
    hover:border-neutral-300
    disabled:hover:border-neutral-200
    disabled:hover:border-neutral-300
  `,

  // todo setup neutral color for TERTIARY_BUTTON_COLORS
  neutral: `
  `,

  // todo setup indigo color for TERTIARY_BUTTON_COLORS
  indigo: `
  `,

  // todo setup indigo color for TERTIARY_BUTTON_COLORS
  analogousIndigo: `
    bg-white
    hover:bg-analogous-indigo-50
    active:bg-analogous-indigo-50
    active:border-analogous-indigo-300
    active:text-analogous-indigo-500
    disabled:bg-white
    disabled:hover:bg-analogous-indigo
    disabled:hover:bg-analogous-indigo
    disabled:text-analogous-indigo-300
    disabled:hover:bg-analogous-indigo-50
    border-analogous-indigo-200
    text-analogous-indigo-700
    hover:border-analogous-indigo-300
    disabled:hover:analogous-indigo-neutral-200
    disabled:hover:analogous-indigo-neutral-300
  `,

  // todo setup teal color for TERTIARY_BUTTON_COLORS
  teal: `
  `,

  destructive: `
    bg-white
    hover:bg-destructive-50
    active:bg-destructive-50
    active:border-destructive-300
    active:text-destructive-500
    disabled:bg-white
    disabled:hover:bg-white
    disabled:hover:bg-white
    disabled:text-destructive-300
    disabled:hover:bg-destructive-50
    border-destructive-200
    text-destructive-700
    hover:border-destructive-300
    disabled:hover:border-destructive-200
    disabled:hover:border-destructive-300
  `,

  warning: `
    bg-white
    hover:bg-warning-50
    active:bg-warning-50
    active:border-warning-300
    active:text-warning-500
    disabled:bg-white
    disabled:hover:bg-white
    disabled:hover:bg-white
    disabled:text-warning-300
    disabled:hover:bg-warning-50
    border-warning-200
    text-warning-700
    hover:border-warning-300
    disabled:hover:border-warning-200
    disabled:hover:border-warning-300
  `,

  success: `
    bg-white
    hover:bg-success-50
    active:bg-success-50
    active:border-success-300
    active:text-success-500
    disabled:bg-white
    disabled:hover:bg-white
    disabled:hover:bg-white
    disabled:text-success-300
    disabled:hover:bg-success-50
    border-success-200
    text-success-700
    hover:border-success-300
    disabled:hover:border-success-200
    disabled:hover:border-success-300
  `,
};

export const OUTLINE_BUTTON_COLORS: Record<ButtonColors, string> = {
  primary: `
    bg-white
    active:border-primary-400
    active:text-primary-400
    disabled:hover:bg-white
    disabled:text-primary-200
    disabled:border-primary-200
    border-primary-500
    text-primary-500
    hover:border-primary-400
    disabled:hover:border-primary-200
  `,

  // todo setup neutral color for OUTLINE_BUTTON_COLORS
  neutral: `
  `,

  // todo setup indigo color for OUTLINE_BUTTON_COLORS
  indigo: `
  `,

  analogousIndigo: `
    bg-white
    active:border-analogous-indigo-400
    active:text-analogous-indigo-400
    disabled:hover:bg-white
    disabled:text-analogous-indigo-200
    disabled:border-analogous-indigo-200
    border-analogous-indigo-500
    text-analogous-indigo-500
    hover:border-analogous-indigo-400
    disabled:hover:border-analogous-indigo-200
  `,

  // todo setup teal color for OUTLINE_BUTTON_COLORS
  teal: `
  `,

  destructive: `
    bg-white
    active:border-destructive-400
    active:text-destructive-400
    disabled:hover:bg-white
    disabled:text-destructive-200
    disabled:border-destructive-200
    border-destructive-500
    text-destructive-500
    hover:border-destructive-400
    disabled:hover:border-destructive-200
  `,

  warning: `
    bg-white
    active:border-warning-400
    active:text-warning-400
    disabled:hover:bg-white
    disabled:text-warning-200
    disabled:border-warning-200
    border-warning-500
    text-warning-500
    hover:border-warning-400
    disabled:hover:border-warning-200
  `,

  success: `
    bg-white
    active:border-success-400
    active:text-success-400
    disabled:hover:bg-white
    disabled:text-success-200
    disabled:border-success-200
    border-success-500
    text-success-500
    hover:border-success-400
    disabled:hover:border-success-200
  `,
};

export const TEXT_BUTTON_COLORS: Record<ButtonColors, string> = {
  primary: `
    px-0
    border-none
    text-primary-500
    hover:text-primary-600
    active:text-primary-400
    disabled:text-primary-200
    disabled:hover:text-primary-200
    fill-primary-500
    hover:fill-primary-600
    active:fill-primary-400
    disabled:hover:fill-primary-200
  `,

  // todo setup neutral color for TEXT_BUTTON_COLORS
  neutral: `
  `,

  // todo setup indigo color for TEXT_BUTTON_COLORS
  indigo: `
  `,

  analogousIndigo: `
    px-0
    border-none
    text-analogous-indigo-500
    hover:text-analogous-indigo-600
    active:text-analogous-indigo-400
    disabled:text-analogous-indigo-200
    disabled:hover:text-analogous-indigo-200
    fill-analogous-indigo-500
    hover:fill-analogous-indigo-600
    active:fill-analogous-indigo-400
    disabled:hover:fill-analogous-indigo-200
  `,

  // todo setup teal color for TEXT_BUTTON_COLORS
  teal: `
  `,

  destructive: `
    px-0
    border-none
    text-destructive-500
    hover:text-destructive-600
    active:text-destructive-400
    disabled:text-destructive-200
    disabled:hover:text-destructive-200
    fill-destructive-500
    hover:fill-destructive-600
    active:fill-destructive-400
    disabled:hover:fill-destructive-200
  `,

  warning: `
    px-0
    border-none
    text-warning-500
    hover:text-warning-600
    active:text-warning-400
    disabled:text-warning-200
    disabled:hover:text-warning-200
    fill-warning-500
    hover:fill-warning-600
    active:fill-warning-400
    disabled:hover:fill-warning-200
  `,

  success: `
    px-0
    border-none
    text-success-500
    hover:text-success-600
    active:text-success-400
    disabled:text-success-200
    disabled:hover:text-success-200
    fill-success-500
    hover:fill-success-600
    active:fill-success-400
    disabled:hover:fill-success-200
  `,
};

export const BUTTON_SIZES: Record<ButtonSizeType, string> = {
  sm: 'p-2 text-xs',

  md: 'p-3 text-sm',

  lg: 'p-4 text-base',
};

export const BUTTON_COLORS: Record<ButtonVariants, Record<ButtonColors, string>> = {
  solid: SOLID_BUTTON_COLORS,
  secondary: SECONDARY_BUTTON_COLORS,
  outline: OUTLINE_BUTTON_COLORS,
  tertiary: TERTIARY_BUTTON_COLORS,
  text: TEXT_BUTTON_COLORS,
};
