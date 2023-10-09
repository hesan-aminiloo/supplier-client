/* eslint-disable react-hooks/exhaustive-deps */
import { Button, DatePickerInput, FileUploader, FormInput, Icon, Image, TextEditor } from '@src/components';
import { Content } from '@src/layouts/Content';
import { Theme } from '@src/style';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CAMPAIGNS_PAGE_PATH } from '@src/utils';
import { FormProvider } from 'react-hook-form';
import { useEditorStore } from '@src/components/text-editor/TextEditor.store';
import { useNavigate } from 'react-router-dom';

import { useCreateMarketingNotif } from './CreateNotif.tools';

export const CreateMarketingNotif = () => {
  const { t } = useTranslation();
  const [filePreview, setFilePreview] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const { methods, onSubmit, isLoading } = useCreateMarketingNotif({ setFilePreview });
  const marketingImage = methods.getValues('image') as string;
  const contentHtml = useEditorStore((s) => s.contentHtml);
  const { errors } = methods.formState;
  const navigate = useNavigate();
  useEffect(() => {
    if (contentHtml) {
      methods.setValue('description', contentHtml);
      methods.getFieldState('description');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentHtml]);

  useEffect(() => {
    if (selectedDate) {
      methods.setValue('date', selectedDate);
    }
  }, [selectedDate]);
  return (
    <Content
      pageTitle={t('marketing.marketing')}
      canGoBack
      rightContent={
        <Button
          onClick={() => navigate(CAMPAIGNS_PAGE_PATH)}
          variant="secondary"
          color="primary"
          className="relative flex items-center justify-center"
        >
          <Icon
            name="messages"
            color={Theme.colors.primary500}
          />
          <span className="px-2">{t('marketing.campaign_list')}</span>
        </Button>
      }
    >
      <div className="mt-4 bg-white w-full h-full rounded-2xl shadow-sm px-10 py-12">
        <div className="flex justify-between items-center">
          <div className="flex-grow">
            <h4 className="text-xl font-bold mb-2 text-neutral-900">{t('marketing.create_your_marketing_campaign')}</h4>
            <p className="text-sm font-semibold text-neutral-700">
              {t('marketing.marketing_messages_are_limited_to_one_per_day')}
            </p>
          </div>
          <div>
            <DatePickerInput
              setSelectedDate={setSelectedDate}
              control={methods.control}
              name="date"
            />
          </div>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            {filePreview || marketingImage ? (
              <>
                <div className="py-4">
                  <Image
                    size="xhg"
                    src={filePreview || marketingImage}
                  />
                </div>
              </>
            ) : (
              <FileUploader
                onSelectFile={(files: File[]) => {
                  const objectUrl = URL.createObjectURL(files[0]);
                  setFilePreview(objectUrl);
                  methods.setValue('image', files[0]);
                }}
                control={methods.control}
                name="image"
              />
            )}
            {/* TODO:: error message should be handled in the FileUploader components such as other form components */}
            {errors.image?.message ? (
              <p className="text-destructive-500 inline-block pb-2 text-xs">{errors.image?.message}</p>
            ) : null}
            <hr className="py-4" />
            <FormInput
              label={t('marketing.campaign_title')}
              control={methods.control}
              disabled={isLoading}
              id="campaign-title-input"
              name="title"
              placeholder={t('marketing.sample_title')}
            />
            <TextEditor
              className="mt-4"
              label={t('marketing.description')}
              status={methods.getFieldState('description').invalid ? 'error' : 'none'}
              error={(methods.getFieldState('description')?.error?.message as string) || ''}
            />
            <FormInput
              label={t('marketing.item_description')}
              control={methods.control}
              disabled={isLoading}
              id="campaign-title-input"
              name="item_description"
              className="mt-10"
            />
            <p className="text-sm font-semibold text-neutral-700 mt-2 mb-2">
              {t('marketing.the_message_will_contain_a_buy_now')}
            </p>
            <Button
              variant="solid"
              color="primary"
              size="md"
              className="mt-6"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? t('shared.loading') : t('marketing.send_with_schedule')}
            </Button>
          </form>
        </FormProvider>
      </div>
    </Content>
  );
};
