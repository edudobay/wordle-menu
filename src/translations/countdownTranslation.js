import countdown from 'countdown';

const LABEL_MINUTES = 2;
const LABEL_HOURS = 3;

const messageKeys = {
  [LABEL_HOURS]: 'date.hours',
  [LABEL_MINUTES]: 'date.minutes',
};

export default {
  /** @param {I18n} i18n */
  init(i18n) {
    countdown.setFormat({
      formatter(value, unit) {
        const messageKey = messageKeys[unit];
        if (messageKey == null) {
          throw new Error('Unit not mapped: ' + unit);
        }

        /** @type {Composer} i18n.global */

        return i18n.global.t(messageKey, value);
      }
    });
  },
};
