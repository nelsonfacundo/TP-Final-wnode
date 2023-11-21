const adoptionsData = require('../data/adoptions.js');


async function getAllAdoptions(pageSize, page) {
  return adoptionsData.getAllAdoptions(pageSize, page);
}


module.exports = { getAllAdoptions};
