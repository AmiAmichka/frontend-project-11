import { object, string } from 'yup';

export const urlSchema = object({
  url: string().url('Ссылка должна быть валидным URL')
});