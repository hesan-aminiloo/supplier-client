import { FC } from 'react';
import { TimeSlider } from './components/TimeSlider';
import { ActionTypeEnum } from './components/TimeSlider.types';
import { ITimePickerProps } from './TimePicker.types';

const TimePicker: FC<ITimePickerProps> = ({ time, setTime }) => {
  const changeHour = (type: ActionTypeEnum) => {
    if (type === ActionTypeEnum.UP && time.hour !== 23) {
      const typeTime = time.hour + 1 < 12 ? 'AM' : 'PM';
      setTime({ ...time, hour: time.hour + 1, type: typeTime });
    }
    if (type === ActionTypeEnum.DOWN && time.hour !== 0) {
      const typeTime = time.hour - 1 < 12 ? 'AM' : 'PM';
      setTime({ ...time, hour: time.hour - 1, type: typeTime });
    }
  };

  const ChangeMin = (type: ActionTypeEnum) => {
    if (type === ActionTypeEnum.UP && time.min !== 55) {
      setTime({ ...time, min: time.min + 5 });
    }
    if (type === ActionTypeEnum.DOWN && time.min !== 0) {
      setTime({ ...time, min: time.min - 5 });
    }
  };

  const ChangeTypeTime = (type: ActionTypeEnum) => {
    if (type === ActionTypeEnum.UP) {
      const hour = time.hour > 11 ? time.hour - 12 : time.hour;
      setTime({ ...time, type: 'AM', hour });
    } else {
      const hour = time.hour < 12 ? time.hour + 12 : time.hour;
      setTime({ ...time, type: 'PM', hour });
    }
  };
  return (
    <div className="flex gap-4 items-center py-4 px-8 border bg-neutral-100 border-neutral-200 mb-4  rounded-lg">
      <TimeSlider
        value={time.hour}
        changeValue={changeHour}
      />
      <span>:</span>
      <TimeSlider
        value={time.min}
        changeValue={ChangeMin}
      />
      <TimeSlider
        value={time.type}
        className="flex-1 items-end"
        changeValue={ChangeTypeTime}
      />
    </div>
  );
};
export default TimePicker;
