import manifest from '../../manifest.json'

// map to store the key/translation pairs of the loaded language
let translations: {[key: string]: string};

/**
 * Replace placeholders in the given string with context
 * @param {String} str string with placeholders to be replaced
 * @param {Object} context object contains placeholder/value pairs
 * @return {String} formatted string
 */

type Context = {
  [key: string]: string;
};

function parsePlaceholders (str:string, context: Context = {'': ''}) {
  const regex = /{{(.*?)}}/g
  const matches = []
  let match

  do {
    match = regex.exec(str)
    if (match) matches.push(match)
  } while (match)

  return matches.reduce((str, match) => {
    const newRegex = new RegExp(match[0], 'g')
    if(!match[1]) throw new Error('Invalid context');
    return str.replace(newRegex, context[match[1]] || '')
  }, str)
}

class I18n {
  constructor (locale: string) {
    this.loadTranslations(locale)
  }

  tryRequire (locale: string) {
    try {
      return require(`../../translations/${locale}.json`)
    } catch (e) {
      return null
    }
  }

  /**
   * Translate key with currently loaded translations,
   * optional context to replace the placeholders in the translation
   * @param {String} key
   * @param {Object} context object contains placeholder/value pairs
   * @return {String} translated string
   */
  t (key:string, context: Context) {
    const keyType = typeof key
    if (keyType !== 'string') throw new Error(`Translation key must be a string, got: ${keyType}`)

    const template = translations[key]
    if (!template) throw new Error(`Missing translation: ${key}`)
    if (typeof template !== 'string') throw new Error(`Invalid translation for key: ${key}`)

    return parsePlaceholders(template, context)
  }

  loadTranslations (locale = 'en') {
    translations = this.tryRequire(locale) ||
                   this.tryRequire(locale.replace(/-.+$/, '')) ||
                   translations ||
                   this.tryRequire('en')
  }
}

export default new I18n(manifest.defaultLocale)
