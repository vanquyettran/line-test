//noinspection JSValidateTypes,JSDeprecatedSymbols
/**
 *
 * @type {{en, vi}}
 */
const resources = {
  en: require('./translations/en.json'),
  vi: require('./translations/vi.json')
};

const DEFAULT_LANGUAGE_CODE = 'en';

const getLanguageCode = () => {
  return window.__languageCode || DEFAULT_LANGUAGE_CODE;
};

const translate = (id, params = null) => {
  let msg = id;
  let lang = getLanguageCode();

  if (resources[lang].hasOwnProperty(id)) {
    msg = resources[lang][id];
  } else {
    if (lang !== DEFAULT_LANGUAGE_CODE) {
      warnIdMissing(id, lang);
    }
  }

  if (params !== null) {
    const regex = /::([a-zA-Z$_][a-zA-Z0-9$_]*)/g;
    return msg.replace(regex, (match, p1) => params[p1]);
  }

  return msg;
};

const missing = {};
const warnIdMissing = (id, lang) => {
  if (!missing.hasOwnProperty(id) || missing[id] !== lang) {
    console.warn('[i18n:miss_id]', `[${lang}]`, id);
    missing[id] = lang;
  }
};

export {
  getLanguageCode,
  translate,
};
