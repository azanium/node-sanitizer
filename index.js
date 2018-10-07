const crypto = require('crypto');

module.exports = (obj, fields) => {
  const _fields = fields || [];
  const sanitizedResult = Object.assign({}, obj);

  _fields.forEach((field) => {
    if (field in sanitizedResult) {
      const value = sanitizedResult[field];
      const hashedString = value ? crypto.createHash('sha256').update(value).digest('hex') : undefined;
      sanitizedResult[field] = hashedString;
    }
  });

  return sanitizedResult;
};
