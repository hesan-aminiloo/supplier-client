// TODO: Add storybook for this component
import clsx from 'clsx';
import { ForwardedRef, ReactElement, forwardRef, useMemo, useState } from 'react';
import DatePicker, { CalendarContainerProps, ReactDatePickerCustomHeaderProps } from 'react-datepicker';
import { Theme } from '@src/style';
import { useTranslation } from 'react-i18next';
import { FieldValues, useController, useFormContext, useWatch } from 'react-hook-form';
import { IDatePickerProps } from './DatePicker.types';
import styles from './DatePicker.module.scss';
import 'react-datepicker/dist/react-datepicker.css';
import { Icon } from '../icon';
import TimePicker from '../time-picker/TimePicker';
import { Button } from '../button';
import { InputProps } from '../text-fields';

function ForwardedDatePickerInput<TFieldValues extends FieldValues = FieldValues>(
  {
    className,
    setSelectedDate,
    error: hasError,
    defaultValue = '',
    required = false,
    name,
    control,
  }: IDatePickerProps<TFieldValues>,
  ref: ForwardedRef<HTMLDivElement>
) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [time, setTime] = useState({ hour: 12, min: 30, type: 'PM' });
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const context = useFormContext();
  const {
    field,
    fieldState: { error, isTouched },
  } = useController({
    name,
    control: context?.control || control,
    rules: { required },
    defaultValue,
  });

  const dateValue = useWatch({ control: context?.control || control, name });

  const inputState = useMemo<InputProps['status']>(() => {
    if (hasError || error?.message) return 'error';

    return isTouched && dateValue ? 'valid' : 'none';
  }, [dateValue, error, hasError, isTouched]);

  const onSelectDate = () => {
    if (startDate) {
      const year = startDate.getFullYear();
      const month = (startDate.getMonth() + 1).toString().padStart(2, '0');
      const day = startDate.getDate().toString().padStart(2, '0');
      const hour = time.hour < 10 ? `0${time.hour}` : time.hour;
      const min = time.min < 10 ? `0${time.min}` : time.min;
      const dateFinalValue = `${year}-${month}-${day} ${hour}:${min}:00`;
      field.onChange(dateFinalValue);
      setSelectedDate(dateFinalValue);
      setIsOpen(false);
    }
  };

  const renderDayContents = (day: number) => {
    return <span className="rounded-md text-base font-normal w-16 h-16">{day}</span>;
  };

  const RenderInput = ({ value, onClick }: any) => (
    <>
      <div
        className={clsx(
          'w-80 transition-colors rounded-xl bg-white flex items-center border border-neutral-200 shadow-xs p-3 relative h-11',
          {
            'border !border-destructive-400': error,
          }
        )}
      >
        <button
          className="flex w-full cursor-pointer items-center"
          onClick={() => {
            onClick();
            setIsOpen(!isOpen);
          }}
        >
          <div className="w-5 h-5 mr-3 z-0">
            <Icon
              name="calendar-1"
              color={Theme.colors.primary600}
              size="sm"
            />
          </div>
          <span className="block">
            {value} {time.hour}:{time.min}
            {time.type}
          </span>
          <div className="ml-3 absolute right-0 px-3 cursor-pointer">
            <Icon
              name="arrow-down-1"
              color={Theme.colors.neutral900}
              size="sm"
            />
          </div>
        </button>
      </div>
      {inputState === 'error' && (
        <span className="text-destructive-500 inline-block pt-2 text-xs">{error?.message as string}</span>
      )}
    </>
  );

  const CalendarContainer = (props: CalendarContainerProps) => {
    return (
      <div className={clsx('bg-white border-none  rounded-xl p-6 pt-0')}>
        <p className="block border-b pb-4 font-semibold text-base text-neutral-900 border-neutral-200 mb-4">
          {t('datepicker.set_date_and_time')}
        </p>
        <TimePicker
          time={time}
          setTime={setTime}
        />
        {props?.children}
        <div className="w-full pt-80">
          <Button
            className="w-1/2"
            type="button"
            variant="solid"
            color="neutral"
            onClick={() => setIsOpen(false)}
          >
            {t('datepicker.cancel')}
          </Button>
          <Button
            className="w-2/5 ml-4"
            type="button"
            variant="solid"
            color="primary"
            onClick={onSelectDate}
          >
            {t('datepicker.set')}
          </Button>
        </div>
      </div>
    );
  };

  const renderCustomHeader = (props: ReactDatePickerCustomHeaderProps) => {
    return (
      <div className={clsx('flex justify-between m-4 w-60')}>
        <button
          onClick={props.decreaseMonth}
          disabled={props.prevMonthButtonDisabled}
        >
          <Icon
            name="arrow-left"
            size="sm"
            color={Theme.colors.neutral500}
          />
        </button>
        {props.date.getFullYear()} {props.date.toLocaleString('default', { month: 'long' })}
        <button
          onClick={props.increaseMonth}
          disabled={props.nextMonthButtonDisabled}
        >
          <Icon
            name="arrow-right"
            size="sm"
            color={Theme.colors.neutral500}
          />
        </button>
      </div>
    );
  };

  return (
    <div
      className={clsx(styles['date-picker'], className)}
      ref={ref}
    >
      <DatePicker
        renderCustomHeader={renderCustomHeader}
        selected={startDate}
        open={isOpen}
        className={styles['date-picker']}
        onChange={(date) => setStartDate(date!)}
        calendarClassName={styles['date-picker']}
        popperClassName={clsx(styles['react-datepicker-popper'], 'shadow-sm rounded-xl mt-2')}
        renderDayContents={renderDayContents}
        customInput={<RenderInput />}
        calendarStartDay={6}
        calendarContainer={CalendarContainer}
        shouldCloseOnSelect={false}
        minDate={new Date()}
      />
    </div>
  );
}

export const DatePickerInput = forwardRef(ForwardedDatePickerInput) as <TFieldValues extends FieldValues = FieldValues>(
  // eslint-disable-next-line no-use-before-define
  props: IDatePickerProps<TFieldValues> & { ref?: ForwardedRef<HTMLInputElement> }
) => ReactElement;
