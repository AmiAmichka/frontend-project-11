import i18next from 'i18next';

const resources = {
  ru: {
    translation: {
      errors: {
        network: 'Ошибка сети',
        invalidRss: 'Ресурс не содержит валидный RSS',
        required: 'Не должно быть пустым',
        invalidUrl: 'Ссылка должна быть валидным URL',
        alreadyExists: 'RSS уже существует',
      },
      success: {
        rssLoaded: 'RSS успешно загружен',
      },
      ui: {
        preview: 'Просмотр',
      },
    },
  },
};

const i18n = i18next.createInstance();

i18n.init({
  lng: 'ru',
  fallbackLng: 'ru',
  debug: false,
  initImmediate: false,
  resources,
});

export const t = i18n.t.bind(i18n);
export default i18n;
