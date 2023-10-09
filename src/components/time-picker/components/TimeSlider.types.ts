export enum ActionTypeEnum {
  UP = 'up',
  DOWN = 'down',
}
export interface ITimeSliderProps {
  value: number | string;
  className?: string;
  changeValue: (type: ActionTypeEnum) => void;
}
