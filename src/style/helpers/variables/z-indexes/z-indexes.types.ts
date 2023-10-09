type zIndexes =
  | 'zIndex0'
  | 'zIndex1'
  | 'zIndex2'
  | 'zIndex3'
  | 'zIndex4'
  | 'zIndex5'
  | 'zIndex6'
  | 'zIndex7'
  | 'zIndex8'
  | 'zIndex9'
  | 'zIndex10'
  | 'zIndex20'
  | 'zIndex30'
  | 'zIndex40'
  | 'zIndex99'
  | 'zIndexMax';

export type ZIndexesType = {
  [key in zIndexes]: string;
};
