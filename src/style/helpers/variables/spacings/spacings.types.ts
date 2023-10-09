type spacings =
  | 'spacing4'
  | 'spacing8'
  | 'spacing12'
  | 'spacing16'
  | 'spacing24'
  | 'spacing32'
  | 'spacing40'
  | 'spacing48'
  | 'spacing56'
  | 'spacing64';

export type SpacingsType = {
  [key in spacings]: string;
};
