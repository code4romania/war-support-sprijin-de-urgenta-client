/* eslint-disable @typescript-eslint/no-var-requires */
/*   
    Merges locales files and csv with translations to a new csv file
    Use this script to get missing translations
    beer++
*/
const csv = require('csvtojson')
const fs = require('fs')
const { stringify } = require('csv-stringify');

//file path from root of project
const csvFilePath = './scripts/translate/JSON_Translations.csv'
const csvOutputFilePath = `./scripts/translate/JSON_Translations_${Math.floor(new Date().getTime() / 1000)
}.csv`;

// if you're lazy and use file path with spaces
// csvFilePath = csvFilePath.replace(/(\s+)/g, '\\$1');

/**
 *   change as needed
 *   key = used to create the locale folder ex: ./public/locales/{key}/common.json
 *   value = the csv column header for each lang 
 */
const localesMap = {
  ro: 'Romana',
  en: 'Engleza',
  ua: 'Ucrainieana',
  ru: 'Rusa',
}

// the csv column header used for translation keys
const identifier = 'Identifier'

// folder path for the translations
const localesFolderPath = './public/locales'

const generateJsonTranslationsCsv = async () => {
  const langJsonArray = await csv().fromFile(csvFilePath)
  const resultAcc = {};
  const allKeys = []

  for (const [key, value] of Object.entries(localesMap)) {
    const langJson = JSON.parse(fs.readFileSync(`${localesFolderPath}/${key}/common.json`, 'utf8'));

    const languagesMapped = langJsonArray.reduce(
      (acc, cur) => ({ ...acc, [cur[identifier]]: cur[value] }),
      {},
    )

    // add file translations so we won't loose them
    // If both objects have a property with the same name, then the second object property overwrites the first
    var data = { ...langJson, ...languagesMapped }
    allKeys.push(...Object.keys(data));

    resultAcc[value] = data;
  }
  const distinctKeys = new Set(allKeys)

  var rowsAcc = [];
  // add header row 
  rowsAcc.push([identifier, ...Object.values(localesMap)]);

  distinctKeys.forEach(key => {
    const rowData = [key];
    for (const [_, value] of Object.entries(localesMap)) {
      rowData.push(resultAcc[value][key] ?? '')
    }
    rowsAcc.push(rowData);
  });

  stringify(rowsAcc, {
    header: false
  }, (err, output) => {
    if (err) {
      console.error(err)
    } else {
      console.log('done')
      fs.writeFileSync(csvOutputFilePath, output, { encoding: 'utf-8' });
    }
  })

}

generateJsonTranslationsCsv()
