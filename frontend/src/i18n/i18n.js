//noinspection JSValidateTypes,JSDeprecatedSymbols
/**
 *
 * @type {{en, vi}}
 */
const resources = {
  en: require('./translations/en.json'),
  vi: require('./translations/vi.json')
};

/**
 *
 * @type {string}
 */
const DEFAULT_LANGUAGE_CODE = 'en';

/**
 *
 * @return {string}
 */
const getLanguageCode = () => {
  return window.__languageCode || DEFAULT_LANGUAGE_CODE;
};

/**
 *
 * @param {string} id
 * @param {{string}} params
 * @return string
 */
const translate = (id, params = null) => {
  let msg = id;
  let lang = getLanguageCode();

  if (resources[lang].hasOwnProperty(id)) {
    msg = resources[lang][id];
  } else if (lang !== DEFAULT_LANGUAGE_CODE) {
    warnIdMissing(id, lang);
  }

  if (params !== null) {
    const regex = /::([a-zA-Z$_][a-zA-Z0-9$_]*)/g;
    return msg.replace(regex, (match, p1) => params[p1]);
  }

  return msg;
};

/**
 *
 * @type {{string}}
 */
const idsMissing = {};

/**
 *
 * @param {string} id
 * @param {string} lang
 */
const warnIdMissing = (id, lang) => {
  if (!idsMissing.hasOwnProperty(id) || idsMissing[id] !== lang) {
    console.warn('[i18n:miss_id]', `[${lang}]`, id);
    idsMissing[id] = lang;
  }
};

export {
  getLanguageCode,
  translate
};
