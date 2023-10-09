import * as React from 'react';

// utils
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

// components
import { Button, FormInput, Icon } from '@src/components';

// local components
import {
  CREATE_RESPONSE_FORM_ELEMENTS,
  CreateResponseFormProps,
  getRequestTotalAmount,
  NewPartForm,
  PartInputs,
  partsAreStocked,
  pushResponseOriginalFields,
  useCreateResponseForm,
} from '@src/pages/Request/RequestDetails';

// styles
import colors from 'tailwindcss/colors';

// types
import RenderWhen from '@components/RenderWhen';
import { arraysAreEqual, formatMoney } from '@src/utils';

export const CreateResponseForm: React.FunctionComponent<CreateResponseFormProps> = ({
  initialValues,
  closeModal,
  requestType,
  onCancelRequest,
  isCancelingRequest,
}) => {
  const { methods, onSubmit, isLoading } = useCreateResponseForm(initialValues, closeModal, requestType);
  const { t } = useTranslation();
  const watchExtra = methods.watch('extra');
  const watchResponses = methods.watch('responses');

  const responseArraysAreEqual = arraysAreEqual(
    watchResponses.map((response) => pushResponseOriginalFields(response)),
    initialValues.responses?.map((originalResponse, index) =>
      pushResponseOriginalFields({
        ...originalResponse,
        inStock: true,
        quantity: originalResponse.quantity === 0 ? watchResponses?.[index]?.quantity : originalResponse.quantity,
      })
    )
  );

  let sendRequestConfirmationDisabled =
    isLoading || (watchExtra.length === 0 ? !partsAreStocked(watchResponses) : !partsAreStocked(watchExtra));
  if (requestType === 'order') {
    sendRequestConfirmationDisabled =
      isLoading || (watchExtra.length === 0 && responseArraysAreEqual) || !partsAreStocked(watchResponses);
  }
  const confirmRequestDisabled = isLoading || watchExtra.length > 0 || !responseArraysAreEqual;
  return (
    <FormProvider {...methods}>
      <form className="gap-y-3 col-span-9">
        <div className="w-full">
          <h3 className="text-xl font-bold mb-6 text-neutral-800 flex justify-between items-center">
            {t('request_details.create_response.response_header')}
          </h3>
        </div>
        <div className="pb-8 border-b-2 border-stroke-4 w-full grid grid-cols-4 gap-x-8 gap-y-6">
          {CREATE_RESPONSE_FORM_ELEMENTS.map((element) => {
            return (
              <element.component
                key={element.name}
                control={methods.control}
                name={`headers.${element.name}`}
                label={t(element.label)}
                placeholder={t(element.placeholder)}
                type={element.type}
                className={element.className}
                options={element.options ?? []}
              />
            );
          })}
        </div>
        <PartInputs methods={methods} />
        <NewPartForm methods={methods} />
        <div className="flex justify-between items-center gap-y-6 pt-8">
          <div className="flex flex-1 gap-2  items-end">
            <FormInput
              control={methods.control}
              label={t('request_details.create_response.total')}
              placeholder={t('request_details.create_response.total')}
              name="headers.total"
              type="text"
              className="basis-48"
              value={formatMoney(getRequestTotalAmount([...watchResponses, ...watchExtra]))}
              readOnly
            />
            <span className="font-bold pb-3">{t('request_details.excl_VAT')}</span>
          </div>

          <div className="flex gap-8">
            <RenderWhen is={sendRequestConfirmationDisabled && confirmRequestDisabled && !isLoading}>
              <Button
                variant="tertiary"
                color="destructive"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  onCancelRequest();
                }}
                loading={isCancelingRequest}
              >
                {t('request_details.cancel_request')}
              </Button>
            </RenderWhen>
            <RenderWhen is={requestType === 'order'}>
              <Button
                size="md"
                color="success"
                className="flex gap-x-6 px-6"
                rightIcon={
                  <Icon
                    name="arrow-right"
                    size="sm"
                    color={colors.white}
                  />
                }
                onClick={methods.handleSubmit(onSubmit('confirmed'))}
                disabled={confirmRequestDisabled}
                loading={isLoading && !(watchExtra.length > 0 || !responseArraysAreEqual)}
              >
                {t('request_details.create_response.confirm')}
              </Button>
            </RenderWhen>
            <Button
              size="md"
              color="primary"
              className="flex gap-x-6 px-6"
              rightIcon={
                <Icon
                  name="arrow-right"
                  size="sm"
                  color={colors.white}
                />
              }
              onClick={methods.handleSubmit(onSubmit('request_confirmation'))}
              disabled={sendRequestConfirmationDisabled}
              loading={isLoading}
            >
              {t('request_details.create_response.request_confirmation')}
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default CreateResponseForm;
