import { createI18n } from 'vue-i18n';
import messagesEn from './messages-en';
import { nextTick } from 'vue';
import countdownTranslation from './countdownTranslation';

export const locales = {
  'en': 'English',
  'pt-BR': 'Português (BR)',
};

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

  async loadMessages(locale) {
    if (locale === 'en') return;

    const messages = await import(`./messages-${locale}.js`);
    this.i18n.global.setLocaleMessage(locale, messages.default);

    return nextTick()
  }

  async setI18nLanguage(locale) {
    if (!isLanguageSupported(locale)) {
      throw new Error(`Nonexistent locale requested: ${locale}`);
    }

    const i18n = this.i18n;
    if (!i18n.global.availableLocales.includes(locale)) {
      await this.loadMessages(locale);
    }

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

  async loadUserPreference() {
    /** @type {string|null} */
    const appPreferencesLocale = window.localStorage.getItem('language');

    const locale =
      appPreferencesLocale
      || window.navigator.languages.find((language) => isLanguageSupported(language))
      || fallbackLocale;

    await this.setI18nLanguage(locale);
  }
}

export default {
  install: (app, options) => {
    // Other languages are lazy-loaded
    const messages = {'en': messagesEn};

    const i18n = createI18n({
      legacy: false,
      globalInjection: true,
      locale: fallbackLocale,
      fallbackLocale,
      messages,
    });

    const languageSelector = new LanguageSelector(i18n);
    languageSelector.loadUserPreference().then();

    app.use(i18n);

    app.provide('setLanguage', async (locale) => {
      return languageSelector.setLanguage(locale);
    });

    countdownTranslation.init(i18n);
  },
};
