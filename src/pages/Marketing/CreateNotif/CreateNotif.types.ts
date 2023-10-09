export type FormInputNames = 'description' | 'title' | 'item_description';

export type CreateNotifData = {
  [key in FormInputNames]: string;
} & {
  image: string | File | null;
  date: null | string | Date;
};
