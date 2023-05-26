const bcrypt = require('bcrypt');

function groupBy(arr, prop) {
  const groupedObj = {};
  for (const currentObj of arr) {
    const key = currentObj[prop];
    groupedObj[key] ??= [];
    groupedObj[key].push(currentObj);
  }
  return groupedObj;
}

module.exports = {
  groupBy,
}
