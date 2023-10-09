import { BadgeColors, BadgeSizeType, BadgeVariants } from './Badge.types';

export const TERTIARY_BADGE_COLORS: Record<BadgeColors, string> = {
  primary: `
    bg-primary-100
    hover:bg-primary-50
    active:bg-primary-50
    active:border-primary-300
    active:text-primary-500
    disabled:bg-white
    disabled:hover:bg-white
    disabled:hover:bg-white
    disabled:text-primary-300
    disabled:hover:bg-primary-50
    border-primary-200
    text-primary-700
    hover:border-primary-300
    disabled:hover:border-primary-200
    disabled:hover:border-primary-300
  `,
  neutral: `
    bg-neutral-100
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

  destructive: `
    bg-destructive-100
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
    bg-warning-100
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
    bg-success-100
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

  analogousIndigo: `
    bg-analogous-indigo-100
    hover:bg-analogous-indigo-50
    active:bg-analogous-indigo-50
    active:border-analogous-indigo-300
    active:text-analogous-indigo-500
    disabled:bg-white
    disabled:hover:bg-white
    disabled:hover:bg-white
    disabled:text-analogous-indigo-300
    disabled:hover:bg-analogous-indigo-50
    border-analogous-indigo-200
    text-analogous-indigo-700
    hover:border-analogous-indigo-300
    disabled:hover:border-analogous-indigo-200
    disabled:hover:border-analogous-indigo-300
  `,

  analogousTeal: `
    bg-analogous-teal-100
    hover:bg-analogous-teal-50
    active:bg-analogous-teal-50
    active:border-analogous-teal-300
    active:text-analogous-teal-500
    disabled:bg-white
    disabled:hover:bg-white
    disabled:hover:bg-white
    disabled:text-analogous-teal-300
    disabled:hover:bg-analogous-teal-50
    border-analogous-teal-200
    text-analogous-teal-700
    hover:border-analogous-teal-300
    disabled:hover:border-analogous-teal-200
    disabled:hover:border-analogous-teal-300
  `,
};
export const SECONDARY_BADGE_COLORS: Record<BadgeColors, string> = {
  primary: `
    bg-primary-50
    hover:bg-primary-100
    active:bg-primary-100
    active:border-primary-300
    active:text-primary-500
    disabled:bg-white
    disabled:hover:bg-white
    disabled:hover:bg-white
    disabled:text-primary-300
    disabled:hover:bg-primary-50
    border-primary-200
    text-primary-700
    hover:border-primary-300
    disabled:hover:border-primary-200
    disabled:hover:border-primary-300
  `,
  neutral: `
    bg-neutral-50
    hover:bg-neutral-100
    active:bg-neutral-100
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

  destructive: `
    bg-destructive-50
    hover:bg-destructive-100
    active:bg-destructive-100
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
    bg-warning-50
    hover:bg-warning-100
    active:bg-warning-100
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
    bg-success-50
    hover:bg-success-100
    active:bg-success-100
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

  analogousIndigo: `
    bg-analogous-indigo-50
    hover:bg-analogous-indigo-100
    active:bg-analogous-indigo-100
    active:border-analogous-indigo-300
    active:text-analogous-indigo-500
    disabled:bg-white
    disabled:hover:bg-white
    disabled:hover:bg-white
    disabled:text-analogous-indigo-300
    disabled:hover:bg-analogous-indigo-50
    border-analogous-indigo-200
    text-analogous-indigo-700
    hover:border-analogous-indigo-300
    disabled:hover:border-analogous-indigo-200
    disabled:hover:border-analogous-indigo-300
  `,

  analogousTeal: `
    bg-analogous-teal-50
    hover:bg-analogous-teal-100
    active:bg-analogous-teal-100
    active:border-analogous-teal-300
    active:text-analogous-teal-500
    disabled:bg-white
    disabled:hover:bg-white
    disabled:hover:bg-white
    disabled:text-analogous-teal-300
    disabled:hover:bg-analogous-teal-50
    border-analogous-teal-200
    text-analogous-teal-700
    hover:border-analogous-teal-300
    disabled:hover:border-analogous-teal-200
    disabled:hover:border-analogous-teal-300
  `,
};

export const BADGE_SIZES: Record<BadgeSizeType, string> = {
  sm: 'p-2 text-xs',

  md: 'p-3 text-sm',

  lg: 'p-4 text-base',
};

export const BADGE_COLORS: Record<BadgeVariants, Record<BadgeColors, string>> = {
  tertiary: TERTIARY_BADGE_COLORS,
  secondary: SECONDARY_BADGE_COLORS,
};
