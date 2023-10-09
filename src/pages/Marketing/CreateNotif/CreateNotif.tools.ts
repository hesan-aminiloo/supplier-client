import { yupResolver } from '@hookform/resolvers/yup';
import { successToast } from '@src/utils';
import { setErrorsInForm } from '@src/utils/error-handling';
import axios from 'axios';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import i18next from 'i18next';
import { mixed, object, string } from 'yup';
import { EDITOR_DEFAULT_VALUE, FormProps, useEditorStore } from '@src/components';

import { getCreateNotifDefaultValues } from './CreateNotif.constants';
import { CreateNotifData } from './CreateNotif.types';

export const createNotifSchema = object({
  image: mixed().required(i18next.t('shared.validation.is_required', { name: 'Image' })),
  title: string().required(i18next.t('shared.validation.is_required', { name: 'Title' })),
  description: string().required(i18next.t('shared.validation.is_required', { name: 'Description' })),
  item_description: string(),
  date: string()
    .nullable()
    .required(i18next.t('shared.validation.is_required', { name: 'Schedule date' })),
});

interface SystemUsersFormProps {
  setFilePreview: Dispatch<SetStateAction<string>>;
}

export const useCreateMarketingNotif = ({ setFilePreview }: SystemUsersFormProps) => {
  const setEditorContent = useEditorStore((s) => s.setContentHtml);
  const location = useLocation();
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const methods = useForm({
    resolver: yupResolver(createNotifSchema),
    mode: 'onChange',
    defaultValues: getCreateNotifDefaultValues(location.state?.campaign),
  });

  const onSubmit: FormProps<CreateNotifData>['onSubmit'] = async (fields) => {
    const formData = new FormData();
    formData.append('description', fields.description);
    formData.append('title', fields.title);
    formData.append('schedule', fields.date ? fields.date?.toString() : '');

    if (fields.item_description) formData.append('item_description', fields.item_description);

    setIsLoading(true);
    if (fields.image && typeof fields.image === 'object') {
      const imageData = new FormData();
      imageData.append('image', fields.image);
      try {
        const { data } = await axios.post('/marketing/upload', imageData);
        if (data.file) {
          formData.append('image', data.file);
        }
      } catch (e) {
        console.log(e);
      }
    } else if (fields.image) {
      formData.append('image', fields.image);
    }

    try {
      const { data } = await axios.post('/marketing', formData);
      setResult(data);
      setIsLoading(false);
      setHasError(false);
      setEditorContent(EDITOR_DEFAULT_VALUE);
      successToast({ message: i18next.t('marketing.campaign_successfully_created') });
      methods.reset();
      setFilePreview('');
    } catch (err: any) {
      setIsLoading(false);
      setHasError(true);
      setErrorsInForm(err.response.data.errors, methods.setError);
    }
  };

  return {
    methods,
    onSubmit,
    isLoading,
    hasError,
    result,
  };
};
