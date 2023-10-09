type animations = 'animationFast' | 'animationMedium' | 'animationSlow' | 'animationExtraSlow';

export type AnimationsType = {
  [key in animations]: string;
};
