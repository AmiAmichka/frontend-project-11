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
        pageTitle: 'RSS агрегатор',
        pageDescription: 'Начните читать RSS сегодня! Это легко, это красиво.',
        rssPlaceholder: 'Ссылка RSS',
        addButton: 'Добавить',
        example: 'Пример: https://lorem-rss.hexlet.app/feed',
        posts: 'Посты',
        feeds: 'Фиды',
        preview: 'Просмотр',
        readFull: 'Читать полностью',
        close: 'Закрыть',
      },
    },
  },
};

const i18n = i18next.createInstance();

export const initI18n = () => {
  return i18n.init({
    lng: 'ru',
    fallbackLng: 'ru',
    debug: false,
    resources,
  });
};

export const t = i18n.t.bind(i18n);
export default i18n;
