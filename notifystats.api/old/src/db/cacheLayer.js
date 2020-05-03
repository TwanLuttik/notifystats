
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 100 });



module.exports = {


  set(key, val) {
    return cache.set(key, val, 7200);
  },


  get(key) {
    if (cache.get(key) == undefined) return false;
    else true;
  },

  isValid(key) {
    return cache.has(key);
  }
};