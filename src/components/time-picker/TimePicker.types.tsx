interface ITime {
  hour: number;
  min: number;
  type: string;
}
export interface ITimePickerProps {
  time: ITime;
  setTime: (time: ITime) => void;
}
