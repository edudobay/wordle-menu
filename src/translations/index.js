import { createI18n } from 'vue-i18n';
import messages_en from './messages-en';
import messages_pt_BR from './messages-pt-BR';
import countdownTranslation from './countdownTranslation';
import { mapEntryValues } from '../utils/objectEntries';

export const locales = {
  'en': { name: 'English', messages: messages_en },
  'pt-BR': { name: 'Português (BR)', messages: messages_pt_BR },
};

/** @type {Object<string, string>} */
export const localeNames = mapEntryValues(locales, ({ name }) => name);

const localeMessages = mapEntryValues(locales, ({ messages }) => messages);

const fallbackLocale = 'en';

function isLanguageSupported(locale) {
  return locale in locales;
}

class LanguageSelector {
  /** @param {I18n} i18n */
  constructor(i18n) {
    this.i18n = i18n;
  }

  setLanguage(locale) {
    this.setI18nLanguage(locale);
    this.saveUserPreference(locale);
  }

  setI18nLanguage(locale) {
    if (!isLanguageSupported(locale)) {
      throw new Error(`Nonexistent locale requested: ${locale}`);
    }

    const i18n = this.i18n;
    if (i18n.mode === 'legacy') {
      i18n.global.locale = locale;
    } else {
      i18n.global.locale.value = locale;
    }

    document.querySelector('html').setAttribute('lang', locale);
  }

  saveUserPreference(locale) {
    window.localStorage.setItem('language', locale);
  }

  loadUserPreference() {
    /** @type {string|null} */
    const appPreferencesLocale = window.localStorage.getItem('language');

    const locale =
      appPreferencesLocale
      || window.navigator.languages.find((language) => isLanguageSupported(language))
      || fallbackLocale;

    this.setI18nLanguage(locale);
  }
}

export default {
  install: (app, options) => {
    const i18n = createI18n({
      legacy: false,
      globalInjection: true,
      locale: fallbackLocale,
      fallbackLocale,
      messages: localeMessages,
    });

    const languageSelector = new LanguageSelector(i18n);
    languageSelector.loadUserPreference();

    app.use(i18n);

    app.provide('setLanguage', async (locale) => {
      return languageSelector.setLanguage(locale);
    });

    countdownTranslation.init(i18n);
  },
};
