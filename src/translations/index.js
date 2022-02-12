import { createI18n } from 'vue-i18n';
import messagesEn from './messages-en';
import { nextTick } from 'vue';

export const locales = {
  'en': 'English',
  'pt-BR': 'Português (BR)',
};

/**
 * @param {I18n} i18n
 * @param {string} locale
 */
async function setLanguage(i18n, locale) {
  if (!locale in locales) {
    throw new Error(`Nonexistent locale requested: ${locale}`);
  }

  if (!i18n.global.availableLocales.includes(locale)) {
    await loadMessages(i18n, locale);
  }

  setI18nLanguage(i18n, locale);
}

/**
 * @param {I18n} i18n
 * @param {string} locale
 */
async function loadMessages(i18n, locale) {
  const messages = await import(`./messages-${locale}.js`);
  i18n.global.setLocaleMessage(locale, messages.default);

  return nextTick()
}

/**
 * @param {I18n} i18n
 * @param {string} locale
 */
function setI18nLanguage(i18n, locale) {
  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale;
  } else {
    i18n.global.locale.value = locale;
  }

  document.querySelector('html').setAttribute('lang', locale);
}

export default {
  install: (app, options) => {
    // Other languages are lazy-loaded
    const messages = {'en': messagesEn};

    const i18n = createI18n({
      legacy: false,
      globalInjection: true,
      locale: 'en',
      fallbackLocale: 'en',
      messages,
    });

    app.use(i18n);

    app.provide('setLanguage', async (locale) => {
      return setLanguage(i18n, locale);
    });
  },
};
