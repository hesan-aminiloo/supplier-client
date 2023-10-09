export interface IStepperItemProps {
  title: string;
  id: string;
  isActive?: boolean;
  step?: number;
  disabled?: boolean;
  onClick?: (step: string) => void;
}

export interface IStepperProps {
  steps: Array<IStepperItemProps>;
  disabledIndex?: number | number[] | null;
  onChange: (step: IStepperItemProps['id']) => void;
  className?: string;
  activeStep?: IStepperItemProps['id'];
}
