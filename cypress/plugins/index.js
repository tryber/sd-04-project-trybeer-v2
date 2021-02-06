// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
const connection = require('./connection');
require('dotenv').config();

const deleteMessages = async (collection) => {
  const db = await connection();
  await db.collection(collection).deleteMany({});
};

module.exports = (on, config) => {
  on('task', {
    deleteCollection(collection) {
       return new Promise((resolve) => {
        deleteMessages(collection);
        resolve('');
        close();
      });
    }
  });

  on('before:browser:launch', (browser, launchOptions) => {
    if (browser.name === 'chrome') {
      launchOptions.args.push('--disable-dev-shm-usage');
      return launchOptions;
    }
    return launchOptions;
  });

  config.env.gitHubUser = process.env.GITHUB_USER;
  return config; 
}
