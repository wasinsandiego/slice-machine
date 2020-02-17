const fs = require('fs');
const request = require("request");
const tmp = require('tmp');

const fetchLibrary = require('./library').fetchLibrary

const { defaultLibraries } = require('../common/consts')

module.exports = async (req, res) => {
  const {
    query: { lib, library, framework = 'nuxt' }
  } = req;

  const packageName = lib || library || defaultLibraries[framework];

  if (!packageName) {
    return res
      .status(400)
      .send(
        'Endpoint expects query parameter "lib" to be defined.\nExample request: `/api/library?lib=my-lib`'
      );
  }

  const sm = await fetchLibrary(packageName);

  res.send(sm.slices);
};
