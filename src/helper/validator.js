import { object, string } from 'yup';

export const urlSchema = object({
  url: string().required('errors.required').url('errors.invalidUrl'),
});