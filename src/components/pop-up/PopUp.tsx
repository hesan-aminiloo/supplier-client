import React, { SyntheticEvent } from 'react';
import { Theme } from '@src/style';
import { Button, IButtonProps } from '@src/components';
import clsx from 'clsx';
import { Icon } from '../icon';
import styles from './PopUp.module.scss';
import RenderWhen from '../RenderWhen';

export interface PopUpProps {
  title?: string;
  description?: string;
  isOpen?: boolean;
  onClose?: () => void;
  height?: string;
  submit?: (e: SyntheticEvent) => void;
  submitText?: string;
  cancelText?: string;
  secondarySubmitText?: string;
  submitProps?: IButtonProps;
  cancelProps?: IButtonProps;
  isLoading?: boolean;
  secondarySubmit?: () => void;
  secondaryLoading?: boolean;
}

const PopUp: React.FC<PopUpProps> = ({
  title,
  isLoading,
  submitProps,
  cancelProps,
  submitText,
  cancelText,
  description,
  isOpen,
  onClose,
  submit,
  height = 'min-h-screen',
  secondarySubmit,
  secondarySubmitText,
  secondaryLoading,
}) => {
  return (
    <>
      {isOpen ? (
        <div
          id="popup-modal"
          className={clsx('fixed top-0 left-0 right-0 flex w-100 justify-center items-center', height, styles.popup)}
          style={{ backgroundColor: '#00000030' }}
        >
          <div className="p-4">
            <div className="relative bg-white rounded-xl shadow min-w-[444px]">
              <div className="flex justify-center">
                <button
                  type="button"
                  className="absolute top-3 right-2.5  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                  onClick={onClose}
                >
                  <Icon
                    name="close"
                    color={Theme.colors.neutral500}
                  />
                </button>
                <div className="shadow rounded-lg mt-6 p-3">
                  <Icon
                    name="message-question"
                    color={Theme.colors.destructive500}
                  />
                </div>
              </div>

              <div className="p-6 text-center">
                <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
                {description ? <h5 className="mt-2 text-sm px-2 text-neutral-500">{description}</h5> : null}

                <div className="w-100 flex gap-3 mt-8">
                  <Button
                    type="button"
                    variant="solid"
                    color="neutral"
                    className="flex-1 min-w-[156px]"
                    {...cancelProps}
                    onClick={onClose}
                    disabled={isLoading || secondaryLoading}
                  >
                    {cancelText ?? 'Back'}
                  </Button>
                  <RenderWhen is={secondarySubmitText}>
                    <Button
                      type="button"
                      className="whitespace-nowrap min-w-[180px]"
                      variant="solid"
                      color="neutral"
                      onClick={secondarySubmit}
                      loading={secondaryLoading}
                      disabled={isLoading}
                    >
                      {secondarySubmitText}
                    </Button>
                  </RenderWhen>
                  <Button
                    type="button"
                    className="flex-1 min-w-[156px] whitespace-nowrap"
                    variant="solid"
                    color="destructive"
                    {...submitProps}
                    onClick={(e) => {
                      e.preventDefault();
                      submit?.(e);
                    }}
                    loading={isLoading}
                    disabled={secondaryLoading}
                  >
                    {submitText ?? 'Continue'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default PopUp;
