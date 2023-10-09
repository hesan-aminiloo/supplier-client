/* eslint-disable array-callback-return */
import { FormDropDown, Switch } from '@src/components';
import { useEffect } from 'react';
import { DropDownOption } from '@src/components/text-fields';
import { useToggle } from 'react-use';
import { UseFormReturn } from 'react-hook-form';
import { END_WORKING_TIME, START_WORKING_TIME } from '../../CompanyInfo.constants';
import { BranchFormValuesTypes, WorkingDaysEnums } from '../../CompanyInfo.types';

export const WorkingHours = ({
  methods,
  day,
  dayIndex,
}: {
  day: { value: WorkingDaysEnums; label: string };
  dayIndex: number;
  methods: UseFormReturn<BranchFormValuesTypes, any>;
}) => {
  const [selectedDay, setSelectedDay] = useToggle(false);
  const { getValues, setValue } = methods;
  const workingHours = getValues(`workingHours`);

  useEffect(() => {
    const startTime = workingHours?.length && workingHours[dayIndex] ? workingHours[dayIndex][day.value]?.start : '';
    const endTime = workingHours?.length && workingHours[dayIndex] ? workingHours[dayIndex][day.value]?.finish : '';
    if (startTime || endTime) {
      setSelectedDay(true);
    } else {
      setSelectedDay(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSelectedDay, workingHours]);

  const handleChangeSelectedDay = () => {
    if (selectedDay) {
      workingHours?.map((workinghour, index) => {
        if (index === dayIndex) {
          workingHours[dayIndex][day.value]!.start = '';
          workingHours[dayIndex][day.value]!.finish = '';
        }
      });
      setValue('workingHours', workingHours);
    }
    setSelectedDay(!selectedDay);
  };

  return (
    <div
      key={day.value}
      className="my-4 flex justify-between items-center"
    >
      <div className="flex gap-4 w-1/3">
        <Switch
          name={`workingHours.${day.value}`}
          checked={selectedDay}
          onClick={handleChangeSelectedDay}
        />
        <span>{day.label}</span>
      </div>
      <div className="flex-1 flex gap-2">
        <FormDropDown
          leftIcon={<span className="text-sm text-neutral-400">From</span>}
          placeholder="Closed"
          inputClassName="text-center"
          className="px-2"
          name={`workingHours[${dayIndex}].${day.value}.start`}
          options={
            START_WORKING_TIME?.map((item) => ({
              value: item,
              label: item,
            })) as DropDownOption[]
          }
          control={methods.control}
        />

        <FormDropDown
          options={
            END_WORKING_TIME?.map((item) => ({
              value: item,
              label: item,
            })) as DropDownOption[]
          }
          leftIcon={<span className="text-sm text-neutral-400">To</span>}
          placeholder="Closed"
          name={`workingHours[${dayIndex}].${day.value}.finish`}
          control={methods.control}
        />
      </div>
    </div>
  );
};
